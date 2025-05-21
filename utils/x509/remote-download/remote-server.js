


                                                                                console.clear();
                                                                                console.log('cert-test');
                                                                                console.log();
                                                                                console.json=v=>console.log(JSON.stringify(v,null,4));
                                                                                
        var tls           = require('tls');

        var auth          = 'cert-432';
      
        var host          = 'console.cloud.google.com';
        var host          = 'javascript-2020.github.io';
      

        var port          = 443;
        var servername    = host;
        
        
        
        exports.test      = test;        
        
        
        function test(req,res){
                                                                                console.log(req.method,req.url);
                
              if(req.url==='/page'){
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(page);
                    return;
              }
              
              if(cors(req,res))return;
              if(authchk(req,res))return;
              
              if(req.url==='/cert'){
                    cert(req,res);
                    return;
              }
              
              req.socket.desroy();
              
        }//test
        
        
        function cert(req,res){
        
              host          = req.headers.cert||host;
              port          = req.headers.port||port;
              servername    = host;
              
              let socket    = tls.connect({port,host,servername},complete);

              
              function complete(){
              
                    var x509    = socket.getPeerX509Certificate();
                    
                                                                                console.log(x509);
                                                                                console.log(x509.publicKey);
            
                    var cert    =   x509.toString();
                    
                    var txt     = download;
                    txt         = txt.replaceAll('/*host*/',host);
                    txt         = txt.replace('/*cert*/',cert);
                    
                    res.setHeader('access-control-allow-origin','*');
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(txt);

                    
              }//complete
              
        }//test


        function cors(req,res){
        
              if(req.method!=='OPTIONS'){
                    return;
              }
                                                                                console.log('cors');
              res.setHeader('access-control-allow-origin','*');
              res.setHeader('access-control-allow-headers','auth');
              res.end();
              
              return true;
              
        }//cors
        
        
        function authchk(req,res){
        
              if(!auth){
                    return;
              }
                                                                                console.log('authchk');
              if(req.headers.auth===auth){
                                                                                console.log('ok');
                    return;
              }
                                                                                console.log('fail');
              res.writeHead(401);
              res.end('unauthorised');
              
              return true;
              
        }//authchk
        
        
        var page    = `

<html>

      <head>
      
            <style>
    html
          {height:100%}
    body
          {display:flex;flex-direction:column;height:calc(100% - 40px);margin:20px}
    #remind
          {margin-bottom:5px}
    #hdr
          {display:flex;align-items:center;gap:10px;margin-bottom:20px}
    input[value=cert]
          {cursor:pointer}
    #auth
          {width:120px}
    #host
          {flex:1}
          
    iframe
          {width:100%;flex:1;border:none}

    input
          {padding:5px 10px;font-size:16px}
          
            </style>
            
      </head>
      
      <body>
      
            <div id=remind>
                  !!!   remember to quit networking when done   !!!
            </div>
            
            <div id=hdr>
                  <input value=cert type=button>
                  <label for=auth>
                        auth
                  </label>
                  <input id=auth type=password>
                  <input id=host>
            </div>
            
            <iframe></iframe>
            
            <script>
            
                  var $   = (root,sel)=>(!sel && (sel=root,root=document),root.querySelector(sel));
                  
                  $('[value=cert]').onclick   = cert;

                  
                  async function cert(){
                    
                        var auth              = $('#auth').value;
                        var host              = $('#host').value;
                        
                        var url               = 'https://cert-test-1024713184986.us-central1.run.app/cert';
                        var headers           = {auth,cert:host};
                        var res               = await fetch(url,{headers});
                        var html              = await res.text();
                        $('iframe').srcdoc    = html;
                        
                  }//cert
                  
            </script>
            
      </body>
      
</html>

        `;
        



        var download    = `
        
<html>
      <head>
            <style>
      
    #hdr
          {display:flex;gap:20px}
          
    pre
          {font-family:monospace;border:1px solid lightgray;padding:10px}
          
    input
          {padding:5px 10px;font-size:16px}
          
            </style>
      </head>
      <body>
      
            <div id=hdr>
                  <input value=download type=button>
                  <div>/*host*/</div>
            </div>
            
            <pre>/*cert*/</pre>
            
            <script>
            
        var host    = '/*host*/';
        
        window.onload   = function(){
          
              $('[value=download]').onclick   = download;
              
        }//onload
        
        
        function download(){
          
              var txt       = $('pre').textContent.trim();
              var blob      = new Blob([txt]);
              var url       = window.URL.createObjectURL(blob);
              
              var a         = document.createElement('a');
              a.download    = host+'.cert.pem';
              a.href        = url;
              a.click();
              
        }//download
        
        function $(root,sel){return (!sel && (sel=root,root=document),root.querySelector(sel))}
                  
            </script>
      </body>
</html>
              
        `;
        
        
        
        
        
