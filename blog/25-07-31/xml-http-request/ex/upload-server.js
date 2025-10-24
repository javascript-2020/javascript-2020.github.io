

  //  upload-server.js


        var {key,cert}    = require('server-cert.js');
        
        require('https').createServer({key,cert},request).listen(3010);
        
        
        function request(req,res){

              switch(req.url){
              
                case '/upload'    : upload(req,res);
                                    return;
              
              }//switch
              
              var stream    = fs.createReadStream('xhr-upload.html');
              res.writeHead(200,{'content-type':'text/html'});
              stream.pipe(res);
              
        }//request
        
        
        function cors(req,res){
        
              res.setHeader('access-control-allow-origin','*');
              res.setHeader('access-control-allow-headers','content-type');
              
              if(req.method!='OPTIONS'){
                    return;
              }
              
              res.writeHead(200);
              res.end();
              
              return true;
              
        }//cors
        
        
        function upload(req,res){
        
              req.on('data',data=>console.log(data.length));
              req.on('end',()=>{
                                                                                console.log('done');
                    res.end('ok');
                    
              });
              
        }//upload

