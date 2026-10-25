# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page bilingual (English / Arabic) marketing site for "Mavix Tech" (Marwan Ahmed) — Angular 20, standalone components, no router, no backend. See README.md for the owner-facing edit guide and deploy targets.

## Commands

- `npm start` — dev server at http://localhost:4200
- `npm run build` — production build → `dist/business-site/browser` (budgets: 500kB warn / 1MB error initial; 16kB warn / 32kB error per component style)
- `npm run watch` — dev build in watch mode
- `npm run test:ci` — Karma + Jasmine, headless single run (`npm test` = watch mode). Single file: `npx ng test --watch=false --browsers=ChromeHeadless --include src/app/sections/contact.component.spec.ts`. Schematics use `skipTests: true`, so write specs by hand next to the code.
- No lint script is configured. Formatting follows the Prettier config in package.json (printWidth 100, single quotes, Angular parser for HTML).
- `npm run build:gh` — GitHub Pages build (relative `--base-href ./`). Deployed by `.github/workflows/deploy.yml` on push to `main` (audit → tests → build → Pages).

## Architecture

- `src/app/app.ts` composes the whole page: navbar, then sections (hero, services, process, work, contact) inside `<main>`, plus a WhatsApp floating button. Navigation is via in-page anchors (`#services`, `#contact`, …), not Angular routing.
- `src/app/sections/` — one component per page section. Components use inline `template` and inline `styles` (no separate .html/.scss files); keep that style.
- `src/app/shared/` — reusable pieces:
  - `I18nService` — signal-based language state. `lang` signal, `t` computed dictionary, `isAr`. An effect sets `<html lang/dir>` and persists to `localStorage('lang')`; first visit defaults to Arabic if the browser language is Arabic.
  - `IconComponent` — inline SVG icon set selected by `name` via `@switch`; add new icons as new `@case` branches.
  - `RevealDirective` (`appReveal`, `[revealDelay]`) — adds `.reveal` / `.is-visible` via IntersectionObserver for scroll-in animations.
  - `LogoComponent` — animated brand logo.
- `src/app/data/` — all content lives here, not in templates:
  - `i18n.ts` — `EN` and `AR` dictionaries. `Dict = typeof EN` and `AR: Dict`, so **every key added to EN must also be added to AR** or the build fails. Components read text as `t = inject(I18nService).t` and use `t().section.key` in templates.
  - `site.config.ts` — `CONTACT` (WhatsApp number, email, socials, `formspreeId`), `WORK` portfolio items (bilingual `{ en, ar }` title/summary, category `systems | automation | graduation`, optional image under `public/work/`, optional `demo`/`repo` URLs rendered as card buttons), and `TECH`. Many values are still `TODO` placeholders.
- Contact form (`contact.component.ts`): trims/caps field lengths and drops submissions that fill the `_gotcha` honeypot. If `CONTACT.formspreeId` is empty it opens `wa.me` with the message pre-filled; otherwise it POSTs to `https://formspree.io/f/<id>`.

## Security rules

- The WhatsApp number (`CONTACT.whatsapp`) must only appear inside `wa.me` hrefs — never render it as text (tests assert this).
- Any URL from config/data bound to `[href]` goes through `isSafeUrl` (`src/app/shared/safe-url.ts`, https/mailto only). External links use `target="_blank" rel="noopener noreferrer"`.
- CSP is a `<meta>` tag in `src/index.html` (GitHub Pages can't set headers). New external origins (fonts, APIs, images, scripts) must be added there or they'll be blocked. No inline scripts; production `inlineCritical` CSS is disabled because it emits an inline `onload` handler.

## Styling & RTL

- Global design tokens (colors, fonts, radius, shadow) are CSS variables on `:root` in `src/styles.scss`; `[dir='rtl']` swaps `--display`/`--body` to IBM Plex Sans Arabic. Use the variables rather than hard-coded colors.
- Global utility classes there: `.container`, `.section`, `.eyebrow`, `.h2`, `.btn`, `.btn-primary`, etc.
- Layout must work in both LTR and RTL — prefer logical properties, and check Arabic rendering when changing layouts or letter-spacing.
- All animations must be disabled under `prefers-reduced-motion`.
- Fonts are loaded from Google Fonts in `src/index.html`, which also holds SEO/OG meta tags.
- Static assets live in `public/` (served at site root); brand files in `public/brand/`.
