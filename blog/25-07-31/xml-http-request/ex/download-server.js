  //  download-server.js


        var {key,cert}    = require('server-cert.js');
        
        require('https').createServer({key,cert},request).listen(3010);
        
        
        function request(req,res){
        
              if(cors(req,res))return;
              
              var f   = true;
              switch(req.url){
                
                case '/'            : res.end('helloworld');        break;
                case '/download'    : download(req,res);            break;
                
                default             : f   = false;
                
              }//switch
              
              if(!f){
                    res.end('not found');
              }
              
        }//request
        
        
        function cors(req,res){
        
              res.setHeader('access-control-allow-origin','*');
              res.setHeader('access-control-allow-headers','content-length');
              
              if(req.method!='OPTIONS'){
                    return;
              }
              
              res.writeHead(200);
              res.end();
              
              return true;
              
        }//cors
        
        
        async function download(req,res){
        
              res.setHeader('content-length',100);
              var str   = '0123456789';
              
              for(var i=0;i<10;i++){
              
                    res.write(str);
                    await new Promise(res=>setTimeout(res,1000));
                    
              }//for
              
              res.end();
              
        }//download
        
