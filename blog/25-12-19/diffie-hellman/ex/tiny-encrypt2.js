


//  key >>> message


        var tiny        = {};        

        
        tiny.encrypt    = (message,key)=>{
    
              message   = [...message];
              var n   = key.length;
              for(var i=0;i<n;i++){
                
                    var k         = key[i];
                    var mi        = i%message.length;
                    var c         = message[mi];
                    var byte      = tiny.code(c)^tiny.code(k);
                    var e         = tiny.char(byte);
                    message[mi]   = e;
                                                                                console.log(i,k,mi,c,byte,e);
                    //[...message].reduce((a,c,i)=>a+tiny.xor(c,key,i),'')
                    
              }//for
              
              message   = message.join('');
              var b64   = btoa(message);
              return b64;
              
        }//encrypt
        
        
        tiny.decrypt    = (encrypted,key)=>{
          
              encrypted   = atob(encrypted);
              encrypted   = [...encrypted];
              var n       = key.length;
              for(var i=0;i<n;i++){
                
                    var ei    = i%encrypted.length;
                    var e     = encrypted[ei];
                    var k     = key[i];
                    var byte    = tiny.code(e)^tiny.code(k);
                    var c       = tiny.char(byte);
                    encrypted[ei]   = c;
                    
                    //[...atob(encrypted)].reduce((a,e,i)=>a+tiny.xor(e,key,i),'')
                    
              }//for
              
              encrypted     = encrypted.join('');
              var message   = encrypted;
              return message;
                
        }//decrypt
        
        
        tiny.xor        = (c,key,i)=>tiny.char(tiny.code(c)^tiny.code(key[i%key.length]));
        tiny.code       = v=>v.charCodeAt(0);
        tiny.char       = v=>String.fromCharCode(v);        


        var key         = '1234567890xyz';
        var encrypted   = tiny.encrypt('hello',key)
        console.log(encrypted);      
        
        var decrypted   = tiny.decrypt(encrypted,key);
        console.log(decrypted);





