# API Reference

**This app has no backend of its own.** It is a static SPA served by nginx; every dynamic capability comes from third-party services called directly from the browser. This file documents those external touchpoints so changes stay conscious and traceable.

---

## Overview

**Current Status:** 0 own endpoints. 4 external service integrations.

| Service | What | Where in code |
|---------|------|---------------|
| ElevenLabs ConvAI | Voice agent widget (script + realtime voice/WebRTC to ElevenLabs) | script tag in `index.html`; `<elevenlabs-convai agent-id=...>` injected in `src/pages/Index.tsx` |
| Google Fonts | Inter font | `@import` in `index.html` |
| unpkg CDN | `@elevenlabs/convai-widget-embed` script | `index.html` |
| Vimeo | "Action" tab video link (opens new tab) | `src/components/MainSection.tsx` |

---

## ElevenLabs agents

The experience page mounts one widget per persona (IDs are public client-side identifiers):

| Persona | agent-id |
|---------|----------|
| Zane   | `uHlKfBtzRYokBFLcCOjq` |
| Rowan  | `agent_01jvs5f45jepab76tr81m51gdx` |
| Nova   | `agent_1701k5bgdzmte5f9q518mge3jsf0` |
| Cypher | `agent_01jvwd88bdeeftgh3kxrx1k4sk` |

**Consent requirement:** widgets must only mount after `VoiceConsentModal` consent (`sessionStorage.fg_voice_consent === "granted"`). This is a GDPR/biometric-data measure -- do not bypass.

---

## Routes served by nginx (not an API, but the contract with the tunnel)

| Method | Path | Result |
|--------|------|--------|
| `GET` | `/` | SPA -> landing |
| `GET` | `/experience` | SPA -> interactive experience |
| `GET` | `/privacy` | SPA -> privacy notice |
| `GET` | `/assets/*` | Hashed build assets, `Cache-Control: immutable` |
| `GET` | anything else | SPA -> NotFound page (HTTP 200, client-side 404) |

---

## Future Endpoints (Planned)

None planned. If a backend ever becomes necessary, follow the research pipeline in [research/RESEARCH.md](research/RESEARCH.md) first.

---

**Last Updated:** 2026-08-04
