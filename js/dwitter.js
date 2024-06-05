
(()=>{

        var worker    = `
        
          //  official dwitter context
          
                var S       = Math.sin;
                var C       = Math.cos;
                var T       = Math.tan;
                var R       = (r,g,b,a)=>\`rgba(\${r},\${g},\${b},\${a})\`;
                var c;
                var x;
                
          //  unofficial dwitter context
          
                var i       = 0;
                
        (()=>{
        
                var start;
                var ct;
                var n   = 1000;
                var abort;
                
                self.onmessage=({data})=>{
                
                      if(data.type=='init'){
                            setup(data.canvas);
                      }
                      
                };
                
                function setup(canvas){
                
                      c           = canvas;
                      c.width     = 1920;
                      c.height    = 1080;
                      x           = c.getContext('2d');
                      
                      load();
                      
                }//setup
                
                async function load(){
                
                      var max           = 25000;
                      var num           = Math.floor(Math.random()*max);
                      var res           = await fetch(\`https://www.dwitter.net/api/dweets/\${num}\`);
                      if(!res.ok){
                            load();
                            return;
                      }
                      
                      var json            = await res.json();
                      var awesome_count   = json.awesome_count;
                      var code            = json.code;
                      
                      console.log(awesome_count,code);
                      
                      self.eval(\`function u(t){\n\${code}\n}\`);
                      
                      ct      = 0;
                      abort   = false;
                      start   = performance.now();
                      update();
                      
                }//load
                
                function update(){console.log('update2',u.toString());
                
                      var t   = (performance.now()-start)/1000;
                      
                      console.log(1);
                      try{
                            u(t);
                      }
                      catch(err){
                            console.log(err);
                      }
                      console.log(2);
                      
                      ct++;
                      console.log(ct,n);
                      if(ct>n){console.log('ct');
                            return;
                      }
                      if(abort){console.log('abort');
                            return;
                      }
                      //requestAnimationFrame(update);
                      setTimeout(update,100);
                      
                }//update
                
                self.onerror=err=>{
                
                      console.log('onerror',err);
                      
                }//
        })();
        
        
        `;
        
        var srcdoc    = `
        
              <script>
              
                    window.onmessage=({data})=>{
                    
                          var canvas    = data.canvas;
                          var blob      = new Blob([data.worker]);
                          var url       = window.URL.createObjectURL(blob);
                          
                          var worker    = new Worker(url);
                          worker.postMessage({type:'init',canvas},[canvas]);
                          
                    };//onmessage
                    
              </script>
              
        `;
        
        window.addEventListener('load',()=>{
        
              var canvas              = document.createElement('canvas');
              canvas.style.cssText    = 'width:100%;height:100%';
              background.append(canvas);
              var offscreen           = canvas.transferControlToOffscreen();
              
              var iframe              = document.createElement('iframe');
              iframe.sandbox          = 'allow-scripts';
              iframe.style.cssText    = 'display:none;';
              iframe.onload           = onload;
              iframe.srcdoc           = srcdoc;
              document.body.append(iframe);
              
              function onload(){
              
                    iframe.contentWindow.postMessage({canvas:offscreen,worker},'*',[offscreen]);
                    
              }//onload
              
        });//load
        
        
})();



