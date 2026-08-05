# TODO - Future Features & Tasks

> Track pending features and tasks that are not part of the current phase roadmap.

For the reader, human or machine, know this: Memory is a beautiful, complex, amazing, and rather fragile thing. Don't stress yourself by overloading this precious gift from evolution with data that will not live on. Be true to yourself. All TODOs must absolutely completely quickly be added to this file.
Otherwise it will be forgotten during your sleep tonight, or during your next context compression.

Whenever visiting this page to look for info on how to perform a task, remember the mantra: "Every piece of code created must conform to the documentation and libraries we are using. Creating code without first looking at the libraries doc pages on their repos is stupid, and leads to spaghettification of code. Unacceptable and totally avoidable. Always read the docs! They usually are on the research/ folder."

---

## OPEN QUESTIONS from the repo merge (2026-08-04) -- need a human decision

- [ ] **[UI] Which /experience variant is canonical?** The two repos each contained a different `src/pages/Index.tsx`. This project uses the **comingofage2040 repo version** (the one deployed live as "the online version": ElevenLabs widgets gated behind the VoiceConsentModal). The discarded futurescape-whisper variant additionally had: a "Back to Main" button (top-left, links to `/#main`), a "Privacy Notice" link in the left-panel footer, and extra mobile-responsive classes (stacked layout under 720px) -- but NO consent gating. Decide whether to port any of those three extras into the current page. The discarded variant is still in the original repo at `futurescape-whisper/src/pages/Index.tsx`.
- [x] **[Infra] Confirm host port + tunnel hostname.** RESOLVED (2026-08-04) -- Live on **https://comingofage2040.com** (root domain), host port 3040, routed via the existing healthy Cloudflare tunnel on medusa. Details + gotchas in [research/docker-deployment.md](research/docker-deployment.md).
- [ ] **[Meta] Lovable leftovers kept as-is.** `og:image`/`twitter:image` in index.html still point to Lovable-hosted preview images, `twitter:site` is `@Lovable`, and the dev-only `lovable-tagger` package remains in devDependencies (only active in `npm run dev`, not in the Docker build). Replace/remove when you have a self-hosted OG image.
- [ ] **[Cleanup] Duplicate favicon files** (`favicon.ico`, `favicon.jpeg`, `favicon.png`) kept from the original repos; index.html only uses `favicon.png`.
- [ ] **[Cleanup] Unused deps.** The repos ship the full shadcn/ui kit + libs (react-query, recharts, zod, etc.) mostly unused by these pages. Left untouched to avoid behavior changes; prune later if build size matters (current gzipped JS ~150 kB, images are the heavy part).

## Pending

- [ ] **[Infra] Optional: healthcheck + logging.** Add a Docker `HEALTHCHECK` (e.g. `wget -qO- http://localhost/`) and log rotation if the server standard requires it.
- [ ] **[SEO] robots.txt / sitemap** were copied as-is from the repos; review before the new domain goes live.

---

## Done

- [x] **[Merge] Single app from 2 repos** DONE (2026-08-04) -- futurescape-whisper as base (routes `/`, `/privacy`, shell) + comingofage2040's `Index.tsx` + `VoiceConsentModal.tsx` as `/experience`. No visual changes. Verified: all routes, deep links, 404, tab hovers/clicks, image hotspots, consent modal flow, widget mount after consent.
- [x] **[Infra] Dockerized** DONE (2026-08-04) -- Multi-stage Dockerfile (node:22-alpine -> nginx:alpine), SPA fallback nginx.conf, docker-compose on port 3040. Tested with a real `docker build` + `docker run` + route/interaction checks against the container. See [research/docker-deployment.md](research/docker-deployment.md).
