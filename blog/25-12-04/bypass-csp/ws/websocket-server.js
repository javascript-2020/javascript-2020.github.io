        
        
        
        
        var fs        = require('fs');
        var https     = require('https');
        var crypto    = require('crypto');
        
        var magic     = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
        var hdrs      = 'HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ';
        
        var key       = fs.readFileSync('key.pem');
        var cert      = fs.readFileSync('cert.pem');
        
        var server    = https.createServer({key,cert}).listen(8443);
                                                                                console.log(`listening 127.0.0.1:8443`);
        server.on('request',(req,res)=>{
          
              if(req.url!='/'){
                    res.writeHead(404).end('not found');
                    return;
              }
              res.writeHead(200).end('helloworld');
              
        });
        
        server.on('upgrade', (req,socket)=>{

              var key       = req.headers['sec-websocket-key'];
              var accept    = crypto.createHash('sha1').update(key+magic).digest('base64');
              socket.write(hdrs+accept+'\r\n\r\n');
        
              socket.on('data',buf=>{
                    
                    var len     = buf[1]&0x7f;
                    var mask    = buf.slice(2,6);
                    var data    = buf.slice(6,6+len).map((b,i)=>b^mask[i%4]);
                    var msg     = Buffer.from(data).toString();
                                                                                console.log('Received:', msg);
                    var reply   = Buffer.from(msg);
                    var hdr     = Buffer.from([0x81,reply.length]);
                    var frame   = Buffer.concat([hdr,reply]);
                    socket.write(frame);
                    
              });
        });
        


