//  very-simple-proxy.js

        var http    = require('http');
        
        http.createServer(request).listen(8005);
                                                                                console.log('listening 8005');
        function request(req,res){
                                                                                console.log('8005 :',req.url);
              if(req.url=='/'){
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(html);
                    return;
              }
                                                                                console.log('8005 :','proxy');
                                                                                console.log('8005 :','request headers');
              var hdrs    = req.headers;
                                                                                Object.entries(hdrs).forEach(([key,value])=>console.log(`${key}:${value}`));
              var hdrs2   = {};
              
              /*
              var allowed   = ['user-agent','accept','content-type'];
              var sub       = Object.entries(hdrs).filter(([key])=>allowed.includes(key));
              hdrs2         = Object.fromEntries(sub);
              */
              
              var remove    = ['connection'];
              Object.entries(hdrs).forEach(([key,value])=>!remove.includes(key) && (hdrs2[key]=value));

              
         
              var url     = `http://localhost:8006${req.url}`;
                                                                                console.log('8005 :','proxy',url);
              var req2   = http.request(url,{method:req.method},res2=>{
                
                    res2.on('data',data=>res.write(data));
                    res2.on('end',()=>res.end());
                    
              });

              req.on('data',data=>req2.write(data));
              req.on('end',()=>{
                                                                                //console.log('8005 :','req end'); 
                    req2.end()
                    
              });
              
        }//request

        
        http.createServer(request2).listen(8006);
                                                                              console.log('listening 8006');
        function request2(req,res){
                                                                              console.log('8006 :',req.url);
              var body    = '';
              req.on('data',data=>body+=data);
              req.on('end',()=>{
              
                    if(req.method=='POST'){
                          var json    = JSON.parse(body);
                          console.log('post',json);
                    }
                    res.end('it works!');
                    
              });
              
        }//request2

        
        var html    = `
        
              <h3>test</h3>
              
              <script type=module>

                    var body    = JSON.stringify([1,2,3]);
                    var res     = await fetch('/test',{method:'post',body});
                    var txt     = await res.text();
                    document.body.append(txt);
                    
              </script>
              
        `;





