# RoamBook

A responsive personal travel atlas with a passport-inspired design. Static HTML, CSS and JavaScript; no build step. GitHub Pages hosts the website. Firebase Authentication and Cloud Firestore power optional synced accounts.

## Current behavior

With `firebaseConfig = null`, the app opens a **clearly labeled demo** with fictional sample visits. Demo edits are stored unencrypted in `localStorage`; they are never silently uploaded to an account. Once Firebase is configured, the app starts signed out with an empty passport. Account data is stored at `/users/{uid}/visits/{visitId}`. The Firebase SDK manages credentials. Cloud records use memory caching, not persistent browser caching; sessions use browser-session persistence.

Features: world and US state maps; countries/territories, states, cities and parks; a curated starter city/park catalog plus custom entry; visited/wishlist/transit; dates, notes, trip labels, repeat visits; edit/delete; live country/state rollups; country passport stamps; journal filters; JSON export/import; email/password, Google sign-in, password reset; responsive layouts and reduced-motion support.

A visit implies its country and its explicitly selected US state. Wishlist/transit do not count. Deleting a record recalculates all totals. Multi-state parks count once by name/country, but only explicitly recorded states count. Parks never imply nearby cities. State totals exclude DC and Puerto Rico. Country totals include territories and are labeled accordingly. No claim is made to an exhaustive city/park catalog.

## Run locally

Serve this directory over HTTP (ES modules do not work by opening `index.html` directly):

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. From the repository root, the URL is http://localhost:8000/roambook/.

## Enable real synced accounts

1. Create a Firebase project on the free Spark plan. Register a Web app (Analytics optional and not used by this app).
2. Create a **Cloud Firestore Standard** database in production/locked mode. Choose its region carefully.
3. Publish the exact `firestore.rules` contents in Firestore > Rules **before** allowing users to sign in. All other paths remain denied. Test owner access and denial for unauthenticated and other users in the Rules simulator before launch.
4. Enable Email/Password in Authentication > Sign-in method. Enable Google if desired and configure its support email.
5. Add the actual hosting domain to Authentication > Settings > Authorized domains. For GitHub Pages this is `datsaadat.github.io`, without a path. Add localhost separately for development if needed.
6. Replace `null` in `config.js` with the Firebase Web app configuration. These web identifiers are public; never put service-account JSON, private keys, or admin credentials in this repository.
7. Deploy the static files, then test signup, verification email, password reset, Google login, two distinct accounts, add/edit/delete, and cross-device sync.

New accounts receive a verification email. Verification is not currently required to save visits. Passwords are handled only by Firebase Auth. The app uses email as the login identifier and a display name as the username; display names are not globally unique.

## GitHub Pages

The files are isolated under `roambook/`. Merging the feature branch into an existing Pages repository would expose `/roambook/` if that repository publishes the root; no existing homepage files are changed. Alternatively, copy the contents into a dedicated `roambook` repository and set Settings > Pages > Deploy from a branch > main / root. The included `.nojekyll` makes the folder portable to a new static repository.

## Backups and privacy

Export creates a **readable, unencrypted JSON file**. Import accepts only the supported schema, merges matching IDs, and never deletes unrelated records. Only import your own records. Cloud imports may partially finish if a network failure occurs; retrying the same file is idempotent for valid IDs. Maximum import size: 5 MB / 5,000 visits. No analytics, geolocation, photos, public profiles, or automatic social sharing is included. Google Fonts and the configured Firebase SDK load from external services; map data is bundled locally.

## Validation

`npm test` checks geographic rollups, deduplication, transit/wishlist exclusion, deletion semantics and input validation. `npm run check` checks JavaScript syntax. Live auth and Firestore rules require a real configured Firebase project; these cannot be verified by demo mode. Map rendering is an illustrative equirectangular SVG, with Alaska/Hawaii insets in US mode; the map includes click selection and center zoom. Add-place selectors provide the keyboard alternative.

## Assets and scope

World geometry: Natural Earth (public domain), distributed by https://github.com/datasets/geo-countries, simplified for display. Source license: https://www.naturalearthdata.com/about/terms-of-use/ . US state geometry: Natural Earth (public domain), https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_1_states_provinces.geojson. Map boundaries are illustrative and not a statement on sovereignty. Decorative travel art is original CSS/text/SVG. Typefaces: DM Sans and Libre Caslon Display via Google Fonts.

Future enhancements, not represented as completed: exhaustive park/city datasets, dated map timeline, downloadable yearly postcards, photos, offline cloud editing and end-to-end encryption. Trip names currently act as searchable journal labels.
