



/*

aes-encrypt-decrypt-nodejs.js

30-04-26
16-05-26

rsa keys should be 4096




*/



        var crypto    = require('crypto');
        
(async()=>{
                                                                                console.clear();
                                                                                
        var blob        = new Blob(['hello world']);
        
        var key         = await generateAesKey();
        var key_blob    = await exportAesKey(key);
                                                                                console.log('key :',key_blob.size,'B');
                                                                                var b64=await blob_b64(key_blob);
                                                                                console.log(b64);
                                                                                console.log();
        var encrypted   = await aesEncryptNode(key_blob,blob);
        var b64         = await blob_b64(encrypted);
                                                                                console.log('encrypted :');
                                                                                console.log(b64);
                                                                                console.log();
        var key         = await importAesKey(key_blob);
        
        var blob        = await aesDecryptNode(key_blob,encrypted);
        
        var txt         = await blob.text();
                                                                                console.log('decrypted :');
                                                                                console.log(txt);
                                                                                
                                                                                
                                                                                console.log();
                                                                                console.log();
                                                                                
                                                                                
      if(enabled=1){
                                                                                console.log('---  decrypt test  ---');
                                                                                console.log();
            var encrypted_b64   = 'dqeBcMIqEJy2E2z1ixpE98Dcnrp8r275UptzFMoeg7ZTYaZqSv4b';
            var encrypted       = b64_blob(encrypted_b64);
            
            var key_b64         = 'QWC78FsU8wpP9KtQotZn1zLfm1qXKG6S/0rJDF5KVbk=';
            var key_blob        = b64_blob(key_b64);
            
            var blob            = await aesDecryptNode(key_blob,encrypted);
            
            var txt             = await blob.text();
                                                                                console.log('decrypted :');
                                                                                console.log(txt);
                                                                                
                                                                                
                                                                                console.log();
                                                                                console.log();
      }//enabled
      
      
})();


  //:
  
  
        function generateAesKey(length=256){
        
              var bytes   = length/8;
              var key     = crypto.randomBytes(32);
                                                                                //  console.log("Hex Key:", key.toString('hex'));
                                                                                //  console.log("Base64 Key:", key.toString('base64'));
              return key;
              
        }//generateAesKey
        
        
        async function importAesKey(blob){
        
              var key   = await blob_buffer(blob);
              return key;
              
        }//importAesKey
        
        
        function exportAesKey(key){
        
              var key2    = buffer_blob(key);
              return key2;
              
        }//exportAesKey
        
        
        async function aesEncryptNode(key,blob,iv_bits=96){
        
              var bytes       = iv_bits/8;
              var iv          = crypto.randomBytes(bytes);
              key             = await blob_buffer(key);
              var buf         = await blob_buffer(blob);
              
              var cipher      = crypto.createCipheriv('aes-256-gcm',key,iv);
              
              var buf1        = cipher.update(buf);
              var buf2        = cipher.final();
              
              var encrypted   = Buffer.concat([buf1,buf2]);
              var tag         = cipher.getAuthTag();
              
              var buf         = Buffer.concat([encrypted,tag]);
              
              var blob        = iv_buf_blob(iv,buf);
              return blob;
              
        }//aesEncryptNode
        
        
        
        async function aesDecryptNode(key,blob,iv_bits=96){
        
              var bytes         = iv_bits/8;
              var taglength     = 16;
              
              key               = await blob_buffer(key);
              var buf           = await blob_buffer(blob);
              var iv            = buf.subarray(0,bytes);
              buf               = buf.subarray(bytes);
              var n             = buf.length-taglength;
              var tag           = buf.subarray(n);
              buf               = buf.subarray(0,n);
              
              
              var decipher      = crypto.createDecipheriv('aes-256-gcm',key,iv);
              decipher.setAuthTag(tag);
              
              var buf1          = decipher.update(buf);
              var buf2          = decipher.final();
              
              var decrypted     = Buffer.concat([buf1,buf2]);
              var blob          = new Blob([decrypted]);
              
              return blob;
              
        }//aesDecryptNode
        
        
  //:
  
  
        function iv_buf_blob(iv,buf){
        
              var n1      = iv.length;
              var n       = n1+buf.length;
              var uint8   = new Uint8Array(n);
              uint8.set(iv,0);
              uint8.set(buf,n1);
              var blob    = new Blob([uint8]);
              return blob;
              
        }//iv_buf_blob
        
        
        
        function buffer_blob(buf){
        
              var blob    = new Blob([buf]);
              return blob;
              
        }//buffer_blob
        
        
        async function blob_buffer(blob){
        
              var buf       = await blob.arrayBuffer();
              var buffer    = Buffer.from(buf);
              return buffer;
              
        }//blob_buffer
        
        
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
        
        
        async function blob_uint8(blob){
        
              var buf     = await blob.arrayBuffer();
              var uint8   = new Uint8Array(buf);
              return uint8;
              
        }//blob_uint8
        
        
        function uint8_blob(uint8){
        
              var blob    = new Blob([uint8]);
              return blob;
              
        }//uint8_blob
        
        
        
        
        
        
        
        