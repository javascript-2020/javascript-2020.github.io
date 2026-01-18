


        var fs    = require('fs');
        
        setup();
        
        var key,cert;
        var port    = 3002;
        
        var server    = require('http').createServer({key,cert},request).listen(port);
        
        
        function request(req,res){
        
              if(!fs.existsSync(req.url)){
                    res.writeHead(404).end(`404 Not Found : ${req.url}`);
                    return;
              }
              var stat    = fs.statSync(req.url);
              if(!stat.isFile()){
                    res.writeHead(404).end(`404 Not Found : ${req.url}`);
                    return;
              }
              
        }//request
        
        
        function setup(){
        
        
        }//setup