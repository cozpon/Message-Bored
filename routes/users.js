//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.users;
const Messages = db.messages;
const Topics = db.topics;

router.route('/')
  .get((req, res) => {
    return Users.findAll()
    .then(users => {
      return res.json(users);
    });
  });

router.route('/:id')
  .get((req,res) => {
    let id = req.params.id;
    return Messages.findAll({
      include : [{model: Topics}],
      where : {author_id : id}
    })
    .then(messages => {
      Topics.findAll({
      include : [{model: Users}],
      where : { created_by : id},
      order : [["createdAt", "DESC"]]
      })
      .then(topics => {
        Users.findById(id)
        .then(users => {
        let result = {
          user: users,
          messages: messages,
          topic : topics
          };
          return res.json(result);
        });
      });
    });
  });

module.exports = router;