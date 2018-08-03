const express = require('express');
const router = express.Router();
const index = require('../views/index');

router.get('/', (req, res, next) => {
  // res.send(index.wikiPage(
  //   {
  //     title: 'Some Title',
  //     content: 'there is some content here',
  //   }))
  res.redirect('/')
})

router.get('/add', (req, res, next) => {
  res.send(index.addPage());
})


module.exports = router;
