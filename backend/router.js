
const Controller = require('./controllers');
module.exports = function(app){

	app.use('/*',(req, res, next) => {
	  	res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header('Access-Control-Allow-Headers', 'Content-Type');
	  	next()
	});

	app.post('/signup', Controller.signup)
	app.post('/login', Controller.login)
	app.post('/addSuggestions', Controller.addSuggestions)
	app.post('/createProducts', Controller.createProducts)
	app.get('/listProducts', Controller.listProducts)
	app.get('/listSuggestions/:id', Controller.listSuggestions)
}