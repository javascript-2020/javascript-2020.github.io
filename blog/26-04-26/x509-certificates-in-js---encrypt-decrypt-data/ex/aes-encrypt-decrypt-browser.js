


/*


aes encrypt / decrypt browser


30-04-26
16-05-26

rsa keys should be 4096

SubtleCrypto: generateKey()       : https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
SubtleCrypto: exportKey()         : https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
SubtleCrypto: importKey()         : https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
SubtleCrypto: encrypt()           : https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
SubtleCrypto: decrypt()           : https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
Crypto: getRandomValues()         : https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
TextEncoder: encode()             : https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode
TextDecoder: decode()             : https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode
Blob: Blob()                      : https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
TypedArray.prototype.set()        : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set
TypedArray.prototype.slice()      : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice


*/


(async()=>{
                                                                                console.clear();
                                                                                
        var blob        = new Blob(['hello world']);
        
        var key         = await generateAesKey();
        var key_blob    = await exportAesKey(key);
                                                                                console.log('key :',key_blob.size);
        var encrypted   = await aesEncrypt(key_blob,blob);
        var b64         = await blob_b64(encrypted);
                                                                                console.log('encrypted :');
                                                                                console.log(b64);
                                                                                console.log();
        var key         = await importAesKey(key_blob);
        
        var blob        = await aesDecrypt(key,encrypted);
        
        var txt         = await blob.text();
                                                                                console.log('decrypted :');
                                                                                console.log(txt);
                                                                                
                                                                                
                                                                                
                                                                                
})();



        async function generateAesKey(length=256){
        
              var algorithm     = {name:'AES-GCM',length};
              var extractable   = true;
              var keyusages     = ['encrypt','decrypt'];
              
              var key           = await crypto.subtle.generateKey(algorithm,extractable,keyusages);
              
              return key;
              
        }//generateAesKey
        
        
        async function exportAesKey(key){
        
              var buf     = await crypto.subtle.exportKey('raw',key);
              var blob    = new Blob([buf]);
              return blob;
              
        }//exportAesKey
        
        
        async function importAesKey(blob){
        
              var buf           = await blob.arrayBuffer();
              var uint8         = new Uint8Array(buf);
              
              var format        = 'raw';
              var keydata       = uint8;
              var algorithm     = 'AES-GCM';
              var extractable   = true;
              var keyusage      = ['encrypt','decrypt'];
              
              var key           = await  crypto.subtle.importKey(format,keydata,algorithm,extractable,keyusage);
              
              return key;
              
        }//importAesKey
        
        
        async function aesEncrypt(key,blob,iv_bits=96){
        
              var buf         = await blob.arrayBuffer();
                                                                                //  96-bit IV recommended ( 12 bytes )
              var bytes       = iv_bits/8;
              var iv          = crypto.getRandomValues(new Uint8Array(bytes));
              
              var algorithm   = {name:'AES-GCM',iv}
              key             = key;
              var data        = buf;
              
              var buf         = await crypto.subtle.encrypt(algorithm,key,data);
              
              buf             = new Uint8Array(buf);
              
              var blob        = iv_buf_blob(iv,buf);
              return blob;
              
        }//aesEncrypt
        
        
        async function aesDecrypt(key,blob){
        
              var {iv,buf}    = await blob_iv_buf(blob);
              
              var algorithm   = {name:'AES-GCM',iv};
              key             = key;
              data            = buf.buffer;
              
              var buf         = await crypto.subtle.decrypt(algorithm,key,data);
              
              var blob        = new Blob([buf]);
              return blob;
              
        }//aesDecrypt
        
        
  //:
  
  
        function iv_buf_blob(iv,buf){
        
              var n1      = iv.length;
              var n       = n1+buf.length;
              var uint8   = new Uint8Array(n);
              uint8.set(iv,0);
              uint8.set(buf,n1);
              var blob    = new Blob([uint8]);
              return blob;
              
        }//iv_buf
        
        
        async function blob_iv_buf(blob,iv_bits=96){
        
              var bytes   = iv_bits/8;
              var n       = blob.size;
              var buf     = await blob.arrayBuffer();
              var uint8   = new Uint8Array(buf);
              var iv      = uint8.slice(0,bytes);
              var buf     = uint8.slice(bytes);
              return {iv,buf};
              
        }//blob_iv_buf
        
        
        async function blob_uint8(blob){
        
              var buf     = await blob.arrayBuffer();
              var uint8   = new Uint8Array(buf);
              return uint8;
              
        }//blob_uint8
        
        
        function uint8_blob(uint8){
        
              var blob    = new Blob([uint8]);
              return blob;
              
        }//uint8_blob
        
        
        async function blob_b64(blob){
        
              var uint8   = await blob_uint8(blob);
              var bin     = [...uint8].reduce((acc,byte)=>acc+=String.fromCharCode(byte),'');
              var b64     = btoa(bin);
              return b64;
              
        }//blob_b64
        
        
        function b64_blob(b64,type='text/plain'){
        
              var bin     = atob(b64);
              var bytes   = [...bin].map(c=>c.charCodeAt(0));
              var buf     = new Uint8Array(bytes);
              var blob    = new Blob([buf],{type});
              return blob;
              
        }//b64_blob
        
        
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
        
        
        function txt_uint8(txt){
        
              var uint8   = new TextEncoder().encode(txt);
              return uint8;
              
        }//txt_buf
        
        
        function buf_txt(buf){
        
              var txt   = new TextDecoder().decode(buf);
              return txt;
              
        }//buf_txt
        
        
        
        
        
        