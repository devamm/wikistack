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

function makeSlug(title) {
  //convert title into slug
  let slug = "";

  if(title) {
    slug = title.slice();
    slug = slug.replace(/\s/g, "_");
  } else {
    slug = Math.floor((Math.random() * (9999 - 1000) + 1000)).toString();
  }

  return slug;
}

router.post('/', async (req, res, next) => {
  const {name, email, title, content, status} = req.body;
  let slugged = makeSlug(title);

  const pages = new Page({
    title: title,
    content: content,
    status: status,
    slug: slugged
  })

  console.log(pages);

  try {
    await pages.save();
    res.redirect('/')
  } catch (err) {
      next(err);
  }
})



module.exports = router;
