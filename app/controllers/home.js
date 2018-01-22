const express = require('express');
const router = express.Router();
const db = require('../models');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require("../../config/config");

const isLoggedIn = require('../util/auth_middleware');

module.exports = (app) => {
  app.use('/', router);
  
};

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index', {
    title: 'Demo Node JS MVC',
  });
});

/**
 * Este Recurso loguea al usuario contra la BD
 * @route POST /login
 * @group auth
 * @returns {object} 200 - OK
 * @returns {Error}  400 - bad request
 */
router.post('/login', (req, res, next) => {
  console.log(req.body);
  if(!req.body.email || !req.body.password){
    res.status(403).json({ message: "Email y Password son requeridos!" });
  } else {
    const email = req.body.email;
    const password = req.body.password;
    db.user
      .comparePasswords(email, password)
      .then(user => {
        const token = jwt.sign(
          setUserInfo(user),
          config.secret,
          { expiresIn: "24h" }
        );
        res.json({ success: true, token: "bearer " + token });
      })
      .catch(err => {
        res.status(400).send({ success: false, message: (err.errors) ? err.errors[0].message : err.message });
      });
  }
  });

/**
 * Este Recurso permite registar usuarios para consultar API
 * @route POST /registrar
 * @group auth
 * @returns {object} 201 - OK
 * @returns {Error}  400 - bad request
 */
router.post('/registrar', (req, res, next) => {
  if(!req.body.email || !req.body.password){
    res.json({ message: "Please provide a username and a password" });
  } else {
      let newUser = {
        email: req.body.email,
        hashed_password: req.body.password,
        first_name: req.body.firstName || null,
        last_name: req.body.lastName || null,
        created: new Date().getTime()
      };
      db.user.create(newUser)
        .then(function(data) {
          res.status(201).json({ success: true, message: data });
        })
        .catch(function(err) {
          res.status(400).json({ success: false, message: (err.errors) ? err.errors[0].message : err.message });
        })
  }
});

function setUserInfo(user) {
  const { id, email, created, first_name, last_name } = user;
  return { id, email, first_name, last_name };
}
