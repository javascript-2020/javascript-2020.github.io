        
        
        
        var net       = require('net');
        
        var client    = net.createConnection({path:'\\\\.\\pipe\\mypipe'},()=>{
                                                                                console.log('Connected to C server');
        });
        
        client.on('data',data=>{
                                                                                console.log('Received:', data.toString());
        });
        
        client.on('end',()=>{
                                                                                console.log('Connection closed');
        });


