import debug from "debug";
import pino from "pino";

export const logger = pino({ level: "debug" });

export default {
  dev: debug("bs-devlog:: "),
  prod: debug("bs-log:: ")
};
