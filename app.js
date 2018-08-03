const express = require('express');
const morgan = require('morgan');
const index = require('./views/index');
const db = require('./models/index');
const app = express();
//const Sequelize = require('sequelize');
app.use(morgan('dev'));

//Sequelize.sync();

app.get("/", (req, res) => {
  res.send(index.main('hello there'));
})



const PORT = 1337;



const syncFunc = async () => {
	try{
		await db.sync({force: true});
	} catch (err){
		console.log('something broke');
	}

	app.listen(PORT, () => {
  	console.log(`App listening in port ${PORT}`);
	});
}

syncFunc();