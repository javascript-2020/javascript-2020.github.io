            

        require('http').createServer(request).listen(3000);
                                                                                console.log('http://localhost:3000');

        function stream(req,res){
                                                                                console.log(req.url);
              var c       = 1;
              var max     = 20;
              var delay   = 1000;
              
              fn();
              
              
              function fn(){
                                                                                console.log('stream',c);
                    res.write('hello '+c);
                    if(c==max){
                                                                                console.log('stream','done');
                          res.end();
                          return;
                    }
                    c++;
                    setTimeout(fn,delay);
                    
              }//fn
              
        }//stream
        
        
        function request(req,res){
                                                                                console.log('request',req.method,req.url);
              if(req.url=='/stream'){
                    stream(req,res);
                    return;
              }

              res.end('[ not found ]');
              
        }//request
        
        
        
            
