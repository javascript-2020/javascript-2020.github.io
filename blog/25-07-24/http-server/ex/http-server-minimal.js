


        var port        = 3002;
        var server      = require('http').createServer(request).listen(port);
                                                                                console.log(`http://localhost:${port}/`);
        function request(req,res){
                                                                                console.log(req.method,req.url);
              var url   = req.url.slice(1);
              
              if(url==''){
                    res.writeHead(200,{'content-type':'text/html'}).end(html);
                    return;
              }
              
              var ext     = url.split('.').at(-1),type;
              switch(ext){
              
                case 'html'   : type='text/html';
                case 'js'     : type='text/javascript';       break;
                case 'css'    : type='text/css';              break;
                
              }//switch
              
              res.writeHead(200,{'content-type':type});
              require('fs').createReadStream(url).pipe(res);
              
        }//request
        
        
        var html    = `
              <style>html{font-family:arial}body{margin:20px}</style>
              <h3>It Works!</h3>
        `;
        
        
        
        