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
                                                                                console.log('8005 :','--  proxy  --');
                                                                                console.log('8005 :','request headers');
              var headers    = {...req.headers};
                                                                                hdrs.display(headers);
              //var allowed   = ['user-agent','accept','content-type'];
              //hdrs.allow(headers,allowed);
              
              var remove    = ['connection','host','origin'];
              hdrs.remove(headers,remove);
              var rewrite   = {};
              hdrs.rewrite(headers,rewrite);
                                                                                console.log('8005 :','**  proxy request headers  **');
                                                                                hdrs.display(headers);
                                                                                
              var url     = `http://localhost:8006${req.url}`;
                                                                                console.log('8005 :','proxy',url);
              var req2    = http.request(url,{method:req.method,headers},response);

              req.on('data',data=>req2.write(data));
              req.on('end',()=>req2.end());


              function response(res2){
                                                                                console.log('8005 :','proxy response');                
                    var code      = res2.statusCode;
                    var headers   = {...res2.headers};
                                                                                console.log('8005 :','response headers');
                                                                                hdrs.display(headers);
                    var remove    = ['connection'];
                    hdrs.remove(headers,remove);
                    var rewrite   = {};
                    hdrs.rewrite(headers,rewrite);
                                                                                console.log('8005 :','**  proxy response headers  **');
                                                                                hdrs.display(headers);
                    res.writeHead(code,headers);
                    
                    res2.on('data',data=>res.write(data));
                    res2.on('end',()=>res.end());
                    
              }//response
              
        }//request

        
        http.createServer(request2).listen(8006);
                                                                              console.log('listening 8006');
        function request2(req,res){
                                                                              console.log('8006 :',req.url);
                                                                              
              var body    = '';
              req.on('data',data=>body+=data);
              req.on('end',()=>{
                
                    var headers    = {...req.headers};
                                                                                hdrs.display(headers);
                    if(req.method=='POST'){
                                                                                console.log('   - post',body);
                    }
                    
                    res.end('it works!');
                    
              });
              
        }//request2


        var hdrs    = {};
        
        hdrs.allow    = function(hdrs,allow=[]){
          
              Object.keys(hdrs).forEach(key=>!allowed.includes(key) && (delete hdrs[key]));
          
        }//allow
        
        hdrs.remove   = function(hdrs,remove=[]){
          
              Object.keys(hdrs).forEach(key=>remove.includes(key) && (delete hdrs[key]));          
              
        }//remove
        
        hdrs.rewrite    = function(hdrs,rewrite={}){
          
              Object.entries(rewrite).forEach(([key,value])=>hdrs[key]=value);
              
        }//rewrite

        hdrs.display    = function(hdrs){
          
              Object.entries(hdrs).forEach(([key,value])=>console.log(`   - ${key}:${value}`));
              
        }//display
        
        
        var html    = `
        
              <h3>test</h3>
              
              <script type=module>

                    var headers   = {authorisation:'xyz'}
                    var body      = JSON.stringify([1,2,3]);
                    var res       = await fetch('/test',{method:'post',headers,body});
                    var txt       = await res.text();
                    document.body.append(txt);
                    
              </script>
              
        `;





