import { expect } from "chai";

import { BASE_PATH } from "../src/routes";
import log from "../src/utils/logger";
import db from "./utils/db";
import { testGet } from "./utils/http-testers";

before(async () => await db.initiateConnection());

after(async () => await db.stopServer());

describe("test", () => {
  testGet({
    description: `it should fetch api BASE_PATH`,
    url: BASE_PATH,
    callback: ({ body, status }, done) => {
      expect(status).to.eq(200);
      expect(body, "body should be an object").to.be.an.instanceOf(Object);
      log.test(body);
      done();
    }
  });
});
