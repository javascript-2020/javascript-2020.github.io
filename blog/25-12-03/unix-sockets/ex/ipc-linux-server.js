        
        
        
// server.js
        
        var net         = require('net');
        var PIPE_PATH   = '/tmp/mysock';
        
                                                                                // Clean up old socket file if it exists
        var fs          = require('fs');
        
        if (fs.existsSync(PIPE_PATH)) {
              fs.unlinkSync(PIPE_PATH);
        }
        
        var server = net.createServer((conn) => {
              console.log('Client connected');
        
              conn.on('data', (data) => {
                    console.log('Received from client:', data.toString());
              });
        
              conn.on('end', () => {
                    console.log('Client disconnected');
              });
        
              // Send a test message
              conn.write('Hello from Node server over Unix socket!');
        });
        
        server.listen(PIPE_PATH, () => {
              console.log('Server listening on', PIPE_PATH);
        });
