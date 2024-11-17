import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 4000 });

wss.on('connection', (ws) => {
  console.log('A new client connected');

  ws.on('message', async (message) => {
    const newPost = JSON.parse(message);

    if (newPost.username && newPost.content) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
          client.send(JSON.stringify(newPost));
      });
    } else {
      console.log('Invalid post format');
    }
  });

  ws.on('error', (error) => {
    console.log('Client error:', error);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:4000');