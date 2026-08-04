# Implementation Progress

Multi-phase build plan for comingofage2040_COMPLETE. Each phase produces a runnable increment. ALL DEVELOPMENT MUST CONFORM WITH THE RELATED LIBRARIES AND DATABASE SCHEMES. ALWAYS SEARCH FOR THE PROPER DOCUMENTATION OF LIBRARIES AND READ THEM TO MAKE SURE THE CODE CONFORMS TO WHAT THE LIBRARIES EXPECT.

---

## Phase 1: Merge the two repos into one SPA **COMPLETE**

### Frontend
- [x] Copy futurescape-whisper as project base (router shell already had `/`, `/experience`, `/privacy`, `*`)
- [x] Replace `src/pages/Index.tsx` with the comingofage2040 repo version (consent-gated experience)
- [x] Add `src/components/VoiceConsentModal.tsx` from comingofage2040 repo
- [x] Keep all visuals, copy, animations, assets byte-identical to the source repos
- [x] Verify internal links: landing CTA -> `/experience`, privacy links, external links (futurity.systems, EU Policy Lab, Futures Garden, Vimeo)

### Docs
- [x] Lynch protocol docs created (README, CLAUDE, TODO, PROGRESS, STYLEGUIDE, API, research/)
- [x] Open merge questions recorded in TODO.md

---

## Phase 2: Dockerize + verify **COMPLETE**

### Infra
- [x] Multi-stage Dockerfile: node:22-alpine `npm ci && npm run build` -> nginx:alpine
- [x] nginx.conf with SPA fallback (`try_files $uri $uri/ /index.html`) + immutable caching for `/assets/`
- [x] docker-compose.yml exposing host port `${PORT:-3040}`
- [x] `.dockerignore` (node_modules, dist, docs, .git)

### Verification (all against the built container)
- [x] `docker build` succeeds from clean context
- [x] `/`, `/experience`, `/privacy` return 200 with the SPA; unknown routes serve the NotFound page
- [x] Deep-link refresh works (nginx fallback), hashed assets cached
- [x] Browser test: landing renders, hover-expand info items, CTA navigates to experience, 4 persona tabs open, image hotspots hover, consent modal appears and gates the ElevenLabs widget, accepting mounts `<elevenlabs-convai>`
- [x] Details in [research/docker-deployment.md](research/docker-deployment.md)

---

## Phase 3: Server deployment (Debian trixie + Cloudflare tunnel) **NOT STARTED**

### Infra
- [ ] Copy folder to server, `docker compose up -d --build`
- [ ] Confirm port 3040 free (or set `PORT`)
- [ ] Add tunnel ingress rule hostname -> `http://localhost:3040`
- [ ] Smoke-test public URL: all 3 routes + a voice conversation end-to-end
- [ ] Resolve OPEN QUESTIONS in TODO.md (canonical /experience variant, OG images)
