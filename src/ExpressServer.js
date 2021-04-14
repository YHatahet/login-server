"use strict";

const http = require("http");
const express = require("express");
const expressSession = require("express-session");
const bp = require("body-parser");

const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(expressSession);
const mongoID = require("mongoid-js");

const router = require("./router/routes");

module.exports = class ExpressServer {
  constructor({ HTTP_PORT, REDIS_PORT, REDIS_HOST }) {
    this.HTTP_PORT = HTTP_PORT ? HTTP_PORT : 3000;
    this.REDIS_HOST = REDIS_HOST ? REDIS_HOST : "localhost";
    this.REDIS_PORT = REDIS_PORT ? REDIS_PORT : 6379;
    this.server;
    this.__init();
  }

  /**
   * ! FOR TESTING PURPOSES !
   *
   * Programmatically stops the express server instance from listening.
   * @returns {void} `undefined`
   */
  stop() {
    if (this.server instanceof http.Server) {
      console.log(`Closing server with port ${this.HTTP_PORT}`);
      this.server.close();
    }
  }

  /**
   * Initializes the express app with all the listeners and middleware
   * @returns {void} `undefined`
   */
  __init() {
    const app = express();
    app.use(
      expressSession({
        secret: mongoID(),
        saveUninitialized: true,
        resave: true,
        store: new redisStore({
          host: this.REDIS_HOST,
          port: this.REDIS_PORT,
          client: redisClient,
          ttl: 5 * 60,
        }),
      })
    );

    // ignore bodyParser deprecation warning; using the constructor alone is deprecated.
    // https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
    app.use(bp.json()); // looks at requests where the 'Content-Type: application/json' header is present
    app.use(bp.urlencoded({ extended: true })); //same but for URL-encoded requests. 'extended: true' says that 'req.body' object contains values of any type, not just strings.

    app.use(router);

    this.server = app.listen(this.HTTP_PORT, () => {
      console.log(`server running on port ${this.HTTP_PORT}`);
    });
  }
};
