"use strict";

require("dotenv").config();
const ExpressServer = require("./ExpressServer");

const runServer = () => {
  const expressApp = new ExpressServer({
    HTTP_PORT: process.env.HTTP_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  });
};

runServer();
