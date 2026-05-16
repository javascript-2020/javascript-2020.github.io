



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
                                                                                console.log('key :',key_blob.size);
        var encrypted   = await aesEncrypt(key,blob);
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
              
              var buf         = Buffer.concat([encrypted,authTag]);
              
              var blob        = iv_buf_blob(iv,buf);
              return blob;
              
        }//aesEncryptNode
        
        
        
        async function aesDecryptNode(key,blob,iv_bits=96){
        
              var bytes         = iv_bits/8;
              var taglength     = 16;
              
              var buf           = await blob_buffer(blob);
              var iv            = buf.subarray(0,bytes);
              buf               = buf.subarray(bytes);
              var n             = buf.length-taglength;
              var authTag       = buf.subarray(n);
              buf               = buf.subarray(0,n);
              
              
              var decipher      = crypto.createDecipheriv('aes-256-gcm',key,iv);
              decipher.setAuthTag(authTag);
              
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
        
        
        async function blob_buffer(){
        
              var buf       = await blob.arrayBuffer();
              var buffer    = Buffer.from(buf);
              return buffer;
              
        }//blob_buffer
        
        
        
        
        
        
        
        
        
        