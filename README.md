# UMBRA LEACHIES · 玄影 — site

Static pages for GitHub Pages. Upload the whole `umbra/` folder to the repo root
so the site lives at `https://jeremyngyintai-hub.github.io/umbra/`.

## Files
- `index.html` home · `records.html` collection · `available.html` planned pairings · `brand.html` identity
- `lch-01.html … lch-11.html`, `hog-01.html`, `hog-02.html` — one page per animal (enclosure-label QR codes point here)
- `umbra-icon.svg`, `penumbra-mark.svg` — marks · `photos/` — optional images

## Regenerating after an Excel update
1. Copy the latest `leachianus_collection_EN_v2.xlsx` next to `build_site.py`
2. `pip install openpyxl` (once)
3. `python build_site.py --out .`
4. Commit and push

Contact links, quarantine dates and verified/unverified claims are edited in the CONFIG block at the top of `build_site.py`.
`brand.html` is hand-written and is not regenerated.
