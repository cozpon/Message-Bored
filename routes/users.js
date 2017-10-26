//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.users;
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


router.route('/')
  .get((req, res) => {
    console.log('Users');
    return Users.findAll()
    .then(users => {
      return res.json(users);
    });
  })
  .post((req, res) => {
    Users.create({
      name: req.body.name
      // add password here if wanted
    })
    .then(user => {
      return res.json(user);
    });
  });

router.route('/:id')
  .get((req, res) => {
    console.log("front end");
    let userId = req.params.id;
    return Users.findById(userId)
    .then(user => {
    return res.json(user);
    });
  });

module.exports = router;