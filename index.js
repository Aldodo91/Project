var express = require('express');
var socket = require('socket.io');
// App
var app = express();
var server = app.listen(3000, () => {
	console.log('In ascolto su porta 3000');
});

// file statici 
app.use(express.static('public'));


// soket setup
var io = socket(server);

io.on('connection', socket => {

    console.log('Effettiata connessione da ', socket.id);

    socket.on('disconnected', utente =>{
    	console.log ('utente scollegato ', utente );
    	alert("funziona");
    })

    // Handle chat event
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing',data => {
    	socket.broadcast.emit('typing', data)
    });


});