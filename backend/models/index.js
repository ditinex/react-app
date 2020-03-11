const Sequelize = require('sequelize');
const Mongoose = require('mongoose');
const config = require('../config');

//Postgress connection
const sequelize = new Sequelize(config.postgress.database, config.postgress.username, config.postgress.password, config.postgress.option);
sequelize
.authenticate()
.then(() => {
	console.log('Postgress Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the Postgress:', err);
});


//Mongoose connection
Mongoose.connect(config.mongodb.url+config.mongodb.database, {useUnifiedTopology: true, useNewUrlParser: true});
const mongoose = Mongoose.connection;
mongoose.on('error', console.error.bind(console, 'Mongo connection error:'));
mongoose.once('open', function() {
  console.log('Mongodb Connection has been established successfully.');
});



const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.postgress = require("./postgress.js")(sequelize, Sequelize);
db.mongoose = require("./mongodb.js")(Mongoose);

module.exports = db;
