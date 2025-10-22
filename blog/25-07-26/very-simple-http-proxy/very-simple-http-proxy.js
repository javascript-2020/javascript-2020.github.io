//  very-simple-proxy.js

        var https   = require('https');
        var http    = require('http');
        
        var key;
        var cert;
        setup();

        var mode    = 'https';
                                                                                console.log(mode);
        
        if(mode=='https'){
              https.createServer({key,cert},request).listen(8005);
        }else{
              http.createServer(request).listen(8005);
        }
                                                                                console.log('listening 8005');
        function request(req,res){
                                                                                console.log('8005 :',req.url);
              if(req.url=='/'){
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(html);
                    return;
              }
         
              var url   = `${mode}://localhost:8006${req.url}`;
                                                                                console.log('8005 :',url);
              if(mode=='http'){                                                                                
                    var req2   = http.request(url,{ca:cert,method:req.method},result);
              }else{
                    var req2   = https.request(url,{ca:cert,method:req.method,rejectUnauthorized:false},result);
              }
              
              function result(res2){
                
                    res2.on('data',data=>res.write(data));
                    res2.on('end',()=>res.end());
                    
              }//result
              
              req.on('data',data=>req2.write(data));
              req.on('end',()=>{
                                                                                console.log('8005 :','req end'); 
                    req2.end()
                    
              });
              
        }//request

        
        if(mode=='https'){
              https.createServer({key,cert},request2).listen(8006);
        }else{
              http.createServer(request2).listen(8006);
        }
                                                                              console.log('listening 8006');
        function request2(req,res){
                                                                              console.log('8006 :',req.url);
              var body    = '';
              req.on('data',data=>body+=data);
              req.on('end',()=>{
              
                    if(req.method=='POST'){
                          var json    = JSON.parse(body);
                          console.log('post',json);
                    }
                    res.end('it works!');
                    
              });
              
        }//request2

        
        var html    = `
        
              <h3>test</h3>
              
              <script type=module>
              
                    var enc     = window.location.search.slice(1);
                    var b64     = decodeURIComponent(enc);
                    var url     = atob(b64);
                    var url     = url+'/test';
                                                                                console.log('test',url);
                    var body    = JSON.stringify([1,2,3]);
                    var res     = await fetch(url,{method:'post',body});
                    var txt     = await res.text();
                    document.body.append(txt);
                    
              </script>
              
        `;





