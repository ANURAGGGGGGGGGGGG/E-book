# E‑Book Explorer

A modern, animated Next.js application for discovering and previewing books via Google Books. It features a polished UI with animated category chips, tilt cards, a custom Dock, and a paginated sessions page.

## Features
- Fast search across Google Books with clean, informative results
- Paginated sessions page (`/sessions`) showing 10 books per page with `Next`/`Previous`
- Animated category chips using `StarBorder` for delightful micro‑interactions
- Rich book detail page with preview, info, and buy actions
- Responsive, accessibility‑minded UI with crisp typography and imagery
- Subtle motion: SplitText titles, hover tilt cards, custom cursor, light ray FX

## Tech Stack
- `Next.js 15` (App Router) on `React 19`
- `Tailwind CSS v4` with `tw-animate-css`
- `GSAP` for micro‑animations
- `Lucide` icons

## Getting Started
1) Prerequisites
- Node.js `>= 18.18` (recommended `20.x LTS`)
- npm `>= 10`

2) Install dependencies
```bash
npm install
```

3) Run the dev server
```bash
npm run dev
```
Open `http://localhost:3000`.

4) Production build
```bash
npm run build
npm start
```

## Configuration
- No API key required. The app uses public Google Books endpoints.
- Tailwind is configured via `app/globals.css` (`@import "tailwindcss"`).
- Keyframe helpers for `StarBorder` live in `app/globals.css` (`animate-star-movement-top/bottom`).

## Project Structure
```
app/
  page.js              # Home: search, featured, categories
  book/[id]/page.js    # Book details and actions
  sessions/page.js     # Paginated listing (10 per page)
components/
  Dock.jsx, DockBar.jsx, ProfileCard.jsx, SplitText.jsx, Shuffle.jsx
  StarBorder.jsx, GlareHover.jsx, TargetCursor.jsx, LightRays.jsx
lib/
  googleBooks.js       # API helpers: search, getById, format
public/                # Assets and placeholders
```

## Data & API
Helpers in `lib/googleBooks.js`:
- `searchBooks(query, startIndex, maxResults)`
- `getBookById(id)`
- `formatBookData(raw)`

Pagination is handled by `startIndex` and `maxResults` and surfaced in `/sessions` with `?q=` and `?page=`.

## Key UI Components
- `StarBorder` (animated category chip)
```jsx
import StarBorder from '@/components/StarBorder';

<StarBorder as="button" className="w-full" color="cyan" speed="5s">
  <span className="font-semibold">Fiction</span>
</StarBorder>
```
Already included in `components/StarBorder.jsx`. To add from registry instead:
```bash
npx shadcn@latest add @react-bits/StarBorder-JS-TW
```

- `ProfileCard` (book tiles with tilt)
```jsx
<ProfileCard
  name={book.title}
  title={(book.authors||[]).join(', ')}
  coverUrl={book.thumbnail}
  onContactClick={() => { window.location.href = `/book/${book.id}`; }}
/>
```

- `Dock` / `DockBar` (quick navigation)
- `GlareHover`, `SplitText`, `Shuffle`, `TargetCursor`, `LightRays` for layered motion and polish

## Styling & Conventions
- Use Tailwind utility classes consistently; prefer semantic, short class lists
- Buttons follow a common shape: `rounded-[20px]`, borders, and subtle hover states
- Icons inherit color; avoid wrapping Lucide icons in gradient text clips (keeps them visible)
- Apply `cursor-target` to interactive elements for the custom cursor

## Accessibility
- Provide `alt` text for images and meaningful button labels
- Maintain focus visibility and keyboard navigability
- Use semantic landmarks in pages and descriptive headings

## Performance
- Prefer smaller `maxResults` and lazy image loading where possible
- Clamp long text (`line-clamp-*`) to maintain layout stability
- Cache repeated queries client‑side where it improves UX

## SEO
- Add page metadata (title/description) per route via Next.js metadata APIs
- Use descriptive headings and structured content for crawlers

## Testing
- Suggested: component tests for `ProfileCard` and utility tests for `formatBookData`
- Consider Playwright or Cypress for simple navigation and pagination checks

## Deployment
- Vercel is recommended for Next.js
- Set build command `npm run build` and output `.next`
- Ensure Node runtime ≥ 18.18 on your platform

## Troubleshooting
- Google Books rate limits: retry with backoff or narrow queries
- If animations don’t run, check reduced‑motion settings or ensure GSAP is loaded
- Tailwind v4 requires `@import "tailwindcss"` in `app/globals.css`

## Contributing
1) Fork and create a feature branch
2) Keep changes focused and documented
3) Open a PR with a clear summary and screenshots where relevant

## License
No license specified. Add one if you plan public distribution.

## Acknowledgements
- Google Books API
- Next.js, Tailwind CSS, GSAP, Lucide
