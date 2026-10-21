

var encrypt   = (()=>{

        var uint8=v=>new Uint8Array(v),rnd=n=>crypto.getRandomValues(uint8(n)),enc=new TextEncoder(),dec=new TextDecoder(),subtle=crypto.subtle,
            passKey=async pass=>await subtle.importKey('raw',enc.encode(pass),{name:'PBKDF2'},false,['deriveKey']),
            derive=async(key,salt,usage)=>await subtle.deriveKey({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},key,{name:'AES-GCM',length:256},false,[usage]);
            
        async function encrypt(txt,pass){
              var salt=rnd(16),iv=rnd(12),key=await passKey(pass),aes=await derive(key,salt,'encrypt'),
                  encrypted=await subtle.encrypt({name:'AES-GCM',iv},aes,enc.encode(txt)),buf=uint8(28+encrypted.byteLength);
              buf.set(salt,0);buf.set(iv,16);buf.set(uint8(encrypted),28);
              return buf.toBase64();
        }//encrypt
        
        encrypt.decrypt   = async function(b64,pass){
              var buf=Uint8Array.fromBase64(b64),salt=buf.slice(0,16),iv=buf.slice(16,28),encrypted=buf.slice(28),key=await passKey(pass),aes=await derive(key,salt,'decrypt'),
                  decrypted=await subtle.decrypt({name:'AES-GCM',iv},aes,encrypted);
              return dec.decode(decrypted);
        }//decrypt
        
        return encrypt;
        
})();

        (async () => {
        
              var txt         = 'we build towers to catch the light; but the night belongs to the dark';
              var password    = 'my-secret-password';
              
              var encrypted   = await encrypt(txt,password);
                                                                                console.log('Encrypted:',encrypted);
              var decrypted   = await encrypt.decrypt(encrypted,password);
                                                                                console.log('Decrypted:',decrypted);
        })();
        
        
        
        