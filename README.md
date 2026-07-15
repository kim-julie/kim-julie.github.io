# Julie Sojin Kim — Academic Website

A modern, static academic website with an integrated, downloadable CV/résumé. No build step, no framework — plain HTML/CSS/JS, ready to publish on GitHub Pages (or any static host).

**Live structure**

| Page | Purpose |
|---|---|
| `index.html` | Home — research focus, current position, selected publications, education snapshot |
| `publications.html` | Full peer-reviewed publication list, working papers, invited talks |
| `cv.html` | Full CV in web form (education, awards, research experience, teaching, references) + PDF download |
| `contact.html` | Contact details and document links |
| `assets/cv/Julie_Sojin_Kim_CV.pdf` | Downloadable, print-ready CV |

## Design

- **Palette** — deep navy (`#16233F`), warm paper (`#F1EEE6`), ochre (`#B8862E`), deep teal (`#2B5F58`)
- **Type** — [Fraunces](https://fonts.google.com/specimen/Fraunces) for display headings, [Public Sans](https://fonts.google.com/specimen/Public+Sans) for body text, [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) for dates, labels, and data
- **Signature element** — the hero features a stylized declining-fertility-rate line chart, a nod to the site owner's published research (GBD 2021 fertility forecasting)

All three fonts load from Google Fonts via CDN `<link>` tags in each page's `<head>`.

## Running locally

No build tools required. Either:

```bash
# open directly
open index.html

# or serve locally (recommended, avoids any file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing with GitHub Pages

1. Push this repository to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save. Your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

A ready-to-use GitHub Actions workflow is also included at `.github/workflows/deploy.yml` if you'd rather deploy via Actions (Settings → Pages → Source → "GitHub Actions").

## Updating content

All content is plain HTML — open the relevant `.html` file and edit the text directly. There's no CMS or templating layer, so each page repeats its own header/nav/footer; when adding a new nav item, update it in all four HTML files.

### Regenerating the CV PDF

The downloadable PDF is built from `scripts/cv-print-source.html`, a print-optimized standalone page (Letter size, matching design tokens). To update it:

1. Edit `scripts/cv-print-source.html` (or update the CV content on `cv.html` and mirror the change here).
2. Run:
   ```bash
   ./scripts/build-cv-pdf.sh
   ```
   This requires [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html) (`brew install --cask wkhtmltopdf` on macOS, `apt-get install wkhtmltopdf` on Ubuntu).
3. Commit the regenerated `assets/cv/Julie_Sojin_Kim_CV.pdf`.

## File structure

```
.
├── index.html
├── publications.html
├── cv.html
├── contact.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── img/            (empty — add a headshot or figures here if desired)
│   └── cv/Julie_Sojin_Kim_CV.pdf
├── scripts/
│   ├── cv-print-source.html
│   └── build-cv-pdf.sh
├── .github/workflows/deploy.yml
└── LICENSE
```

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, and visible focus states throughout
- Respects `prefers-reduced-motion` (disables the hero chart's draw-in animation)
- Mobile nav collapses under 760px; all layouts tested down to 390px width
- No external JS dependencies — `assets/js/main.js` is vanilla and under 1KB
