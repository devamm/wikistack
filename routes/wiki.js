const express = require('express');
const router = express.Router();
const index = require('../views/index');
const { Page } = require("../models/index");
const { addPage } = require("../views");

router.use(express.urlencoded({extended: false}));

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

router.post('/', async (req, res, next) => {
  const {name, email, title, content, status} = req.body;
  console.log("page is", Page)

  const page = new Page({
    title: title,
    content: content,
    status: status
  })

  try {
    await page.save();
    res.redirect("/")
  } catch (err) {
      next(err);
  }
})



module.exports = router;
