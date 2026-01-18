


        var port        = 3002;
        var server      = require('http').createServer(request).listen(port);
                                                                                console.log(`http://localhost:${port}/`);
        function request(req,res){
                                                                                console.log(req.method,req.url);
              var path    = req.url.slice(1);
              var type    = mime(path);
              
              res.writeHead(200,{'content-type':type});
              require('fs').createReadStream(path).pipe(res);
              
        }//request
        
        function mime(path){
        
              var ext     = path.split('.').at(-1),type;
              switch(ext){
              
                case 'html'   : return 'text/html';
                case 'js'     : return 'text/javascript';
                case 'css'    : return 'text/css';
                
              }//switch
              return 'application/octet-stream';
              
        }//mime
        
        
        