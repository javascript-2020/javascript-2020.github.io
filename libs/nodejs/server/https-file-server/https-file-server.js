


/*

https-file.server:d

25-04-25


*/
                                                                                console.clear();
                                                                                console.log('https-file.server');
                                                                                console.log();
                                                                                console.json=v=>console.log(JSON.stringify(v,null,4));
        var dir           = argv('d','dir')||'';
        var port          = argv('p','port')||3000;
        
        var path          = require('path');
        var fs            = require('fs');
        
        var getmime       = require('./getmime.js');
        
        var key           = fs.readFileSync('key.pem');
        var cert          = fs.readFileSync('cert.pem');
        
        var abs           = path.resolve(__dirname,dir);
        if(!abs.endsWith('/')){
              abs  += '/';
        }
        
        require('https').createServer({key,cert},request).listen(port);
        
        console.log(`listening https://localhost:${port}/`);
        

  //:
  
  
        function request(req,res){
                                                                                console.log(req.method,req.url);
              if(cors(req,res))return;
              
              var url   = req.url.slice(1);
              var fn    = path.resolve(abs,url);

              var mode    = req.headers.mode;
                                                                                console.log(mode,fn);
              switch(mode){
              
                case 'load'   : load(req,res,fn);       break;
                case 'save'   : save(req,res,fn);       break;
                case 'dir'    : readdir(req,res,fn);    break;
                
              }//switch
              
        }//request
        
        
        function cors(req,res){
        
              if(req.method!=='OPTIONS'){
                    return;
              }
              
              res.setHeader('access-control-allow-origin','*');
              res.setHeader('access-control-allow-headers','mode');
              res.end();
              
              return true;
              
        }//cors
        
        
        function notfound(req,res){
        
              res.writeHead(404);
              res.end(req.url+' not found');
              
        }//notfound
  
        
  //:
  
  
        function load(req,res,fn){

              if(!fs.existsSync(fn)){
                    notfound(req,res);
                    return;
              }
              
              var mime      = getmime(fn);
              console.log('load',fn);
              var stream    = fs.createReadStream(fn);

              res.setHeader('access-control-allow-origin','*');
              res.writeHead(200,{'content-type':mime});
              stream.pipe(res);
              
        }//load
        
        
        async function save(req,res,fn){

              var stream    = fs.createWriteStream(fn);
              req.pipe(stream);
              req.on('end',()=>{
              
                    res.setHeader('access-control-allow-origin','*');
                    res.writeHead(200);
                    res.end();
                    
              });
                            
        }//save
        
        
        async function readdir(req,res,fn){
        
              if(fs.statSync(fn).isFile()){
                    var i   = fn.lastIndexOf('/');
                    fn      = fn.slice(0,i);
              }
              
              var dirs    = [];
              var files   = [];
              
              var list    = fs.readdirSync(fn,{withFileTypes:true});
              list.forEach(file=>{
              
                    if(file.isDirectory()){
                          dirs.push(file.name);
                    }
                    if(file.isFile()){
                          files.push(file.name);
                    }
                    
              });
              
              var json    = {dirs,files};
              var txt     = JSON.stringify(json);
              
              res.writeHead(200,{'access-control-allow-origin':'*'});
              res.end(txt);
              
        }//dir
        
        
  //:
  
  
        function argv(id0){
        
              var nj    = arguments.length;
              
              var ni   = process.argv.length;
              for(var i=0;i<ni;i++){
              
                    var id2   = process.argv[i];
                    for(var j=0;j<nj;j++){
                    
                          var id    = arguments[j];
                          
                          switch(id2){
                          
                            case id           :
                            case `-${id}`     :
                            case `--${id}`    : return process.argv[i+1];
                            
                          }//switch
                    
                    }//forj
                    
              }//fori
              
              return null;
              
        }//argv
        
        
        
        
        