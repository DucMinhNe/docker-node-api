# docker-node-api

A minimal, production-ready **Node.js 22 + Fastify** REST API starter, shipped as a small multi-stage Docker image.

## Pull

```bash
docker pull minhle202/node-api
```

## Run

```bash
docker run --rm -p 3000:3000 minhle202/node-api
```

Then:

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
curl "http://localhost:3000/api/hello?name=Minh"
```

## Endpoints

| Method | Path                 | Description                                   |
| ------ | -------------------- | --------------------------------------------- |
| GET    | `/`                  | Service info JSON (name, version, endpoints)  |
| GET    | `/health`            | Health check: `{ "status": "ok", "uptime" }`  |
| GET    | `/api/hello?name=`   | Greeting; `name` defaults to `world`          |

## What's inside

- **Node.js 22** on `node:22-alpine` (small, pinned base image).
- **Fastify 5** — the only runtime dependency.
- **Multi-stage build**: dependencies installed with `npm ci --omit=dev`, copied into a clean runtime stage.
- Runs as the **non-root `node` user**.
- Built-in **HEALTHCHECK** hitting `/health` (uses Node's native `fetch`, no extra tooling).
- **Graceful shutdown** on `SIGTERM` / `SIGINT`.
- Builds for **linux/amd64** and **linux/arm64**.

## Configuration

| Env var     | Default     | Description                          |
| ----------- | ----------- | ------------------------------------ |
| `PORT`      | `3000`      | Port the server listens on           |
| `HOST`      | `0.0.0.0`   | Bind address                         |
| `LOG_LEVEL` | `info`      | Fastify logger level                 |
| `NODE_ENV`  | `production`| Set in the image                     |

Override at runtime:

```bash
docker run --rm -p 8080:8080 -e PORT=8080 minhle202/node-api
```

## Develop locally

```bash
npm install
npm run dev      # auto-restart on changes
# or
npm start
```

## Build

```bash
docker buildx build --platform linux/amd64,linux/arm64 \
  -t minhle202/node-api:latest .
```

## Extend

- Add routes in `src/server.js`, or split them into Fastify plugins under `src/routes/` and register them.
- Add dependencies with `npm install <pkg>`; the multi-stage build picks them up automatically.
- Swap `node:22-alpine` for `node:22-slim` if you need glibc-based native modules.

## License

MIT © Lê Đức Minh
