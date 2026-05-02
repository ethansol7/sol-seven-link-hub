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
export const SOL_SEVEN_CONFIGURATOR_URL = 'https://ethansol7.github.io/SolSevenStudios/'
export const PLASTIVISTA_URL = 'https://ethansol7.github.io/plasti-vista-site/'
export const PERSONAL_PORTFOLIO_URL = 'https://www.ethansolodukhin.com/'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/ethan-solodukhin/'
export const STUDIO_INSTAGRAM_URL = 'https://www.instagram.com/solsevenstudios/'
export const PERSONAL_INSTAGRAM_URL = 'https://www.instagram.com/ethansolodukhin/'
```

`SOL_SEVEN_CONFIGURATOR_URL` is used by the top/header brand link and the Sol Seven Studios `Visit Studio` card button. `SOL_SEVEN_STUDIOS_URL` remains the Wix studio/shopping site used by the footer and shopping calls to action.

## Change SOL Lamp Buy Links

The lamp/product links are also constants in `src/App.jsx`:

```js
export const WIX_SHOP_URL = 'https://www.solsevenstudios.com/shop'
export const SOL_LAMP_BUY_URL = WIX_SHOP_URL
export const S01_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s01'
export const S02_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s02'
export const S03_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s03'
export const S04_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s04'
export const S01_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s01-shade'
export const S02_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s02-shade'
export const S03_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s03-shade'
export const S04_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s04-shade'
export const SOL_PLANTER_BUY_URL = 'https://www.solsevenstudios.com/product-page/s0l-planter'
export const SOL_COMBO_BUY_URL = 'https://www.solsevenstudios.com/product-page/s0-combo'
```

Each product card points to a Wix product page so visitors can use Wix checkout. The hero `Shop SOL Lamps` CTA points to the Wix shop overview.

## Change Discount Code

Edit this constant in `src/App.jsx`:

```js
export const DISCOUNT_CODE = 'ICFFSOL15%'
```

The post-submit success message uses this value automatically:

```text
You're on the list. Use code ICFFSOL15% for 10% off your first SOL Lamp.
```

## Google Sheets / CSV Lead Capture

The form is static-site safe. It does not use private keys, fake credentials, or a hidden backend.

Current behavior:

- Every valid submission is saved to the visitor browser with `localStorage`.
- Every valid submission is also posted to the Google Apps Script endpoint when `LEAD_CAPTURE_ENDPOINT` is filled in.
- The form exposes an `Export CSV` / `Download CSV` button when local entries exist.
- CSV filename: `sol-seven-launch-leads.csv`.
- CSV columns: `timestamp,name,email,phone,interest_type,message,source_page,campaign,submission_id,capture_mode,discount_code,target_sheet,form_name`.

This mirrors the PlastiVista static fallback style: spreadsheet-friendly browser backup plus optional live Google Sheets capture.

Live spreadsheet capture constants:

```js
export const LEAD_CAPTURE_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzbsyq90MK4_5MCOmCVn_YZ901hioj16a0EepEEnRvd5KqrFD07ATe-XkR81t4FaySE/exec'
export const LEAD_CAPTURE_SHEET_NAME = 'ICFF Contact List'
export const LEAD_CAPTURE_FORM_NAME = 'Sol Seven ICFF Link Hub'
```

The `/exec` URL is public client configuration for a static site, not a private key. Do not commit service-account keys or backend credentials.

The form sends this no-cors JSON payload to Apps Script and still keeps a local CSV backup in the visitor browser:

```js
{
  name,
  email,
  phone,
  interestType,
  message,
  sourcePage,
  campaign,
  submissionId,
  discountCode,
  sheetName: 'ICFF Contact List',
  targetSheet: 'ICFF Contact List',
  formName: 'Sol Seven ICFF Link Hub'
}
```

If the deployed Apps Script is still the original PlastiVista script with `const SHEET_NAME = "Waitlist";`, replace it with `google-apps-script/icff-contact-list.gs`, save, and deploy a new web app version. That script keeps PlastiVista submissions on `Waitlist` by default and routes this site to the `ICFF Contact List` tab when the payload includes `sheetName`.

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

SOL imagery and the Sol Seven mark are included under `public/assets`.

Stable product card images live in `public/assets/shop`:

- `s01.png`
- `s02.png`
- `s03.png`
- `s04.png`
- `s01-shade.png`
- `s02-shade.png`
- `s03-shade.png`
- `s04-shade.png`
- `s0l-planter.png`
- `s0l-combo.png`
- `s0l-stack.png`

The page uses these local files instead of hotlinking Wix images, so the lamp visuals stay constant even if the Wix CDN filenames change.
