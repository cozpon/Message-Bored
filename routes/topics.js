//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');
const Messages = db.messages;

router.route('/')
.get((req, res) => {
  return Topics.findAll()
  .then(topics => {
    return res.json(topics);
  });
})
.post((req, res) => {
  let username = req.body.username;
  return Topics.create({
    username : username

  })
  .then(newTopic => {
    return res.json(newTopic);
  });
});

router.route('/:id')
.put((req, res) => {
  let data = req.body;
  let id = req.params.id;
  return Topics.update({
    username : data.username
  },
  {
  where : { id : id }})
  .then(topic => {
    let locals = {
      topic : topic
    };
    return res.json(topic);
  });
});

module.exports = router;