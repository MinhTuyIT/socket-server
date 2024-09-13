// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express app and create an HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO on the server
const io = new Server(server);

// Serve a simple message for the home route
app.get('/', (req, res) => {
  res.send('Real-time socket server is running');
});

// Listen for incoming socket connections
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Listen for a custom event (e.g., 'message') from the client
  socket.on('message', (data) => {
    console.log('Message received from client:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Set the server to listen on a specific port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});