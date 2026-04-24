

<!-- headers
      cross-origin-isolate
-->


<html>


      <head>
            <meta charset=utf-8>
            
            <title>
            </title>
            
            <base href='https://ext-code.com/utils/editors/srcdoc/'>
            <link rel=canonical href='https://ext-code.com/utils/editors/srcdoc/srcdoc.html'>
            
            <meta name=viewport content='width=device-width, initial-scale=1'>
            <link rel=icon type='image/png' href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAsCAMAAAAgsQpJAAAAWlBMVEVHcExXpP9XpP9XpP9XpP9XpP9XpP9bpv9WpP9XpP9XpP9XpP9XpP9Wo/9XpP9XpP9XpP9XpP9XpP9XpP9Zpv9WpP9XpP+cyv+Txf9/uv91tf9iqv+KwP9rr/9r+fBYAAAAF3RSTlMAHeFk6nAK/Xs0BNNJwicTpLfdP/WSXXgcQWoAAAGfSURBVDjLvZRZtoMgEAWFqCgqGDCRqfe/zQeSAQIZvl7lHPNTQjf2pWkC6HqqMvdNRn8mdbZLbiJhVA1NSG4iofcablvbp9lzzoQulztEeXqYbJ0mQWyJUbsjy7klQxT9K0ONhYBSBgDsEpfsMGpqXIiFsP1uUpFmRBFcNFORreeEpTtEqw0JZiqiy5pyirV7iH7ZugJljEn8g/j4EKlIUQ1aiuOES6axFHltyq68FH+u8Wexl3OJ7CvNiLZEVJqhY43+P5rhXWVyO1SKbJlKlrHhUaTPZnzAMsbjfOSMjXMwzZLReo1XvEVu18DWDrSMQrg4wOUYgYoorKzpF/NyE2jMiihcUCIqozLxhSgq0Lu2GtwX0VnrdgMKrH6KlD8DwOkh6hBqZY3f3UfxLvooiBshAUEE4rd0x8NadRf5tbsTEhBEB35nbVUs4VONyq8JEL0vXWt9lKiSrtMo+AQ8zlGrlwNPoyDGD1+mzxNAV6tzYOLV6RnPcSTF1t5mcw5jJlnBKA/mdojzGWZ8xi1+R4ulH8Hj5//l6T2SPsr5A6avRJ8t3CbuAAAAAElFTkSuQmCC'>
            
            <script src='https://libs.ext-code.com/js/dom/component/v3.0/component.js?hdr'></script>
            
            <script init>
                                                                                console.clear();
                                                                                console.log('srcdoc.html');
                                                                                console.log();
                                                                                console.json=v=>console.log(JSON.stringify(v));
        var df=true,version='v2.0'
        ;
        
        var ext;
        var $;
        var datatype;
        var menumod;
        var keydown;
        var debug;
        var github;
        
        var menu;
        
        
        var term;
        var webcontainer;
        var files   = {};
        
        
        var packages          = ['espree'];
        var filename          = 'espree.m.js';
        
        
        
        
        async function ready(){
        
        
        
              var {Terminal}    = await import('https://cdn.jsdelivr.net/npm/@xterm/xterm/+esm');
              var {FitAddon}    = await import('https://cdn.jsdelivr.net/npm/@xterm/addon-fit/+esm');
              
              term                = new Terminal();
              var fitAddon        = new FitAddon();
              term.loadAddon(fitAddon);
              term.open(terminal);
              fitAddon.fit();
              
              
              
              
              for(var key in files){
              
                    files[key]   = {file:{contents:files[key]}};
                    
              }//for
              
              
                                                                                console.log('download ...');
              var {WebContainer}    = await import('https://cdn.jsdelivr.net/npm/@webcontainer/api/+esm');
              
                                                                                console.log('booting ...');
              webcontainer          = await WebContainer.boot();
              
                                                                                console.log('mounting file system ...');
              await webcontainer.mount(files);
              
              
              await install();
              await package_json();
              await install_rollup();
              
              
              await rollup();
              
              await server();
                                                                                console.log('done.');
                                                                                
                                                                                
              async function install(){
                                                                                var str   = packages.join(' ');
                                                                                console.log('npm install',str,'...');
                    packages.unshift('install');
                    var process   = await webcontainer.spawn('npm',packages);
                    var stream    = new WritableStream({write(data){term.write(data)}});
                    process.output.pipeTo(stream)
                    var code      = await process.exit;
                    if(code!=0){
                                                                                console.log('an error occurred');
                    }
                    return code;
                    
              }//install
              
              
              async function package_json(){
                                                                                console.log('npm install ( package.json ) ...');
                    var process   = await webcontainer.spawn('npm',['install']);
                    var stream    = new WritableStream({write(data){term.write(data)}});
                    process.output.pipeTo(stream)
                    var code      = await process.exit;
                    if(code!=0){
                                                                                console.log('an error occurred');
                    }
                    return code;
                    
              }//package_json
              
              
              async function install_rollup(){
              
                    var packages    = [
                          'rollup',
                          '@rollup/plugin-commonjs',
                          '@rollup/plugin-node-resolve',
                          '@rollup/plugin-json',
                          'rollup-plugin-polyfill-node'
                    ];
                                                                                console.log('npm install',packages.join(' '),'...');
                    packages.unshift('install');
                    
                    var process   = await webcontainer.spawn('npm',packages);
                    var stream    = new WritableStream({write(data){term.write(data)}});
                    process.output.pipeTo(stream)
                    var code      = await process.exit;
                    if(code!=0){
                                                                                console.log('an error occurred');
                    }
                    return code;
                    
              }//install_rollup
              
              
              async function rollup(){
                                                                                console.log('perform rollup ...');
                    var process   = await webcontainer.spawn('npx',['-y','rollup','--config','rollup.config.js']);
                    
                    var stream    = new WritableStream({write(data){term.write(data)}});
                    process.output.pipeTo(stream);
                    
                    var code      = await process.exit;
                    if(code!=0){
                                                                                console.log('an error occurred');
                    }
                    return code;
                    
              }//rollup
              
              
              async function server(){
                                                                                console.log('launching server ...');
                    webcontainer.on('server-ready',(port,url)=>{
                                                                                console.log('server : ',url,port);
                          iframe.src    = url;
                          
                    });
                    
                    var process   = await webcontainer.spawn('node',['server.js']);
                    
                    var stream    = new WritableStream({write(data){term.write(data)}});
                    process.output.pipeTo(stream);
                    
                    var code      = await process.exit;
                    if(code!=0){
                                                                                console.log('an error occurred');
                    }
                    return code;
                    
              }//server
              
              
              
        }//ready
        
        
  //:
  
  
  
        files['entry.js']   = `
        
              import * as espree from 'espree';
              export {espree};
              
              //export default espree;  // iife / umd
              
        `;
        
        
        files['package.json']   = `
        
              {
                    "name": "node-test",
                    "version": "1.0.0",
                    "scripts": {
                    }
              }
              
        `;
        
        
        files['rollup.config.js']   = `
        
              import resolve from '@rollup/plugin-node-resolve';
              import commonjs from '@rollup/plugin-commonjs';
              import json from '@rollup/plugin-json';
              import nodePolyfills from 'rollup-plugin-polyfill-node';
              
              export default {
                input     : 'entry.js',
                output    : {
                                  file      : '${filename}',
                                  format    : 'es'
                                  
                                  //format    : 'iife',         // or 'umd'
                                  //name      : 'espree',       // This becomes window.espree
                                  //exports   : 'default',
                                  
                },
                plugins   : [
                                  commonjs(),
                                  json(),
                                  nodePolyfills(),
                                  resolve({preferBuiltins:false})
                            ]
              };
              
        `;
        
        
        files['server.js']    = `
        
              var port          = 3000;
              
              require('http').createServer(request).listen(port);
              
              var fs    = require('fs');
                                                                                          console.log('listening',port);
                                                                                          
              function request(req,res){
                                                                                          console.log(req.method,req.url);
                    if(cors(req,res))return;
                    
                    if(req.url==='/${filename}'){
                          var stream    = fs.createReadStream('${filename}');
                          res.writeHead(200,{'content-type':'text/javascript'});
                          stream.pipe(res);
                          return;
                    }
                    
                    if(req.url==='/test.html'){
                          var stream    = fs.createReadStream('test.html');
                          res.writeHead(200,{'content-type':'text/html'});
                          stream.pipe(res);
                          return;
                    }
                    if(req.url==='/test2.html'){
                          var stream    = fs.createReadStream('test2.html');
                          res.writeHead(200,{'content-type':'text/html'});
                          stream.pipe(res);
                          return;
                    }
                    
                    var stream    = fs.createReadStream('index.html');
                    res.writeHead(200,{'content-type':'text/html'});
                    stream.pipe(res);
                    
              }//request
              
              
              function cors(req,res){
              
                    res.setHeader('access-control-allow-origin','*');
                    
                    if(req.method!=='OPTIONS'){
                          return;
                    }
                    
                    res.writeHead(204);
                    res.end();
                    return true;
                    
              }//cors
              
              
        `;
        
        
            <script>
            
            
            <style>
            
            
            </style>
            
            
      </head>
      
      
      <body>
      
      
      </body>
      
      
</html>
