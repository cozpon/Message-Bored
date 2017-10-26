//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.users;




router.route('/')
  .get((req, res) => {
    return Users.findAll()
    .then(users => {
      return res.json(users);
    });
  });
  // .post((req, res) => {
  //   Users.create({
  //     name: req.body.name,
  //     password: req.body.password
  //   })
  //   .then(user => {
  //     return res.json(user);
  //   });
  // });

router.route('/:id')
  .get((req, res) => {
    let userId = req.params.id;
    return Users.findById(userId)
    .then(user => {
    return res.json(user);
    });
  });

module.exports = router;