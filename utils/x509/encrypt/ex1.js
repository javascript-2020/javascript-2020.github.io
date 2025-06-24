



(async()=>{

console.clear();

        var encoder       = new TextEncoder();
        var decoder       = new TextDecoder();
        
        
        
        var password      = '1234';
        var text          = 'helloworld!';


        var buf           = await encrypt(text,password);
        var text          = decrypt(buf,password);
        




        async function encrypt(text,password){
        
              var type    = datatype(text);
              var buf     = text;
              switch(type){
              
                case 'string'       : buf   = encoder.encode(text);           break;
                case 'uint8array'   : buf   = text.buffer;                    break;
                case 'blob'         : buf   = await text.arrayBuffer();       break;
                
              }//switch
              
              
              var buf           = encoder.encode(text);
              password          = encoder.encode(password);

              
              var alg           = {name:'PBKDF2'};
              var usage         = ['deriveBits','deriveKey'];
              var imported      = await window.crypto.subtle.importKey('raw',password,alg,false,usage);
              
              var salt          = window.crypto.getRandomValues(new Uint8Array(16));
              var iv            = window.crypto.getRandomValues(new Uint8Array(12));
              var iterations    = 100000;
              
              var alg           = {name:'PBKDF2',salt,iterations,hash:'SHA-256'};
              var derived       = {name:'AES-GCM',length:256};
              var usage         = ['encrypt','decrypt'];
              var key           = await window.crypto.subtle.deriveKey(alg,imported,derived,true,usage);
      
              
              var cipher        = await window.crypto.subtle.encrypt({name:'AES-GCM',iv},key,buf);
              cipher            = new Uint8Array(cipher);
              
              var len           = salt.length+iv.length+cipher.length;
              var full          = new Uint8Array(len);
              full.set(salt,0);
              full.set(iv,salt.length);
              full.set(cipher,salt.length+iv.length);
                                                                                console.log('encrypt :');
                                                                                output_str('text',text);
                                                                                output('salt',salt);
                                                                                output('iv',iv);
                                                                                output('cipher',cipher);
                                                                                output('full',full);
              return full;
              
        }//encrypt

        


        
        async function decrypt(full,password,type){
                                                                                console.log('decrypt :');
                                                                                //output('full',full);
              password          = encoder.encode(password);
                                                                                
              full              = new Uint8Array(full);
              
              var salt          = new Uint8Array(16);
              salt.set(full.slice(0,16));
                                                                                output('salt',salt);
              var iv            = new Uint8Array(12);
              iv.set(full.slice(16,28));
                                                                                output('iv',iv);
              var cipher        = new Uint8Array(full.length-28);
              cipher.set(full.slice(28));
                                                                                output('cipher',cipher);
              cipher            = cipher.buffer;
              
              var alg           = {name:'PBKDF2'};
              var usage         = ['deriveBits','deriveKey'];
              var imported      = await window.crypto.subtle.importKey('raw',password,alg,false,usage);
              
              var iterations    = 100000;
              
              var alg           = {name:'PBKDF2',salt,iterations,hash:'SHA-256'};
              var derived       = {name:'AES-GCM',length:256};
              var usage         = ['encrypt','decrypt'];
              var key           = await window.crypto.subtle.deriveKey(alg,imported,derived,true,usage);
              
              
              var decrypted     = await window.crypto.subtle.decrypt({name:'AES-GCM',iv},key,cipher);
                                                                                output_str('text',decrypted);
              return decrypted;
              
        }//decrypt        








        
        function output(name,buf){
        
              var b64   = buf_b64(buf);
              var pad   = name.padStart(10);
              console.log(pad,':',b64);
              
        }//output
        
        
        function output_str(name,buf){

              var str;        
              if(typeof buf=='string'){
                    str   = buf;
              }else{
                    str   = buf_str(buf);
              }
              var pad   = name.padStart(10);
              console.log(pad,':',str);
              
        }//output_str


        function buf_str(buf){
        
              var txt   = decoder.decode(buf);
              return txt;
              
        }//buf_str
        
        
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




