# Cineverse

Cineverse is a production-style movie and series discovery web app built with Next.js, React, Tailwind CSS, Framer Motion and the TMDB API.

## Environment

Create `.env.local`:

```env
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
API_ACCESS_TOKEN=
```

Use the TMDB API Read Access Token in `API_ACCESS_TOKEN` when available. `TMDB_API_KEY` is kept as a fallback by the existing TMDB helper.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Included

- TMDB-powered trending, popular, top-rated, upcoming and now-playing sections
- Movie and series search
- Genre browsing
- Movie and TV detail pages
- Trailers, cast, screenshots and similar titles
- Device-persistent My List
- Dark / light mode
- Responsive mobile navigation
- Skeleton loading states
- Lightweight toast notifications for user actions
- Smooth motion with reduced-motion support
- Cineverse visual system based on the supplied brand artwork
