const fastify = require("fastify")({ logger: true });
// logger just gives us some extra info in console

fastify.register(require("./routes/items.route.js"));
const PORT = 5000;
const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (error) {
    console.log(error);
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
