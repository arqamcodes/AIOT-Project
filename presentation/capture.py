"""Capture the live site's visuals (exact styling) as PNGs for the backup deck."""
import sys, pathlib
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent
site = (root.parent / "index.html").as_uri()
out = root / "assets"
out.mkdir(exist_ok=True)

PREP = """
document.documentElement.style.scrollBehavior='auto';
const st=document.createElement('style');st.textContent='.topbar,.dots,.tour,.grain,.handoff{display:none!important}.rv{opacity:1!important;transform:none!important;transition:none!important}.drawline{stroke-dashoffset:0!important;transition:none!important}';document.head.appendChild(st);
document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));
document.querySelectorAll('[data-w]').forEach(s=>{s.style.transition='none';s.style.width=s.dataset.w+'%'});
document.querySelectorAll('#latbar div').forEach(d=>{d.style.transition='none';d.style.width=d.dataset.w+'%'});
"""

def card(page, sel, up):
    return page.locator(sel).locator(f"xpath=ancestor::*[contains(concat(' ',normalize-space(@class),' '),' {up} ')][1]")

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    ctx = b.new_context(viewport={"width": 1600, "height": 1000}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto(site)
    page.wait_for_function("window.__S && window.__S.AE.ready", timeout=60000)
    page.evaluate(PREP)
    page.evaluate("document.querySelector('#byteDrawer>button').click()")
    page.evaluate("document.querySelector('#faultToggle [data-m=\"s5\"]').click()")
    page.wait_for_timeout(1500)

    def shot(name, loc):
        loc.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        loc.screenshot(path=str(out / f"{name}.png"))
        print("captured", name, flush=True)

    shot("hero", page.locator(".illu4"))
    shot("story", page.locator("#problem .story"))
    shot("kpis", page.locator("#kpis"))
    shot("risk", page.locator(".riskwrap"))
    shot("sensors", page.locator("#sensors"))
    shot("latency", card(page, "#latbar", "card"))
    shot("topo", card(page, "#topo", "card"))
    shot("payload", page.locator("#byteDrawer .inner"))
    shot("thresholds", card(page, "#thrChart", "card"))
    shot("models", page.locator("#models"))
    shot("coldstart", card(page, ".timeline", "card"))
    shot("matrix", page.locator("#matrix"))
    shot("privacy", page.locator("#priv"))
    shot("opts", page.locator("#opts"))
    shot("score", card(page, "#score", "card"))
    shot("arch", card(page, "#archSvg", "card"))
    shot("twist", page.locator("#twist"))
    shot("gates", page.locator("#gates"))
    shot("verdict", page.locator(".verdict"))

    # --- live simulation states
    lab = page.locator(".lab")
    lab.scroll_into_view_if_needed()
    page.evaluate("document.querySelector('[data-s=\"normal\"]').click()")
    page.evaluate("document.querySelector('[data-s=\"heater\"]').click()")
    page.wait_for_function("document.querySelector('.zc.alert')", timeout=60000)
    page.wait_for_timeout(2500)
    shot("sim_heater", page.locator("#stage"))
    shot("sim_brain", page.locator(".lab-grid"))
    page.evaluate("document.querySelector('[data-s=\"normal\"]').click()")
    page.evaluate("document.querySelector('[data-s=\"stuck\"]').click()")
    page.wait_for_function("document.querySelector('.zc.fault')", timeout=60000)
    page.wait_for_timeout(3000)
    shot("sim_fault", page.locator(".lab-grid3"))
    page.evaluate("document.querySelector('[data-s=\"normal\"]').click()")
    page.evaluate("document.querySelector('[data-s=\"vent\"]').click()")
    page.wait_for_function("document.querySelector('.zc.alert')", timeout=60000)
    page.wait_for_timeout(2500)
    shot("sim_vent", page.locator("#stage"))
    b.close()
