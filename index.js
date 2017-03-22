const express           = require('express');
const path              = require('path');
const bodyParser        = require('body-parser');

const app = express();

const http              = require('http').Server(app);
const io                = require('socket.io')(http);

app.use(bodyParser.json());

app.post('/post', (req, res) => {
    console.log('req', req.body);
    io.emit('event', req.body);

    return res.status(200).json({
        success : true,
        data : req.body
    });
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(9001, function(){
    console.log('listening on *:9001');
});
