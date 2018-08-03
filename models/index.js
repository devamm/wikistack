const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});
//const { db } = require('./models');

db.authenticate().
then(() => {
  console.log('we got to the database');
})

const Page = db.define('pages', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	slug:{
		type: Sequelize.STRING,
		allowNull: false
	},
	content:{
		type: Sequelize.TEXT,
		allowNull: false

	},
	status: Sequelize.STRING
})

const User = db.define('users', {
	name:{
		type: Sequelize.STRING,
		allowNull: false

	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
})



module.exports = {
  db, Page, User
}

