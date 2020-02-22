import chai from "chai";
import chaiHttp from "chai-http";

import server from "../../src";

chai.use(chaiHttp);

/**
 * Test chai get requests without authentication
 * @param {object} options request config
 * @param {string} options.description it description
 * @param {string} options.url request url
 * @param {function} options.callback callback handler
 * @returns {undefined}
 */
export const testGet = ({ description, url, callback }) => {
  it(description, done => {
    chai
      .request(server)
      .get(url)
      .end((err, res) => (err ? done(err) : callback(res, done)));
  });
};
