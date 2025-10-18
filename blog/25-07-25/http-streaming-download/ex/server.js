            
        var fs    = require('fs');
        
        require('http').createServer(request).listen(3000);
        console.log('http://localhost:3000');
        
        
        function request(req,res){
        
              if(req.url=='/index.html'){
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(fs.readFileSync('index.html','utf8'));
                    return;
              }

              
              var c   = 0;
              fn();
              
              
              function fn(){
              
                    res.write('hello '+c);
                    c++;
                    if(c<5){
                          setTimeout(fn,500);
                          return;
                    }
                    res.end();
                    
              }//fn
              
        }//request
        
            
