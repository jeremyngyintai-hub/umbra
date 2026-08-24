# UMBRA LEACHIES · 玄影

A static record site for a *Rhacodactylus leachianus* collection. No build step,
no database, no dependencies to install — plain HTML, one CSS file and two scripts.

---

## What's here

```
index.html          Leachianus collection overview
snakes.html         Western hognose overview
breeding.html       Clutch log + incubation reference
labels.html         Printable enclosure labels (A4)
a/LCH-01.html …     One record page per animal
a/HOG-01.html …     One record page per snake
assets/data.js      ← the only file you normally edit
assets/style.css    Brand styles
assets/app.js       Page rendering, QR generation
assets/qrcode.js    QR encoder (third party, MIT)
```

---

## Publishing on GitHub Pages

1. Create a GitHub account if you don't have one.
2. Create a **new public repository**. Name it `umbra` (the name becomes part of
   your address).
3. On the repository page choose **Add file → Upload files**, drag in everything
   from this folder — including the `a` and `assets` folders — then **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, set **Source** to
   `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. Wait about a minute. The site appears at:

   ```
   https://YOUR-USERNAME.github.io/umbra/
   ```

That address is what the QR codes will contain. Nothing to configure — the codes
are generated from whatever address the page is served at, so they are correct on
GitHub Pages, on a custom domain, and even when you open the files locally.

### Custom domain (optional)

Point your domain's DNS at GitHub Pages, then enter the domain under
**Settings → Pages → Custom domain**. The QR codes follow automatically the next
time you print.

---

## Adding or updating an animal

Everything lives in `assets/data.js`.

**To update a weight**, add a line to that animal's `weights` array:

```js
weights: [
  ["2026-08-20", 214],
  ["2026-09-23", 221]      // ← new weigh-in
]
```

The record page recalculates the gain column and the collection card picks up the
new figure. Nothing else to touch.

Snakes live in `SNAKES` in the same file, with `morph` in place of `lineage`.

**To add an animal**, copy an existing block in `COLLECTION` (or `SNAKES`), change the values,
then duplicate any file in `a/` and rename it to match the new ID — for example
`a/LCH-09.html`. Open it and change the two places the old ID appears (the
`<title>` and the `renderRecord("…")` call at the bottom).

**To record a clutch**, add a block to `CLUTCHES` the same way.

---

## Printing labels

Open `labels.html` in Chrome or Safari and print at **100%** on A4. Eight strips
per page, each about 132 × 25 mm.

Every QR opens that animal's record page. **Scan one before printing the whole
set** — if your printer renders the modules softly, find `16mm` in the print block
near the top of `labels.html` and raise it to 18 or 20 mm.

---

## What is deliberately not here

Acquisition costs and valuations stay in the spreadsheet. This site is the public
record — lineage, dates, sex, weights and provenance — which is what a buyer,
a fellow breeder or a vet needs to see. Prices are yours.

---

## Keeping the spreadsheet and the site in step

The spreadsheet remains the working document: it holds costs, feeding portions,
the batch calculator and the husbandry protocol. This site holds the public
record. The overlap is small — lineage, dates and weights — and the honest
workflow is to update `data.js` at the same monthly weigh-in when you update the
Weight Log. Doing both at one sitting is what stops them drifting apart.
