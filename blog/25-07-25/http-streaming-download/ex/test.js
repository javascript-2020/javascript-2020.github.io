      
      <h3>test stream</h3>
      
      <style>
        #output   {white-space:pre;font-family:monospace;font-size:16px;padding:0 50px}
      </style>
      
      <div id=output>
      </div>
      
      <script>
            
            output.textContent    = '';
            var log   = (...args)=>((output.textContent+=args.join(' ')+'\n') && console.log.apply(console,args));
            
            (async()=>{
            
                    var res       = await fetch('/stream');
                    
                    var stream    = new TextDecoderStream();
                    var reader    = res.body.pipeThrough(stream).getReader();
                                                                                      log('response stream aquired');
                    while(true){
                    
                          const {value,done}    = await reader.read();
                          if(done)break;
                                                                                      log('fetch',value);                                                                          
                    }//while
                    
                    console.log('done');
                    
            })();
      
      </script>
      
      <script>
      
            window.onmessage    = e=>{
            
                  console.log('rec',e.data);
                  
            };
            
            
      </script>
