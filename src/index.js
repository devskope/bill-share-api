import express from "express";
import requestLogger from "express-pino-logger";

import db from "./config/db";
import ignoreFavicon from "./middlewares/ignore-favicon";
import routes from "./routes";
import log, { logger } from "./utils/logger";
import { infoMessages } from "./utils/log-messages";
import { nodeEnv } from "./utils/helpers";

const app = express();
const PORT = process.env.PORT;

const initNotify = setInterval(
  () => log.prod(infoMessages.server.starting),
  900
);

app.use(ignoreFavicon);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger({ level: "info" }));

routes(app);

if (!nodeEnv("test")) {
  db.connect(process.env.DB_URL);
}

db.connection.once("open", () => {
  log.prod(infoMessages.db.connected);

  clearInterval(initNotify);

  app.listen(PORT, () => {
    log.prod(infoMessages.server.started, PORT);
    logger.info(infoMessages.server.started, PORT);
  });
});

db.connection.on("error", db.connectionErrors.other);

export default app;
