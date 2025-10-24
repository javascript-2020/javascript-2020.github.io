

        var fs            = require('fs');
        
        require('http').createServer(request).listen(3010);
        
        
        function request(req,res){
                                                                                console.log(req.method,req.url);
              switch(req.url){
              
                case '/upload'    : upload(req,res);
                                    return;
              
              }//switch
              
              var stream    = fs.createReadStream('xhr-upload.html');
              res.writeHead(200,{'content-type':'text/html'});
              stream.pipe(res);
              
        }//request
        
        
        function upload(req,res){
        
              req.on('data',data=>console.log(data.length));
              req.on('end',()=>{
                                                                                console.log('done');
                    res.end('ok');
                    
              });
              
        }//upload

