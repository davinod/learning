//Declaring variables
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
	defaultLayout:'main' });
var fortune = require('./lib/fortune.js');
var formidable = require('formidable');
<<<<<<< HEAD
var jqupload = require('jquery-file-upload-middleware');
var credentials = require('./credentials.js');
=======
>>>>>>> refs/remotes/origin/dev-int

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

//Cookies
app.use(require('cookie-parser')(credentials.cookieSecret));

//Upload
app.use('/upload', function(req, res, next){
	var now = Date.now();
	jqupload.fileHandler({
		uploadDir: function(){
			return __dirname + '/public/uploads/' + now;
		},
		uploadUrl: function(){
			return '/uploads/' + now;
		},
	})(req, res, next);
});

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

//vacation-photo
app.get('/contest/vacation-photo', function(req, res){
	var now = new Date();
<<<<<<< HEAD
	res.cookie('monster', 'nom nom');
	res.cookie('signed_monster', 'nom nom2', { signed: true });
	res.render('contest/vacation-photo',{
		year: now.getFullYear(),month: now.getMonth()
	});
});

//vacation-photo submission
app.post('/contest/vacation-photo/:year/:month', function(req, res){
	var form = new formidable.IncomingForm();
	var monster = req.cookies.monster;
	var signedMonster = req.signedCookies.signed_monster;
	console.log('monster=' + monster);
	console.log('signedMonster=' + signedMonster);
	form.parse(req, function(err, fields, files){
		if(err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('name=' + fields.name);
		console.log('email= ' + fields.email);
		console.log('received files:');
		console.log(files);
		
=======
	res.render('contest/vacation-photo',{
		year: now.getFullYear(),month: now.getMonth()
	});
});

//vacation-photo submission
app.post('/contest/vacation-photo/:year/:month', function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if(err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('name=' + fields.name);
		console.log('email=' + fields.email);
		console.log('received files:');
		console.log(files);
>>>>>>> refs/remotes/origin/dev-int
		res.redirect(303, '/thank-you');
	});
});

//Newsletter
app.get('/newsletter', function(req, res){
	res.render('newsletter', { csrf: 'CSRF token goes here' });
});

//Newsletter thank-you
app.get('/thank-you', function(req, res){
	res.render('thank-you');
});

app.post('/process', function(req, res){
	if(req.xhr || req.accepts('json,html')==='json'){
		//if there was an error, then we would send { error: 'error description' }
		console.log('Ajax request');
		res.send({ success: true });
	} else {
		//if there was an error, then we would redirect to an error page
		console.log('Non-ajax request');
		res.redirect(303, '/thank-you');
	}
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
