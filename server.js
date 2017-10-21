var html = require('fs').readFileSync('index.html');
var http = require('http').createServer(
    function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
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
                console.log(count);
            }
        );
    }
);
