import mongoose from "mongoose";
import { nodeEnv } from "../utils/helpers";
import log, { logger } from "../utils/logger";
import { errorMessages } from "../utils/log-messages";

const { dbConnection } = errorMessages;

const connectionErrors = {
  errCount: 0,
  initial(e) {
    if (nodeEnv("production")) {
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
      if (nodeEnv("production")) {
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

export default {
  connect: url => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .catch(connectionErrors.initial);
  },
  connection: mongoose.connection,
  connectionErrors,
  disconnect: () => mongoose.disconnect()
};
