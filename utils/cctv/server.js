


/*

//cctv-ml5-search:d

--
22-10-24

*/

        var dir           = 'D:/cycling/';
        var port          = argv('p',4005);
        
        
        require('base.js');
        require('keys-v1.0.js');
        var getmime   = require('getmime.js');
        
        var {key,cert}    = require('server-cert.js');
        
        var fs            = require('fs');
        var fsp           = fs.promises;
        var stream        = require('stream');
        
        
        //require('http').createServer(request).listen(port);
        require('https').createServer({key,cert},request).listen(port);
        
        console.log(`https://localhost:${port}/`);
        
        var reqid   = 0;
        
        async function request(req,res){
                                                                          console.log(req.url);
              var url     = req.url;
              var i       = url.indexOf('?');
              if(i!=-1){
                    url   = url.slice(0,i);
              }
              
              if(url=='/read'){
                    var files   = await fsp.readdir(dir,{withFileTypes:true});
                    var json    = [];
                    files.forEach(file=>{
                    
                          if(file.isFile()){
                                var ext   = require('path').parse(file.name).ext.slice(1).toLowerCase();
                                var f     = true;
                                switch(ext){
                                  case 'mp4'    : break;
                                  case 'mov'    : break;
                                  default       : f   = false;
                                }//switch
                                if(f){
                                      json.push(file.name);
                                }
                          }
                          
                    });
                    res.writeHead(200);
                    res.end(JSON.stringify(json));
                    return;
              }
              
              if(url=='/favicon.ico'){
                    res.writeHead(200,{'content-type':'image/png'});
                    var buf   = Buffer.from(favicon,'base64');
                    res.end(buf);
                    return;
              }
              
              if(url=='/video-player'){
                    res.writeHead(200,{'content-type':'text/html'});
                    var fd    = fs.createReadStream('video-player.html');
                    fd.pipe(res);
                    return;
              }
              
              if(url.startsWith('/video')){
              
                    var id      = reqid++;
                    var debug   = false;
                    
                    var i       = req.url.indexOf('-');
                    var file    = req.url.slice(i+1);
                                                                                debug && console.log(id,dir+file);
                    var size    = fs.statSync(dir+file).size;
                    
                    var start   = 0;
                    var end     = size-1;
                    var range   = req.headers.range;
                    if(range){
                          [start,end]   = range.replace('bytes=','').split('-');
                          if(!end){
                                end     = size-1;
                          }
                          start   = parseInt(start);
                          end     = parseInt(end);
                    }
                    var length    = end-start+1;
                    var code      = 206;
                    if(length===size){
                          code    = 200;
                    }
                                                                                debug && console.log(id,'video',code,start,end,size,length);
                    var hdrs    = {
                          'content-range'     : `bytes ${start}-${end}/${size}`,
                          'accept-ranges'     : 'bytes',
                          'content-length'    : length,
                    };
                    res.writeHead(code,hdrs);
                    
                    var fstream   = fs.createReadStream(dir+file,{start,end});
                    var mode      = 'readable';
                    
                    if(mode=='pipe'){
                          fstream.pipe(res);
                    }
                    
                    if(mode=='readable'){
                          var len   = 0;
                          fstream.on('readable',()=>{
                          
                                var data;
                                while((data=fstream.read())!==null){
                                
                                      len  += data.byteLength;
                                      res.write(data);
                                      
                                }//while
                                
                          });
                          fstream.on('close',()=>{
                          
                                                                                debug && console.log(id,'end',len);
                                res.end();
                                
                          });
                    }
                    
                    if(mode=='pipeline'){
                          stream.pipeline(fstream,res,err=>{
                          
                                                                                debug && console.log('stream complete');
                                if(err){
                                                                                console.log('error');
                                                                                //console.error(err);
                                }
                                res.end();
                                
                          });
                    }
                    
                    
                    return;
                    
              }//video
              
              
              url   = url.slice(1);
              if(url==''){
                    url   = 'index.html';
              }
              
              if(!fs.existsSync(url)){
                    res.writeHead(404);
                    res.end('not found');
                    return;
              }
                                                                                console.log('ok');
              var mime    = getmime(url);
              var stat    = fs.statSync(url);
              var size    = stat.size;
              
              res.writeHead(200,{'content-type':mime,'content-length':size});
              
              var fd    = fs.createReadStream(url);
              fd.pipe(res);
              
              
        }//request
        
        
        
        
var favicon=
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAeVJREFUSEvtlr'+
'9rFFEQx2fmvX2F3JIUB4FAKkt7GxsDsYm1TbAQIYUhYGFrpWB+QIoQMUXU0n/DKo1YaiNJZXukWW7x7t6bkTn2ybJs3IPb5YrkNQ'+
'tvZ/jsd/bNmy/CghYuiAuLBadp2s/zfD2E0Cciw8xh1kpovMZqjrX2wnt/DgB5Xb5z7h4zr3rvv6riFUT8KCKbAECzAuviEDE3xh'+
'x5798AgC/HWGsfMfOpiCwR0Q4aY56FED7NC40QRPztnNsYjUa/4l6EMvNd3SOiMySiV8x82CJ4kCTJw/F4/FMhClVhIrIWP8QY87'+
'lTcB1U4RG8y8zHbSvWQ1RVWlXcOhgR90XkZbm85YMW/3GrYO0sRPwjIneu65ApGABeAMD7tko9Szvegue6tWYpcYy5oaUmorbbqb'+
'HqnfSxTigA+CEi9//bx20rRsSBMWaLmbeZ+UkdvLO72jn3wDl3NRwOP9TBuyp1eSyuENFJFd6p4mgE1FZVlU8VFzPzi4j0G49jc4'+
'AOiO+9Xu9xlmWDGF54uoMQwvPCHOzpkLDGmKfMrMNiWaeLiEgTAxE1999tJyIBES+ttW8nk8m3an6h/J0ykiR5Xba3OsbSOmCapi'+
'HLsqmbbFjZdQ6zyLPF0y/WVzfJ6OL9zVP8Fyt+BruI5xiHAAAAAElFTkSuQmCC'
;



        function argv(id,def){
        
              var n   = process.argv.length;
              for(var i=0;i<n;i++){
              
                    switch(process.argv[i]){
                    
                      case id         :
                      case '-'+id     :
                      case '--'+id    : return process.argv[i+1];
                      
                    }//switch
                    
              }///for
              return def;
              
        }//argv
        
        
        
        
        
        
        
        
        
        
        
        