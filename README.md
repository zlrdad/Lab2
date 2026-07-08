# Scaling & Retaining Canada's Champions

An interactive research report on Ontario's capital markets, growth-company financing gaps, and policy options — why Canada builds world-class companies but struggles to scale and retain them, and what to do about it. **11 chapters, 2 interactive data tools, and 14 company case studies** (11 domestic champions plus 3 international comparators), covering the financing gap, the shrinking public markets, what other jurisdictions have done, and a costed set of policy recommendations.

## How to view

- **Live site:** [zlrdad.github.io/Lab2](https://zlrdad.github.io/Lab2/) *(goes live once GitHub Pages is enabled — see Maintainers' notes)*
- **Locally:** open `index.html` in any modern browser and use the top nav. No build step, no server required — the whole report (including both interactive dashboards) works from `file://`. It runs with JavaScript disabled too: every figure, chart and table is legible statically; JS only adds animation and interactivity on top. Zero external scripts are loaded (the one exception is a Google Fonts stylesheet).

## Data & attribution

Statistics from the **World Federation of Exchanges (WFE)** are used throughout the exchanges chapters and the Global Exchanges Explorer, credited inline where required (look for the "Source: WFE" marks). Other data draws on **TMX**, **Bloomberg**, the **OECD**, **Statistics Canada**, the **IMF**, and additional government, academic and institutional sources — each figure carries a source pill (tap or click it) linking to its full provenance and confidence grade, with the complete source register on the [Methodology](methodology.html#register) page.

## Disclaimer

This is a research report prepared for policy analysis. It is not investment advice, legal advice, or an offer of any kind. Figures are point-in-time and are labelled with their as-at date; private-company valuations are last-priced or press-reported. See the Methodology page for data vintages and confidence grades.

© 2026 — research report. _[Author name to be added]_

---

## Maintainers' notes

The notes below document the report's design system and build conventions for anyone editing or extending the site. They are not required reading to view the report.

### The design system

The report is built in the **Mission Control** design system (Deep-Indigo base × Azure master accent, monochrome-plus-one-accent, open composition — card-less, text/numerals/inline-SVG charts sit directly on the background). The single source of truth is the vault page **`Planning/Report Design System — Mission Control.md`** and its reference implementation **`Dashboards/Report Flagship Demo v3 — Open Composition.html`**. `styles.css` and `app.js` in this folder extract that system so every page shares one token set, one component library and one behaviour script. A **Poster OSC** light register lives under `html[data-theme="light"]`; the top-bar toggle switches it (in-page only, no `localStorage`).

### Per-page accent assignment (one colour per page, §4)

Declare on `<body>`: `<body data-accent="…">`. One hook re-points the master accent for the whole page.

| data-accent | Colour | Page zone | Pages |
|---|---|---|---|
| `azure`  | Azure `#4da3ff`         | **Report spine** (master) | `index`, `growth-prize`, `strengths`, `public-markets`, `recommendations`, `methodology`, `exchanges` |
| `violet` | Electric Violet `#7c83ff` | Comparators / international | `what-works`, `comparators`, `global-exchanges` |
| `cyan`   | Ice Cyan `#6fd3ff`       | Sectors / champions        | `growth-sectors`, `champions` |
| `orange` | Signal Orange `#ffb454`  | Value leakage / risk       | `financing-gap` |

Signal Orange is also the reserved **leakage-strip** zone within any page: wrap a section in `id="leak"` (or `class="leak-zone"`) and it claims orange locally regardless of the page accent (see the growth-prize page's "What's at stake" strip).

### Shell conventions for page authors

- **Nav include pattern (13 pages, coherence pass July 8 2026).** There is no server-side include; the topbar block is copied into each page's `<body>` (relative hrefs so it works from `file://`). The **brand is the home affordance** — `<a class="tb-l brand" href="index.html">…Canada's Champions…</a>`, identical and shortened on every page (the old per-page `· section` suffix was dropped to make room for the wider nav). The nav is now **13 links in two visually grouped clusters**: the **11 report-narrative links in canonical arc order** — Overview · Prize · Strengths · Sectors · Markets · Gap · Abroad · Compare · Champions · Recs · Method — followed by a thin vertical divider (`<span class="tb-div">`), a small mono "Data" group label (`<span class="tb-grouplab">`), then the 2 interactive-dashboard links — Exchanges · Global. Labels are **slim** (abbreviated for width; the abbreviated ones carry a `title` attribute with the full name) and the `.topbar .links a` padding was tightened so all 13 fit ~1280px. All 13 pages ship the identical block; only `class="on"` differs. Include the `#themeToggle` button. The nav still hides entirely below 760px per the existing `@media` rule.
  ```html
  <span class="links">
    <a href="index.html">Overview</a>
    <a href="growth-prize.html">Prize</a>
    <a href="strengths.html">Strengths</a>
    <a href="growth-sectors.html">Sectors</a>
    <a href="public-markets.html" title="Public Markets">Markets</a>
    <a href="financing-gap.html" title="The Financing Gap">Gap</a>
    <a href="what-works.html" title="What Works Abroad">Abroad</a>
    <a href="comparators.html" title="The Comparators">Compare</a>
    <a href="champions.html">Champions</a>
    <a href="recommendations.html" title="Recommendations">Recs</a>
    <a href="methodology.html" title="Methodology &amp; Sources">Method</a>
    <span class="tb-div" aria-hidden="true"></span>
    <span class="tb-grouplab">Data</span>
    <a href="exchanges.html" title="The Exchanges — interactive">Exchanges</a>
    <a href="global-exchanges.html" title="Global Exchanges Explorer">Global</a>
  </span>
  ```
  Mark whichever link matches the current page with `class="on"` (dashboards included). **Case pages (`cases/*.html`) keep their own compact two-link topbar** (Overview + The Champions/What Works, no `.on`) — they are not part of the 13-link chapter nav.
- **The report arc (canonical reading order).** Overview → **The Prize** (`growth-prize`) → **The Strengths** (`strengths`) → **The Sectors** (`growth-sectors`) → **Public Markets** (`public-markets`) → **The Financing Gap** (`financing-gap`) → **What Works Abroad** (`what-works`) → **The Comparators** (`comparators`) → **The Champions** (`champions` + `cases/`) → **The Recommendations** (`recommendations`) → **Methodology**. Every page's outro (`.nextlist`) hands **primarily to the next chapter** in this order (with 1–2 secondary/back links); the Overview tiles list the full chapter set + the two data tools. `exchanges` / `global-exchanges` are data tools, reachable from the nav "Data" group and the Overview tiles.
- **Source surface (QC pass July 8 2026 — sources off the page).** The **source pill + drawer is THE source surface**, backed by the full static register on `methodology.html#register`. No page carries visible `.srcline` one-liners, footer source lists, or source-naming captions any more. Each `.provpill` is a real `<a href="methodology.html#register">` (`../methodology.html#register` from `cases/`) that JS upgrades into the drawer; with JS off it jumps to the register (the canonical no-JS target). Footers are `.ft-h` + one `.ft-src` pointer line + `.footid`. **Sole exception:** a WFE-derived chart keeps one minimal visible `Source: WFE` credit (contractual) — `public-markets` velocity, `growth-prize` IPO chart, and `global-exchanges` (`.wfeattr`). `methodology.html` keeps its full `.srcreg` register (with `id="register"`); the rich per-figure provenance lives in each page's `window.PROV` drawer data.
- **Declare `data-accent`** on `<body>` per the table above (default is azure if omitted).
- **Provenance (`window.PROV`).** Each page that uses source pills defines, in a `<script>` **before** `app.js`, a `window.PROV` object mapping `data-prov` key → `{ t:"title", meta:"HTML", conf:"high|medium|soft" }`. Every `.provpill` is authored as a real `<a href="#sources">…</a>` so it degrades to a jump to the footer Sources block with JS off; `app.js` upgrades it into a drawer trigger only when a `PROV` entry exists. Include the shared drawer markup (`#scrim`, `#drawer` with `#drawerX` + `#drawerBody`) once per page, before the PROV/app.js scripts.
- **Inline-SVG chart rule (§5).** Every chart is **build-time inline SVG** with pre-computed coordinates and **every colour a `var(--…)` token** (never a literal hex in the SVG) — that is what lets the theme/accent switchers reskin charts automatically. No runtime chart library. Wrap each SVG in `.svgwrap` with `role="img"` + a prose `aria-label` stating the headline numbers.
- **Chart-colour policy (spec §5.5a, v2.8 — added July 7 2026).** One-accent-plus-flat-grey charts read too bland, so: the **subject** series gets a **gradient** (subject bar = a horizontal `<linearGradient>` `var(--accent-deep)`→`var(--accent)`; area-under-a-line = a vertical `var(--accent)` .30→0 fade) with the `.subj-glow` shadow; **ordered ranked bars** use the `.ramp-1…6` accent-intensity classes in rank order (not flat grey); **named comparators** the reader must read use the family data palette (`--pg-spine/comp/sector/leak`, `--sx-*`, semantic tokens) with dash patterns retained; grey (`--steel`/`--dim`) is reserved for genuine de-emphasised backdrop only. Every gradient stop is a `var()` token so it rethemes on the base/accent/Poster-OSC switch; give each gradient a **unique per-chart id**. The two JS dashboards inject their subject gradient into `<defs>` at build time and ramp non-subject bars via a stepped-opacity accent fill.
- **Zero-external-scripts rule.** No external `<script>` tags. The only permitted external asset is the Google Fonts `<link>`. (Chart.js is permitted **only** for a genuinely-interactive, verified-rendering widget per spec §5.2 — not the default; prefer inline SVG.)
- **Static-first contract.** Every figure, table and narrative line must be legible with JavaScript disabled and open cleanly from `file://`. All `app.js` features are enhancement-only, each wrapped in its own `try/catch`; `prefers-reduced-motion` is respected; no `localStorage`.
- **Count-ups.** Give a numeral `data-count` (+ optional `data-dec`, `data-prefix`, `data-suffix`) and it animates on reveal; put the final value as the element's text so it reads with JS off. `#issuerNum` / `#leakNum` have dedicated runners. (The old hardcoded `#sigNum` C$210B runner was removed July 7 2026 — no page uses that id; the growth-prize hero numeral is a generic `.fig-n[data-count]`.)
- **Shared list/label components (promoted July 6–7, 2026 QA pass).** Two component families that recurred across pages have been promoted into `styles.css` proper (chart-annotation / list-components area) — page authors should use these directly rather than re-declaring them in a scoped `<style>`:
  - **`.hbar-lab` / `.hbar-val`** (+ `.subj` modifier) — the label/value text classes for inline-SVG ranked-bar charts. One definition serves every page; `.subj` marks the bar the page argues from.
  - **`.evlist` / `.evrow`** (+ optional `.evrow .es` sub-label and `.evrow .el` italic "lesson" line) — the two-column hairline evidence row. The shared rule sets a sensible default `grid-template-columns`/`gap`; a page may override just those two properties in its own scoped block if its label column genuinely needs a different width (that's a tuned instance, not a duplicate — don't re-declare the whole selector).
  - **`.ramp-1…6` / `.rampL-1…4` / `.subj-glow` / `.subj-glow-strong`** (added July 7 2026, chart-colour policy v2.8) — the accent intensity-ramp classes for ranked-bar comparators (`.ramp-*` = page accent at stepped opacity; `.rampL-*` = Signal-Orange for leak zones, with light-register opacity bumps so paper bars stay legible) and the subject-bar drop-shadow glows. Use these on `<rect>`s directly; the gradient `<linearGradient>` defs themselves live per-SVG (SVG requires the def in-document) but their stops are `var()` tokens — see the convention block at the top of the chart-utilities section in `styles.css`.
  - Only promote a component when **identical rules appear on 3+ pages**; page-specific components (`.board3`, `.roster`/`.costudy`, `.cmpgrid`, `.lvrlist`/`.xwlist`, `.laylist`/`.grdlist`/`.cvlist`, etc.) stay scoped where they live.

### Pages

1. **Overview** (`index.html`) — the cover + tiles to every chapter and data tool
2. **The Growth Prize** (`growth-prize.html`) — the opening content chapter: the GDP-per-capita slide (71.4% of the US), the headline gap, the sticky IPO scene, the VC/GDP bullet, the leakage strip
3. **The Strengths** (`strengths.html`) — what Ontario has to work with: talent, clean low-cost power, the university base, the Maple-8 capital pool
4. **The Sectors** (`growth-sectors.html`) — nine growth sectors through the OEA lens; the housing-vs-IP investment mix (2.76×) + an interactive per-sector explorer
5. **Public Markets** (`public-markets.html`) — the three-board divergence (TSX / TSXV / CSE), turnover velocity, the IPO drought, the missing middle
6. **The Financing Gap** (`financing-gap.html`) — VC/GDP gap, the scale-up stage, domestic-vs-foreign capital
7. **What Works Abroad** (`what-works.html`) — comparator tile-grid + the program toolkit + the four comparator-highlight charts (§04b), which tease →
8. **The Comparators** (`comparators.html`) — the full interactive explorer: Canada vs 14 economies across seven dimensions
9. **The Champions** (`champions.html` + `cases/`) — a 15-company highlighted roster by outcome (with 14 click-through case pages) + the four patterns
10. **The Recommendations** (`recommendations.html`) — the four levers
11. **Methodology & Sources** (`methodology.html`) — data layers, confidence grades, caveats (incl. the VC/GDP dual-basis + velocity-basis rulings) + the full static source register (`#register`)

Plus two interactive dashboard pages, reachable from the nav's "Data" group and from two extra tiles on the Overview page:

12. **The Exchanges** (`exchanges.html`) — an interactive TSX / TSXV / CSE board switcher: live KPI row + sector-distribution chart per board, plus a TSX operating-vs-investment-products toggle that exposes the "71% of the senior board is funds" story. Baked dashboard data in `window.EXDATA`; the build-time SVG renders the TSX-operating view with JS off.
13. **Global Exchanges Explorer** (`global-exchanges.html`) — an interactive World Federation of Exchanges comparator: pick an indicator (IPO listings, market cap, value traded, etc.) and toggle up to six of 20 exchanges on a shared line chart, 2010–2025. Baked dashboard data in `window.WFE`; the build-time SVG renders the "IPO drought" preset (TMX vs Korea, Hong Kong, Nasdaq-US) with JS off.

### Migration status

All **13 top-level pages** (plus the 14 `cases/` pages) are on the shared Mission Control shell (`styles.css` + `app.js`). The July 8 2026 **holistic coherence pass** wired the three later-built pages (`strengths`, `growth-sectors`, `comparators`) into the shared 13-link nav, enforced the report arc through every outro, moved all sources off the page into the pill drawers + the Methodology register, re-tallied the champions roster to 15 (adding Waabi, 1Password, Clearpath + a Nortel cautionary link, which also made those four case pages reachable from the hub), and reconciled cross-page figures. The legacy compatibility block was removed from `styles.css` in the July 6–7 2026 QA pass.

| Page | Shell | Accent | Notes |
|---|---|---|---|
| `index.html` | ✅ migrated | azure | Re-skinned exemplar; `.navgrid` now carries 12 tiles (10 chapters + 2 dashboards) |
| `growth-prize.html` | ✅ migrated | azure | Ported from the v3 flagship demo; the second exemplar |
| `strengths.html` | ✅ coherence pass (Jul 8) | azure | Chapter 2 — the endowment; wired into the 13-link nav + arc outro |
| `growth-sectors.html` | ✅ coherence pass (Jul 8) | cyan | Chapter 3 — OEA interactive per-sector explorer; `#secSrc` source element hidden (sources off page) |
| `comparators.html` | ✅ coherence pass (Jul 8) | violet | Chapter 7 — interactive 14-economy explorer; what-works §04b now teases → here |
| `public-markets.html` | ✅ migrated (Jul 6, 2026) | azure | Chart.js replaced with inline SVG; `.board3` board-comparison component |
| `financing-gap.html` | ✅ migrated (Jul 6, 2026) | orange | Chart.js replaced with inline SVG; introduced the `.evlist`/`.evrow` evidence-row pattern (now shared, see below) |
| `champions.html` | ✅ migrated (Jul 6, 2026) | cyan | `.roster`/`.costudy` company rows carry the reserved stayed/left/acquired/failed semantic code |
| `what-works.html` | ✅ migrated (Jul 6, 2026) | violet | D3/topojson map replaced with a build-time inline-SVG comparator tile grid (`.cmpgrid`) — zero external scripts |
| `recommendations.html` | ✅ migrated (Jul 6, 2026) | azure | `.lvrlist`/`.xwlist` hairline rows replace the old nested card grids |
| `methodology.html` | ✅ migrated (Jul 6, 2026) | azure | `.laylist`/`.grdlist`/`.cvlist` hairline rows + the full static `.srcreg` source register |
| `exchanges.html` | ✅ migrated (Jul 7, 2026 QA pass) | azure | New interactive dashboard; `.bswitch`/`.bchip`/`.kpirow` page-scoped components; wired into the shared 10-link nav in the QA pass |
| `global-exchanges.html` | ✅ migrated (Jul 7, 2026 QA pass) | violet | New interactive dashboard; `.picker`/`.indbtn`/`.exchip`/`.serieskey` page-scoped components; wired into the shared 10-link nav in the QA pass |

All 13 pass the cross-page QA gate: zero external `<script>` tags (Google Fonts `<link>` only), a `data-accent` declared on every `<body>`, the identical 13-link grouped topbar with the correct `.on` per page, a `window.PROV` ↔ `data-prov` bijection per page, every SVG/scoped-style colour resolved through a `var(--…)` token (no literal hex), and every `.provpill` degrading (JS off) to the `methodology.html#register` register. **Known open item, deliberately left:** the two `.tag-new` "NEW — for review" chips (the whole `comparators.html` page + the `what-works.html` §04b section) remain until Carlo verdicts them.

### Publication note

`Champions-Report.html` in this folder (the 108KB single-file version) is **SUPERSEDED** by this multi-page shell — **do not edit it**. It is excluded from the repo via `.gitignore` (kept only as a local provenance artifact; it contains stale figures and the old Chart.js/D3 CDN dependencies, and must not be published).

A research synthesis / proof-of-concept, not a published report. Figures are point-in-time (TSX/TSXV May 2026; CSE end-2025; OECD VC/GDP 2024) and graded by confidence on the Methodology page; private-company valuations are last-priced/press-reported.
