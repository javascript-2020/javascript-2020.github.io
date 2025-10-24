
  //  download-server.js

        var fs    = require('fs');
        
        require('http').createServer(request).listen(3011);
        
        
        function request(req,res){
        
              switch(req.url){
                
                case '/download'    : download(req,res);
                                      return;
              }//switch

              var stream    = fs.createReadStream('xhr-download.html');
              res.writeHead(200,{'content-type':'text/html'});
              stream.pipe(res);
              
        }//request
        
        
        async function download(req,res){
        
              var size    = 100;
              var md      = 1024*1024;
              var str     = 'x'.repeat(mb);
              var delay   = 1000;
              
              res.setHeader('content-length',size*mb);
              
              for(var i=0;i<size;i++){
              
                    res.write(str);
                    await new Promise(res=>setTimeout(res,delay));
                    
              }//for
              
              res.end();
              
        }//download
        
