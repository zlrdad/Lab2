# Case-study register — conventions (`cases/`)

The per-company deep-dive pages that hang off the roster on `../champions.html`. They descend directly from Carlo's two favourite pages — `Dashboards/Waabi — Company Deep Dive POC.html` and `Dashboards/Xanadu — Company Deep Dive POC.html` — re-expressed inside the **Mission Control** shared shell (`../styles.css` + `../app.js`). This file is the pattern a follow-up author replicates to build the remaining 9 pages **without re-deriving anything**.

Built so far (the exemplar five): `shopify.html` (stayed), `constellation.html` (stayed), `nortel.html` (failed), `tenstorrent.html` (left), `element-ai.html` (acquired). One page per outcome — the four reserved status colours are all exercised, so the follow-up author has a live model of each.

---

## 1. What a case page is

A **compact chapter** on one company — a faithful compression of that company's vault case study (`Themes/Case Studies/…`), *not* the vault page verbatim. Rule: **figures exact, no new claims.** Every number and date is lifted from the vault study; nothing is invented, re-computed, or sourced from outside the study. Aim for ~4 screens: hero → capital journey → defining moment → policy lens → replicability verdict → compact sources footer.

## 2. Fixed section order (the template)

1. **Compact topbar** (variant — see §5). `<div class="prog" id="prog">` first inside `<body>`.
2. **`#hero`** — inside `.wrap`:
   - `.boot` with a `data-boot` string (app.js types it),
   - `.cat` eyebrow: `◇ Case study · [Status] · [sector]`,
   - `h1` = **company name**,
   - **`.statusbadge`** = the semantic status word (dot + label, coloured `var(--sc)`),
   - **`.hero-verdict`** = the one-line verdict,
   - **`.casefig`** = the signature figure (`.n` numeral + `.cap` + `.l`),
   - `.srcline` + a `.provpill[data-prov="scale"]`,
   - `.scrollcue`.
3. **§01 The capital journey** (`.band`) — the funding/□ history as a **`.captl` timeline** (structured list, §4). `.provpill[data-prov="journey"]`.
4. **§02 The defining moment** (`.band alt tight`) — a **`.moment`** block (headline `.mt` + `.mw` narrative + `.ms` "why it mattered"). `.provpill[data-prov="moment"]`.
5. **§03 The policy lens** (`.band alt`) — *what lever would have changed the outcome* (or, for the stays, which retention factor is a replicable lever). Use the shared **`.evlist`/`.evrow`** (factor → lever), then a shared **`.nextlist`/`.nextrow`** link to **`../recommendations.html`** naming the relevant lever(s). No provpill here (analytic + cross-linked).
6. **§04 Replicability verdict** (`.band`, `.wrap.narrow`) — a **`.vbox`** (status badge `.vb` + `.vh` headline + `.vd` read), a `.pull` quote, `.srcline` + `.provpill[data-prov="verdict"]`, and a closing `.nextlist` (back to `../champions.html` + the thematic **sibling** case page).
7. **`footer#sources`** (compact) + the shared drawer markup + `window.PROV` + `<script src="../app.js">`.

## 3. Per-company accent rule

Company pages **may** carry a per-company accent (like the POCs) — this is where the case register is allowed to diverge from the one-accent-per-zone site rule. Two ways:

- **Preferred — reuse a shell family** via `<body data-accent="azure|cyan|violet|orange">`. Fully theme-tested in both registers; no extra CSS. Assignments in the built five: **Shopify → azure**, **Constellation → cyan**, **Tenstorrent → violet**, **Element AI → orange** (orange = the leakage zone — thematically apt for the acquired/leaked case).
- **Bespoke** — for a hue outside the four families, keep `data-accent` off the four names and override the accent tokens in the page's scoped block, supplying **both** registers (the shell threads everything through these four tokens). **Nortel** demonstrates it (a muted steel-blue "fallen-giant" hue):
  ```css
  body[data-accent="nortel"]{--accent:#7d94c4;--accent-rgb:125,148,196;--accent-deep:#3a4f7d;--accent-txt:#8fa3ce}
  html[data-theme="light"] body[data-accent="nortel"]{--accent-txt:#33507f;--accent-deep:#33507f}
  ```
  Set `--accent`, `--accent-rgb`, `--accent-deep`, `--accent-txt` for dark and `--accent-txt` (+ `--accent-deep`) for light. That is all the shell needs.

