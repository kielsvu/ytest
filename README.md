# Young God Worldwide

Young God Worldwide is a small Next.js site for the organization and its members.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Member list

Member information is stored in `src/data/index.ts`.

Current organization:

- kiel — Founder
- day — Co-Founder
- keso — Core Operations
- yumi — Insider
- cass — Young God
- jake — Young God

Avatars can use files in `public/assets` or a Discord CDN image. If an avatar is left empty, the member card automatically shows the member's initial.

## Member cards

The member sections use a fluid two-column grid. Cards share the same width, stretch to the row height, and keep their alignment on phones, tablets, and desktop screens.

## Security

The site includes security headers in `next.config.ts` and a lightweight request limiter in `src/proxy.ts`.

The request limiter helps slow down repeated page requests from a single client. It is not a replacement for a provider-level DDoS/WAF service. For a public production deployment, keep the host's edge protection enabled and use its WAF/rate-limit controls as the main layer against large attacks.

## Deployment

The project is ready for a normal Next.js deployment. Build it with:

```bash
npm run build
```

Then start the production server with:

```bash
npm run start
```
