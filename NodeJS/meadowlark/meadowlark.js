//Declaring variables
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
	defaultLayout:'main' });
var fortune = require('./lib/fortune.js');

function getWeatherData(){
	return{
		locations: [
			{
				name: 'Portland',
				forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				weather: 'Overcast',
				temp: '54.1 F (12.3 C)',
			},
			{
				name: 'Bend',
				forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				weather: 'Partly Cloudly',
				temp: '55.0 F (12.8 C)',
			},
			{
				name: 'Manzanita',
				forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
				weather: 'Light Rain',
				temp: '55.0 F (12.8 C)',
			},
		],
	};
}

//Configuring handlebars to get views/layouts
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Configuring Port number
app.set('port', process.env.PORT || 3000);

//Configuring static resources folder
app.use(express.static(__dirname + '/public'));

//Weather
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherContext = getWeatherData();
	next();
});

//newsletter
app.use(require('body-parser').urlencoded({ extended:  true }));

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

//Newsletter
app.get('/newsletter', function(req, res){
	res.render('newsletter', { csrf: 'CSRF token goes here' });
});

//Newsletter process
app.post('/process', function(req, res){
	console.log('Form (from querystring): ' + req.query.form);
	console.log('CSRF toke (from hidden form field): ' + req.body._csrf);
	console.log('Name (from visible field): ' + req.body.name);
	console.log('Email (from visible field): ' + req.body.email);
	res.redirect(303, '/thank-you');
});

//Home
app.get('/felipe', function(req, res){
	res.render('felipe');
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
