(async()=>{

        var res       = await fetch('/');
        
        var stream    = new TextDecoderStream();
        var reader    = res.body.pipeThrough(stream).getReader();
                                                                          console.log('response stream aquired');
        while(true){
        
              const {value,done}    = await reader.read();
              if(done)break;
                                                                          console.log('fetch',value);                                                                          
        }//while
        
        console.log('done');
        
})();
