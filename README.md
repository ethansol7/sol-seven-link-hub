# Sol Seven Link Hub

Premium GitHub Pages landing page and link hub for Ethan Solodukhin and Sol Seven Studios.

Live purpose: guide visitors toward buying SOL lamps, exploring the studio ecosystem, or submitting contact information for launch, wholesale, press, collaboration, ICFF follow-up, and custom order conversations.

## Local Development

```powershell
npm install
npm run dev
```

Build locally:

```powershell
npm run build
npm run preview
```

## Edit Major Links

Open `src/App.jsx` and edit the constants near the top:

```js
export const SOL_SEVEN_STUDIOS_URL = 'https://www.solsevenstudios.com/'
export const PLASTIVISTA_URL = 'https://ethansol7.github.io/plasti-vista-site/'
export const PERSONAL_PORTFOLIO_URL = 'https://www.ethansolodukhin.com/'
export const LINKEDIN_URL = 'PLACEHOLDER_LINKEDIN_URL'
export const INSTAGRAM_URL = 'PLACEHOLDER_INSTAGRAM_URL'
```

The placeholder social links are intentionally obvious. Replace them with the real LinkedIn and Instagram URLs before sharing those cards publicly.

## Change SOL Lamp Buy Links

The lamp/product links are also constants in `src/App.jsx`:

```js
export const SOL_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const S01_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const S02_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const S03_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const ORIGINAL_SOL_COLLECTION_URL = SOL_SEVEN_STUDIOS_URL
```

Right now unknown product links point to `https://www.solsevenstudios.com/`. Swap each constant for its exact product or checkout URL when those pages are ready.

## Change Discount Code

Edit this constant in `src/App.jsx`:

```js
export const DISCOUNT_CODE = 'ICFFSOL15%'
```

The post-submit success message uses this value automatically:

```text
You’re on the list. Use code ICFFSOL15% for 10% off your first SOL Lamp.
```

## CSV Lead Capture

The form is static-site safe. It does not use private keys, fake credentials, or a hidden backend.

Current behavior:

- Every valid submission is saved to the visitor browser with `localStorage`.
- The form exposes an `Export CSV` / `Download CSV` button when local entries exist.
- CSV filename: `sol-seven-launch-leads.csv`.
- CSV columns: `timestamp,name,email,phone,interest_type,message,source_page,campaign,submission_id,capture_mode,discount_code`.

This mirrors the PlastiVista static fallback style: local capture first, spreadsheet-friendly export, optional live endpoint later.

Optional live spreadsheet capture:

1. Create your own Google Sheet and Apps Script web app.
2. Keep the web app URL private until you are ready to publish it.
3. Paste the web app `/exec` URL into this constant:

```js
export const LEAD_CAPTURE_ENDPOINT = ''
```

When `LEAD_CAPTURE_ENDPOINT` is filled in, the site sends a no-cors JSON payload to that endpoint and still keeps a local CSV backup in the visitor browser. Do not commit private service-account keys or backend credentials into this repo.

## Deploy / Update GitHub Pages

This repo includes `.github/workflows/pages.yml`.

Recommended GitHub Pages settings:

1. Go to the repo on GitHub.
2. Open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`.
5. The workflow builds `dist` and deploys it to GitHub Pages.

Vite is configured with the project Pages base path:

```js
base: process.env.NODE_ENV === 'production' ? '/sol-seven-link-hub/' : '/'
```

Expected Pages URL:

```text
https://ethansol7.github.io/sol-seven-link-hub/
```

## Asset Notes

SOL imagery and the Sol Seven mark are included under `public/assets`. Replace those files with final studio/product assets whenever you want updated visuals without changing component code.
