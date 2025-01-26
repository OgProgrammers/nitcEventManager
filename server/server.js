const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken'); 
const connctToDB = require('./database/db');
connctToDB();


const app = express();
const server = http.createServer(app); 
const io = socketio(server); 

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB


// Routes
app.use('/users', require('./routes/userRoutes')); 
app.use('/events', require('./routes/eventRoutes')); 

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('event_update', (data) => {
    // Handle event updates and broadcast to all connected clients
    io.emit('event_update', data); 
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});