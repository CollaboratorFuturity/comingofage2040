# Docker Deployment -- comingofage2040_COMPLETE

**Status:** Image built and container-tested 2026-08-04 (routes, deep links, interactions verified in a real browser against the running container). Server deployment pending.

---

## Architecture

```
Internet ──> Cloudflare (DNS + TLS) ──> cloudflared tunnel (on Debian trixie server)
                                             │
                                             ▼
                                   http://localhost:3040   (host port, set via PORT env)
                                             │
                                             ▼
                              docker: comingofage2040 (nginx:alpine, port 80)
                                       └── /usr/share/nginx/html  (Vite build output)
```

One container, no volumes, no env secrets. The image is fully self-contained.

- **Build stage** `node:22-alpine`: `npm ci` + `npm run build` (Vite -> `dist/`)
- **Serve stage** `nginx:alpine`: `nginx.conf` with SPA fallback (`try_files $uri $uri/ /index.html`) so `/experience` and `/privacy` work on direct load/refresh, and immutable caching for hashed `/assets/`.

## Deploy on the server (Debian trixie)

```bash
# 1. Copy the comingofage2040_COMPLETE folder to the server (e.g. ~/repositories/)
# 2. From inside the folder:
sudo docker compose up -d --build
# Default host port 3040. To change: PORT=4123 sudo -E docker compose up -d --build

# 3. Check
curl -I http://localhost:3040/            # 200
curl -I http://localhost:3040/experience  # 200 (SPA fallback)
sudo docker logs comingofage2040
```

## Cloudflare tunnel

Add an ingress rule for the chosen hostname (config.yml example):

```yaml
ingress:
  - hostname: comingofage2040.YOURDOMAIN.com
    service: http://localhost:3040
  # ... existing rules ...
  - service: http_status:404
```

Then create the DNS route if new: `cloudflared tunnel route dns <TUNNEL> comingofage2040.YOURDOMAIN.com` and restart cloudflared. (If the tunnel is managed from the Zero Trust dashboard, add the public hostname there instead.)

No special WebSocket config is needed: Cloudflare proxies WebSockets by default, and the ElevenLabs voice session connects from the visitor's browser directly to ElevenLabs anyway (not through the tunnel).

## Update / rebuild

```bash
cd ~/repositories/comingofage2040_COMPLETE
sudo docker compose up -d --build   # rebuilds image, recreates container
sudo docker image prune -f          # optional: clean dangling layers
```

## Verification performed (2026-08-04, in the build sandbox)

- `docker build` from clean context: OK (npm ci + vite build inside the image)
- Container on port 3040: `/`, `/experience`, `/privacy` -> 200 serving the SPA; `/does-not-exist` -> SPA NotFound page; `/assets/*.js` -> 200 with `Cache-Control: public, max-age=31536000, immutable`
- Headless Chromium against the container: landing hero renders; info rows expand on hover; "EXPERIENCE THE ONLINE VERSION" navigates to `/experience`; all 4 persona tabs open; hotspot tooltips appear on image hover; "Start conversation" opens the consent modal; accepting mounts the `<elevenlabs-convai>` widget; privacy links work.

## Troubleshooting

| Symptom | Cause / fix |
|---------|-------------|
| 404 on /experience refresh | `nginx.conf` not copied into image or fallback removed. Rebuild; keep `try_files $uri $uri/ /index.html`. |
| Port already allocated | Another service on 3040. Set `PORT=xxxx` (compose maps `${PORT:-3040}:80`) and update the tunnel ingress. |
| Widget doesn't appear | It only mounts after consent (sessionStorage `fg_voice_consent`). Also requires internet access to unpkg + elevenlabs from the visitor's browser -- nothing server-side. |
| Mic doesn't work | Voice requires a secure context (HTTPS). Through the Cloudflare hostname it is HTTPS; plain `http://server-ip:3040` will block the mic -- that's expected. |
| Build fails on `npm ci` | Lockfile is `package-lock.json` (bun lockfiles are ignored via .dockerignore). Ensure Docker has network access during build. |
