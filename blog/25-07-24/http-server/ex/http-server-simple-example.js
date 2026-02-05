


        var host          = '127.0.0.1';
        var port          = 3001;
        var {key,cert}    = setup();
        
        var server        = require('https').createServer({key,cert},request);
        server.listen({host,port});
                                                                                console.log(`https://${host}:${port}/`);
                                                                                
        var fs      = require('fs');
        var path    = require('path');
        
        var img     = {};
        
        
        function request(req,res){
                                                                                console.log(req.method,req.url);
              cors.headers(res);
              
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
              
              
              var err;
              try{
              
                    var stat    = fs.statSync(abs);
                    
              }//try
              catch(err2){
              
                    err   = err2;
                    
              }//catch
              if(err){
                    notfound(req,res);
                    return;
              }
              if(!stat.isFile()){
                    notfound(req,res);
                    return;
              }
              
              
              
              var stream    = fs.createReadStream(abs);
              
              var type    = mime(abs);
              res.writeHead(200,{'content-type':type});
              stream.pipe(res);
              
        }//request
        
        
  //:
  
  
        cors.headers    = function(res){
        
              res.setHeader('access-control-allow-origin','*');
              
        }//headers
        
        
        function cors(req,res){
        
              if(req.method!='OPTIONS'){
                    return;
              }
                                                                                console.log('cors');
              res.writeHead(200);
              res.end();
              return true;
              
        }//cors
        
        
        function badrequest(req,res){
                                                                                console.log('bad request');
              res.writeHead(400);
              res.end(`400 bad request : ${req.url}`);
              
        }//bad
        
        
        function notfound(req,res){
                                                                                console.log('not found');
              res.writeHead(404);
              res.end(`404 not found : ${req.url}`);
              
        }//notfound
        
        
  //:
  
  
        resolve.df    = true;
        
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
                    <style>html{font-family:arial}body{margin:20px}</style>
                    <h3>HTTPS Works!</h3>
                    <h4 style='color:blue'>/hello</h4>
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
              
              return 'application/octet-stream';
              
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
              
              
        function setup(){
        
              key   =
                    '-----BEGIN RSA PRIVATE KEY-----\n'                                   +
                    'MIIEpAIBAAKCAQEAqWZ5x4R8GVoRKeXe++SN54MzUD1BD/eNfmELIedKeof0m/Cx\n'  +
                    'XQZn2KyxYzvPmCKM6qv0Y458sadmaG0HQGUb55lmox6T7U5LjF3C7HM2PZjuQw5Z\n'  +
                    '4nnCEcu/yEcqNU/a5b9noBY132v/0iIvOn5f4ptQZ8JslU6YmCdznt23rgHUjcOx\n'  +
                    'LYdU8xT53HwEvxZoem8hVIYek+mX2nU8AIj0WMx+piqaxtxFHv6PNmNe6M81ggxL\n'  +
                    'Tr7DvECS+Nl+s5ec7uOClsgafKt5ZxvYufsI7vxTC47/Co2TYuNgpIVqmpykg1Yx\n'  +
                    'KyElGzSIpB7bzDlqq8erU98kjCYzjTiy67KJuQIDAQABAoIBABblbOxUsdlTXSKG\n'  +
                    'mV7+g1eZWiQsQ1D/Kra8Mx7//gcVvTAeljp2lS6qGMfK28I6WUWWvE+AgMYaVDMl\n'  +
                    'GWfQwrbI+yBtD51xibCNM711zQ0CUKHrnKaJwntZSLCvPbs68eE/v6fZmKp8FHW4\n'  +
                    'fR2w2xDr4TBFDRwZJXLbUjtUyHDSQSMUiIfAsJoDTloAsYXGm5bqVv+9mxvli0gp\n'  +
                    'lmiFW3CZCmZC9vjid1Gn4CI3SpwU/Mu6a8ldvA/fU6WnTJ+Wlpi8DcvacmaHLqAd\n'  +
                    'U+CXchyi1/Q6TmG3a82QRIntSLA4R+tr6OLQprMre1C9Mb/e+7L0TG0TCYlKLuvj\n'  +
                    '4W3PgckCgYEA/TEYkDtc0m4nXmPwxYJQkPyMT/BGqvoAcKBu7EF28+bN8de53SHP\n'  +
                    'PREsdFgN/vPGvjHsIXhPyNmRkw+kRYtUCmUWD2SJN0weZ0d+Q3NtGSfLiXIlJwaT\n'  +
                    '/vlyxevVg+JW/8c5sL7Fj4vAVxJCJzYM9Kzvsst4t85eAY/DIp09W6cCgYEAq0d3\n'  +
                    'D7aJwWLi2IdPjW2rJ/bdgLMDUGo0x85RCBH2qb7MPAVenQylcknXXvSLrwv93PbJ\n'  +
                    'w+IQuS1hRXmRLSq24TmOX7hWLILBhUh7bEwQqW6cr0TX4QgkbI8CJNwfyTKqj0ye\n'  +
                    'UEEUCnBaDboTqPAXM9+EAQwzmaSlkQM3VPQ0G58CgYEAve/yyWB/Ba11Ay5eFQzp\n'  +
                    'e5q5d858dQ8O/W6dR8bkgZwHqwF2gRk36kvT2YOlHDmsQkoZJhKnZ7kvp+74AOPA\n'  +
                    'q/uhTPLSrRUBSeEsK1WP5msgGX/ztw8MPx7KpweAKWvGcCL4eErk0ga4x5j+34OA\n'  +
                    'vJxvROW3Lcw2YV2DuZfTy8kCgYABv5gCjA158OV56l+whOcTYFzAfJNTFdJ2G7AO\n'  +
                    'EgjfkLgLAM8HcWKa+Q/+wyZN4iR0RfynSD59dW4hxGzr9hypzembJomSqL8K+kNw\n'  +
                    'RpKA+EUXMO+3N1sP1KHj+G9GoYLGNbUEArYOqTjyHO0oc1L5T5XMYPCB6AFcqpi9\n'  +
                    'AEUr5wKBgQC/m5Eq2XWG2XP1i3G0ut0ierM8+XXw1ydiyAOuHM3aUBwtCirsIBAd\n'  +
                    'kGlVjhwrYIs6DfcPf0hdroPmEHl8BBb1zGUISYZSNhVY2Sxfut26nYAIV85pSmrg\n'  +
                    'Lk1ryU8dYQMT7+7GqxfSaznp6iGm/Blfcnk9YbBOgvs7i6ewJC49kg==\n'          +
                    '-----END RSA PRIVATE KEY-----\n'
              ;
              cert    =
                    '-----BEGIN CERTIFICATE-----\n'                                       +
                    'MIIDcjCCAlqgAwIBAgIBATANBgkqhkiG9w0BAQUFADAlMSMwIQYDVQQDExpsb2Nh\n'  +
                    'bGhvc3QgdGVzdCBjZXJ0aWZpY2F0ZTAeFw0yNTA2MjYxNzQ5MDBaFw0yNjA2MjYx\n'  +
                    'NzQ5MDBaMCUxIzAhBgNVBAMTGmxvY2FsaG9zdCB0ZXN0IGNlcnRpZmljYXRlMIIB\n'  +
                    'IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqWZ5x4R8GVoRKeXe++SN54Mz\n'  +
                    'UD1BD/eNfmELIedKeof0m/CxXQZn2KyxYzvPmCKM6qv0Y458sadmaG0HQGUb55lm\n'  +
                    'ox6T7U5LjF3C7HM2PZjuQw5Z4nnCEcu/yEcqNU/a5b9noBY132v/0iIvOn5f4ptQ\n'  +
                    'Z8JslU6YmCdznt23rgHUjcOxLYdU8xT53HwEvxZoem8hVIYek+mX2nU8AIj0WMx+\n'  +
                    'piqaxtxFHv6PNmNe6M81ggxLTr7DvECS+Nl+s5ec7uOClsgafKt5ZxvYufsI7vxT\n'  +
                    'C47/Co2TYuNgpIVqmpykg1YxKyElGzSIpB7bzDlqq8erU98kjCYzjTiy67KJuQID\n'  +
                    'AQABo4GsMIGpMAkGA1UdEwQCMAAwIAYDVR0RBBkwF4IJbG9jYWxob3N0hwR/AAAB\n'  +
                    'hwR/AAACMB0GA1UdDgQWBBRN+qxeeW3ngsZaImHYKWaf4ztRkDALBgNVHQ8EBAMC\n'  +
                    'AvQwOwYDVR0lBDQwMgYIKwYBBQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYB\n'  +
                    'BQUHAwEGCCsGAQUFBwMIMBEGCWCGSAGG+EIBAQQEAwIA5zANBgkqhkiG9w0BAQUF\n'  +
                    'AAOCAQEAgoAgtNpwyHjf/lEaYNxPXU3IuvpBJb0J2pU/vU3ImGTZoCpEjqAnduUB\n'  +
                    'zPIL9jk2xoIn4w2u8h4AALi/0+8/w+Lf39EGVw2v5Obd5/L00aRtYq4syitWh7st\n'  +
                    'cGiJhL6OR6sZw1/Z+MsQWoXn1K8wEusalNs9zTimpn/wt+fFFem5Ao5sFKp7OvxE\n'  +
                    'tJGOIjEq0ErBvbejRMLQTFHaBKsSyA/G8fFyQaAdnOuPHpJJjNfWhrNfr3kxuKsF\n'  +
                    'c7BcCD7p6Q3GVcUsIpAudj6k0ueDottTlQ7PVwiJlWTISvzCrz4dI1dwE7VpZ04Y\n'  +
                    'AZpOcmiSQO2WFjUS/N5y9g+zJs/Osw==\n'                                  +
                    '-----END CERTIFICATE-----\n'
              ;
              return {key,cert};
              
        }//setup
        
        
        
        