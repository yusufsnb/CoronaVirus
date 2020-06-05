const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
var request = require('request');

app.use(ejsLayouts);
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/flags', express.static(__dirname + '/node_modules/mdbootstrap/css/addons'));
app.use('/plotly', express.static(__dirname + '/node_modules/plotly.js-dist'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	var options = {
		'method': 'GET',
		'url': 'https://api.covid19api.com/summary',
		'headers': {
		}
	};
	request(options, function (error, response) { 
		if (error) throw new Error(error);
		res.render('index', {data: JSON.parse(response.body)});
	});
});

app.get('/country', (req, res) => {
	var options = {
		'method': 'GET',
		'url': 'https://api.covid19api.com/country/turkey/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-06-01T00:00:00Z',
		'headers': {
		}
	};
	request(options, function (error, response) { 
		if (error) throw new Error(error);
		res.render('country', {data: JSON.parse(response.body)});
	});
});

app.listen(8080, (req, res) => {
	console.log('8080 dinleniyor');
});