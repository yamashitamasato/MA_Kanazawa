var top  = require('fs').readFileSync('index.html');
var wait = require('fs').readFileSync('wait.html');
var url = require('url');
var http = require('http').createServer(

    function (req, res) {
        if(req.method=='GET'){
          var param_json = url.parse(req.url, true).query;
          		console.log(param_json);
              if(param_json.id == 1){
			             console.log("id=1");
                   res.writeHead(200, {'Content-Type': 'text/html'});
                   res.end(wait);
              }else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(top);
              }
        }
    });


var io = require('socket.io')(http);
var webPort = process.env.PORT || 3000;
var count = 0;
http.listen(webPort);
var io = require('socket.io').listen(http);
io.sockets.on('connection', function(socket) {

  console.log('コネクション数',socket.client.conn.server.clientsCount);
  io.sockets.emit('count', socket.client.conn.server.clientsCount);

  socket.on('disconnect', function(data) {
    console.log('コネクション数',socket.client.conn.server.clientsCount);
    io.sockets.emit('count', socket.client.conn.server.clientsCount);
  });
});
