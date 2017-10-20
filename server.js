var html = require('fs').readFileSync('index.html');
var http = require('http').createServer(
    function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
});


var io = require('socket.io')(http);
var webPort = process.env.PORT || 3000;
http.listen(webPort);
io.on(
    'connection',
    function (socket) {
        socket.on(
            'msg',
            function (data) {
                io.emit('msg', data);
            }
        );
    }
);

var count = 0;
io.sockets.on('connection', function (socket) {

    // 接続時にカウンタのインクリメント
    count++;

    // ブロードキャストで送信
    io.sockets.emit('user connected',count);

    // 切断
    socket.on('disconnect', function () {

        // カウンタのデクリメント
        count--;

        // ブロードキャストで送信
        io.sockets.emit('user disconnected',count);
    });
});
