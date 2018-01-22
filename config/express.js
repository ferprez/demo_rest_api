const express = require('express');
const glob = require('glob');
const YAML = require('yamljs');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const exphbs  = require('express-handlebars');

const passport = require('passport');
const hookJWTStrategy = require('./passport');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');


module.exports = (app, config) => {
  const env = process.env.NODE_ENV || "development";
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == "development";

  app.engine(
    "handlebars",
    exphbs({
      layoutsDir: config.root + "/app/views/layouts/",
      defaultLayout: "main",
      partialsDir: [config.root + "/app/views/partials/"]
    })
  );
  app.set("views", config.root + "/app/views");
  app.set("view engine", "handlebars");

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + "/public"));
  app.use(methodOverride());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  hookJWTStrategy(passport);

  var controllers = glob.sync(config.root + "/app/controllers/*.js");
  controllers.forEach(controller => {
    require(controller)(app, passport);
  });

  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  /**
   * Middleware para manejo de error
   */
  if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err,
        title: "error"
      });
    });
  } else {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({ message: err.message, error: {}, title: "error" });
    });
  }

  return app;
};;
