

        var http2         = require('http2');
        
        var host          = '127.0.0.1';
        var port          = 3010;
        
        var key           = '...';
        var cert          = '...';
        
        var server        = http2.createSecureServer({key,cert}).listen(port,host);
                                                                                console.log(`https://${host}:${port}/`);
        
        
        server.on('stream',(stream,headers)=>{
        
              var path    = headers[':path'];
                                                                                console.log(path);

              if(path==='/test'){
                    test(stream,headers);
                    return;
              }

              
              stream.on('data',data=>console.log(data.toString()));
              stream.on('end',complete);


              function complete(){
              
                    var headers   = {
                          'access-control-allow-origin'   : '*',
                          'content-type'                  : 'text/html; charset=utf-8',
                          ':status'                       : 200
                    }
                    stream.respond(headers)
                    
                    stream.write('ok');
                    stream.end();
                    
              }//complete
              
        });




        
        
        function test(stream,headers){
        
              stream.respond({
                    'content-type'    : 'text/html; charset=utf-8',
                    ':status'         : 200
              })
              
              stream.on('data',data=>{
                                                                                console.log('test: ',data.toString());
                    stream.write(data);
                    
              });
              
              stream.on('end',()=>{
                                                                                console.log('test: request complete');
                    stream.write('complete');
                    stream.end();
                    
              });
              
        }//test
                

