import debug from "debug";
import pino from "pino";

export const logger = pino({ level: "debug" });

export default {
  dev: debug("bs-devLog:: "),
  test: debug("bs-testLog:: "),
  prod: debug("bs-log:: ")
};
