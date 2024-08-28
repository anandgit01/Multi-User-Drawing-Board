const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    socket.on('clear', () => {
        socket.broadcast.emit('clear');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Listen on all network interfaces (0.0.0.0) and port 3000
server.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});
