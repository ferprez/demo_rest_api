

const express = require('express');
const config = require('./config/config');
const db = require('./app/models');

const app = express();

module.exports = require('./config/express')(app, config);

/**
 * Inicializa la BD con las configuraciones y sincroniza los modelos
 */
db.sequelize
  .sync()
  .then(() => {
    if (!module.parent) {
      app.listen(config.port, () => {
        console.log('Express server listening on port ' + config.port);
      });
    }
  }).catch((e) => {
    throw new Error(e);
  });

