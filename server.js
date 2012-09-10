var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var util = require('util');

app.configure(function(){
    app.use(express.static(__dirname)); 
    app.use(express.logger());
});

app.get("/", function(req, res) {
  res.redirect("/index.html");
});


io.sockets.on('connection', function(socket) {
    console.log('connected')
    socket.on('slidechanged', function(data) {
        console.log('slidechanged: ' + util.inspect(data))
        socket.broadcast.emit('slidechanged', data);
    });
    socket.on('message', function(data) {
        console.log('message: ' + data)
        socket.broadcast.send(data);
    });
    socket.on('disconnect', function() {
        console.log('disconnected')
    });
});

app.listen(8080);

