            
            
        require('http').createServer(request).listen(3000);
        console.log('http://localhost:3000');
        
        
        function request(req,res){
        
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
        
            
