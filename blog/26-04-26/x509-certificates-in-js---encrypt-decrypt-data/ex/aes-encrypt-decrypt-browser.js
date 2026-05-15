


/*


aes encrypt / decrypt browser


30-04-26


*/


(async()=>{
                                                                                console.clear();
                                                                                
                                                                                
        var key         = await generateAesKey();
        var encrypted   = await aesEncrypt(key,'hello world');
                                                                                console.log('encrypted :');
                                                                                console.log('       iv :',enrypted.iv);
                                                                                console.log('     data :',encrypted.data);
                                                                                console.log();
        var txt         = await aesDecrypt(key,encrypted);
                                                                                console.log('decrypted :');
                                                                                console.log(txt);
                                                                                
                                                                                
                                                                                
        async function generateAesKey() {
        
              var algorithm     = {name:'AES-GCM',length:256};
              var extractable   = true;
              var keyusages     = ['encrypt','decrypt'];
              
              var key           = await crypto.subtle.generateKey(algorithm,extractable,keyusages);
              
              return key;
              
        }//generateAesKey
        
        
        async function exportAesKey(key) {
        
              var buf     = await crypto.subtle.exportKey('raw',key);
              
              var b64     = buf_b64(buf);
              return b64;
              
        }//exportAesKey
        
        
        async function importAesKey(b64){
        
              var format        = 'raw';
              var keydata       = b64_uint8(b64);
              var algorithm     = 'AES-GCM';
              var extractable   = true;
              var keyusage      = ['encrypt','decrypt'];
              
              var key           = await  crypto.subtle.importKey(format,keydata,algorithm,extractable,keyusage);
              
              return key;
              
        }//importAesKey
        
        
        async function aesEncrypt(key,txt){
        
              var buf         = txt_buf(txt);
                                                                                //  96-bit IV recommended
              var iv          = crypto.getRandomValues(new Uint8Array(12));
              
              var algorithm   = {name:'AES-GCM',iv}
              var key         = key;
              var data        = encoded;
              
              var buf         = await crypto.subtle.encrypt(algorithm,key,data);
              
              iv              = buf_b64(iv);
              var data        = buf_b64(buf);
              
              var encrypted   = {iv,data};
              return encrypted;
              
        }//aesEncrypt
        
        
        async function aesDecrypt(key,encrypted){
        
              var {iv,data}   = encrypted;
              
              iv              = b64_uint8(iv);
              
              var algorithm   = {name:'AES-GCM',iv};
              key             = key;
              data            = b64_uint8(data);
              
              var buf         = await crypto.subtle.decrypt(algorithm,key,data);
              var txt         = buf_txt(buf);
              
              return txt;
              
        }//aesDecrypt
        
        
  //:
  
  
        function buf_b64(buf){
        
              var uint8   = new Uint8Array(buf);
              var bin     = String.fromCharCode(...uint8);
              var b64     = btoa(bin);
              return b64;
              
        }//buf_b64
        
        
        function b64_uint8(b64){
        
              var bin     = atob(b64);
              var uint8   = Uint8Array.from(bin,c=>c.charCodeAt(0));
              return uint8;
              
        }//b64_buf
        
        
        function txt_buf(txt){
        
              var buf   = new TextEncoder().encode(txt);
              return buf;
              
        }//txt_buf
        
        
        function buf_txt(buf){
        
              var txt   = new TextDecoder().decode(buf);
              return txt;
              
        }//buf_txt
        
        
        
        
        
        
})();



