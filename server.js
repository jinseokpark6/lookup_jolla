var express = require("express");
var path = require("path");
var app = express();
var util = require('util');
var bodyParser = require('body-parser');

var engines = require('consolidate');

app.set('views', __dirname);
app.engine('html', engines.mustache);
// app.set('view engine', 'html');
app.set('view engine', 'ejs');

var server = app.listen(process.env.PORT || 8000, function() {
	console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);
var messages = [];

var locations = [];
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var current_lat;
var current_lng;

io.sockets.on('connection', function (socket) {
	console.log('using sockets successfully');

	socket.on("new_log", function(data) {
		var msg = data.name + " just logged on!";
		socket.broadcast.emit("user_connected", {message: msg});
	})

	socket.on("mylocation", function(data) {
		var loc = [data.userid, data.location.lat, data.location.lng, data.name, socket.id, data.photo];
		current_lat = data.location.lat;
		current_lng = data.location.lng;
		locations.push(loc);
		socket.emit("user_location", {locArray: locations});
		socket.broadcast.emit("user_location", {locArray: locations});
		// console.log(locations);
	})


	socket.on("disconnect", function() {
		// var new_message = username + " has disconnected!";
		// broadcasting the user_disconnect event
		var sock = socket.id;
		for(var i=0; i<locations.length; i++) {
			if(locations[i][4] == sock) {
				console.log('match');
				locations.splice(i, 1);
			}
		}
		socket.broadcast.emit("user_location", {locArray: locations});
	})
})


  app.get('/', function(req, res){
    res.render('map');
  });

  app.get('/logged', function(req, res){
    res.render('logged');
  });
   app.get('/main2', function(req, res){
    res.render('main2');
  });


  app.post('/list2', function(req, res){
  	var current = {lat: current_lat, lng: current_lng};
  	console.log(current);
    res.render('list2', current);
  });

