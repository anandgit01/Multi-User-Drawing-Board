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
