        
        
        
        
        var net   = require('net');
        var tls   = require('tls');
        var fs    = require('fs');
        
        var cert            = fs.readFileSync('cert.pem');
        var key             = fs.readFileSync('key.pem');
        var secureContext   = tls.createSecureContext({cert,key});
        
        var domains   = ['example.com','main.com'];
        var host      = '127.0.0.1';
        var port      = 1080;
        var server    = net.createServer(connection).listen(port,host);
        console.log(`HTTP CONNECT MITM proxy listening on ${host}:${port}`);

        
        function connection(client){
                                                                                console.log('client connect');          
              client.once('data',data=>{
                
                    var req       = data.toString().split('\r\n');
                    var connect   = req[0];
                                                                                //  https only                    
                    if(connect.indexOf('CONNECT')==-1){
                          client.end('HTTP/1.1 400 Bad Request\r\n\r\n');
                          return;
                    }
                    
                    var parts   = connect.split(' ');
                    var url     = parts[1];
                    var host    = url.split(':')[0];
                    var port    = url.split(':')[1];
                                                                                console.log('client',host,port);
                    client.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        
                    if(domains.includes(host)){
                          proxy(client,host,port);
                          return;
                    }
                    
                    var upstream    = net.connect(port,host);
                    upstream.on('error',()=>client.destroy());
                    
                    client.pipe(upstream);
                    upstream.pipe(client);
                    
              });
              
        }//connection


        function proxy(client,host,port){
                                                                                console.log('proxy');
              var clientTls   = new tls.TLSSocket(client,{isServer:true,secureContext,ALPNProtocols:['http/1.1']});
              clientTls.on('error',err=>{console.error(err);client.destroy(err)});
              
              var upstream    = tls.connect({host,port,servername:host,ALPNProtocols:['http/1.1'],rejectUnauthorized:false});
              upstream.on('error',err=>clientTls.destroy(err));
        
              upstream.once('secureConnect',()=>{
                                                                                console.log('secureConnect');        
                    proxy.client(clientTls,upstream);
                    proxy.upstream(clientTls,upstream);
                    
              });
              
        }//proxy

        var hdr   = {};
        hdr.rem   = (hdrs,name)=>hdrs.replace(new RegExp(`${name}.*\r\n`,'i'),'');
        hdr.add   = (hdrs,hdr)=>hdrs.slice(0,-2)+hdr+'\r\n'+hdrs.slice(-2);
        
        proxy.client    = function(clientTls,upstream){
          
              var buf     = ''
              var done    = false;
  
              clientTls.on('data',chunk=>{
                
                    if(done){
                          upstream.write(chunk);
                          return;
                    }
                    
                    buf      += chunk
                    var end   = buf.indexOf('\r\n\r\n');
                    if(end!==-1){
                          done        = true;
                          var hdrs    = buf.slice(0,end+4);
                          var rest    = buf.slice(end+4);
                                                                                // Rewrite header
                          //headers = headers.replace(/User-Agent:.*\r\n/i,'User-Agent: MITM-Proxy\r\n');
  
                          upstream.write(hdrs);
                          if(rest){
                                upstream.write(rest);
                          }
  
                          clientTls.pipe(upstream);
                    }
                    
              });
        
        }//client
        

        proxy.upstream    = function(clientTls,upstream){
          
              var buf     = ''
              var done    = false;
  
              upstream.on('data',chunk=>{
                
                    if(done){
                          clientTls.write(chunk);
                          return;
                    }
                    
                    buf      += chunk
                    var end   = buf.indexOf('\r\n\r\n');
                    if(end!==-1){
                          done        = true;
                          var hdrs    = buf.slice(0,end+4);
                          var rest    = buf.slice(end+4);
                                                                                console.log('\n\n','['+hdrs+']','\n\n');
//                          hdrs    = hdr.rem(hdrs,'content-security-policy');
                          hdrs    = hdr.add(hdrs,'x-proxy: test');
                                                                                console.log('\n\n','['+hdrs+']','\n\n');
                          clientTls.write(hdrs);
                          if(rest){
                                clientTls.write(rest);
                          }
  
                          upstream.pipe(clientTls);
                          
                    }
              });
        
        }//remote
        












        
        
