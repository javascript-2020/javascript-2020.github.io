

        var port        = 3002;
        var server      = require('http').createServer(request).listen(port);
                                                                                console.log(`http://localhost:${port}/`);
        var users   = [
              {name:'matt',password:'xyz',cookie:null},
        ];
        
        function request(req,res){
                                                                                console.log(req.method,req.url);
              var path    = req.url.slice(1);
              
              switch(path){
              
                case 'login'          : return login(req,res);
                case 'lougout'        : return logout(req,res);
                case 'admin.html'     : return admin(req,res);
                
              }//switch
              
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
        
        
        function post(req){
        
              var body    = '';
              for(await data of req)body+=data;
              var json    = JSON.parse(body);
              return json;
              
        }//read
        
        
        function login(req,res){
        
              var json    = post(req);
              var user    = users.find(user=>user.name===json.name);
              if(!user){
                    res.end('error');
                    return;
              }
              if(user.password!==json.password){
                    res.end('error');
                    return;
              }
              
              user.cookie   = cookie();
              res.setHeader('set-cookie',`session=${user.id};HttpOnly;Secure;SameSite=Strict;Max-Age=60`);
              res.setHeader('Location','/admin');
              res.statusCode    = 303;
              res.end('ok');
              
        }//login
        
        function logout(req,res){
        
              var json    = post(req);
              var user    = users.find(user=>user.name===json.name);
              if(!user){
                    res.end('error');
                    return;
              }
              
              user.status   = Date.now();
              user.id       = id();
              res.setHeader('set-cookie',`session=${user.id};HttpOnly;Secure;SameSite=Strict;Max-Age=0`);
              res.setHeader('Location','/login.html');
              res.statusCode    = 303;
              res.end('ok');
              
        }//logout
        
        function admin(req,res){
        
              var cookie    = req.headers.cookie;
              if(!cookie){
                    redirect();
                    return;
              }
              
              var cookie    = cookie.split('=').at(0);
              var user      = users.find(user=>user.cookie===cookie);
              if(!user){
                    redirect();
                    return;
              }
              
              res.writeHead(200,{'content-type':'text/html'});
              res.end(html.admin);
              
              function redirect(){
              
                    res.setHeader('Location','/login.html');
                    res.statusCode    = 302;
                    res.end('ok');
                    
              }//redirect
              
        }//admin
        
        