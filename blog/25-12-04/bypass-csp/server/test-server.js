      
  
  
        var https     = require('https');
        var fs        = require('fs');
        
        var key       = fs.readFileSync('key.pem');
        var cert      = fs.readFileSync('cert.pem');
        var server    = https.createServer({key,cert},onrequest).listen(81);
                                                                                console.log(`listening 127.0.0.1:81`);        
        server.on('secureConnection',socket=>{
                                                                                console.log('***   connection   ***');
              socket.req   = '';
              socket.res   = '';
              
              socket.on('data',data=>{
        
                    socket.req  += data.toString();
        
              });
              
              var write       = socket.write;
              socket.write    = function(data,encoding,callback){
        
                    socket.res  += data.toString();
                    write.apply(socket,arguments);
        
              }//write
        
        });
        
        
        function onrequest(req,res){
                                                                                console.log(req.method,req.url);
              res.on('finish',()=>{
              
                    console.log('---   request   ---');
                    console.log('['+req.socket.req+']');
                    console.log();
                    console.log('---   response   ---');
                    console.log('['+req.socket.res+']');
                    
              });
                                                                                console.log(JSON.stringify(req.headers,null,4));
              var body    = '';                                                                                
              req.on('data',data=>body+=data);
              
              req.on('end',()=>{

                    if(req.url!='/'){
                          res.writeHead(404).end('not fouund');
                          return;
                    }
                                  
                    var csp   = `default-src 'self';connect-src 'self';script-src 'self' 'unsafe-inline';`;
                    var headers   = {
                          'content-type'                    : 'text/html',
                          'content-security-policy'         : csp,
                          'access-control-allow-origin'     : '*',
                          'access-control-expose-headers'   : 'content-length, content-encoding, content-disposition etag'
                    }
                    res.writeHead(200,headers);
                    res.end(html)
                    
              });
        
        }//onresquest
        
        
        var html    = `
              <h3>it works!</h3>
              <script>
                    console.clear();
                    fetch('/').then(res=>res.headers.forEach((value,key)=>console.log(key,value)));
              </script>
        `;


