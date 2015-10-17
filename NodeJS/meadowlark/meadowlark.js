//Declaring variables
var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
var fortune = require('./lib/fortune.js');

//Configuring handlebars to get views/layouts
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Configuring Port number
app.set('port', process.env.PORT || 3000);

//Configuring static resources folder
app.use(express.static(__dirname + '/public'));

// ******** Routes *********

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();
});

// Home
app.get('/', function(req, res){
	res.render('home');
});

// About
app.get('/about', function(req, res){
	res.render('about', {
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

//Hood River Tour
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

//Request Group Rate
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

// ******* Exceptions ********

// custom 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// custom 500 page
app.use(function(req, res){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate...');
});
