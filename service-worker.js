        
        
        
                                                                                console.log('[ sw ] running');
        var cache_name    = 'runtime-cache-v1';
        var ttl           = 5000;
        var timestamps    = new Map();


        var ext;
        var html_loader;
        

        self.addEventListener('install',e=>{
                                                                                console.log('[ sw ] install');
              self.skipWaiting();
              
        });


        self.addEventListener('activate',e=>{
                                                                                console.log('[ sw ] activate');
              e.waitUntil((async()=>{
                  
                    var keys    = await caches.keys();
                    await Promise.all(keys.map(key=>{
                      
                          if(key!==cache_name){
                                return caches.delete(key);
                          }
                            
                    }));
                    await cache_purge();
                    self.clients.claim();
                      
              })());
              
        });

        
        self.addEventListener('fetch',e=>{
                                                                                console.log('[ sw ]','fetch');
              var {request}   = e;
              if(request.method!=='GET'){
                    return;
              }
              
              e.respondWith(cache_request(e,request));
              
        });


        self.addEventListener('message',({data})=>{
                                                                                console.log('[ sw ]','message',data);
              if(data.type=='load')load(data);
              
        });
        
        
  //:
  
  
        async function cache_request(e,request){
                                                                                console.log('[ sw ] cache_request');
              var client;
              var url;
              if(e.clientId){
                    client    = await self.clients.get(e.clientId);
                                                                                //console.log(client);
                    url       = client?.url;
              }
                                                                                console.log('[ sw ]','url',url,request.url);
              var cache     = await caches.open(cache_name);
              var cached    = await cache.match(request);
              
              if(url){
                          
                    if(url.includes('/html-editor')){
                                                                                            
                          var now       = Date.now();
                          var last      = timestamps.get(request.url)||0;
                          
                          if(cached){
                                if(now-last<ttl){
                                                                                console.log('[ sw ]','cache hit');
                                      return cached;
                                }
                                timestamp.delete(request.url);
                                cache.delete(request);
                          }
                          
                    }
                    
              }
              
              var response    = await fetch(request);
              
              cache.put(request,response.clone());
              timestamps.set(request.url,now);
              
              return response;
              
        }//cache_request
        
        
        
        
        async function cache_purge(){
                                                                                console.log('[ sw ] purge');
              var cache   = await caches.open(cache_name);
              var keys    = await cache.keys();
              var now     = Date.now();
            
              for(var request of keys){
                
                    var last    = timestamps.get(request.url)||0;
                    if(now-last>ttl){
                          await cache.delete(request);
                          timestamps.delete(request.url);
                    }
                    
              }//for
              
        }//purge
        
        
        function load(data){
          
              ext         = data.ext;
              
              [html_loader]   = await ext.text.libs('html/html-load.js');            
              console.log(html_loader);
              
        }//load
        
        
        function cloud_loader(request){
          
              var url   = request.url;
              
              var nodename;
						  var i	=	url.indexOf('?');
						  if(i!=-1){
										nodename		=	url.slice(i+1);
										nodename    = decodeURI(nodename);
										                                                            //df && console.log('url ?',nodename);
						  }

							if(nodename){
										var i		    =	txt.indexOf('/* params */');
										i			      =	txt.indexOf('\n',i)+1;
										var txt2    =	txt.slice(0,i)+`var nodename='${nodename}';`+txt.slice(i+1);
							}

              var opts        = {};
              var response    = new Response(txt2,opts);
              return response;
              
        }//cloud_loader
        
        
        
        
        
        
        