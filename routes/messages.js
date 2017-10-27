//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');

const Messages = db.messages;

router.route('/')
.post((req, res) => {
  Messages.create({
    body : req.body.body
  })
  .then(message => {
    return res.json(message);
  });
});


router.route('/latest')
.get((req, res) => {
  return Messages.findAll({
    limit: 10,
    order: [ [ 'id', 'DESC' ] ]
  })
  .then(latest => {
    return res.json(latest);
  });
});

router.route('/by-topic/:topic_id')
.get((req, res) => {
  let topicId = req.body.topic_id;
  return Messages.findAll({
    where : { topic_id : topicId },
    order : [ [ 'createdAt', 'ASC' ] ]
  })
  .then(result => {
    return res.json(result);
  });
});

module.exports = router;