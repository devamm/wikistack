const express = require('express');
const morgan = require('morgan');
const index = require('./views/index');
const { db, Page } = require('./models/index');
const wiki = require('./routes/wiki');
const user = require('./routes/user');
const app = express();


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use('/wiki', wiki);
app.use('/user', user);

app.get("/", async	 (req, res) => {
  //get all pages from database
  const allPages = await Page.findAll();
  console.log(allPages[1]); 
  let listofPages = '';
  allPages.forEach(page => {
  	let tmp = `<a href="/wiki/${page.dataValues.slug}">${page.dataValues.title}</a>`
  	listofPages+=tmp;
  })
  //listofPages += "</ul>";

  res.send(index.main(listofPages));
})


const PORT = 1337;

const syncFunc = async () => {
	try{
		await db.sync({force: true});
	} catch (err){
		console.log('something broke', err);
	}

	app.listen(PORT, () => {
  	console.log(`App listening in port ${PORT}`);
	});
}

syncFunc();
