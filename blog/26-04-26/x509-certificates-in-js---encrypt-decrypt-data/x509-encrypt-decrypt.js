

/*

x509-encrypt-decrypt.js

18-05-26


*/


(async()=>{
                                                                                console.clear();
      x509              = x509();
      await x509.init();
      
      var {key,cert}    = x509.key_cert();
      
      
      var b64         = {};
      b64.node        = 'AKFyuv7A6qkzZzUwKIA6HkQwWhbU5MWaK4Hw7lUzAUBdroxLrawmKYISDzywNpRjbRe8woCR2pYD3QrWg2qlZRNgTNwETC31p7pI9Fo2Q3zHqSLmwqqbZuCChsbZsopYPLuQzW/E1E7sbd7fxwh2E3TE6D+x3z81AKe35bHm3Iv4+k0K/tZm6G+b0Kz35oPM9RJg0sjNuRzCwh2rd2dde/8s4qQuYcTexK2Z5+SH2hpy5nUkD1cSiadnp1qHJcjQAK3zI+C+0+yDWt3gGIn++oOQE+ZnwZBpRB63Pn1KTN1cM15DEb3lA99WUfAwUHqlgo9hO6UxOOR16484OFQLfTyWbKHX4PE6QHUZpdAdeIA2cgOrNEYytoDj/Krqaygqy2t06MkY0Q==';
      b64.browser     = 'AG8FEu53u1m4uSBa5z688Htz5zo8Y2siL2bkLPLw6SJOaeU37mbaHy660nim76+S2F55u1G5D+Lg4uDtUZA/2eGHZpVk+JY3sURaTBOkufY9yus5H6dUswLxUtTJciU5cpfBgryXSLT9Mj4muq4ghYL3tdEEKAQspAXf8cEQ2ZNiurQAyZ7eFpp++O3kqOHwCgVkjqMrhlk3aSKNnV2FreVETFGHPx75pnAQfA+4AaB53I1R2Lvy4gI3g3YSYh4JToZs07tuyKsof70gsH0x9Cjrh+dkahnGzMJpLLSTq7oGmCAsT/IDYqAnngGmh0hldidCA3Iq0neyPpxkA2ilopkz4icpqB1MD8Fo7XQZ9LJndhdG1M0awCUWqjNzx0T0eY4GaCf8sg==';
      
      var encrypted   = x509.b64.blob(b64.browser);
      
      var decrypted   = await x509.decrypt(key,encrypted);
      var txt         = await decrypted.text();
      console.log(txt);
      
/*      
                                                                                console.log('key');
                                                                                console.log(key);
                                                                                console.log('cert');
                                                                                console.log(cert);
      var payload       = new Blob(['helloworld']);
      var encrypted     = await x509.encrypt(cert,payload);
                                                                                var b64           = await x509.blob.b64(encrypted);
                                                                                console.log(b64);      
      var decrypted     = await x509.decrypt(key,encrypted);
                                                                                var txt           = await decrypted.text();
                                                                                console.log(txt);
*/                                                                                
      
})();
      

      
function x509(){
  
  var obj   = {
        version   : 'v1.0.0',
  };
  
        var df=true,did='x509-encrypt-decrypt';
        
        
        obj.initmod   = function(...params){
          
              params.forEach(params=>{
              });
              
              function rd(params,name,value){return ((name in params) && params[name]!==undefined) ? params[name] : value}
              
        }//initmod
        

  //:

  
        var platform              = typeof document=='undefined' ? 'node' : 'browser'; 
                                                                                console.log('platform',platform);
        var crypto;


        var libs                  = {};
        var rsa                   = {};
        rsa.encrypt               = {};
        var aes                   = {};
        aes.key                   = {};
        aes.key.generate          = {};
        aes.key.import            = {};
        aes.key.export            = {};
        aes.encrypt               = {};
        aes.decrypt               = {};
        var extract_spki          = {};
        var pub_key               = {};
        var is                    = {};
        var normalise             = {};
        obj.blob                  = {};
        obj.b64                   = {};
        
  //:
  
  
        obj.init    = async function(){
          
              if(platform=='node'){
                    crypto    = require('node:crypto');
              }
              if(platform=='browser'){
                    crypto    = globalThis.crypto;
                    
              }
          
              await libs[platform]();
              
        }//init
        
        
        libs.browser    = async function(){
          
              ({forge}    = await import('https://libs.ext-code.com/external/js/node-forge/node-forge.m.js'));
              
        }//libs
        
        
        libs.node   = async function(){}
        
        
  //:
  

        obj.encrypt   = async function(cert,payload_blob){
          
              var cert_blob               = await normalise.cert(cert);
              
              var aes_key_blob            = await aes.key.generate[platform]();
              var payload_enc_blob        = await aes.encrypt[platform](aes_key_blob,payload_blob);
              
              var enc_aes_key_blob        = await rsa.encrypt[platform](cert_blob,aes_key_blob);
              
              var payload_enc_uint8       = await blob_uint8(payload_enc_blob);
              var enc_aes_key_uint8       = await blob_uint8(enc_aes_key_blob);
              
              var n1                      = payload_enc_uint8.length;
              var n2                      = enc_aes_key_uint8.length;
              
              var uint8                   = new Uint8Array(n1+n2+1);
              uint8[0]                    = n2;
              uint8.set(enc_aes_key_uint8,1);
              uint8.set(payload_enc_uint8,n2+1);
              
              var encrypted               = new Blob([uint8]);
              
              return encrypted;
              
        }//encrypt
        
        
        obj.decrypt   = async function(key,encrypted_blob){
          
              var key_blob                = await normalise.key(key);
              
              var enc_buf                 = await encrypted_blob.arrayBuffer();
              var uint8                   = new Uint8Array(enc_buf);
              
              var n                       = uint8.length;
              var n2                      = uint8[0]||256;
              var n1                      = n-n2-1;
              
              var uint82                  = uint8.slice(1,n2+1);
              var enc_aes_key_blob        = new Blob([uint82]);
              
              var uint82                  = uint8.slice(n2+1);
              var payload_enc_blob        = new Blob([uint82]);
              
              var aes_key_blob            = await rsa.decrypt(key_blob,enc_aes_key_blob);
              var payload                 = await aes.decrypt[platform](aes_key_blob,payload_enc_blob);
              
              return payload;
              
        }//decrypt
        
        
  //:


        aes.key.generate.node   = function(length=256){
          
              var bytes                   = length/8;
              var aes_key_buffer          = crypto.randomBytes(32);
              var aes_key_blob            = buffer_blob(aes_key_buffer);
              return aes_key_blob;
              
        }//generateAesKey

        
        aes.key.generate.browser    = async function(length=256){
        
              var algorithm               = {name:'AES-GCM',length};
              var extractable             = true;
              var keyusages               = ['encrypt','decrypt'];
              
              var key                     = await crypto.subtle.generateKey(algorithm,extractable,keyusages);
              var buf                     = await crypto.subtle.exportKey('raw',key);
              var aes_key_blob            = new Blob([buf]);
              return aes_key_blob;
              
        }//generateAesKey
        

        aes.encrypt.node    = async function(aes_key_blob,payload_blob,iv_bits=96){
          
              var bytes                   = iv_bits/8;
              var iv_buffer               = crypto.randomBytes(bytes);
              var aes_key_buffer          = await blob_buffer(aes_key_blob);
              var payload_buffer          = await blob_buffer(payload_blob);
              
              var cipher                  = crypto.createCipheriv('aes-256-gcm',aes_key_buffer,iv_buffer);
              
              var buffer1                 = cipher.update(payload_buffer);
              var buffer2                 = cipher.final();
              
              var enc_buffer              = Buffer.concat([buffer1,buffer2]);
              var tag_buffer              = cipher.getAuthTag();
              
              var buffer                  = Buffer.concat([enc_buffer,tag_buffer]);
              
              var blob                    = iv_buf_blob(iv_buffer,buffer);
              return blob;
              
        }//aesEncryptNode


        aes.key.import.browser    = async function(blob){
        
              var buf           = await blob_buf(blob);
              
              var format        = 'raw';
              var keydata       = buf;//uint8;
              var algorithm     = 'AES-GCM';
              var extractable   = true;
              var keyusage      = ['encrypt','decrypt'];
              
              var key           = await  crypto.subtle.importKey(format,keydata,algorithm,extractable,keyusage);
              
              return key;
              
        }//importAesKey


        aes.encrypt.browser   = async function(key_blob,payload_blob,iv_bits=96){
          
              var bytes                   = iv_bits/8;
              var key                     = await aes.key.import.browser(key_blob);
              var payload_buf             = await payload_blob.arrayBuffer();
                                                                                //  96-bit IV recommended ( 12 bytes )
              var uint8                   = new Uint8Array(bytes);
              var iv_uint8                = crypto.getRandomValues(uint8); 
              
              var algorithm               = {name:'AES-GCM',iv:iv_uint8}
              key                         = key;
              var data                    = payload_buf;
              
              var buf                     = await crypto.subtle.encrypt(algorithm,key,data);
              
              var blob                    = iv_buf_blob(iv_uint8,buf);
              return blob;
              
        }//aesEncrypt


        aes.decrypt.node    = async function(key_blob,payload_blob,iv_bits=96){
          
              var bytes                   = iv_bits/8;
              var taglength               = 16;
              
              key_buffer                  = await blob_buffer(key_blob);
              var payload_buffer          = await blob_buffer(payload_blob);
              
              var iv_buffer               = payload_buffer.subarray(0,bytes);
              
              payload_buffer              = payload_buffer.subarray(bytes);
              
              var n                       = payload_buffer.length-taglength;
              var tag                     = payload_buffer.subarray(n);
              
              payload_buffer              = payload_buffer.subarray(0,n);
              
              
              var decipher                = crypto.createDecipheriv('aes-256-gcm',key_buffer,iv_buffer);
              decipher.setAuthTag(tag);

              var buf1                    = decipher.update(payload_buffer);
              var buf2                    = decipher.final();

              var dec_buffer              = Buffer.concat([buf1,buf2]);
              var dec_blob                = new Blob([dec_buffer]);
              
              return dec_blob;
              
        }//aes.decrypt.node



        aes.decrypt.browser   = async function(key_blob,payload_blob){

              var key                     = await aes.key.import.browser(key_blob);
              var {iv,buf}                = await blob_iv_buf(payload_blob);
              var iv_uint8                = iv;
              var buf_uint8               = buf;
              
              var algorithm               = {name:'AES-GCM',iv:iv_uint8};
              var key                     = key;
              var data                    = buf_uint8.buffer;
              
              var buf                     = await crypto.subtle.decrypt(algorithm,key,data);
              
              var blob                    = new Blob([buf]);
              
              return blob;
              
        }//aesDecrypt


  //:


        extract_spki.node   = async function(cert_blob){
        
              var cert_pem                = await cert_blob.text();
              var key                     = crypto.createPublicKey(cert_pem);
              var der                     = key.export({type:'spki',format:'der'});
              var spki_blob               = new Blob([der]);
              return spki_blob;
              
              var uint8                   = new Uint8Array(spkiDer);
              var buf                     = uint8.buffer;
              return buf;
              
        }//extract_spki
        
        
        pub_key.node    = async function(cert_blob){
        
              var spki_blob               = await extract_spki.node(cert_blob);
              var spki_buf                = await spki_blob.arrayBuffer();
              var publicKey               = await crypto.subtle.importKey('spki',spki_buf,{name:'RSA-OAEP',hash:'SHA-256'},true,['encrypt']);
              return publicKey;
              
        }//pub_key
        
        
        rsa.encrypt.node    = async function(cert_blob,blob){
        
              var publicKey               = await pub_key.node(cert_blob);
              var buf                     = await blob.arrayBuffer();
              var enc_buf                 = await crypto.subtle.encrypt({name:'RSA-OAEP'},publicKey,buf);
              //var enc_blob                = new Blob([enc_buf]);
              //return enc_blob;
              
              var uint8                   = new Uint8Array(enc_buf);
              var blob                    = new Blob([uint8]);
              return blob;
              
        }//encrypt
        
        
        extract_spki.browser    = async function(cert_blob){
                                                                                //  requires node-forge
              var pem                     = await cert_blob.text();                                                                                
              var cert                    = forge.pki.certificateFromPem(pem);
              var spkiAsn1                = forge.pki.publicKeyToAsn1(cert.publicKey);
              debugger;
              var der                     = forge.asn1.toDer(spkiAsn1).getBytes();
              var uint8                   = bin_uint8(der);
              var buf                     = uint8.buffer;
              return buf;
              
        }//extract_spki
        

        pub_key.browser   = async function(cert_blob){
        
              var spki_buf                = await extract_spki.browser(cert_blob);
              
              var format                  = 'spki';
              var keyData                 = spki_buf;
              var algorithm               = {name:'RSA-OAEP',hash:'SHA-256'};
              var extractable             = true;
              var keyUsages               = ['encrypt'];
              var pub_key                 = await crypto.subtle.importKey(format,keyData,algorithm,extractable,keyUsages);
              return pub_key;
              
        }//pub_key

        
        rsa.encrypt.browser   = async function(cert_blob,payload_blob){
        
              var publicKey               = await pub_key.browser(cert_blob);
              var payload_buf             = await payload_blob.arrayBuffer();
              var enc_buf                 = await crypto.subtle.encrypt({name:'RSA-OAEP'},publicKey,payload_buf);
              var uint8                   = new Uint8Array(enc_buf);
              var blob                    = new Blob([uint8]);
              return blob;
              
        }//rsa.encrypt.browser
        
        
        priv_key   = async function(key_blob){
        
              var pem                     = await key_blob.text();
              var b64                     = pem.replace(/-----BEGIN PRIVATE KEY-----/, '')
                                              .replace(/-----END PRIVATE KEY-----/, '')
                                              .replace(/\s+/g, '');
              var uint8                   = b64_uint8(b64);
              var buf                     = uint8.buffer;
              var priv_key                = await crypto.subtle.importKey('pkcs8',buf,{name:'RSA-OAEP',hash:'SHA-256',},true,['decrypt']);
              return priv_key;
              
        }//priv_key
        
        
        rsa.decrypt    = async function(key_blob,enc_blob){
        
              var privateKey              = await priv_key(key_blob);
              var enc_uint8               = await blob_uint8(enc_blob);
              var buffer                  = await crypto.subtle.decrypt({name:'RSA-OAEP',},privateKey,enc_uint8);
              var blob                    = new Blob([buffer]);
              return blob;
              
        }//decrypt




/*
browser

        async function priv_key(pem){
        
              var b64                     = pem.replace(/-----BEGIN PRIVATE KEY-----/, '')
                                              .replace(/-----END PRIVATE KEY-----/, '')
                                              .replace(/\s+/g, '');
              var uint8                   = b64_uint8(b64);
              var buf                     = uint8.buffer;
              var priv_key                = await crypto.subtle.importKey('pkcs8',buf,{name:'RSA-OAEP',hash:'SHA-256',},true,['decrypt']);
              return priv_key;
              
        }//priv_key
        
        
        async function decrypt(blob,key){
        
              var privateKey              = await priv_key(key);
              var uint8                   = await blob_uint8(blob);
              var buffer                  = await crypto.subtle.decrypt({name:'RSA-OAEP',},privateKey,uint8);
              var blob                    = new Blob([buffer]);
              return blob;
              
        }//decrypt

*/

        
  //:
  
  
  
        function iv_buf_blob(iv,buf){

              var buf_uint8               = new Uint8Array(buf);
              var n1                      = iv.length;
              var n                       = n1+buf_uint8.length;
              var uint8                   = new Uint8Array(n);
              uint8.set(iv,0);
              uint8.set(buf_uint8,n1);
              var blob                    = new Blob([uint8]);
              return blob;
              
        }//iv_buf_blob
        

        async function blob_iv_buf(blob,iv_bits=96){
          
              var bytes   = iv_bits/8;
              var n       = blob.size;
              var buf     = await blob.arrayBuffer();
              var uint8   = new Uint8Array(buf);
              var iv      = uint8.slice(0,bytes);
              var buf     = uint8.slice(bytes);
              return {iv,buf};
              
        }//blob_iv_buf
        
                
        function buffer_blob(buf){
          
              var blob                    = new Blob([buf]);
              return blob;
              
        }//buffer_blob
        
        
        async function blob_buffer(blob){
          
              var buf                     = await blob.arrayBuffer();
              var buffer                  = Buffer.from(buf);
              return buffer;

        }//blob_buffer


        obj.blob.b64    = blob_b64;
        
        async function blob_b64(blob){
        
              var uint8                   = await blob_uint8(blob);
              var bin                     = [...uint8].reduce((acc,byte)=>acc+=String.fromCharCode(byte),'');
              var b64                     = btoa(bin);
              return b64;
        
        }//blob_b64

  
        obj.b64.blob    = b64_blob;
        
        function b64_blob(b64,type='text/plain'){
        
              var bin                     = atob(b64);
              var bytes                   = [...bin].map(c=>c.charCodeAt(0));
              var buf                     = new Uint8Array(bytes);
              var blob                    = new Blob([buf],{type});
              return blob;
              
        }//b64_blob
        
        
        async function blob_uint8(blob){
          
              var buf                     = await blob.arrayBuffer();
              var uint8                   = new Uint8Array(buf);
              return uint8;
              
        }//blob_uint8
        
        
        function uint8_blob(uint8){
          
              var blob                    = new Blob([uint8]);
              return blob;
              
        }//uint8_blob


        async function blob_buf(blob){
          
              var buf                     = await blob.arrayBuffer();
              return buf;
          
        }//blob_buf


        function buf_b64(buf){
          
              var uint8                   = new Uint8Array(buf);
              var bin                     = String.fromCharCode(...uint8);
              var b64                     = btoa(bin);
              return b64;
          
        }//buf_b64
        
        
        function b64_uint8(b64){
          
              var bin                     = atob(b64);
              var uint8                   = Uint8Array.from(bin,c=>c.charCodeAt(0));
              return uint8;
              
        }//b64_buf
        
        
        function txt_uint8(txt){
          
              var uint8                   = new TextEncoder().encode(txt);
              return uint8;
              
        }//txt_buf
        
        
        function buf_txt(buf){
          
              var txt                     = new TextDecoder().decode(buf);
              return txt;
              
        }//buf_txt


        function bin_uint8(bin){
        
              var uint8                   = Uint8Array.from(bin,c=>c.charCodeAt(0));
              return uint8;
              
        }//bin_uint8
        
        
        normalise.key   = function(key){
          
              var key_blob;
              var type    = datatype(key);
              switch(type){
                
                case 'string'   : 
                                  key               = normalise.pem(key);
                                  var pkcs8;
                                  if(is.pkcs1(key)){
                                        pkcs8       = pkcs1_pkcs8(key);
                                  }else{
                                        pkcs8       = key;
                                  }
                                  key_blob          = new Blob([pkcs8]);
                                  break;
                                        
                case 'blob'     : 
                                  key_blob          = key;
                                  break;
                                  
                case 'buffer'   : 
                                  key_blob          = buffer_blob(key);
                                  break;
                
              }//switch
              
              return key_blob;
          
        }//normalise.key
        
        
        normalise.cert    = function(cert){
          
              var cert_blob;
              var type    = datatype(cert);
              switch(type){
                
                case 'string'   :
                                  cert        = normalise.pem(cert);
                                  cert_blob   = new Blob([cert]);
                                  break;
                case 'blob'     : 
                                  cert_blob   = cert;
                                  break;
                case 'buffer'   :
                                  cert_blob   = buffer_blob(cert);
                                  break;
              }//switch
              
              return cert_blob;
              
        }//cert
        
        
        normalise.pem   = function(pem){
        
              pem                         = pem.replace(/\r/g,'');
              var lines                   = pem.split('\n');
              
              var n                       = lines.length;
              for(var i=1;i<n-1;i++){
              
                    var line              = lines[i];
                    line                  = line.trimStart();
                    lines[i]              = line;
                    
              }//for
              
              pem                         = lines.join('\n').trim();
              return pem;
              
        }//normalise.pem
        
        
        is.pkcs1    = function(v){
          
              if(v.indexOf('BEGIN RSA PRIVATE KEY')!=-1){
                    return true;
              }
              return false;
              
        }//pkcs1

        
        is.pkcs8    = function(v){
          
              if(v.indexOf('BEGIN PRIVATE KEY')!=-1){
                    return true;
              }
              return false;
              
        }//pkcs8
        

        obj.key_cert    = key_cert;
        
        function key_cert(){
        
              var key                     = `
                    -----BEGIN PRIVATE KEY-----
                    MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxmOIm6QsAC/59
                    OMC/fkLkf4eAuKggR8400SkbtquAk7+z/4mrdlnCnOnpUQqUEr/AN6xDJZqkbxRL
                    ZRwtlaffZbER1cW3Tbk8xDOzmQiVF/frLJwXjiK8JzfVnqpdVym5w5nK313hJ6OX
                    tQBrdfMgMKTA84nhbLHtW2CFbOY3yc7dntuUqRkAY53Hry3R3n5pZtJdyjTEVnoz
                    fURCwEFfnfQxMJJ8ia5oG9w5MIZXi2s+AC2+WCEXYU3K+Wrua74M0S1cLlgRojer
                    sOctsTpppXLpDh+OtINGiLI9citrH+nLBf61N8Vh5Pzqpx07k4J1qLoBGDXhs9IX
                    bJZEBhuBAgMBAAECggEANyd0rILZULVo3ni+m3nZyl60tUwjoorKRmriqmGrl23L
                    Llpg5egGbkMO/c+WSnAcLtTbYasPAJwioFuRSbLdhKpvOEu8cHXp3i5MpC0Vlj/w
                    VY/wFfylWuuPEn+JBx3nrnJJk9CUtjT6QEYNEFJ8I/YXZHj9zA1WoJEtQ6KTSKWV
                    c9Ni4SxYqkY0rBvzT/2gGeY2MbGPUGUENLdMFxRdPPCu4XxmM/C/vVG0jJKbvBDT
                    8UOSHUwGCpnVSqWAeqNYyDjvZu+unDLZXSc87QSN8Y4H9OGAJ96YW1AGcSamkz8m
                    Qb0u4vpFnfjzhCN4IBWMZNq8DPV7J3MJwK1RzdglBQKBgQDw9X7DrWDC//+D8p8D
                    2UIN8OlTeVnLveUFZbQLoPPIPaEkw02K2m4Ho8+g/lHnHRygh/aRds9RiBKJ0ydv
                    gkJwkN9JJ1YzRfpXUNCY+Dv83yXvnoVaX2db/gpFTEEYdU0f7n+GxeEfeIAepcUw
                    24RSQv5pwT6PhDK6D//mX9FuvwKBgQC8rt9SBPODD4lbjGEvpQGD1Y0HQGma/4Vo
                    9XAoqnJZCt7DgNAt52Aq9fAC2hR263x2yh4/Bx7pkDCRLAvz2UpNU3jyNRUNVszm
                    INVv5u1vrO/dnWeqHL1IkNM6wPQzMu5HFuGzkK/hqqxHq+vx1vaXnylXAfWyh2/Y
                    zZCakdVFvwKBgDLFd5Vhhd7ws/UofSsBbzKizXciPbJ5a7VMbbh5jIRnv/mQEVmt
                    lruTX59rlvRcpPiKTYDvCNYEFuvliwyq5Lb1P6cZW8dn+kzFoX5p57HrjwHDZBPb
                    wFqY168sVxcBOGP/C+3o6fuIl25dvYQC7QmsRhEgf78butiLoH75N5bfAoGBALbY
                    K9earrRCGRTba86080vjZUAyvmQS3CDDQAZYbmk1bHw+Vv806e+X1xecaBp5x2qC
                    IV9osh8auMXlzktnNWbLzjfBEv6TMAqOpOdE/LCtAOFcyPmD0jYBCoE0PTFkWJ4R
                    YXUWcCqar0rhIsuASgTSm0gSwRtZvhx10HzJd8iXAoGAB4R5cCA6RAVzlJVXYVQ7
                    8rAgrI4TiQ6+Jzdq9VNRyLnMJ1ABIN5RK4pa+Gd4LQuSWPyAp8PoVzrN9tv3x0om
                    yu1oIACUws53sGrzHpEEvCsUMzzLoDjukcViWE3njfQCq8mhW8JUH15lAh/+L7rK
                    7mJ3nfrCVI3DR83ar/sRG4Q=
                    -----END PRIVATE KEY-----
              `;
              
              var cert                    = `
                    -----BEGIN CERTIFICATE-----
                    MIIDfDCCAmSgAwIBAgIIpL8fq0UzAwgwDQYJKoZIhvcNAQELBQAwJTEjMCEGA1UE
                    AxMabG9jYWxob3N0IHRlc3QgY2VydGlmaWNhdGUwHhcNMjYwNDI2MTgxOTAwWhcN
                    MjcwNDI2MTgxOTAwWjAlMSMwIQYDVQQDExpsb2NhbGhvc3QgdGVzdCBjZXJ0aWZp
                    Y2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGY4ibpCwAL/n04
                    wL9+QuR/h4C4qCBHzjTRKRu2q4CTv7P/iat2WcKc6elRCpQSv8A3rEMlmqRvFEtl
                    HC2Vp99lsRHVxbdNuTzEM7OZCJUX9+ssnBeOIrwnN9Weql1XKbnDmcrfXeEno5e1
                    AGt18yAwpMDzieFsse1bYIVs5jfJzt2e25SpGQBjncevLdHefmlm0l3KNMRWejN9
                    RELAQV+d9DEwknyJrmgb3DkwhleLaz4ALb5YIRdhTcr5au5rvgzRLVwuWBGiN6uw
                    5y2xOmmlcukOH460g0aIsj1yK2sf6csF/rU3xWHk/OqnHTuTgnWougEYNeGz0hds
                    lkQGG4ECAwEAAaOBrzCBrDAMBgNVHRMBAf8EAjAAMCAGA1UdEQQZMBeCCWxvY2Fs
                    aG9zdIcEfwAAAYcEfwAAAjAdBgNVHQ4EFgQU3k/k6mVExJziZIwxZxmdsP6lPJEw
                    CwYDVR0PBAQDAgL0MDsGA1UdJQQ0MDIGCCsGAQUFBwMCBggrBgEFBQcDAwYIKwYB
                    BQUHAwQGCCsGAQUFBwMBBggrBgEFBQcDCDARBglghkgBhvhCAQEEBAMCAOcwDQYJ
                    KoZIhvcNAQELBQADggEBAEyq4Fog+tbPN5jzjWz19GreYZdStt7MDPLW9nbL38TK
                    6DlGZV37HTGdp5F+IWDImh2gCUzPSK9D9QPWNVVG85qC3oZnSktKxjeucjBsMtMi
                    v18gTYyCdF/nQm34czuYjnPA44RJCiqsJreBtaNERPHP+ki++nsq707dBq8pfl+r
                    ox+kK4iUcI3x/F6CvDMru1LXxAU81kLY+F7RqJRieZr+SaOxPtlz4+U/HxY5k9FK
                    ImLsCyhzLJREirc892Cbb8s8Q9mJKnQtydpG7U2SGd/D+Gapwql5Lg1VM+PaJgWW
                    8nq7W+J/VuFG+JOzYSKe9qzEVnsmnbxvxwZpW6VuFEE=
                    -----END CERTIFICATE-----
              `;
              
              return {key,cert};
              
        }//key_cert
  
  
        function datatype(v){
          
              var str                     = Object.prototype.toString.call(v);
              str                         = str.slice(8,-1).toLowerCase();
              return str;
              
        }//datatype

        
        
  //:
  
  return obj;
  
//x509-encrypt-decrypt
}
        
        
      
      
      
