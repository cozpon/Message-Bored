//jshint esversion:6
const express = require('express');
const router = express.Router();
const users = require('./users');
const messages = require('./messages');
const topics = require('./topics');
const db = require('../models');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 12; //about 3 sec.

router.use('/users', users);
router.use('/messages', messages);
router.use('/topics', topics);

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  console.log("Logged out, SERVER SIDE");
  req.logout();
  req.session.destroy(function() {
    res.clearCookie('connect.sid');
  });
});

router.post('/register', (req,res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      db.users.create({
        username: req.body.username,
        password: hash
      })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log("error", err);
        return res.send('Stupid username');
      });
    });
  });
});

module.exports = router;