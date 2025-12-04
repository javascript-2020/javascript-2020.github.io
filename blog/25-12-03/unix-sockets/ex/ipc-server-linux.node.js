        
        
        
// server.js
        
        var net         = require('net');
        var PIPE_PATH   = '/tmp/mysock';
        
                                                                                // Clean up old socket file if it exists
        var fs          = require('fs');
        
        if(fs.existsSync(PIPE_PATH)){
              fs.unlinkSync(PIPE_PATH);
        }
        
        var server    = net.createServer(con=>{
                                                                                console.log('Client connected');
              con.on('data',data=>{
                                                                                console.log('Received from client:', data.toString());
              });
        
              con.on('end',()=>{
                                                                                console.log('Client disconnected');
              });
                                                                                // Send a test message
              con.write('Hello from Node server over Unix socket!');
              
        });
        
        server.listen(PIPE_PATH,()=>{
                                                                                console.log('Server listening on', PIPE_PATH);
        });


