const express = require('express');
const morgan = require('morgan');
const index = require('./views/index');
const { db } = require('./models/index');
const wiki = require('./routes/wiki');
const user = require('./routes/user');
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use('/wiki', wiki);
app.use('/user', user);

app.get("/", (req, res) => {
  res.send(index.main('hello there'));
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
