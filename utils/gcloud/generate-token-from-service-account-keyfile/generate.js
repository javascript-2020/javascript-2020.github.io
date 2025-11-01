


        async function generate(keyfile,scope){
              
              var encoder           = new TextEncoder();
              
              var clientEmail       = keyfile.client_email;
              var privateKeyPem     = keyfile.private_key;
              
              privateKeyPem         = norm_key(privateKeyPem);
              
              var assertion         = await buildJwtAssertion({clientEmail,privateKeyPem,scope});
              var {json,error}      = await exchangeForAccessToken(assertion);
              if(error){
                    return {error};
              }
              
              var token             = json.access_token;
              return {json,token};
              
      
              async function buildJwtAssertion({clientEmail,privateKeyPem,scope,aud}){
              
                    scope                 = Array.isArray(scope) ? scope.join(' ') : scope;
                    aud                 ||= 'https://oauth2.googleapis.com/token';
                    
                    var now               = Math.floor(Date.now()/1000);
                    
                    var iss               = clientEmail;
                    var iat               = now;
                    var exp               = now+3600;
                    var payload           = {iss,scope,aud,iat,exp};
                
                    var header            = {alg:'RS256',typ:'JWT'};
                    var str               = JSON.stringify(header);
                    var encodedHeader     = b64url(str);
                    
                    var str               = JSON.stringify(payload);
                    var encodedPayload    = b64url(str);
                    var unsigned          = `${encodedHeader}.${encodedPayload}`;
                
                    var key               = await importPkcs8PrivateKey(privateKeyPem);
                    var sig               = await signRS256(key,unsigned);
                    var encodedSig        = b64url(sig);
                    var str               = `${unsigned}.${encodedSig}`;
                    return str
                    
              }//build
            
              
              async function exchangeForAccessToken(assertion){
              
                    var url       = 'https://oauth2.googleapis.com/token';
                    var body      = new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion});
                    var headers   = {'Content-Type':'application/x-www-form-urlencoded'};
                    
                    var err;
                    try{
                      
                          var res       = await fetch(url,{method:'post',headers,body});
                          
                    }//try
                    catch(err2){
                      
                          err   = err2;
                          
                    }//catch
                    if(err){
                                                                                console.error(err);
                          var error   = err.toString();
                          return {error}
                    }
                    
                    if(!res.ok){
                          var error   = `Token exchange failed: ${res.status} ${res.statusText} ${await res.text()}`;
                          return {error};
                    }
                                                                                // { access_token, token_type, expires_in }
                    var json    = await res.json();
                    return {json};
                    
              }//exchange


              async function importPkcs8PrivateKey(pem){
              
                    var buf       = pem_buf(pem);
                    var params    = {name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'};
                    var key       = await crypto.subtle.importKey('pkcs8',buf,params,false,['sign']);
                    return key
                    
              }//import
      
            
              async function signRS256(private,data){
              
                    var bytes       = encoder.encode(data);
                    var sig         = await crypto.subtle.sign({name:'RSASSA-PKCS1-v1_5'},private,bytes);
                    var uint8       = new Uint8Array(sig);
                    return uint8;
                    
              }//sign

            
              function norm_key(pem){
                
                    pem   = pem.replace(/\\n/g,'\n');
                    return pem;
                
              }//norm
              
              
              function b64url(input){
              
                    var uint8   = _uint8(input);
                    if(!uint8){
                          throw new TypeError('Unsupported input');
                    }
                    
                    var bin   = '';
                    var n     = uint8.length;
                    for(var i=0;i<n;i++){
                      
                          var byte    = uint8[i];
                          bin        += String.fromCharCode(byte);
                          
                    }//for
                    
                    var b64   = btoa(bin);
                    b64       = b64.replaceAll('+','-');
                    b64       = b64.replaceAll('/','_');
                    b64       = b64.replaceAll('=','');
                    
                    var url   = b64;
                    return url;
                
              }//b64url

      
              function _uint8(input){
                    
                    var uint8;
                    if(typeof input=='string'){
                          uint8   = encoder.encode(input);
                    }
                    if(input instanceof ArrayBuffer){
                          uint8   = new Uint8Array(input);
                    }
                    if(ArrayBuffer.isView(input)){
                          uint8   = new Uint8Array(input.buffer,input.byteOffset,input.byteLength);
                    }
                    return uint8;
                    
              }//to_uint8

              
              function pem_buf(pem){
              
                    var i1    = pem.indexOf('\n');
                    var i2    = pem.lastIndexOf('\n');
                    var s     = pem.slice(i1+1,i2);
                    var b64   = pem.replaceAll('\n','');
                    /*
                    var b64   = pem.replace(/-----BEGIN [^-]+-----/g,'')
                                        .replace(/-----END [^-]+-----/g,'')
                                        .replace(/\s+/g,'');
                    */
                    var bin     = atob(b64);
                    var n       = bin.length;
                    var uint8   = new Uint8Array(n);
                    
                    for(var i=0;i<n;i++){
                      
                          uint8[i]    = bin.charCodeAt(i);
                            
                    }//fpr
                    
                    var buf   = uint8.buffer;
                    return buf;
                    
              }//pem_buf
      
        }//generate