function setup(){

        key   = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCJqjhlLiDSk0Im
cGgALaVtxbZ+jG/359e2AkXJH/3Y0q5eJB3UKr6vANr1D/Jg947Nsk1gcvGd8m5n
+lO/YMSjEOf4eAwoTolBeIo9NPkz1iYE5O/1f/Kz/Z5lc7axIPPEZ+yiVxh3lUyF
XUQr0jZJG3b9EkiyzomwaQHzj+X+0+0d1hm3ZtTB95YW/cELkVb8uqIpcf3VXaah
gtMhcvXzMuDtJJuzFrKC7PEzO0pEXEXrPebAv3FrElXllsooJ7aEjWYCV80HfQP5
2tlirx76iayr1mciMaGP0apDG0qc61aOid9Pn+5mEOM8iYZV/tly/TKSxpx7FuZT
p+USyBILAgMBAAECggEAQ5GoAomElLawpjtP4J6G7v03GKAHqQ9DglNVO2WXa9/k
s9JYTbX5R95MmjIMjmmTzwRwFCH208aVSDXG+00c1sjKgtsxZGs/1UG74FTq5/V5
Tbesy7vUPWIDZ9pG1mPNIh68N+Y13SQLnf3sIvIXsQRo/8gEpLbZQBwaWBjOE6fk
XvUNbHW5zTIUEawK8ZCDOsinWXnwHd0uuioESLEuf+s69VOmwMyNhmXqtGzIqrOs
Fj5X7KnG6vXUbWvVjargUHsgjAQmQ4AmcyKsWw23SvByVeQDnJgZ1y3sirC+F2G6
146ZkP5Bo91BO0+D4t93mK2arNBPMow5/9wk0sJQMQKBgQD1tefbQVhmr3tl4ect
Tx/EVrV7VutEJVCKBap4mzIhsvA0grssoH5sumAYQuWWcBA1ce+hZcfsOIKPwklg
S0Rhw1GCgCkadkNk1nLFbmjlu5Vhjc2iX+TQPPIwztntqHU4WbBzvPalwgpsFdp/
Yw3OOwOtSo8RgT9TGoo6N/qv6QKBgQCPbggK1JwWrlAWnWw8tJfMi0PChVGjPQqB
L2OhlHaebVbfgS0ZoH/y7Z4BSyEIWCZ6aunVb3RP+S7eXImgoxD7IbX+x/LhJJzT
BnXr+Ri46RGN9TJS3lUC7TafMjzSEBIcMM+TGQ6raYwabjNTvr9EkPLhZeTrAQJh
G6L3XkBN0wKBgARJCuUpC5im4NkTCowgwCYVeQ7QokPK/s+Zb7KwyjwKOeRAj3Ek
z2+oBHsH16c7Bx1Xgl1nQAhfp+9H7S2vwl6OIILNJ2pdu6krkE7fMRcooV9VMMvv
LjdviK3PPb/GW10DO2+ZURfs/W+LJgdou9nn75V7Immkvmz9noGLbmTZAoGARvaQ
ohMpGwupclb2214akMgCgXaGurYTwXDZ4XLb8Wx1g+Wck8ZWJ7Iq78blFATRHNZS
1Rfsuzi1WKz+Ju0nFKlMKz9wSrZbpQjYRSUcdzhRSCQdfuSjuOv2j3NCpkfvPeVk
fgnyuRpiiB0n5fJFHb59fMl2JlN8guEykyMdu6MCgYEAjgdMweIv35bbBybSpiFI
ZUlRbaNGi2iog3mnR+uCu+Cc0UOfN2KcmfbtrLuDaEfouE9BoiedLzadgRgO2s6t
Gh0smyi4dJsUFg3s8fAVUaO7s+tk37RS2hOlItjHohTlPvK6KnS5eP12MuNQ5sEP
M+X5Mi2Er2HxEJ/JsA8zCKY=
-----END PRIVATE KEY-----
`;

        cert    = `
-----BEGIN CERTIFICATE-----
MIIDeDCCAmCgAwIBAgIBATANBgkqhkiG9w0BAQUFADAlMSMwIQYDVQQDExpsb2Nh
bGhvc3QgdGVzdCBjZXJ0aWZpY2F0ZTAeFw0yNTEwMjExNzUxMDBaFw0yNjEwMjEx
NzUxMDBaMCUxIzAhBgNVBAMTGmxvY2FsaG9zdCB0ZXN0IGNlcnRpZmljYXRlMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiao4ZS4g0pNCJnBoAC2lbcW2
foxv9+fXtgJFyR/92NKuXiQd1Cq+rwDa9Q/yYPeOzbJNYHLxnfJuZ/pTv2DEoxDn
+HgMKE6JQXiKPTT5M9YmBOTv9X/ys/2eZXO2sSDzxGfsolcYd5VMhV1EK9I2SRt2
/RJIss6JsGkB84/l/tPtHdYZt2bUwfeWFv3BC5FW/LqiKXH91V2moYLTIXL18zLg
7SSbsxayguzxMztKRFxF6z3mwL9xaxJV5ZbKKCe2hI1mAlfNB30D+drZYq8e+oms
q9ZnIjGhj9GqQxtKnOtWjonfT5/uZhDjPImGVf7Zcv0yksacexbmU6flEsgSCwID
AQABo4GyMIGvMA8GA1UdEwQIMAYBAf8CAQAwIAYDVR0RBBkwF4IJbG9jYWxob3N0
hwR/AAABhwR/AAACMB0GA1UdDgQWBBTXCn5rSAXVxTEFoxIBAIxsYLbMfDALBgNV
HQ8EBAMCAvQwOwYDVR0lBDQwMgYIKwYBBQUHAwIGCCsGAQUFBwMDBggrBgEFBQcD
BAYIKwYBBQUHAwEGCCsGAQUFBwMIMBEGCWCGSAGG+EIBAQQEAwIA5zANBgkqhkiG
9w0BAQUFAAOCAQEAQ4n9m2MjntHK4607P/ZxcdM+lFd9Y4ulysApLYrUOPqnQNXV
u6pCCRyp/GJhrSyjfBhjHRg+TfOViWfpNV4MN5+d6fIQ2Rlm4APcNlsaply4KN5y
1litt6Z25Nq6p18pmGF6OZZVbtSM82BIzctniR9NTDopFfzXr+Bw2pSo2cx58x4p
npnftL/P3wX+pzBalF8H8Xh4hkiWwxTIe1tWojWlkT16fa8Y7d2D+/mD9l++oWHD
bQbvzESakd4nVh97+LV0FefUQ3P4BaEdOcPXm+kuwgIp/rQln9n0he3ZUFd7UKNF
+/Aig6NrbNLnZM6aB5loq8EHcCkXQhw+wrKqHA==
-----END CERTIFICATE-----
`;
        
}        