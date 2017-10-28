//jshint esversion:6
const express = require('express');
const router = express.Router();
const db = require('../models');

const Topics = db.topics;
const Users = db.users;
const Messages = db.messages;

router.route('/')
.get((req, res) => {
  return Topics.findAll({
    include:[{ model: Users }]
  })
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
    return newTopic.reload({include : [{ model: Users }]});
  })
  .then(topic => {
    return res.json(topic);
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
  return Topics.update({ username : data.username },
  { where : { id : id }})
  .then(topic => {
    return res.json(topic);
  });
});

router.route('/:id/messages')
.get((req, res) => {
  console.log('BAM');
  let topicId = req.params.id;
  return Messages.findAll({
    include:[{ model: Users }],
    where: { topic_id: topicId },
    order: [['createdAt', 'ASC']],
    })
    .then((result) => {
    Topics.findOne({
      where: { id: topicId }
    })
    .then(topic => {
      let topicData = {
        topic: topic,
        messages: result
      };
      return res.json(topicData);
    });
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