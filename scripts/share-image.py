# Remakes the Ramadan link preview (public/images/share/ramadan-1448-share.jpg and src/app/opengraph-image.jpg) from
# the hero: run `npm run build && npx next start -p 3001`, then `python3 scripts/share-image.py`, then copy
# /tmp/og/share.jpg to both paths. Needs Playwright and Pillow.
from playwright.sync_api import sync_playwright
from PIL import Image
import os
os.makedirs('/tmp/og', exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg=b.new_page(viewport={'width':1200,'height':630},device_scale_factor=2,reduced_motion='reduce')
    pg.goto('http://localhost:3001/trips/ramadan-umrah-2027',wait_until='networkidle',timeout=120000)
    pg.add_style_tag(content='''header,[data-placement="phone bar"],.trip-jump,.feature-band,.arrival{display:none!important}
      .rl-grid{min-height:630px!important;padding-top:0!important;padding-bottom:0!important}
      .rl{padding-bottom:0!important}
      .rl-note{display:none!important}
      .rl-mark{display:none!important}
      .rl-book,.rl-ended{display:none!important}
      .og-logo{position:absolute;left:44px;top:34px;z-index:5;height:56px;color:#45442e}''')
    pg.evaluate("(()=>{const s=document.createElement('span');s.className='logo-mask og-logo';document.querySelector('.rl').appendChild(s)})()")
    pg.wait_for_timeout(1500)
    pg.screenshot(path='/tmp/og-raw.png',clip={'x':0,'y':0,'width':1200,'height':630})
    b.close()
im=Image.open('/tmp/og-raw.png').convert('RGB').resize((1200,630),Image.LANCZOS)
im.save('/tmp/og/share.jpg',quality=86,optimize=True,progressive=True)
import os;print(os.path.getsize('/tmp/og/share.jpg')//1024,'KB')
