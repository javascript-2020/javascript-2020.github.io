            
        var fs    = require('fs');
        
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
                          res.end();
                          return;
                    }
                    c++;
                    setTimeout(fn,delay);
                    
              }//fn
              
        }//stream
        
        
        function request(req,res){
        
              if(req.url=='/stream'){
                    stream(req,res);
                    return;
              }


              if(req.url=='/setup'){
                                                                                console.log(req.url);
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(fs.readFileSync('setup','utf8'));
                    return;
              }

              res.end('[ not found ]');
              
        }//request
        
        
        
            
