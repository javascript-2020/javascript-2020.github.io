        
        
//  ipc-server-linux.node.js

        
        var fs          = require('fs');
        var net         = require('net');
        var PIPE_PATH   = '/tmp/mysock';
        
                                                                                //  Clean up old socket file if it exists
        if(fs.existsSync(PIPE_PATH)){
              fs.unlinkSync(PIPE_PATH);
        }
        
        
        var server    = net.createServer(con=>{
                                                                                console.log('Client connected');
              con.on('data',data=>{
                                                                                console.log('Received from client:',data.toString());
              });
        
              con.on('end',()=>{
                                                                                console.log('Client disconnected');
              });
                                                                                //  Send a test message
              con.write('hello from server');
              
        });
        
        server.listen(PIPE_PATH,()=>{
                                                                                console.log('Server listening on',PIPE_PATH);
        });


