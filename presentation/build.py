"""Render slides.html to 4K PNGs and pack them into a 16:9 .pptx with speaker notes."""
import pathlib
from playwright.sync_api import sync_playwright
from pptx import Presentation
from pptx.util import Emu

root = pathlib.Path(__file__).resolve().parent
render = root / "render"
render.mkdir(exist_ok=True)

NOTES = [
# 1 R1
"""[R1 · 0:00 · Title]
Good morning everyone. We are presenting S-GH, the Greenhouse Microclimate Anomaly Detector. It is an end-to-end AIoT system, and it is built entirely in simulation: no physical hardware. The idea is simple. A greenhouse can lose a whole crop in minutes if a heater fails or a vent sticks, usually at night when nobody is watching. Our system watches five greenhouse zones around the clock, catches those failures within seconds, acts on them automatically, and keeps working even when the internet drops. I'm R1 and I'll cover the problem and requirements. Then R2 covers edge hardware and MQTT, R3 the AI and data sanitization, and R4 the architecture and our live simulation results.""",
# 2 R1
"""[R1 · 1:15 · Problem]
Picture this: at 2 AM the heater in one zone fails. Within about twenty minutes the temperature falls toward the outside air and seedlings start to freeze. A vent stuck shut on a sunny morning does the opposite: heat and CO2 build up fast. Our scenario has five zones, each tracking temperature, humidity, soil moisture, CO2 and light every 30 seconds. The hard constraints are critical alerts in under 15 seconds, an edge device as small as an ESP32, and a twist card: the internet gateway is intermittent, so every node must buffer up to 24 hours of data offline.""",
# 3 R1
"""[R1 · 2:30 · Requirements]
We turned those constraints into five measurable requirements. REQ-01: critical alert latency under 15 seconds, measured from fault injection to alert timestamp. REQ-02: a 24-hour offline buffer with zero sequence gaps after reconnecting. REQ-03: every message under 200 bytes. REQ-04: the edge must fit in 520 KB of ESP32 memory. REQ-05: no more than one false alarm per day, with recall of at least 95 percent. On the right is our risk map. The biggest risk is a long gateway outage, mitigated by the flash ring buffer. Every later design decision cites one of these requirement IDs. Now over to R2 for the edge hardware.""",
# 4 R2
"""[R2 · 3:45 · Sensors and edge]
Thanks. These are real, currently sold sensors that we model in software: the Sensirion SHT45 for temperature and humidity, the SCD40 for CO2, a capacitive soil probe through an ADC, and the ROHM BH1750 for light, all feeding an ESP32 with 520 KB of SRAM. Each sensor has explicit failure checks: CRC errors, stuck values, drift, and I2C disconnects. On the right is our latency budget for REQ-01: a 5-second fast sampling loop for temperature, 50 milliseconds for cleaning and AI, 0.3 seconds for MQTT, and one second to switch a relay. That's about 6.4 seconds worst case, well inside 15.""",
# 5 R2
"""[R2 · 5:00 · MQTT telemetry]
Telemetry uses MQTT. Each zone node publishes to a local edge aggregator with QoS 1, so every message is acknowledged and resent if lost. The aggregator runs the Mosquitto broker, our sanitizer and AI, and the 24-hour ring buffer, then bridges to the cloud over TLS. Topics are structured by site, zone and node, with separate topics for telemetry, alerts, a retained last-will status, and downstream vent commands. Security is per device: each node has its own X.509 certificate, and the broker ACL only lets a node write to its own topics. Here is a real payload: 106 bytes, comfortably under our 200-byte limit.""",
# 6 R2
"""[R2 · 6:15 · Data volume]
Now the maths. 86,400 seconds divided by 30 gives 2,880 samples per node per day. Times five nodes is 14,400 messages a day, and times 30 days is 432,000 messages a month. At 106 bytes each, that is about 1.53 megabytes of payload a day. For the twist card, storing 24 hours as JSON would need 298 KiB per node, more than half the ESP32's RAM. So we pack each record into 20 bytes: 56 KiB per node, stored in a flash partition, not RAM. When the link returns, records burst-sync and are de-duplicated by node and sequence number. Over to R3 for the AI.""",
# 7 R3
"""[R3 · 7:30 · It learns what normal looks like]
Thanks. The heart of S-GH is an AI that learns what normal looks like for every hour and every season. This chart shows three days of one zone. The green band is what the AI expects: warm afternoons, cool nights, and a lower band once autumn arrives. The black line is the real temperature. For two days it stays inside the band, so there are no alerts, even on hot afternoons. Then, on the third night, the heater fails. The temperature falls out of the band, and the AI immediately raises an alert. That is exactly the kind of failure we want to catch, even when the temperature still looks 'safe' to a human glancing at a number.""",
# 8 R3
"""[R3 · 8:45 · Dual-layer edge AI]
Our AI has two layers, both running on the edge device. Layer 1 is a set of rules plus a rolling Z-score. It works from the very first minute, for example: the heater is on but the zone keeps getting colder, or the vent was told to open but hasn't moved. Layer 2 is a tiny autoencoder, about 14 KB, that learns how all five signals normally move together and predicts what each sensor should read right now. A big gap between real and expected means an alert, and it tells the operator which sensor looks wrong. Behind them sits a cloud learning loop that keeps the history, double-checks alerts and pushes a signed model update every week. For cold start we run the rules first, collect two weeks of clean data, run the autoencoder quietly in shadow mode, then switch it on.""",
# 9 R3
"""[R3 · 10:00 · Sanitization]
Stage 5 is data sanitization, and the key question is: is this a broken sensor or a real emergency? On the left, a humidity sensor stuck at 0 percent, or a sudden minus-40 reading. These are impossible values, so Stage 5 quarantines them, raises a maintenance ticket, and nobody is woken up. On the right, a real frost: the temperature drops fast, and a second witness confirms it, because humidity rises at the same time. That is always treated as a real anomaly, so the alarm sounds, the vents close and the backup heater starts. Our golden rule is that faults are quarantined, never deleted, so a real frost is never thrown away as noise. Now R4 will show the architecture and the live results.""",
# 10 R4
"""[R4 · 11:15 · Architecture]
Thank you. Here is the end-to-end architecture. On the left, everything inside the greenhouse: sensor nodes, the sanitizer, the edge AI, a local broker and the flash ring buffer, and the relays that drive the vents and heaters. All of that works with no internet at all. On the right is the cloud: a broker bridge, TimescaleDB for history, Grafana dashboards, notifications, and weekly Isolation Forest retraining that pushes signed model updates back to the edge. Below is the twist-card impact: 56 KB of flash per node, zero extra alert delay because the decisions are local, and zero duplicates after reconnecting.""",
# 11 R4
"""[R4 · 12:30 · Simulation results]
These are results from our live browser simulation. It is physics-driven: sun, heaters, vents, irrigation, humidity and CO2 all interact, and the autoencoder trains in the browser on 72 hours of normal data. When we inject a heater failure at night, the zone cools, frost forms, the edge raises an explainable alert and switches on the backup heater. A jammed vent triggers fans and the shade screen, and a pump failure starts the backup pump. Each is detected within two to three simulation ticks. Sensor faults such as stuck humidity or a minus-40 glitch are filtered with no alarm. Across six simulated days we saw zero false alarms, and zero data gaps after a gateway outage.""",
# 12 R4
"""[R4 · 13:45 · Summary]
To sum up, S-GH senses five zones and twenty-five signals every 30 seconds. It cleans faulty readings before they can cause false alarms. It detects and fixes real failures (frost, a jammed vent, a broken pump) within seconds, right inside the greenhouse, even with no internet. And the cloud keeps the full history and keeps the AI learning every week. Our next step is a 14-day pilot with 40 injected events, with three targets: recall of at least 0.95, at most one false alarm per day, and zero data gaps after an outage. The full interactive site, with the live simulation, is at arqamcodes.github.io/AIOT-Project. Thank you, and we're happy to take questions.""",
]

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    ctx = b.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto((root / "slides.html").as_uri())
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(800)
    slides = page.locator("section.slide")
    n = slides.count()
    for i in range(n):
        slides.nth(i).screenshot(path=str(render / f"slide-{i+1:02d}.png"))
    fonts = page.evaluate("[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight).join(', ')")
    print("rendered", n, "slides · fonts:", fonts)
    b.close()

prs = Presentation()
prs.slide_width, prs.slide_height = Emu(12192000), Emu(6858000)   # 13.333 x 7.5 in, 16:9
blank = prs.slide_layouts[6]
titles = ["Greenhouse Microclimate Anomaly Detector", "Problem", "Requirements and risks", "Sensors and edge",
          "MQTT telemetry", "Data volume and offline buffer", "Why thresholds fail", "Models and cold start",
          "Data sanitization", "Architecture", "Simulation results", "Verdict"]
for i in range(n):
    s = prs.slides.add_slide(blank)
    pic = s.shapes.add_picture(str(render / f"slide-{i+1:02d}.png"), 0, 0, prs.slide_width, prs.slide_height)
    pic.name = f"Slide {i+1}: {titles[i]}"
    pic._element.nvPicPr.cNvPr.set("descr", f"{titles[i]} — S-GH backup deck slide {i+1}")
    s.notes_slide.notes_text_frame.text = NOTES[i]
prs.core_properties.title = "S-GH · Greenhouse Microclimate Anomaly Detector — backup deck"
out = root / "S-GH-Backup-Deck.pptx"
prs.save(out)
print("saved", out, out.stat().st_size)
