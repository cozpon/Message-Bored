//jshint esversion:6
const express = require('express');
const router = express.Router();

router.route('/latest')
.get((req, res) => {
  res.json("latest");
});

router.route('/')
.post((req, res) => {
  res.json('post');
});

router.route('/by-topic/:topic_id')
.get((req, res) => {
  res.json("getby topicID");
});

module.exports = router;