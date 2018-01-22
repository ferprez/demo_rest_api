const express = require('express');
const router = express.Router();
const db = require('../models');
const path = require('path');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Demo Node JS MVC',
  });
});