The accent drives kickers, the timeline spine, hero/timeline numerals and source pills. **The semantic status colour is separate** (§4) and drives the verdict elements only.

## 4. The reserved semantic status code (verdict elements)

Fixed in the scoped block, identical on every case page **regardless of accent** — this is the reserved *case-studies-only* code (teal/orange/violet/red, per the design spec and the POCs):

```css
body{--st-stay:#2fe6cd;--st-left:#ffb454;--st-acq:#9d8bff;--st-fail:#ff5d6c}
html[data-theme="light"] body{--st-stay:#0e8a79;--st-left:#8f5400;--st-acq:#5b3fd0;--st-fail:#c62839}
body.v-stay{--sc:var(--st-stay)} body.v-left{--sc:var(--st-left)}
body.v-acq{--sc:var(--st-acq)} body.v-fail{--sc:var(--st-fail)}
```

Set one status class on `<body>` — `v-stay` / `v-left` / `v-acq` / `v-fail` — and `--sc` (status colour) flows to the hero `.statusbadge`, the timeline **terminal/outcome node** (`.capitem.term`), and the verdict `.vbox`. Mapping used: **stayed → v-stay** (Shopify, Constellation), **left / US-redomicile → v-left** (Tenstorrent), **acquired → v-acq** (Element AI), **failed → v-fail** (Nortel). ("Acquired" and "failed" are distinct: an outright acquisition that leaks value is `v-acq`; a company that went bankrupt / was dismantled is `v-fail`.)

## 5. Nav (compact topbar variant)

**Not** the full 10-link site topbar — a compact two-destination variant:

```html
<div class="topbar">
  <span class="tb-l brand"><span class="dot"></span><a class="back" href="../champions.html">← The Champions</a> · <b>Company</b></span>
  <span class="tb-r">
    <span class="links">
      <a href="../index.html">Overview</a>
      <a href="../champions.html">The Champions</a>
    </span>
    <button …#themeToggle…>  <!-- copy the icon markup verbatim from any shell page -->
  </span>
</div>
```

The `.back` link sits in the **left cluster** (which never hides), so there is always a route back to the roster even below 760px where `.links` is hidden. Company name in `<b>` renders in the page accent. Include `#themeToggle`.

## 6. Relative paths, provenance, length

- **Relative paths:** `../styles.css`, `../app.js`, `../champions.html`, `../index.html`, `../recommendations.html`, sibling `./other.html`. Everything opens from `file://`.
- **PROV:** exactly **four** entries per page — `scale`, `journey`, `moment`, `verdict` — in a `window.PROV` `<script>` **before** `../app.js`. Each `.provpill` is a real `<a href="#sources" data-prov="…">` (degrades to a footer jump with JS off); app.js upgrades it to the drawer only when the key exists. Keep a strict **bijection**: four pills ↔ four keys, no orphans either way. Every `meta` cites **the vault study's own sources** (the links/reports already in that case study) — with a `conf` grade (`high|medium|soft`).
- **Static-first / tokens-only:** no external `<script>`, no literal hex anywhere except the four reserved status tokens in §4. Both themes must read cleanly (test the toggle). No `localStorage`.
- **Length discipline:** compress hard. Keep the capital journey to ~4–6 timeline nodes (fold minor rounds into a note); one defining moment; 3–4 policy-lens rows; a tight verdict. This is a chapter, not the vault page.

## 7. Scoped-style duplication (promotion deferred)

All five pages carry an **identical scoped `<style>` block** (the case-register components: `.statusbadge`, `.casefig`, `.captl`/`.capitem`, `.moment`, `.vbox`, the status tokens, `.back`). It is duplicated verbatim rather than promoted into `../styles.css` — **do not edit `styles.css`.** Once the full set of ~14 exists, promotion of this block into `styles.css` (component area) can be decided in a QA pass; until then, copy the block verbatim into each new page (only the Nortel-style bespoke-accent line, and the `data-accent` / `v-*` body attributes, differ per page).

## 8. Wiring the roster

