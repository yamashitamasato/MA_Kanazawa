var fs = require('fs');
var path = require('path');
//var html = require('fs').readFileSync('wait.html');
var mime = {
  ".html": "text/html",
  ".css":  "text/css"
  // 読み取りたいMIMEタイプはここに追記
};
var http = require('http').createServer(
    function (req, res) {

  if (req.url == '/') {
    filePath = '/index.html';
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
var io = require('socket.io')(http);
var webPort = process.env.PORT || 3000;
http.listen(webPort);
var count=0;
io.on(
    'connection',
    function (socket) {
        socket.on(
            'test',
            function (data) {
                count=count+1;
                io.emit('msg', count);
            }
        );
    },
);
