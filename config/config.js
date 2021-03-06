const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';
const defaultPort = 3000;

const config = {
  development: {
    root: rootPath,
    app: {
      name: "demo-rest-api"
    },
    port: process.env.PORT || defaultPort,
    db: "sqlite://localhost/demo-rest-api-development",
    storage: rootPath + "/data/demo-rest-api-development",
    secret: "estoessupersecreto"
  },

  test: {
    root: rootPath,
    app: {
      name: "demo-rest-api"
    },
    port: process.env.PORT || defaultPort,
    db: "sqlite://localhost/demo-rest-api-test",
    storage: rootPath + "/data/demo-rest-api-test"
  },

  production: {
    root: rootPath,
    app: {
      name: "demo-rest-api"
    },
    port: process.env.PORT || defaultPort,
    db: "sqlite://localhost/demo-rest-api-production",
    storage: rootPath + "/data/demo-rest-api-production",
    secret: 'estoessupersecretoparausarenproduccion'
  }
};

module.exports = config[env];
