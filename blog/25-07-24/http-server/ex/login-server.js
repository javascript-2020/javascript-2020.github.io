

        var port        = 3003;
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
              
              var txt;
              var code    = 200;
              switch(path){
              
                case 'home.html'      : txt=html.home;      break;
                case 'login.html'     : txt=html.login;     break;
                
                default               : txt=html.notfound;
                                        code=404;
                                        
              }//switch
              
              res.writeHead(code,{'content-type':'text/html'});
              res.end(txt);
              
        }//request
        
        
        async function post(req){
        
              var body    = '';
              for await(data of req)body+=data;
              var params    = new URLSearchParams(body);
              var json      = Object.fromEntries(params);
                                                                                console.log(json);
              return json;
              
        }//read
        
        
        async function login(req,res){
        
              if(req.method=='GET'){
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(html.login);
                    return;
              }
              
              var json    = await post(req);
              var user    = users.find(user=>user.name===json.name);
              if(!user){
                                                                                console.log('user not found');
                    error();
                    return;
              }
              if(user.password!==json.password){
                                                                                console.log('invalid password');
                    error();
                    return;
              }
                                                                                console.log('ok');
              user.cookie   = cookie();
              res.setHeader('set-cookie',`session=${user.cookie};HttpOnly;Secure;SameSite=Strict;Max-Age=60`);
              res.setHeader('Location','/admin.html');
              res.statusCode    = 303;
              res.end('ok');
              
              
              function error(){
              
                    var i     = html.login.indexOf('</h4>')+5;
                    var err   = '<p style="color:red">Invalid username or password</p>';
                    var txt   = html.login.slice(0,i)+err+html.login.slice(i+1);
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(txt);
                    
              }//erorr
              
              
              function cookie(){
              
                    var rnd   = ()=>Math.floor(Math.random()*10);
                    var str   = '';
                    for(var i=0;i<10;i++)str+=rnd();
                    return str;
                    
              }//cookie
              
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
                                                                                console.log(cookie);
              if(!cookie){
                    redirect();
                    return;
              }
              
              var cookie    = cookie.split('=').at(1);
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
        
  //:
  
        var html    = {};
        
        html.home   = `
      <style>
            h3{display:flex;align-items:center;gap:10px}
            a{margin:10px}
      </style>
      <h3>
            <img src='data:image/webp;base64,UklGRsYCAABXRUJQVlA4WAoAAAAQAAAAHQAAGQAAQUxQSEQBAAABgLNt2/F2Q88RvlttW5v5ZaxtrtGeOd28BVttTsGmudYU1HYb1NGnNiImAP4r428KUwEY8VhLC5aMaEiVZaHq+SPb15ftSN3rRwYVVkUBf71+yuYi/FJnk2Dz1tYL+617vy6yR9VEgHg7O2suqkcYXnCVmN9v/SBnu7+/mffzQc2ydavV6iJ/alQrhzAftl9UVGHVFgVcYwDgo/4POl4xAv7jxvoTNZcYz092eH3ppEGKF9U84qJ+b1S34LFR7y+198ujXjwA7JWay/XbQhSwTsdRPBFUK3Wum1sKSiCJlCbXk43cUbYPI7igQyQSaV1Uv8TgG9ExsLJ++eGi+jWEACAiisFgsINTq6SqS1LPUj8UXCAR+QEhSu0YPbQT3KpU+sN1kR+QZkSU9akOL+0fHx/2S70kFWhkR6QWVFWVFaQi+I9WUDggXAEAAHAJAJ0BKh4AGgA+kUCaSiWjoiGoCACwEglsAJ0yhHV3s3CGbEmSPsB4un+A/gHYA3hreNv249JYwATPYXkhwRyxHA4AtmKE3v8Fe1hEjGxF8yTViAD+93f7uzp/cY6ee3cA/ABmw2BiLBBVJKJz/g+cTgthx8Ebkftx2bQEJ3MflzgosWtuKltj/hI3RMoAwFxeBmu+eSJtbRgZ61ptIxyi2MdEDCHjPj3jX/opDt6LYy9ANPrxM63NhtMHlfxAVPpzvXcXYj84f1o/Lm7EYg5vf/264/ub16UBvELBYFRTSG1Q6wi37a7tFWHTD8aa9H5txf/ovVaLWiyh7unAHE2QicwcSI90vHadzi8AAqKMc8FXPp/6Vr/JoQOFEyOav3ySNoeHDpeofn5plRg2Kp2pgj7OAxFkvtfut7l5r0N7JZcZOXQoMv5ML/VcchnpevFx9GBdPtEtrDwAAA=='>
            home
      </h3>
      <div>
            <a href='login.html'>login</a>
            <a href='admin.html'>admin</a>
      </div>
        `;
        
        html.login    = `
      <style>
            form{border:1px solid lightgray;padding:10px;display:inline-flex;flex-direction:column;gap:10px}
            label{width:60px;text-align:right;display:inline-block;margin:10px}
            h4,span{text-align:center;margin:0}
            input{font-size:16;padding:5px 10px}
      </style>
      <form action='login' method=post>
            <h4>login</h4>
            <div>
                  <label for=name>name</label>
                  <input name=name autocomplete=off spellcheck=false>
            </div>
            <div>
                  <label for=password>password</label>
                  <input name=password autocomplete=off spellcheck=false>
            </div>
            <span>
                  <input type=submit>
            </span>
      </form>
        `;
        
        html.admin    = `
      <style>
            h3{color:green;font-style:italic}
            a{margin:10px}
      </style>
      <h3>admin</h3>
      <div>
            <a href='home.html'>home</a>
            <a href='logout'>logout</a>
      </div>
        `;
        
        html.notfound   = `
      <style>
            a{margin:10px}
      </style>
      <h3>not found</h3>
      <a href='home.html'>home</a>
      <a href='login.html'>login</a>
      <a href='admin.html'>admin</a>
        `;
        
        
        
        