import express from "express";
import requestLogger from "express-pino-logger";

import log, { logger } from "./utils/logger";
import { infoMessages } from "./utils/log-messages";

const app = express();
const PORT = process.env.PORT;

app.use(requestLogger({ level: "info" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  log.prod(infoMessages.server.started, PORT);
  logger.info(infoMessages.server.started, PORT);
});