`../champions.html` links a roster entry to its case page by wrapping the company name in `<a class="colink" href="cases/xxx.html">` and appending a `<span class="cscue">case study →</span>` affordance (both defined in a small scoped addition to that page's existing `<style>`). Only entries with a built page are linked; the rest stay plain text until their page exists.

---

## §Additions (July 8, 2026) — the case-study layer completed (9 pages)

Nine pages added, bringing the register to 14 (`shopify` · `constellation` · `nortel` · `tenstorrent` · `element-ai` + the nine below). Built strictly to §§1–8: scoped block copied verbatim from an exemplar (only the `data-accent` / `v-*` attributes — and, for the internationals, the one new `--st-comp` token — differ per page); four PROV entries (`scale`/`journey`/`moment`/`verdict`) each; figures exact to the vault study.

**Domestic (6)** — from `Themes/Case Studies/`:

| Page | Accent | Status | Verdict sibling |
|---|---|---|---|
| `cohere.html` | cyan | `v-stay` (stayed, foreign-funded caveat in the verdict) | → `waabi` |
| `waabi.html` | violet | `v-stay` | → `clearpath` (robotics mirror) |
| `xanadu.html` | azure | `v-stay` | → `tenstorrent` (deep-tech mirror) |
| `1password.html` | cyan | `v-stay` | → `magnet-forensics` |
| `clearpath.html` | orange | `v-acq` | → `element-ai` |
| `magnet-forensics.html` | orange | `v-acq` (take-private) | → `1password` |

Orange (= the leakage zone) is used for the two acquired domestic pages, consistent with Element AI. `v-stay` is used for Cohere/Waabi/Xanadu/1Password — all genuinely retained — with the foreign-capital / no-domestic-anchor caveat carried in the hero status label and the verdict prose rather than a separate colour.

**International comparators (3)** — from `Themes/International Case Studies/`:

| Page | Accent | Status | Policy-lens framing |
|---|---|---|---|
| `mistral.html` | violet | `v-comp` | France's sovereign-AI mobilisation (the Cohere mirror) |
| `canva.html` | cyan | `v-comp` | Australia's private secondaries + the seed desert |
| `spotify.html` | azure | `v-comp` | Sweden's direct listing + founder flywheel |

### The `v-comp` "comparator" status (new — §4 extension)
The international pages are comparators, not champions, so none of the four reserved semantic statuses (stay/left/acq/fail) applies. Per §4's mechanism, a **fifth, neutral `v-comp`** status is added — a muted slate that reads as informational, clearly distinct from the four semantic hues. It is defined **only on the three international pages** (the six domestic pages keep the §4 block byte-for-byte), by extending the two token lines and adding one class:

```css
body{--st-stay:#2fe6cd;--st-left:#ffb454;--st-acq:#9d8bff;--st-fail:#ff5d6c;--st-comp:#93a4c4}
html[data-theme="light"] body{--st-stay:#0e8a79;--st-left:#8f5400;--st-acq:#5b3fd0;--st-fail:#c62839;--st-comp:#4f5d78}
body.v-comp{--sc:var(--st-comp)}
```

`--sc` then flows to the hero `.statusbadge` (label `Comparator · [country]`), the timeline terminal node and the verdict `.vb` exactly as the four semantic statuses do. Section 04 on the internationals is retitled **"Transferability verdict"** (vs. "Replicability verdict"), and their nav/verdict `nextlist`s route to **`../what-works.html`** and **`../recommendations.html`** rather than the champions roster. The three interlink in a cycle (Mistral → Spotify → Canva → Mistral). *If the block is ever promoted to `styles.css` (§7), fold `--st-comp` + `v-comp` in at the same time.*

### Roster & what-works wiring
- **`../champions.html`:** the affordance (§8) was added to the **three** built pages that already have roster rows — **Cohere, Xanadu, Magnet Forensics**. **Waabi, 1Password and Clearpath are not in the curated twelve-champion roster** (whose count is hard-wired into the 01b outcome-split stacked bar, its caption and aria-label), so no rows were added — that would desync a hand-built chart. All three are instead reachable via sibling links: Cohere → Waabi → Clearpath, and Magnet → 1Password. *Open item for the W3 holistic pass: decide whether to expand the highlighted roster (and re-tally the 01b chart) so these three get their own rows.*
- **`../what-works.html`:** a light `.wwcase` affordance (small scoped addition to that page's `<style>`) was added to the three demand-side toolkit rows at the natural jurisdiction mentions — **France → Mistral, Sweden → Spotify, Australia → Canva**. The page was not otherwise restructured.
