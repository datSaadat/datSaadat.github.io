# Saquib — Academic portfolio

A six-page academic website for Nazmus Saadat As-Saquib. Plain HTML, CSS and JavaScript, ready for GitHub Pages. No build process or backend required.

## Preview and deploy

Open `index.html` directly, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000. Clipboard copying works best on localhost or HTTPS.

Push these files to a GitHub repository. Under Settings → Pages select **Deploy from a branch**, **main**, **/ (root)**. The site supports both a primary personal URL and project repository URLs through relative links. Review any existing repository before replacing its contents.

## Pages

- `index.html`: homepage restricted to the hero, topic strip, About and research-direction cards from the reference screenshots.
- `research.html`: expanded research directions and expandable details.
- `publications.html`: searchable publications, journal/conference filters, citation expansion and BibTeX copying.
- `journey.html`: dated research, teaching and leadership milestones.
- `gallery.html`: photographs with accessible modal enlargement.
- `contact.html`: email, LinkedIn, GitHub and CV links.

## Dynamic behavior

`script.js` supplies mobile navigation, publication search and filters, the photo viewer and a canvas neural background. Curved connections carry pulses between neuron-like nodes. Nearby nodes brighten on pointer movement. The decoration is illustrative, not a biological simulation. It pauses when the tab is hidden; the footer pause setting is remembered across pages. Reduced-motion preferences default to a static field. Pixel density and mobile node counts are capped to limit rendering cost. All substantive content is readable without JavaScript.

## Editing

Edit page text directly in the corresponding HTML file. Shared appearance is in `style.css`; shared behavior is in `script.js`; local photos are in `assets/`. Navigation and footer HTML are duplicated across six pages, so update all six when changing these shared links. Google Fonts is optional; local fallback fonts are specified. No trackers, keys, backend, or account system.

## Content provenance

Original biography, historical milestones, public links and photos came from https://sites.google.com/view/saadatsaquib. The owner supplied the update that Forward Target Propagation was published in Transactions on Machine Learning Research in October 2026. The publication label and BibTeX reflect this update, retaining https://arxiv.org/abs/2506.11030. No journal DOI, volume, or issue was invented. The existing public Drive CV link is retained.

## Validation

Checked local assets and cross-page anchor targets, one primary heading per page, exact homepage section selection, JavaScript syntax, mobile-menu and Escape logic, combined publication search/filter behavior, citation expansion, gallery controls, 300 animation frames, pause/resume and hidden-tab suspension. Interaction checks use a mocked DOM/canvas; visual browser rendering and native dialog focus behavior have not been verified in this environment.

Photos and personal content remain the property of their respective owners.
