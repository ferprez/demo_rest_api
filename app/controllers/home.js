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

/**
 * Esta funcion devuelve articulos obtenidos desde la base de datos
 * @route GET /articles
 * @group articulos - Operacion para obtener lista de articulos
 * @returns {object} 200 - Lista de articulos
 * @returns {Error}  default - Unexpected error
 */
router.get('/articles', (req, res, next) => {
  db.Article.findAll().then((articles) => {
    res.json(articles);
  });
});