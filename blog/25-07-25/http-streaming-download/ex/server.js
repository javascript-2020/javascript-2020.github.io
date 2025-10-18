            
        var fs    = require('fs');
        
        require('http').createServer(request).listen(3000);
                                                                                console.log('http://localhost:3000');

        function stream(req,res){
                                                                                console.log(req.url);
              var c   = 1;
              fn();
              
              
              function fn(){
                                                                                console.log('stream',c);
                    res.write('hello '+c);
                    if(c==5){
                          res.end();
                          return;
                    }
                    c++;
                    setTimeout(fn,500);
                    
              }//fn
              
        }//stream
        
        
        function request(req,res){
        
              if(req.url=='/index.html'){
                                                                                console.log(req.url);
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(fs.readFileSync('index.html','utf8'));
                    return;
              }

              if(req.url=='/stream'){
                    stream(req,res);
                    return;
              }
              
              res.end('[ not found ]');
              
        }//request
        
        
        
            
