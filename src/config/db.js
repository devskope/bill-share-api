import mongoose from "mongoose";
import { prodEnv } from "../utils/helpers";
import log, { logger } from "../utils/logger";
import { errorMessages } from "../utils/log-messages";

const { dbConnection } = errorMessages;

const connectionErrors = {
  errCount: 0,
  initial(e) {
    if (prodEnv) {
      log.prod(dbConnection.initial);
      logger.error(dbConnection.initial, e);
    } else {
      log.dev(dbConnection.initial, e);
      process.exit(0);
    }
  },
  other(e) {
    connectionErrors.errCount += 1;
    if (connectionErrors.errCount > 1) {
      if (prodEnv) {
        log.prod(dbConnection.other);
        logger.error(dbConnection.other + "%O", {
          ...e,
          errorsSinceLastStart: connectionErrors.errCount
        });
      } else {
        log.dev(dbConnection.other + "%s", e);
      }
    }
  }
};

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(connectionErrors.initial);

export default { connection: mongoose.connection, connectionErrors };
