var fs = require('fs');
var path = require('path');
var state = 0;
//var html = require('fs').readFileSync('wait.html');
var mime = {
  ".html": "text/html",
  ".css":  "text/css"
  // 読み取りたいMIMEタイプはここに追記
};
var http = require('http').createServer(function(req, res) {
    if (req.url == '/') {
      filePath = '/index.html';
    } else if(req.url=='/start'){
      filePath = '/start.html';
    } else if(req.url=='/addKeyword') {
      filePath = '/addKeyword.html';
    } else if(req.url=='/go'){
      filePath = '/start.html';
    } else {
      filePath = req.url;
    }
    var fullPath = __dirname + filePath;

    res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
    fs.readFile(fullPath, function(err, data) {
      if (err) {
        // エラー時の応答
      } else {
        res.end(data, 'UTF-8');
      }
    });
});
var io = require('socket.io').listen(http);
var webPort = process.env.PORT || 3000;
http.listen(webPort);
var count=0;

io.sockets.on(
    'connection',
    function (socket) {
        socket.on('test',function (data) {
            count=count+1;
            io.emit('msg', count);
        });
        socket.on('go',function (data) {
            io.emit('startlist');
        });
        socket.on('jump_to_start',function (data) {
          console.log('test_ok');
            io.emit('jump');
        });

    }

);
