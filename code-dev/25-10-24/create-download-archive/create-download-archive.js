

(async()=>{
                                                                                console.clear();
                                                                                console.log('create-download-archive');
                                                                                console.log();
                                                                                console.json=v=>console.log(JSON.stringify(v,null,4));

        var dir    = {
              'xml-http-request'   :{directory:{
                    'xhr-upload.html'       : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/xhr-upload.html'}}},
                    'upload-server.js'      : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/upload-server.js'}}},
                    'xhr-download.html'     : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/xhr-download.html'}}},
                    'download-server.js'    : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/download-server.js'}}},
                    test    : {directory:{
                          'a.txt'   : {file:{contents:'a'}},
                    }}
              }}
        };


        var jszip   = await import('https://cdn.jsdelivr.net/npm/jszip/+esm');
        jszip       = jszip.default;

        
        create(dir);
        
        
        async function create(dir,{download=true,test}={}){
                                                                                console.json(dir);
                                                                                console.log(download,test);
              var zip;
              if(!test){
                    zip   = new jszip();
              }
              
              await add(dir);
              
              var blob;
              if(zip){
                    blob      = await zip.generateAsync({type:'blob'});
                    
                    if(download){
                          var url       = window.URL.createObjectURL(blob);
                          var a         = document.createElement('a');
                          a.download    = 'https-file-server';
                          a.href        = url;
                          a.click();
                    }
              }
              return blob;
              
        
              async function add(dir,abs=''){
                
                    for(let key in dir){
                      
                          var o   = dir[key];
                          
                          if(o.directory){
                                                                                      console.log('dir',abs+key);
                                if(zip){
                                      zip.folder(abs+key);
                                }
                                await add(o.directory,abs+key+'/');
                          }
                          
                          if(o.file.contents){
                                                                                      console.log('file-2',abs+key);
                                if(zip){
                                      zip.file(abs+key,o.file.contents);
                                }
                          }
                          
                          if(o.file.github){
                                var {owner,repo,branch,path}    = o.file.github;
                                owner     ||= 'javascript-2020';
                                repo      ||= 'javascript-2020.github.io';
                                branch    ||= 'main';
                                if(path.startsWith('/')){
                                      path    = path.slice(1);
                                }
                                                                                      console.log('file',abs+key);
                                                                                      //console.log(owner,repo,branch,path);
                                if(zip){
                                      var res   = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`);
                                      var txt   = await res.text();
                                      zip.file(abs+key,txt);
                                }
                          }
                          
                    }//for
                    
              }//zip
        
        }//create

        
})();
        
