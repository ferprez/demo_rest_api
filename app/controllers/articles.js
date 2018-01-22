const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require("path");

module.exports = app => {
  app.use("/", router);
};

/**
 * Esta funcion devuelve articulos obtenidos desde la base de datos
 * @route GET /articles
 * @group articulos
 * @returns {object} 200 - Lista de articulos
 * @returns {Error}  500 - internal server error
 */
router.get("/articles", (req, res, next) => {
  db.Article.findAll()
    .then(articles => {
      res.status(200).json(articles);
    })
    .catch(err => {
      res.status(500).json({ error: err });
      throw new Error(err);
    });
});

/**
 * Recurso para creacion de Articulo
 * @route POST /articles
 * @group articulos
 * @returns {object} 201 - Articulo
 * @returns {Error}  400 - Bad Request
 */
router.post("/articles", (req, res, next) => {
  return db.sequelize.transaction({ autocommit: false }, transaction => {
    return db.Article.create(req.body, { transaction })
      .then(article => {
        res.status(201).json(article);
      })
      .catch(err => {
        res.status(400).json({ error: err });
        throw new Error(err);
      });
  });
});

/**
 * Recurso para modificar un Articulo
 * @route PUT /articles
 * @group articulos
 * @returns {object} 201 - Articulo
 * @returns {Error}  400 - Bad Request
 */
router.put("/articles/:id", (req, res, next) => {
  return db.sequelize.transaction({ autocommit: false }, transaction => {
    return db.Article.find({ where: { id: req.params.id }}, { transaction })
      .then(article => {
        if(article){
          article.updateAttributes(req.body);
          res.status(201).json(article);
        } else {
          res.status(404).send();
        }
      })
      .catch(err => {
        res.status(400).json({ error: err });
        throw new Error(err);
      });
  });
});

/**
 * Recurso para eliminar un Articulo
 * @route DELETE /articles
 * @group articulos
 * @returns {object} 202 - accepted
 * @returns {Error}  400 - Bad Request
 */
router.delete("/articles/:id", (req, res, next) => {
  return db.sequelize.transaction({ autocommit: false }, transaction => {
    return db.Article.find({ where: { id: req.params.id }}, { transaction })
      .then(article => {
        if(article){
          console.log(article);
          article.destroy();
          res.status(202).send();
        } else {
          res.status(404).send();
        }
      })
      .catch(err => {
        res.status(400).json({ error: err });
        throw new Error(err);
      });
  });
});

