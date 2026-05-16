



/*

aes-encrypt-decrypt-nodejs.js

30-04-26


*/



        var crypto    = require('crypto');
        
        
        
        function importAesKey(base64){
        
              return Buffer.from(base64,'base64'); // raw 32‑byte key
              
        }//importAesKey
        
        
        function aesEncryptNode(keyBuf,plaintext,iv_bits=96){
        
              var bytes       = iv_bits/8;
              var iv          = crypto.randomBytes(bytes);
              
              var cipher      = crypto.createCipheriv('aes-256-gcm',keyBuf,iv);
              
              var buf1        = cipher.update(plaintext,'utf8');
              var buf2        = cipher.final();
              
              var encrypted   = Buffer.concat([buf1,buf2]);
              
              var tag         = cipher.getAuthTag();
              
              var buf         = Buffer.concat([ciphertext,authTag]);
              
              var blob        = iv_buf_blob(iv,buf);
              return blob;
              
        }//aesEncryptNode
        
        
        
        function aesDecryptNode(keyBuf,encrypted){
        
              var iv = Buffer.from(encrypted.iv, 'base64');
              var data = Buffer.from(encrypted.data, 'base64');
              var tag = Buffer.from(encrypted.tag, 'base64');
              
              var decipher = crypto.createDecipheriv('aes-256-gcm', keyBuf, iv);
              decipher.setAuthTag(tag);
              
              var decrypted = Buffer.concat([
                decipher.update(data),
                decipher.final()
              ]);
              
              return decrypted.toString('utf8');
              
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
        
        
        
        
        async function blob_buffer(){
        
              var buf       = await blob.arrayBuffer();
              var buffer    = Buffer.from(buf);
              return buffer;
              
        }//blob_buffer