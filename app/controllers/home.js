const express = require('express');
const router = express.Router();
const db = require('../models');
const path = require('path');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  db.Article.findAll().then((articles) => {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});


router.get('/articles', (req, res, next) => {
  db.Article.findAll().then((articles) => {
    res.json(articles);
  });
});