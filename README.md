# Multi-User-Drawing-Board 
A real-time drawing board application that supports multiple users. Built with Node.js, Express, and Socket.io, this project allows users to draw on a shared canvas and see updates in real-time across all connected devices.

# Features
Real-time drawing with multiple users
Color picker and adjustable line width
Clear the canvas for all users
Save the drawing as a PNG file

# Prerequisites
Before you begin, ensure you have the following installed:

Node.js (includes npm)

# Installation
Clone the Repository 
git clone https://github.com/anandgit01/Multi-User-Drawing-Board.git
cd Multi-User-Drawing-Board

# Install Dependencies 
npm install

# Running the Application
Start the Server 
node app.js

The server will start and listen on port 3000.

# Access the Drawing Board
Open your web browser and navigate to http://<YOUR_LOCAL_IP>:3000.

Replace <YOUR_LOCAL_IP> with the IP address of the machine running the server.

Open this URL on multiple devices connected to the same network to test real-time drawing.

# File Structure
app.js: The Node.js server script that handles WebSocket connections and serves static files.
public/
index.html: The main HTML file that sets up the drawing board UI.
drawing.js: JavaScript file managing drawing logic and real-time updates.

# Example Code
# server.js 
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

# index.html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multi-User Drawing Board</title>
    <style>
        canvas {
            border: 1px solid black;
            display: block;
            margin: 20px auto;
            background-color: #f0f0f0;
        }

        .toolbar {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }

        .toolbar button,
        .toolbar input {
            margin: 0 5px;
        }
    </style>
</head>

<body>
    <div class="toolbar">
        <input type="color" id="colorPicker" value="#000000">
        <input type="number" id="lineWidth" min="1" max="10" value="5">
        <button id="clearButton">Clear</button>
        <button id="saveButton">Save</button>
    </div>
    <canvas id="drawingBoard" width="800" height="600"></canvas>
    <script src="/socket.io/socket.io.js"></script>
    <script src="drawing.js"></script>
</body>

</html>

# drawing.js 

const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d');
const socket = io();

let drawing = false;
let color = '#000000';
let lineWidth = 5;

// Toolbar controls
document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
});
document.getElementById('lineWidth').addEventListener('input', (e) => {
    lineWidth = parseInt(e.target.value, 10);
});
document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clear');
});
document.getElementById('saveButton').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    socket.emit('drawing', { x, y, color, lineWidth });
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', stopDrawing);

// Listen for drawing data from server
socket.on('drawing', (data) => {
    ctx.lineWidth = data.lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = data.color;

    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
});

// Clear canvas event
socket.on('clear', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

# Contributing
Feel free to fork the repository, submit issues, or create pull requests.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
Socket.io for real-time WebSocket communication.
