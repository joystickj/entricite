# Achroma — Cloudflare Workers edition

This package converts the original Express static server to a Cloudflare Worker with static assets. The original browser client scripts are retained unchanged.

## Deploy

1. Install Node.js 20 or newer.
2. In this folder, run `npm install`.
3. Run `npx wrangler login` and authorize your Cloudflare account.
4. Run `npm run deploy`.
5. Visit `https://achroma-browser.<your-subdomain>.workers.dev/browse` (Cloudflare prints your actual URL).

For local development, run `npm run dev`.

## Routes

- `/` redirects to `/browse`
- `/browse` serves the original browser UI (query string preserved by asset lookup)
- `/health` returns JSON health status
- `/controller/*`, `/corridor/*`, `/transport/*` serve the original client files

## Important limitations

- The client still connects to `wss://wisp.mercurywork.shop/`. This is a **third-party external WISP proxy** and is not hosted by this Worker. The browsing functionality requires it to remain available and compatible; it has not been end-to-end verified.
- The original ZIP does **not** include `corridor/corridor.wasm`. If the client needs a WASM file at runtime, provide the matching file separately.
- `Access-Control-Allow-Origin` preserves the original `https://userivet.net` restriction. Change `corsOrigin` in `src/index.js` if your intended cross-origin clients differ. Same-origin use on workers.dev does not require CORS.
- Service worker registration requires HTTPS (workers.dev provides this).
- This package does not deploy a WISP server or bypass upstream website restrictions.
