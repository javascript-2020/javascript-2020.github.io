


        async function generate(keyfile){
              


              var clientEmail       = keyfile.client_email;
              var privateKeyPem     = keyfile.private_key.replace(/\\n/g,'\n');
              var scope             = 'https://www.googleapis.com/auth/devstorage.read_write';
              
              var assertion         = await buildJwtAssertion({clientEmail,privateKeyPem,scope});
              var json              = await exchangeForAccessToken(assertion);
              var token             = json.access_token;

              
              return {json,token};
              
      
            
              function base64url(input){
              
                    let bytes;
                    
                    if(typeof input=='string'){
                          bytes   = encoder.encode(input);
                    }else if(input instanceof ArrayBuffer){
                          bytes   = new Uint8Array(input);
                    }else if(ArrayBuffer.isView(input)){
                          bytes   = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
                    }else{
                          throw new TypeError('Unsupported input');
                    }
                    
                    var bin   = '';
                    for(var i=0;i<bytes.length;i++){
                      
                          bin  += String.fromCharCode(bytes[i]);
                          
                    }//for
                    
                    var str   = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
                    return str;
                
              }//base64url
      
            
              function pemToArrayBuffer(pem){
              
                    const b64   = pem.replace(/-----BEGIN [^-]+-----/g, '')
                                        .replace(/-----END [^-]+-----/g, '')
                                        .replace(/\s+/g, '');
                    const raw   = atob(b64);
                    const buf   = new Uint8Array(raw.length);
                    
                    for(let i=0;i<raw.length;i++){
                      
                          buf[i]    = raw.charCodeAt(i);
                            
                    }//fpr
                    
                    return buf.buffer;
                    
              }//pem_buf
      
            
              async function importPkcs8PrivateKey(pem) {
              
                    var keyData   = pemToArrayBuffer(pem);
                    var key       = await crypto.subtle.importKey('pkcs8',keyData,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);
                    return key
                    
              }//import
      
            
              async function signRS256(privateKey, dataToSign) {
              
                    var dataBytes   = encoder.encode(dataToSign);
                    var sig         = await crypto.subtle.sign({name:'RSASSA-PKCS1-v1_5'},privateKey,dataBytes);
                    var uint8       = new Uint8Array(sig);
                    return uint8;
                    
              }//sign
      
            
              async function buildJwtAssertion({clientEmail,privateKeyPem,scope,aud='https://oauth2.googleapis.com/token'}){
              
                    var key               = await importPkcs8PrivateKey(privateKeyPem);
                
                    var now               = Math.floor(Date.now()/1000);
                    var header            = {alg:'RS256',typ:'JWT'};
                    var payload           = {
                                                  iss     : clientEmail,
                                                  scope   : Array.isArray(scope) ? scope.join(' ') : scope,
                                                  aud     : aud,
                                                  iat     : now,
                                                  exp     : now+3600, // 1 hour max
                                            };
                
                    var encodedHeader     = base64url(JSON.stringify(header));
                    var encodedPayload    = base64url(JSON.stringify(payload));
                    var unsigned          = `${encodedHeader}.${encodedPayload}`;
                
                    var sig               = await signRS256(key,unsigned);
                    var encodedSig        = base64url(sig);
                    var str               = `${unsigned}.${encodedSig}`;
                    return str
                    
              }//build
            
              
              async function exchangeForAccessToken(assertion) {
              
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
                          disp(err.toString());
                          return;
                    }
                    
                    if(!res.ok){
                          throw new Error(`Token exchange failed: ${res.status} ${res.statusText} ${await res.text()}`);
                    }
                                                                                // { access_token, token_type, expires_in }
                    var json    = await res.json();
                    return json;
                    
              }//exchange
            
        
        }//generate




