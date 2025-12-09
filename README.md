# NewsSphere — News Management Platform

NewsSphere(News Management Platform) is a lightweight news reader built with Next.js (App Router) and TypeScript. It fetches curated news from the GNews API with a robust fallback to local mock data when the API key or quota isn't available. The UI includes categories, search, pagination, theme support and uses TanStack Query for data fetching and caching.

---

## Key features

- App Router (Next.js) + TypeScript
- TanStack Query for data fetching, caching and retries
- GNews API integration (configurable via env var) with graceful fallback to mock data
- Category browsing, search and paginated results
- Article detail pages, skeleton loaders and retry UI for errors
- Dark / light theme support via `next-themes`
- Tailwind CSS + Framer Motion for responsive, animated UI

---

## Quick start

Prerequisites

- Node.js 18+ (or a current LTS version)
- npm, pnpm or yarn

Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

Run locally (development)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Build and run production

```bash
npm run build
npm run start
```

Linting

```bash
npm run lint
```

---

## Environment variables

The project uses the GNews API for live news. Create a `.env.local` in the project root (this file should not be committed) and add your key like:

```env
NEXT_PUBLIC_GNEWS_API_KEY=your_gnews_api_key_here
```

If you don't provide a key (or the API returns 403 due to quota), the app falls back to a set of local mock articles so you can continue developing and browsing content.

Where to get an API key

- Official GNews API: https://gnews.io

---

## Project structure (important files)

- `app/` — Next.js app routes & pages
	- `app/page.tsx` — home route that mounts `HomeClient`
	- `app/[category]/page.tsx` — category pages
	- `app/article/page.tsx` — article detail page
- `src/app/lib/api.ts` — API helpers and fallback/mock behavior
- `src/app/lib/mock.ts` — bundled mock articles used when API is unavailable
- `src/hooks/useNews.ts` — TanStack Query hook that powers fetching/search/pagination
- `components/` — UI components: `ArticleCard`, `Navbar`, `Pagination`, `Skeletons`, etc.

---

## How it works and notable behavior

- Data fetching and caching are handled by TanStack Query; the `useNews` hook manages retry logic and cache timings.
- `fetchArticles` and `searchArticles` in `src/app/lib/api.ts` call the GNews endpoints. If the API responds with 403 (quota) the app switches to `mock.ts` data automatically.
- The app uses skeletons and retry UI to provide good feedback on loading / error states.

---

## Contributing

Thanks for taking an interest! A few tips:

1. Fork and create a branch for changes.
2. Keep UI/UX consistent; components are in `components/`.
3. Use TypeScript types in `src/app/lib/types.ts` or adapt `mock.ts` when adding mock data.
4. Run `npm run lint` before opening a PR.

If you want to add a new data provider (another news source), add a new helper in `src/app/lib/` and update the `useNews` hook to support switching.

---

## Deploying

This app deploys smoothly on Vercel. Just connect the repo and add the `NEXT_PUBLIC_GNEWS_API_KEY` variable in your project settings.

---

## License

MIT — feel free to reuse or adapt.

---


