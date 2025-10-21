



(()=>{
  
              var fs        = require('fs');
              var http      = require('http');
              //var server    = http.createServer(request)
              var list      = [];
              
              var createServer    = http.createServer;


              http.createServer   = function(opts,listener){
                                                                                console.log('override');                
                    if(arguments.length==1){
                          listener    = opts;
                          opts        = undefined;
                    }
                    
                    if(listener){
                          list.push(listener);
                    }
                    
                    var server    = createServer.call(server,opts,request);
                    
                    var on              = server.on;
                    server.on           = function(event,listener){
                      
                          if(event==='request'){
                                list.push(args[1]);
                                return;
                          }
                          return on.apply(server,arguments);
                          
                    }//on
                    
                    return server;
                    
              }//createServer
              
              
              function request(req,res){
                                                                                console.log('sandbox',req.url);
                    if(req.url=='/setup'){
                          var html    = fs.readFileSync('setup','utf8');
                          res.writeHead(200,{'content-type':'text/html'});
                          res.end(html);
                          return;
                    }
                    
                    var n   = list.length;
                    for(var i=0;i<n;i++){
                      
                          var fn        = list[i];
                          var result    = fn(req,res);
                          if(result===false){
                                return;
                          }
                          
                    }//for
                      
              }//request
              
})();





