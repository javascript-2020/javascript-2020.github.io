
(async()=>{


      var url       = 'https://localhost:3010/';
      
      
      var stream    = new ReadableStream({start}).pipeThrough(new TextEncoderStream());
      
      function start(ctrl){
      
            var count   = 1;
            var timer   = setTimeout(send,1000);
            
            
            function send(){
                                                                          console.log('send',count);
                  ctrl.enqueue('Hello');
                  
                  if(count==5){
                        ctrl.close();
                        return;
                  }
                  count++;
                  
                  timer   = setTimeout(send,1000);
                  
            }//send
            
      }//start
      
      
      
      
      
      var res   = await fetch(url,{method:'post',body:stream,duplex:'half'});
      var txt   = await res.text();
      console.log(txt);
      
      
      
      
})();
