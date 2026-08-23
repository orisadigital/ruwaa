# RUWAA Residence

Marketing site for RUWAA Residence, built with Next.js 16 (App Router) and
deployed to Cloudflare Workers via OpenNext.

Live: https://ruwaa.orisa.workers.dev

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying

Pushes to `main` are built and deployed by Cloudflare's git integration.

To deploy by hand:

```bash
npm run deploy
```

`npm run preview` builds and serves the Worker locally on `workerd`, which is
closer to production than `npm run dev`. Note that the preview keeps a lock on
`.open-next`, so stop it before deploying or the build fails with `EPERM`.

The Cloudflare config lives in `wrangler.jsonc` and `open-next.config.ts`. The
Worker name, the package name and the `WORKER_SELF_REFERENCE` binding must all
stay in agreement — a mismatch fails the deploy with error 10143.

## Assets

Source photos in `public/image` are downscaled to ~2000px; Next serves them
resized and re-encoded per breakpoint. The hero video is compressed to 1440px
H.264 with a poster frame. Keep camera originals outside the repo.

## Outstanding

- GT Ultra Median is licensed and not bundled; Fraunces stands in for headings
  (see `app/fonts/README.md`)
- Footer social, privacy and cookie links are placeholders
- No street address or email in the footer yet
