


/*


aes encrypt / decrypt


30-04-26


*/


(async()=>{
                                                                                console.clear();
                                                                                
                                                                                
        var key         = await generateAesKey();
        var encrypted   = await aesEncrypt(key,'hello world');
        var txt         = await aesDecrypt(key,encrypted);
        
        console.log(txt);
        
        
        
        async function generateAesKey() {
        
              var key   = await crypto.subtle.generateKey({name:"AES-GCM",length: 256},true,["encrypt", "decrypt"]);
              return key;
              
        }//generateAesKey
        
        
        async function exportAesKey(key) {
        
              const raw = await crypto.subtle.exportKey("raw", key);
              var b64   = btoa(String.fromCharCode(...new Uint8Array(raw)));
              return b64;
              
        }//exportAesKey
        
        
        async function importAesKey(base64) {
        
              const raw = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
              var key   = await  crypto.subtle.importKey("raw",raw,"AES-GCM",true,["encrypt", "decrypt"]);
              return key;
              
        }//importAesKey
        
        
        async function aesEncrypt(key, plaintext) {
        
              const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV recommended
              
              const encoded = new TextEncoder().encode(plaintext);
              
              const ciphertext = await crypto.subtle.encrypt({name: "AES-GCM",iv},key,encoded);
              
              return {
                iv: btoa(String.fromCharCode(...iv)),
                data: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
              };
              
        }//aesEncrypt
        
        
        async function aesDecrypt(key, encrypted) {
        
              const iv = Uint8Array.from(atob(encrypted.iv), c => c.charCodeAt(0));
              const data = Uint8Array.from(atob(encrypted.data), c => c.charCodeAt(0));
              
              const plaintext = await crypto.subtle.decrypt(
                {
                  name: "AES-GCM",
                  iv,
                },
                key,
                data
              );
              
              return new TextDecoder().decode(plaintext);
              
        }//aesDecrypt
        
        
        
        
})();



