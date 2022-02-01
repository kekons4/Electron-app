const express = require("express");
const { createServer } = require("http");
const socketio = require("socket.io");
const path = require('path');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const app = express();
const httpServer = createServer(app);
const io = socketio(httpServer);

app.use(express.static(path.join(__dirname, 'src')));

const botName = 'Chat Bot';

io.on("connection", (socket) => {
  // contains all user connection info like IP Address
  // console.log(socket.handshake);
  console.log(`${socket.handshake.address} connected`);


  console.log("New Connection Established...");

  // Handles a user attempting to join a specific chat room
  socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to Kreios Chat'));

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    
    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      roomy: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chat message
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  //Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if(user){
      io.to(user.room).emit('message', formatMessage(botName , `${user.username} has left the chat`));
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        roomy: user.room,
        users: getRoomUsers(user.room)
      });
    }

  });
  
});

const PORT = 3000 || process.env.PORT;

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));