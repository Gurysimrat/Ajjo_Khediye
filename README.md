# Ajjo Khediye — ਅੱਜੋ ਖੇਡੀਏ

A living Punjabi storybook: a premium digital heritage playground for
Punjabi language and culture, built with Next.js, TypeScript, Tailwind
CSS v4, Framer Motion, and a Canvas-based interactive letter-catching
game.

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploying to Vercel

This project is ready to deploy with zero configuration.

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is
   easiest).
3. Click **Add New → Project**, select your repository, and click
   **Deploy**. Vercel auto-detects Next.js — no build settings needed.
4. Once deployed, you'll get a `*.vercel.app` URL.

### Connecting your existing domain (e.g. registered via Wix)

1. In the Vercel project dashboard, go to **Settings → Domains** and add
   your domain (e.g. `ajjokhediye.com`).
2. Vercel will show you DNS records to add (typically an `A` record for
   the root domain pointing to `76.76.21.21`, and a `CNAME` for `www`
   pointing to `cname.vercel-dns.com`).
3. In your Wix domain dashboard (Domains → your domain → DNS records),
   add/update those records to match what Vercel shows.
4. DNS propagation can take anywhere from a few minutes to ~48 hours.
   Vercel will show the domain as "Valid" once it's working.

## Project structure

See `app/`, `components/`, `lib/`, `state/`, and `data/` for the design
system, animation system, Zustand stores, and character/story/letter
data. Each character page is statically generated from
`data/characters.ts` (the official 19-character bible v2.0).

## Fonts

Fonts are self-hosted via `@fontsource` (Fredoka, Quicksand, Noto Sans
Gurmukhi Variable) to avoid Google Fonts network dependencies during
build.
