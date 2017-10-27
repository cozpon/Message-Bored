//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topics;

router.route('/')
.get((req, res) => {
  return Topics.findAll()
  .then(topics => {
    return res.json(topics);
  });
})
.post(isAuthenticated, (req, res) => {
  let name = req.body.name;
  let id = req.user.id;
  return Topics.create({
    name : name,
    created_by : id
  })
  .then(newTopic => {
    return res.json(newTopic);
  });
});

router.route('/:id')
.get((req, res) => {
  let topics = req.params.id;
  return Topics.findById(topics)
  .then(topic => {
    return res.json(topic);
  });
})
.put(isAuthenticated, (req, res) => {
  let data = req.body;
  let id = req.params.id;
  return Topics.update({
    username : data.username
  },
  {
  where : { id : id }})
  .then(topic => {
    return res.json(topic);
  });
});


module.exports = router;



function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {next();}
  else {console.log("failed authentication");}
}