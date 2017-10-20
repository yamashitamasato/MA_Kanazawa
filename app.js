var express = require('express');
var app = express.createServer();
var ejs = require('ejs');
var io = require('socket.io');
var port = process.env.PORT || 3000;
app.configure(function() {
var expressStatic = express.static(__dirname + '/static');
app.use(expressStatic);
});
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.set('transports', ['xhr-polling']);
app.set('polling duration', 10);
app.get('/', function(req, res) {
console.log('/');
res.render('index', { locals: { port: port } });
});
app.listen(port);
var socket = io.listen(app);
socket.on('connection', function(client) {
client.on('message', function(msg) {
console.log('send :' + msg);
var sanitized = escapeHTML(msg);
client.send(sanitized);
client.broadcast(sanitized);
});
client.on('disconnect', function() {
console.log('disconnect');
});
});
function escapeHTML(str) {
return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(//g, "&gt;");
console.log('Server running at ' + port + '/');
