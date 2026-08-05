# Docker Deployment -- comingofage2040_COMPLETE

**Status:** DEPLOYED 2026-08-04. Live at https://comingofage2040.com via the Debian server ("medusa") + Cloudflare tunnel. All three routes verified over the public URL.

---

## Architecture

```
Internet ──> Cloudflare (DNS + TLS, comingofage2040.com) ──> cloudflared tunnel (Debian server "medusa")
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

## Cloudflare tunnel (AS DEPLOYED, 2026-08-04)

The server's tunnel is **remotely managed** (token-based systemd service; `cloudflared tunnel run --token ...`), shared with the other sites on medusa (ceciliatham.com, mcp.futurity.science, ...). Config lives in the Cloudflare Zero Trust dashboard, NOT in a local config.yml — do not try `cloudflared tunnel list`/`route dns` on the server, the CLI has no origin cert for this tunnel.

Final working configuration:

1. **Route** (Zero Trust → Networks → Tunnels → the HEALTHY medusa tunnel → "Published application routes" / public hostnames): hostname `comingofage2040.com` → service `HTTP` → `localhost:3040`. Plain HTTP, not HTTPS -- the container speaks HTTP on 3040.
2. **DNS** (dashboard → comingofage2040.com → DNS → Records): `@` CNAME → `<HEALTHY_TUNNEL_ID>.cfargotunnel.com`, Proxied.

Gotcha that cost time on first deploy: the Cloudflare "add an application" wizard creates a **brand-new tunnel** (which stays INACTIVE unless you install its connector) and points DNS at it → Cloudflare error 530/1033 even though everything looks "saved without errors". The fix is to add the route on the **existing healthy tunnel** and make sure the `@` CNAME targets that tunnel's ID, then delete the wizard's orphan tunnel. Diagnostic tell for 1033: `sudo journalctl -u cloudflared` on the server shows NO requests for the hostname at all.

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
