
(async()=>{
  
  
        var res       = await fetch(url,{headers,method,body});
        
        var decoder   = new TextDecoderStream();
        var stream    = res.body.pipeThrough(decoder);
        var reader    = stream.getReader();

        while(true){
        
              const {value,done}    = await reader.read();
              if(done)break;
                                                                          console.log('fetch',value);
                                                                          
        }//while
        
                                                                          console.log('done');        
        
        
})();

