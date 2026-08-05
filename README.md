# comingofage2040_COMPLETE
ss
Single self-hosted web app for Coming of Age 20/40: the landing/info site (formerly the `futurescape-whisper` repo) and the interactive experience (formerly the `comingofage2040` repo) merged into one React SPA, served by nginx inside one Docker container.

## Tech Stack

| Layer       | Technology                                              |
| ----------- | ------------------------------------------------------- |
| Frontend    | React 18 + TypeScript + Vite 5 (SWC), react-router-dom 6 |
| UI          | Tailwind CSS + shadcn/ui (Radix), framer-motion         |
| Voice AI    | ElevenLabs ConvAI widget (CDN script, 4 agents), gated by a session consent modal |
| Backend     | None (static SPA, external services only)               |
| Deploy      | Docker: node:22-alpine build stage -> nginx:alpine, single container, host port 3040 -> Cloudflare tunnel |

## Routes

| Route         | Page                       | Origin repo          |
| ------------- | -------------------------- | -------------------- |
| `/`           | Landing (hero + info tabs + CTA + privacy link) | futurescape-whisper |
| `/experience` | Interactive experience: 4 persona tabs, hoverable hotspot images, consent-gated ElevenLabs widgets | comingofage2040 |
| `/privacy`    | Privacy notice             | futurescape-whisper  |
| `*`           | NotFound (404 page)        | shared               |

## Project Structure

```
comingofage2040_COMPLETE/
├── Dockerfile                # node build stage -> nginx:alpine
├── nginx.conf                # SPA fallback (try_files -> index.html), asset caching
├── docker-compose.yml        # host port ${PORT:-3040} -> container 80
├── index.html                # loads /src/main.tsx + ElevenLabs widget script
├── src/
│   ├── App.tsx               # Router: / , /experience , /privacy , * (404)
│   ├── pages/
│   │   ├── HomePage.tsx      # Landing: LandingSection + MainSection
│   │   ├── Index.tsx         # The experience (from comingofage2040 repo, consent-gated)
│   │   ├── PrivacyNotice.tsx
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── LandingSection.tsx, MainSection.tsx, AnimatedNumbersBackground.tsx
│   │   ├── HoverableImage.tsx, ScenarioCard.tsx, VoiceConsentModal.tsx
│   │   └── ui/               # shadcn/ui library
│   ├── data/rotatingMessages.json
│   └── assets/               # persona images, hero, orb, logo svg
├── docs/
│   ├── API.md                # External endpoints reference (no own backend)
│   ├── TODO.md               # Pending tasks & OPEN QUESTIONS from the merge
│   ├── PROGRESS.md           # Implementation progress checklist
│   ├── STYLEGUIDE.md         # Visual design cheatsheet
│   └── research/             # Research guides + docker deployment doc
└── public/                   # favicons, robots.txt
```

## Architecture Notes

- **Merge decision**: base is `futurescape-whisper` (it already owned the routing shell and the `/`, `/privacy` pages). `src/pages/Index.tsx` and `src/components/VoiceConsentModal.tsx` were taken from the `comingofage2040` repo, because that is the version deployed as "the online version" (consent-gated widgets). The whisper repo's own older `Index.tsx` variant was replaced; see docs/TODO.md for the differences.
- **Navigation**: landing CTA sets `window.location.href = "/experience"` (full reload, was a cross-app link before; now same app). All other navigation is react-router `Link`/`navigate`.
- **SPA serving**: nginx `try_files $uri $uri/ /index.html` so deep links (`/experience`, `/privacy`) work on refresh and via the tunnel.
- **Consent gating**: `VoiceConsentModal` stores `fg_voice_consent` in `sessionStorage`; widgets only mount after consent. The ElevenLabs embed script is loaded in `index.html` from unpkg CDN.
- **No backend**: everything static. External calls: ElevenLabs (widget + realtime voice), Google Fonts (Inter), unpkg CDN, Vimeo (Action tab link).

## Build & Deploy (Debian + Cloudflare tunnel)

```bash
# On the server
docker compose up -d --build       # serves on localhost:3040
# or: docker build -t comingofage2040 . && docker run -d --restart unless-stopped -p 3040:80 comingofage2040
```

Then point the Cloudflare tunnel ingress for your hostname at `http://localhost:3040`. Full steps: [docs/research/docker-deployment.md](docs/research/docker-deployment.md).

Local development (no Docker): `npm i && npm run dev` (Vite, port 8080).

## Development Progress

See [docs/PROGRESS.md](docs/PROGRESS.md).

**Current status**:
- ✅ **Phase 1 complete** -- Repos merged, all routes/links verified
- ✅ **Phase 2 complete** -- Dockerized (nginx) and tested end to end
- ⏳ **Open questions** for the team live in [docs/TODO.md](docs/TODO.md)

## Documentation

All documentation starts on this README and lives in .md files for robustness. Your memory WILL fail, and AI WILL compress and forget certain stuff. That is why every step from research, architecture, structure, installation, development and deployment must absolutely live in the DOCS.

Before coding, read this and all documents. New library/package? Check docs/research/. New feature? Update PROGRESS.md and flag any open items to the user. Setup or deployment changes? Create or update a -deployment.md file in docs/research/. API change? Update API.md. UI changes? Follow STYLEGUIDE.md patterns.

- [API.md](docs/API.md) -- External endpoint reference (this app has no backend of its own)
- [STYLEGUIDE.md](docs/STYLEGUIDE.md) -- Colors, typography, component patterns
- [PROGRESS.md](docs/PROGRESS.md) -- What's built, what's next
- [TODO.md](docs/TODO.md) -- Future features and pending tasks. All TODOs must be added here always, no questions asked.
- [Package Research Guide](docs/research/RESEARCH.md) -- Index of research, analysis & deployment docs

### After deploying a feature, update docs in this order:

1. **README.md** -- Tech Stack, Project Structure, Architecture Notes, Development Progress
2. **[PROGRESS.md](docs/PROGRESS.md)** -- Check off completed items
3. **[TODO.md](docs/TODO.md)** -- when finding TODOs already completed
4. **[API.md](docs/API.md)** -- If endpoints were added, changed, or removed
5. **[docs/research/RESEARCH.md](docs/research/RESEARCH.md)** -- If new analysis or deployment docs were created
6. **Relevant deployment doc** in docs/research/ -- Update status, known issues

PS: Remember the mantra: "Every piece of code created must conform to the documentation and libraries we are using. Creating code without first looking at the libraries doc pages on their repos is super risky, and leads to spaghettification of code. Unacceptable and totally avoidable. Always read the docs!"
