//jshint esversion:6
const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res) => {
  res.json("smoke test");
})
.post((req, res) => {
  res.json('post');
});


router.route('/:id')
.put((req, res) => {
  res.json('put');
});

module.exports = router;