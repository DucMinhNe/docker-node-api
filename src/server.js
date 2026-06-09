import Fastify from 'fastify';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
});

// Service info
app.get('/', async () => ({
  service: 'docker-node-api',
  description: 'Minimal Node.js 22 + Fastify REST API starter',
  version: '1.0.0',
  endpoints: ['/', '/health', '/api/hello?name='],
}));

// Health check
app.get('/health', async () => ({
  status: 'ok',
  uptime: process.uptime(),
}));

// Greeting
app.get('/api/hello', async (request) => {
  const { name } = request.query;
  const who = typeof name === 'string' && name.trim() ? name.trim() : 'world';
  return { greeting: `Hello, ${who}!` };
});

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`Server listening on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (signal) => {
  app.log.info(`Received ${signal}, shutting down gracefully...`);
  try {
    await app.close();
    process.exit(0);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => shutdown(signal));
}

start();
