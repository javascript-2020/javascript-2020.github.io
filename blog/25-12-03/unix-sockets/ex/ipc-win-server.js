        
        
        
// server.js
        
        var net         = require('net');
                                                                                // Named pipe path (Windows format)
        var PIPE_NAME   = '\\\\.\\pipe\\mypipe';
        
        var server      = net.createServer(con=>{
                                                                                console.log('Client connected');
              con.on('data',data=>{
                                                                                console.log('Received from client:',data.toString());
              });
        
              con.on('end',()=>{
                                                                                console.log('Client disconnected');
              });        
                                                                                // Send a test message
              con.write('Hello from Node server over Named Pipe!');
              
        });
        
        server.listen(PIPE_NAME,()=>{
                                                                                console.log('Server listening on',PIPE_NAME);
        });


