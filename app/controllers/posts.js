const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require("path");
const fetch = require("node-fetch");
const constants = require('../util/constants');

const resourceEndPoint = `${constants.api_url}/posts`;
const headers = { "Content-type": "application/json; charset=UTF-8" };

module.exports = app => {
  app.use("/", router);
};

/**
 * Esta funcion devuelve la lista de posts
 * @route GET /posts
 * @group posts - Operacion para obtener lista de posts
 * @returns {object} 200 - Lista de articulos
 * @returns {Error}  502 - bad gateway
 */
router.get("/posts", (req, res, next) => {
  fetch(`${resourceEndPoint}`)
    .then(response => response.json())
    .then(json => res.json(json))
    .catch((error) => res.status(502).json({ error }));
});

/**
 * Esta funcion devuelve un post especifico filtrado por id
 * @route GET /posts/{id}
 * @group posts - Operacion para obtener post filtrado por id
 * @param {number} id.path.required - id
 * @returns {object} 200 - post
 * @returns {Error}  502 - bad gateway
 */
router.get("/posts/:id", (req, res, next) => {
  fetch(`${resourceEndPoint}/${req.params.id}`)
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(error => res.status(502).json({ error }));
});

/**
 * Esta funcion crea un post
 * @route POST /posts
 * @group posts - Operacion para creacion de post
 * @returns {object} 201 - {}
 * @returns {Error}  502 - bad gateway
 */
router.post("/posts", (req, res, next) => {
  console.log(req.body);
  fetch(`${resourceEndPoint}`, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers
  })
    .then(response => response.json())
    .then(json => res.status(201).json(json))
    .catch(error => res.status(502).json({ error }));
});

/**
 * Esta funcion modifica un post
 * @route PUT /posts/{id}
 * @group posts - Operacion para modificar un post
 * @param {number} id.path.required - id
 * @returns {object} 201 - {}
 * @returns {Error}  502 - bad gateway
 */
router.put("/posts/:id", (req, res, next) => {
  fetch(`${resourceEndPoint}/${req.params.id}`, {
    method: "PUT",
    body: JSON.stringify(req.body),
    headers
  })
    .then(response => response.json())
    .then(json => res.status(201).json(json))
    .catch(error => res.status(502).json({ error }));
});

/**
 * Esta funcion modifica un atributos especificos de un post
 * @route PUT /posts/{id}
 * @group posts - Operacion para modificar un post
 * @param {number} id.path.required - id
 * @returns {object} 201 - {}
 * @returns {Error}  502 - bad gateway
 */
router.patch("/posts/:id", (req, res, next) => {
  fetch(`${resourceEndPoint}/${req.params.id}`, {
    method: "PATCH",
    body: JSON.stringify(req.body),
    headers
  })
    .then(response => response.json())
    .then(json => res.status(201).json(json))
    .catch(error => res.status(502).json({ error }));
});

/**
 * Esta funcion borra un post
 * @route DELETE /posts/{id}
 * @group posts - Operacion para borrar un post
 * @param {number} id.path.required - id
 * @returns {object} 201 - {}
 * @returns {Error}  502 - bad gateway
 */
router.delete("/posts/:id", (req, res, next) => {
  fetch(`${resourceEndPoint}/${req.params.id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(json => res.status(201).json(json))
    .catch(error => res.status(502).json({ error }));
});
