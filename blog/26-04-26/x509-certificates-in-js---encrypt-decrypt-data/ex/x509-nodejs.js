
(async()=>{


        var crypto              = require('node:crypto');
        
        var {key,cert}          = setup();
        
        
        var secret              = 'my-super-secret-token';
        var blob                = new Blob([secret]);
        
        
        var encrypted_blob      = await encrypt(blob,cert);
        var b64                 = await blob_b64(blob);
                                                                                console.log('Encrypted :',b64);
                                                                                
        var encrypted_blob      = b64_blob(b64);
        var blob                = await decrypt(blob,key);
        var txt                 = await blob.text();
                                                                                console.log('Decrypted :',txt);
                                                                                
                                                                                
  //:
  
  
        async function encrypt(blob,cert){
                                                                                // Encrypt with public key from X.509 cert
              var buffer        = await blob_buffer(blob);
              
              var key           = cert;
              var padding       = crypto.constants.RSA_PKCS1_OAEP_PADDING;
              var oaepHash      = 'sha256';
              
              var params        = {key,padding,oaepHash};
              const encrypted   = crypto.publicEncrypt(params,buffer);
              
              var blob          = new Blob([encrypted]);
              return blob;
              
        }//encrypt
        
        
        async function decrypt(blob,key){
                                                                                // Decrypt with private key
              var buffer        = await blob_buffer(blob);
              
              var key           = key
              var padding       = crypto.constants.RSA_PKCS1_OAEP_PADDING;
              var oaepHash      = 'sha256';
              
              var params        = {key,padding,oaepHash};
              var decrypted     = crypto.privateDecrypt(params,buffer);
              
              var blob          = new Blob([decrypted]);
              return blob;
              
        }//decrypt
        
        
        
        
  //:
  
  
  
        async function blob_buf(blob){
        
              var arrayBuffer   = await blob.arrayBuffer();
              var buffer        = Buffer.from(arrayBuffer);
              return buffer;
              
        }//blob_buf
        
        
        async function blob_b64(blob){
        
              const arrayBuffer   = await blob.arrayBuffer();
              var buffer          = Buffer.from(arrayBuffer);
              var b64             = buffer.toString('base64');
              return b64;
              
        }//blob_b64
        
        
        
        
        
        async function blob_b64(blob){
        
              var buf     = await blob.arrayBuffer();
              var bytes   = new Uint8Array(buf);
              var bin     = bytes.reduce((acc,byte)=>acc+=String.fromCharCode(byte),'');
              var b64     = btoa(bin);
              return b64;
              
        }//blob_b64
        
        
        function b64_blob(b64){
        
              var bin     = atob(b64);
              var bytes   = [...bin].map(c=>c.charCodeAt(0));
              var buf     = new Uint8Array(bytes);
              var blob    = new Blob([buf]);
              return blob;
              
        }//b64_blob
        
        
        
  //:
  
  
        function setup(){
        
              var key   = `
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
              
              var cert    = `
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
              
        }//setu
        
        
        
})();



