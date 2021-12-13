const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv").config();
module.exports = (app) => {
  app.use(
    session({
      secret: "my secret",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: Date.now() + 3600 * 24 * 60 * 60 },
      store: MongoStore.create({
        mongoUrl: process.env.db,
        ttl: 3600 * 24 * 60 * 60,
      }),
    })
  );
};
