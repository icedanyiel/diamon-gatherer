const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5050, function() {
  console.log('[SERVER STARTED AT PORT 5050]');
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname));

io.on('connection', function(socket) {
    console.log('[SOCKET CONNECTED]' + socket.id);
    socket.join('menu');
      
    socket.on('join-chat', function (userName) {
      console.log('[USER JOINED CHAT]', socket.id, userName);
      chatUsers[socket.id] = userName;
      socket.join('chat');
      // TEMA 3
      socket.emit('joined-chat', Object.keys(chatUsers).length );
      io.to('chat').emit('new-message', `${userName} joined the chat.`);
      // END
    })
  
    socket.on('send-message', function (message, color) {
      console.log('[USER SENT MESSAGE]', message);
      io.to('chat').emit('new-message', `${chatUsers[socket.id]}: <span style="color:${color};">${message}</span>`);
    })
  
    socket.on('leave-chat', function (userName) {
      console.log('[USER LEFT CHAT]', socket.id);
      delete chatUsers[socket.id];
      socket.leave('chat');
      socket.emit('menu');
      // TEMA 3
      io.to('chat').emit('new-message', `${userName} left the chat.`);
      // END
    })
})

const chatUsers = {};