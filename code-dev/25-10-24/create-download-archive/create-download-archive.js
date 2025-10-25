

(async()=>{
                                                                                console.clear();
                                                                                console.log('create-download-archive');
                                                                                console.log();
                                                                                console.json=v=>console.log(JSON.stringify(v,null,4));
        var jszip       = await import('https://cdn.jsdelivr.net/npm/jszip/+esm');
        jszip           = jszip.default;

        var {ext}       = await import('https://libs.ext-code.com/js/io/ext-loader/ext-loader.m.js');
        var [encrypt]   = await ext.load.libs('js/crypto/encrypt/encrypt.js.api');
        encrypt         = encrypt();
        


        var dir    = {
              'xml-http-request'   :{directory:{
                    'xhr-upload.html'       : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/xhr-upload.html'}}},
                    'upload-server.js'      : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/upload-server.js'}}},
                    'xhr-download.html'     : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/xhr-download.html'}}},
                    'download-server.js'    : {file:{github:{repo:'javascript-2020.github.io',path:'/blog/25-07-31/xml-http-request/ex/download-server.js'}}},
                    node_modules    : {directory:{
                          'a.txt'   : {file:{contents:'a'}},
                    }}
              }}
        };



        var blob    = await create(dir,{download:false});
                                                                                console.log('zip',blob.type,blob.size);
        
        var enc     = await encrypt.encrypt.password.blob('helloworld',blob);
                                                                                console.log('enc',enc.type,enc.size);
        var blob    = await encrypt.decrypt.password.blob('helloworld',enc);

        
        var zip     = await jszip.loadAsync(blob);
        zip.forEach((path,file)=>console.log(path));

        
        
        async function create(dir,{download=true,test,df=false}={}){
                                                                                df && console.log('download',!!download);
                                                                                df && console.log('test',!!test);
                                                                                df && console.json(dir);
                                                                                df && console.log();
              var zip;
              if(!test){
                    zip   = new jszip();
              }
              
              var resolve,promise=new Promise(res=>resolve=res);
              var ct=0,total=0;
              add(dir);
              await promise;
              
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
                      
                          ct++;
                          var o   = dir[key];
                          
                          if(o.directory){
                                                                                df && console.log('dir :',abs+key);
                                if(zip){
                                      zip.folder(abs+key);
                                }
                                add(o.directory,abs+key+'/');
                                complete();
                          }

                          if(o.file?.contents){
                                                                                df && console.log('file create :',abs+key);
                                if(zip){
                                      zip.file(abs+key,o.file.contents);
                                }
                                complete();
                          }
                          
                          if(o.file?.github){
                                var owner,repo,branch,path;
                                if(typeof o.file.github=='string'){
                                      path    = o.file.github;
                                }else{
                                      ({owner,repo,branch,path}    = o.file.github);
                                }
                                owner     ||= 'javascript-2020';
                                repo      ||= 'libs';
                                branch    ||= 'main';
                                if(path.startsWith('/')){
                                      path    = path.slice(1);
                                }
                                                                                df && console.log('file github :',abs+key);
                                                                                df && console.log(owner,repo,branch,path);
                                if(zip){
                                      fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`)
                                        .then(res=>res.text().then(txt=>{
                                          
                                              zip.file(abs+key,txt);
                                              complete();
                                              
                                        }));
                                }
                          }
                          
                          
                    }//for

                    
                    function complete(){
                      
                          total++;
                          if(ct==total){
                                resolve();
                          }
                          
                    }//complete
                    
              }//add


        
        }//create

        
})();
        
