import MongoServer from "mongodb-memory-server";

import db from "../../src/config/db";

const dbServer = new MongoServer();

const initiateConnection = async () => db.connect(await dbServer.getUri());

const closeConnection = async () => await db.disconnect();

const stopServer = async () => await dbServer.stop();

export default {
  initiateConnection,
  closeConnection,
  stopServer
};
