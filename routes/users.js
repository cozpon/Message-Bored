//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.users;
const Messages = db.messages;

router.route('/')
  .get((req, res) => {
    return Users.findAll()
    .then(users => {
      return res.json(users);
    });
  });






router.route('/:id')
  .get((req, res) => {
      let userId = req.params.id;
      return Users.findById(userId)
  .then((user) => {
    console.log(user, "USER");
    Messages.findAll({
      include: [{ model: Users }],
      where: {author_id: userId}
    })
    .then(message => {
      console.log(message, "message");
      let result = {
        user: user,
        messages: message
      };
      return res.json(result);
    });
  });
  //   return Topics.findAll({
  //     include:[{ model: Users }],
  //     where: { created_by: userId },
  //   })
  //   .then((topic) => {
  //     Users.findById(userId)
  //   .then(user => {
  //     console.log(user);
  //   return res.json(user);
  //   });
  // });
});
module.exports = router;