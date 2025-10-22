
        var http    = require('http');


  //proxy
  
        http.createServer(request).listen(8005);
                                                                                console.log('[ proxy ]','listening 8005');
        function request(req,res){
                                                                                console.log('[ proxy ]',req.url);
              if(req.url=='/'){
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(html);
                    return;
              }
                                                                                console.log('[ proxy ]','--  proxy  --');
                                                                                console.log('[ proxy ]','request headers');
              var headers    = {...req.headers};
                                                                                hdrs.display(headers);
              //var allowed   = ['user-agent','accept','content-type'];
              //hdrs.allow(headers,allowed);
              
              var remove    = ['connection','host','origin','referrer'];
              hdrs.remove(headers,remove);
              var rewrite   = {};
              hdrs.rewrite(headers,rewrite);
                                                                                console.log('[ proxy ]','**  proxy request headers  **');
                                                                                hdrs.display(headers);
                                                                                
              var url     = `http://localhost:8006${req.url}`;
                                                                                console.log('[ proxy ]','proxy',url);
              var req2    = http.request(url,{method:req.method,headers},response);

              req.on('data',data=>req2.write(data));
              req.on('end',()=>req2.end());


              function response(res2){
                                                                                console.log('[ proxy ]','proxy response');                
                    var code      = res2.statusCode;
                    var headers   = {...res2.headers};
                                                                                console.log('[ proxy ]','response headers');
                                                                                hdrs.display(headers);
                    var remove    = ['connection'];
                    hdrs.remove(headers,remove);
                    var rewrite   = {};
                    hdrs.rewrite(headers,rewrite);
                                                                                console.log('[ proxy ]','**  proxy response headers  **');
                                                                                hdrs.display(headers);
                    res.writeHead(code,headers);
                    
                    res2.on('data',data=>res.write(data));
                    res2.on('end',()=>res.end());
                    
              }//response
              
        }//request

        var html    = `
        
              <h3>test</h3>
              
              <script type=module>

                    var headers   = {authorization:'xyz'}
                    var body      = JSON.stringify([1,2,3]);
                    var res       = await fetch('/test',{method:'post',headers,body});
                    var txt       = await res.text();
                    document.body.append(txt);
                    
              </script>
              
        `;


  //client
  
        http.createServer(request2).listen(8006);
                                                                              console.log('[ client ]','listening 8006');
        function request2(req,res){
                                                                              console.log('[ client ]',req.url);
                                                                              
              var body    = '';
              req.on('data',data=>body+=data);
              req.on('end',()=>{
                
                    var headers    = {...req.headers};
                                                                                hdrs.display(headers);
                                                                                body && console.log('   - body',body);
                    res.end('it works!');
                    
              });
              
        }//request2


  //:
  
  
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
        
        





