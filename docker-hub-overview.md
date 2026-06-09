# docker-node-api

A minimal, production-ready **Node.js 22 + Fastify** REST API starter in a small, multi-stage Docker image. Use it as a clean foundation for building HTTP services without the boilerplate.

## Quick start

```bash
docker pull minhle202/node-api
docker run --rm -p 3000:3000 minhle202/node-api
```

```bash
curl http://localhost:3000/health
curl "http://localhost:3000/api/hello?name=Minh"
```

## Endpoints

- `GET /` — service info JSON (name, version, available endpoints).
- `GET /health` — health check returning `{ "status": "ok", "uptime": <seconds> }`.
- `GET /api/hello?name=` — greeting; `name` defaults to `world`.

## What's inside

- **Node.js 22** on the pinned `node:22-alpine` base — small footprint.
- **Fastify 5** as the only runtime dependency.
- **Multi-stage build**: prod dependencies installed via `npm ci --omit=dev`, then copied into a clean runtime layer.
- Runs as the **non-root `node`** user.
- Built-in **HEALTHCHECK** hitting `/health` using Node's native `fetch` (no curl/wget needed).
- **Graceful shutdown** on `SIGTERM` / `SIGINT`.
- Multi-arch: **linux/amd64** and **linux/arm64**.

## Configuration

| Env var     | Default      | Description                |
| ----------- | ------------ | -------------------------- |
| `PORT`      | `3000`       | Listen port                |
| `HOST`      | `0.0.0.0`    | Bind address               |
| `LOG_LEVEL` | `info`       | Fastify logger level       |
| `NODE_ENV`  | `production` | Set in the image           |

Override at runtime:

```bash
docker run --rm -p 8080:8080 -e PORT=8080 minhle202/node-api
```

## License

MIT © Lê Đức Minh
