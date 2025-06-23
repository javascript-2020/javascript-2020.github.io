



(async()=>{

console.clear();


        var encoder       = new TextEncoder();
        var decoder       = new TextDecoder();

      
        var password      = '1234';
        var text          = 'helloworld!';
        console.log(text);
        
        
        var encoded       = encoder.encode(text);
        var buf           = encoder.encode(password);
        
        var alg           = {name:'PBKDF2'};
        var usage         = ['deriveBits','deriveKey'];
        var imported      = await window.crypto.subtle.importKey('raw',buf,alg,false,usage);
        
        var salt          = window.crypto.getRandomValues(new Uint8Array(16));
        var iv            = window.crypto.getRandomValues(new Uint8Array(12));
        var iterations    = 100000;
        
        var alg           = {name:'PBKDF2',salt,iterations,hash:'SHA-256'};
        var derived       = {name:'AES-GCM',length:256};
        var usage         = ['encrypt','decrypt'];
        var key           = await window.crypto.subtle.deriveKey(alg,imported,derived,true,usage);

        
        var cipher        = await window.crypto.subtle.encrypt({name:'AES-GCM',iv},key,encoded);
        
        output('salt',salt);
        output('iv',iv);
        output('cipher',cipher);

        var decrypted     = await window.crypto.subtle.decrypt({name:'AES-GCM',iv},key,cipher);
        var text2         = decoder.decode(decrypted);
        
        
        console.log(text2);
        

        
        function output(name,buf){
        
              var b64   = buf_b64(buf);
              var pad   = name.padStart(10);
              console.log(pad,':',b64);
              
        }//output


        function buf_b64(buf){
        
              var bytes   = new Uint8Array(buf);
              var bin     = bytes.reduce((acc,byte)=>acc+=String.fromCharCode(byte),'');
              var b64     = btoa(bin);
              return b64;
        
        }//blob_b64
      
      
  
        function b64_buf(b64,type='text/plain'){
        
              var bin     = atob(b64);
              var bytes   = [...bin].map(c=>c.charCodeAt(0));
              var uint8   = new Uint8Array(bytes);
              var buf     = uint8.buffer;
              return buf;
              
        }//b64_blob
  
            


        
})();




