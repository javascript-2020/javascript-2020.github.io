

  //  upload-server.js


        var {key,cert}    = require('server-cert.js');
        
        require('https').createServer({key,cert},request).listen(3010);
        
        
        function request(req,res){

              if(cors(req,res))return;
              
              var f   = true;
              switch(req.url){
              
                case '/'          : res.end('helloworld');        break;
                case '/upload'    : upload(req,res);              break;
                
                default           : f   = false;
              
              }//switch
              
              if(!f){
                    res.end('not found');
              }
              
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

