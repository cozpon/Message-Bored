//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topics;
const Messages = db.messages;

router.route('/')
.post(isAuthenticated, (req, res) => {
  let body = req.body.body;
  let authorId = req.user.id;
  let topicId = req.body.topic_id;
  return Messages.create({
    body : body,
    topic_id: topicId,
    author_id: authorId
  })
  .then(newMessage => {
    return newMessage.reload({include : [{ model: Topics }]});
  })
  .then(message => {
    return res.json(message);
  });
});


router.route('/latest')
.get((req, res) => {
  return Messages.findAll({
    include:[{ model: Topics }],
    order : [ [ 'createdAt', 'ASC' ] ],
    limit: 10
  })
  .then(latest => {
    return res.json(latest);
  });
});

// router.route('/topic_id/:id')
// .get((req, res) => {
//   let topicId = req.body.topic_id;
//   console.log(topicId, "TOPIC ID");
//   return Messages.findAll({
//     include:[{ model: Topics }],
//     where : { topic_id : topicId },
//     order : [ [ 'createdAt', 'ASC' ] ]
//   })
//   .then(result => {
//     console.log(result, "RESULT");
//     return res.json(result);
//   });
// });

module.exports = router;


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {next();}
  else {console.log("failed authentication");}
}