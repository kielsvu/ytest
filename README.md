# Young God Worldwide

A dark, minimal Young God Worldwide member site built with Next.js.

## Organization

The member cards use custom organization roles instead of generic MVP or Hall of Fame tiers.

- kiel — Founder
- day — Co-Founder
- keso — Core Operations
- yumi — Insider
- cass — Young God
- jake — Young God

Members are ordered by organizational role, while the cards remain in a two-column responsive grid.

## Development

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain so link previews use the correct canonical URL.

## RevShit card

The inspiration / thanks card can be edited from `src/data/index.ts` without changing the component.

```ts
export const revshitThanks = {
  label: 'inspiration / thanks',
  name: 'RevShit',
  description: 'respect to the people who inspired the culture.',
  href: 'https://www.helloxorev.com/',
  imageSrc: 'https://www.helloxorev.com/logo.png',
}
```

Change `name`, `label`, `description`, `href`, or `imageSrc` there. For a local image, put the file in `public/assets/` and use a path such as `/assets/revshit.png` for `imageSrc`.

## Site protection

The site includes lightweight protections that are safe for Vercel:

- Security response headers for content type, framing, referrer handling, permissions, and cross-origin isolation.
- Best-effort per-IP request limiting for dynamic requests. Static assets and Next image optimization are excluded so normal pages and previews keep working.
- Non-GET/HEAD/OPTIONS requests are rejected because the public site does not need them.
- A `robots.txt` route asks compliant crawlers not to crawl the site.
- The OG image and public assets remain reachable so Discord, social platforms, and browsers can load link previews normally.

These measures reduce casual scraping and abusive request bursts, but no browser-delivered website can make public content impossible to inspect or copy. For stronger traffic protection in production, use Vercel's edge/WAF controls in addition to the application-level protections here.
