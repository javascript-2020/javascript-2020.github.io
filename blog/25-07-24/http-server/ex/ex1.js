


        var fs      = require('fs');
        var path    = require('path');
        
        
        var img   = {};
        
        
        var host      = '127.0.0.1';
        var port      = 3001;
        
        var server    = require('http').createServer(request).listen({host,port});
                                                                                console.log(`http://${host}:${port}/`);
                                                                                
                                                                                
        function request(req,res){
                                                                                console.log(req.method,req.url);
              if(cors(req,res)){
                    return;
              }
              
              
              var handled   = true;
              
              switch(req.url){
              
                case '/hello'         : hello(req,res);         break;
                case '/favicon.ico'   : favicon(req,res);       break;
                
                default               : handled   = false;
                
              }//switch
              
              if(handled)return;
              
              
              var abs   = resolve(req.url);
              if(!abs){
                    badrequest(req,res);
                    return;
              }
              
              if(!fs.existsSync(abs)){
                    notfound(req,res);
                    return;
              }
              
              
              var stream    = fs.createReadStream(abs);
              
              var type    = mime(abs);
              res.writeHead(200,{'content-type':type});
              stream.pipe(res);
              
        }//request
        
        
  //:
  
  
        function cors(req,res){
        
              cors.headers(res);
              
              if(req.method!='OPTIONS'){
                    return;
              }
                                                                                console.log('cors');
              res.writeHead(200);
              res.end();
              return true;
              
        }//cors
        
        
        cors.headers    = function(res){
        
              res.setHeader('access-control-allow-origin','*');
              
        }//headers
        
        
  //:
  
  
        function badrequest(req,res){
                                                                                console.log('bad request');
              res.writeHead(400);
              res.end(`${req.url} bad request`);
              
        }//bad
        
        
        function notfound(req,res){
                                                                                console.log('not found');
              res.writeHead(400);
              res.end(`${req.url} not found`);
              
        }//notfound
        
        
  //:
  
  
        resolve.df    = false;
        
        function resolve(url,docroot='.'){
                                                                                resolve.df && console.log('=== resolve ===');
                                                                                resolve.df && console.log('url :',url);
                                                                                resolve.df && console.log('docroot :',docroot);
              url         = decodeURI(url);
              url         = url.slice(1);
                                                                                resolve.df && console.log('url :',url);
              var p2      = path.resolve(docroot);
                                                                                resolve.df && console.log('p2 :',p2);
              var file    = path.resolve(docroot,url);
                                                                                resolve.df && console.log('file :',file);
              var s       = file.substring(0,p2.length);
                                                                                resolve.df && console.log('s :',s);
              var p1      = path.resolve(s);
                                                                                resolve.df && console.log('p1 :',p1);
              if(p1!==p2){
                                                                                resolve.df && console.log('fail');
                    return false;
              }
              
              if(url.endsWith('/')){
                    file   += '/';
              }
                                                                                resolve.df && console.log('ok',file);
              return file;
              
        }//resolve
        
        
  //:
  
  
        function hello(req,res){
        
              res.writeHead(200,{'content-type':'text/html'});
              res.end(`
                    <style>html{font-family:arial}</style>
                    <h3>It Works!</h3>
                    <h4 style='color:blue'>hello</h4>
              `);
              
        }//hello
        
        
        function favicon(req,res){
        
              var buf   = Buffer.from(img.favicon,'base64');
              
              res.writeHead(200,{'content-type':'image/png'});
              res.end(buf);
              
        }//favicon
        
        
  //:
  
  
        function mime(fn){
        
              var ext   = fn.split('.').at(-1);
              switch(ext){
              
                case 'html'   : return 'text/html';
                case 'css'    : return 'text/css';
                case 'js'     : return 'text/javascript';
                
              }//switch
              
        }//mime
        
        
        
        img.favicon   =
        
              'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAABsFBMVEVHcEzY'   +
              'yZrsuEbkjh7rrDb2ujDwph3bhSTmiRPpggjrrTDgoEHlvmHqhQnbji/shATq'   +
              'nyfzsRntryb3th33uR3iiBnrkRLvkQjogwrtjAnoixLmgwzzrRz0sB7rnSHy'   +
              'qRvytB3usCX3vSnuqyf2uBn1uB/2uRv2uhnngQztmRbrlRPtiwXphQnqgwbv'   +
              'mhDxnw/zoxTvlgzymwv2uCbwlwj3vyn1tBbzqx/5xDX2uBb2uhn////+///t'   +
              'hADthgDzlQH0lwH6qQHykwD5pgHzkADviAH3pAH7qwH9sAH1mgHtggD+/vvy'   +
              'jgHwjQH7rQH8+/X5pwHvigD9sQD7uhz60l/379zhgwbikRD0oQT1ngL2nAH5'   +
              'xUP6yEfgpEfpvF7x5cXx4brunwT06dLphQLs1ajmpB77rAH4vjX8rwHjoS7p'   +
              'yI3fkifpzqHpjgL2rxz7+O3fjB75shX0qRn1pA77swj5z1jtlADdhxHhsWno'   +
              'wXXmiAHy3K7pqjDgnDzsoxP69uvv1Zb1tCfuuUHuqA73nwP0rw/5zlT5zFH7'   +
              'wTLs3L7ps0jgun3jwoLju3nouVLnmArvlstGAAAAO3RSTlMAAxA1Gv19G3Pb'   +
              'HwwGzRL8P3MrzsJOlea84pqnqtpqylEl72W4RnynkaiO++Xsyt3X1Njv9eWP'   +
              '8vZilVucdXYAAAIZSURBVCjPjZMHc9owFICZYUMY2bOZ3XsjHFpKIBhju+y9'   +
              'yw6Ekb1oZlf6lysJTGib3vU7n+/pfVq2nni8fvgKgZL3DwSLS8sGw8LbN7ob'   +
              'usiX9K8vPJBW5MXyIv93yZ/Vhz3nl27IZcRzPvdS1G+V2rlWxN38iLE3c63w'   +
              'gq5vrFZ84c7n83b72ZkLvvPNcMRwq6dnn0U2XAjb5+MTHLhy4UkBtyt9eMP2'   +
              'yQafkz36ahUGsJETa7t6QNx+h7FcVUEiy3QauanO9PIpMcNYIMxhApB0LMnA'   +
              'JmNZFw9gPd9eX4UEAskYDQCIZ5MB2LRY2jNodf4ktIHD/a87x14jhEwUY/uo'   +
              'S/3VIPqXM/XTYCzupUkAkIYTkEfeTDbYqM9DLXrcCIYKCay6AEDv/AyeNtDi'   +
              'okfBUMhciIN++92/FgoFsH66BtkspK49WfSbURJpwUMzYjPq7dmyfwXnptHO'   +
              '76xgKhlO09EKzjxHO+dNv8f493qjtys48wSfqm7kA8Kf6q39Yxdn7naOc5hy'   +
              'Op1UyWsEZOpLFX59cRcmnCPCzpEIxyiKYg+qZOpbaStaPjJmfDBBDXMVJb3H'   +
              'skQ0vl3zEWzad1DObLEsq5Jz5aAYt1qJWs2XtkKItK8Eg7HB62pSj2sIk4ng'   +
              'gKFsqL8WFdL7JoeJw6EZFf5R58KJB44uGpVU/dc9UAqlEyqZTDZ6e0hy8zXi'   +
              'qyUSiYL3//wC2BenWkIiIBYAAAAASUVORK5CYII='
              
              