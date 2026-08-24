/* ------------------------------------------------------------------
   UMBRA LEACHIES — collection data
   This file is the single source of truth. Edit it and every page,
   label and QR code on the site updates.
   ------------------------------------------------------------------ */

const COLLECTION = [
  {
    id: "LCH-01",
    sex: "0.1",
    lineage: "LL Pure Caanawa",
    traits: "Caa3 × Caa4 · Purple",
    locality: "Caanawa",
    laid: "2021-11-13",
    hatched: "2022-03-19",
    provenance: "",
    registry: "",
    notes: "Laid an infertile clutch (C-2026-01) on 2026-07-04, three weeks after arrival.",
    weights: [
      ["2025-02-18", 156],
      ["2025-10-30", 212.6],
      ["2026-08-20", 214]
    ]
  },
  {
    id: "LCH-02",
    sex: "1.0",
    lineage: "LL Pure Caanawa",
    traits: "Caa41 × Caa42 · Very Nice Color",
    locality: "Caanawa",
    laid: "2024-09-08",
    hatched: "2024-11-06",
    provenance: "",
    registry: "",
    notes: "",
    weights: [
      ["2026-05-20", 113],
      ["2026-08-20", 124]
    ]
  },
  {
    id: "LCH-03",
    sex: "1.0",
    lineage: "Friedel Koghis × Nord Line Melanistic",
    traits: "Mt Koghis · Friedel (Mt Koghis) · GT Type A · Melanistic",
    locality: "Mt Koghis",
    laid: "2023-06-27",
    hatched: "2023-09-14",
    provenance: "Bred by Ridiculous Rhacs (US)",
    registry: "MorphMarket 2127896",
    registryUrl: "https://www.morphmarket.com/us/c/reptiles/lizards/leachianus-geckos/2127896",
    notes: "Visual melanistic — 本影. Melanism is a simple recessive.",
    weights: [
      ["2026-08-20", 167]
    ]
  },
  {
    id: "LCH-04",
    sex: "1.0",
    lineage: "Podindemie × Yate × MCDM × MTK",
    traits: "Four-way Grande Terre",
    locality: "Grande Terre",
    laid: "2022-02-18",
    hatched: "2022-04-29",
    provenance: "",
    registry: "",
    notes: "",
    weights: [
      ["2026-08-20", 245]
    ]
  },
  {
    id: "LCH-05",
    sex: "1.0",
    lineage: "Mountain Koghis Friedel",
    traits: "MTK · Friedel line",
    locality: "Mt Koghis",
    laid: "2024-06-16",
    hatched: "2024-08-21",
    provenance: "",
    registry: "",
    notes: "",
    weights: [
      ["2026-03-03", 142],
      ["2026-07-12", 155]
    ]
  },
  {
    id: "LCH-06",
    sex: "0.1",
    lineage: "Mountain Koghis Friedel",
    traits: "MTK · Friedel line",
    locality: "Mt Koghis",
    laid: "2024-11-11",
    hatched: "2025-02-17",
    provenance: "",
    registry: "",
    notes: "",
    weights: [
      ["2026-03-03", 58],
      ["2026-04-14", 83],
      ["2026-05-29", 126],
      ["2026-07-12", 143],
      ["2026-08-18", 158]
    ]
  },
  {
    id: "LCH-07",
    sex: "0.1",
    lineage: "GTX × Type D",
    traits: "Grande Terre",
    locality: "Grande Terre",
    laid: "2024-09-14",
    hatched: "2024-11-16",
    provenance: "",
    registry: "",
    notes: "",
    weights: []
  },
  {
    id: "LCH-08",
    sex: "0.1",
    lineage: "GTX × Yate",
    traits: "Grande Terre",
    locality: "Grande Terre",
    laid: "2024-11-29",
    hatched: "2025-01-26",
    provenance: "",
    registry: "",
    notes: "",
    weights: []
  }
];

const CLUTCHES = [
  {
    id: "C-2026-01",
    dam: "LCH-01",
    sire: "—",
    lineage: "LL Pure Caanawa",
    laid: "2026-07-04",
    eggs: "Infertile (slugs)",
    hatched: "—",
    outcome: "infertile",
    notes: "Infertile clutch. No incubation attempted."
  }
];

/* ------------------------------------------------------------------
   Western hognose — Heterodon nasicus
   ------------------------------------------------------------------ */

const SNAKES = [
  {
    id: "HOG-01",
    name: "Sable",
    sex: "1.0",
    morph: "Sable Superconda het Albino",
    traits: "Superconda · het Albino",
    laid: "2026-05-04",
    hatched: "2026-06-29",
    acquired: "2026-08-22",
    notes: "Hatchling, still settling in. Pinkies at 1–2 g every four days; step up to 3–4 g once over 15 g.",
    weights: [
      ["2026-08-22", 7]
    ]
  },
  {
    id: "HOG-02",
    name: "Lavender",
    sex: "0.1",
    morph: "Lavender Superconda",
    traits: "Superconda",
    laid: "2025-03-28",
    hatched: "2025-05-27",
    acquired: "2026-08-16",
    notes: "Sixty-day incubation. Pinkies at 3–4 g every four days; step up once over 50 g. Target 250 g+ before any breeding.",
    weights: [
      ["2026-08-20", 30]
    ]
  }
];
