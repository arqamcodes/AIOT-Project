"""Vector deck: slides.html -> vector PDF (Chrome) -> SVG per slide (text as outlines) -> pptx with svgBlip + 4K PNG fallback."""
import pathlib, copy
import fitz  # PyMuPDF
from playwright.sync_api import sync_playwright
from pptx import Presentation
from pptx.util import Emu
from pptx.opc.package import Part
from pptx.opc.packuri import PackURI
from pptx.opc.constants import RELATIONSHIP_TYPE as RT
from lxml import etree

root = pathlib.Path(__file__).resolve().parent
render = root / "render"; render.mkdir(exist_ok=True)
pdf_path = render / "slides.pdf"

# speaker notes and titles come from the raster builder
src = (root / "build.py").read_text(encoding="utf-8")
ns = {}
exec(src[src.index("NOTES = ["):src.index("with sync_playwright()")], ns)
NOTES = ns["NOTES"]
TITLES = ["Greenhouse Microclimate Anomaly Detector", "Problem", "Requirements and risks", "Sensors and edge",
          "MQTT telemetry", "Data volume and offline buffer", "Why thresholds fail", "Models and cold start",
          "Data sanitization", "Architecture", "Simulation results", "Verdict"]

PRINT_CSS = "@page{size:1920px 1080px;margin:0}html,body{background:none!important;margin:0}.card,.tree,.chip,.team div,.tl{box-shadow:none!important;border:2px solid #E2E7D6}.dark .card{border-color:rgba(255,255,255,.15)}.slide{background:#EEF0EA!important}.slide.dark{background:#1F3318!important}.strip{background:#274D1D!important}.dev .card svg{background:#F3F7EA!important}.slide{margin:0!important;break-after:page;page-break-after:always}"

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    ctx = b.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto((root / "slides.html").as_uri())
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(600)
    n = page.locator("section.slide").count()
    for i in range(n):  # 4K PNG fallbacks
        page.locator("section.slide").nth(i).screenshot(path=str(render / f"slide-{i+1:02d}.png"))
    OVERLAYS = {}  # slide index -> (png path, x, y, w, h in slide px)
    for si in (10,):
        sl = page.locator("section.slide").nth(si); card = sl.locator(".card").first
        sb, cb = sl.bounding_box(), card.bounding_box()
        OVERLAYS[si] = (render / f"overlay-{si+1:02d}.png", cb["x"]-sb["x"], cb["y"]-sb["y"], cb["width"], cb["height"])
    ctx3 = b.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=3)
    p3 = ctx3.new_page(); p3.goto((root / "slides.html").as_uri()); p3.wait_for_load_state("networkidle"); p3.evaluate("document.fonts.ready"); p3.wait_for_timeout(600)
    for si, (png, *_r) in OVERLAYS.items():
        p3.locator("section.slide").nth(si).locator(".card").first.screenshot(path=str(png))
    ctx3.close()
    page.add_style_tag(content=PRINT_CSS)
    page.emulate_media(media="print")
    page.pdf(path=str(pdf_path), width="1920px", height="1080px", print_background=True, margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
    b.close()

doc = fitz.open(pdf_path)
print("pdf pages", doc.page_count, "for", n, "slides")
svgs = [doc[i].get_svg_image(text_as_path=True).encode("utf-8") for i in range(min(n, doc.page_count))]

prs = Presentation()
prs.slide_width, prs.slide_height = Emu(12192000), Emu(6858000)
blank = prs.slide_layouts[6]
SVG_NS = "http://schemas.microsoft.com/office/drawing/2016/SVG/main"
R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main"
for i, svg in enumerate(svgs):
    s = prs.slides.add_slide(blank)
    pic = s.shapes.add_picture(str(render / f"slide-{i+1:02d}.png"), 0, 0, prs.slide_width, prs.slide_height)
    pic.name = f"Slide {i+1}: {TITLES[i]}"
    pic._element.nvPicPr.cNvPr.set("descr", f"{TITLES[i]} — S-GH backup deck slide {i+1}")
    part = Part(PackURI(f"/ppt/media/slide-vector-{i+1}.svg"), "image/svg+xml", prs.part.package, svg)
    rid = s.part.relate_to(part, RT.IMAGE)
    blip = pic._element.find(f".//{{{A_NS}}}blip")
    ext_lst = etree.SubElement(blip, f"{{{A_NS}}}extLst")
    ext = etree.SubElement(ext_lst, f"{{{A_NS}}}ext", uri="{96DAC541-7B7A-43D3-8B79-37D633B846F1}")
    sv = etree.SubElement(ext, f"{{{SVG_NS}}}svgBlip", nsmap={"asvg": SVG_NS})
    sv.set(f"{{{R_NS}}}embed", rid)
    if i in OVERLAYS:  # plain picture on top: always rendered by PowerPoint
        png, x, y, w, h = OVERLAYS[i]; k = 12192000 / 1920
        ov = s.shapes.add_picture(str(png), Emu(int(x*k)), Emu(int(y*k)), Emu(int(w*k)), Emu(int(h*k)))
        ov.name = "Simulation results illustration"
        ov._element.nvPicPr.cNvPr.set("descr", "Night greenhouse: zone 3 heater failed, backup heater switched on automatically; zone 2 humidity sensor fault filtered")
    s.notes_slide.notes_text_frame.text = NOTES[i]
prs.core_properties.title = "S-GH · Greenhouse Microclimate Anomaly Detector — backup deck"
out = root / "S-GH-Backup-Deck.pptx"
prs.save(out)
print("saved", out, out.stat().st_size // 1024, "KB ·", sum(len(x) for x in svgs) // 1024, "KB of vector SVG")
