//  very-simple-proxy.js

        var https   = require('https');
        
        var key;
        var cert;
        setup();

        
        https.createServer({key,cert},request).listen(8005);
                                                                                console.log('listening 8005');
        function request(req,res){
                                                                                console.log('8005 :',req.url);
              if(req.url=='/'){
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(html);
                    return;
              }
              
              var req2   = https.request('https://localhost:8006'+req.url,{ca:cert,method:req.method},res2=>{
                
                    res2.on('data',data=>res.write(data));
                    res2.on('end',()=>res.end());
                    
              });
              
              req.on('data',data=>req2.write(data));
              req.on('end',()=>req2.end());
              
        }//request
        
        
        https.createServer({key,cert},request2).listen(8006);
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
        
              <3>test</h3>
              
              <script type=module>
              
                    var body    = JSON.stringify([1,2,3]);
                    var res   = await fetch('test',{method:'post',body});
                    var txt   = await res.text();
                    document.body.append(txt);
                    
              </script>
              
        `;

function setup(){

        key   = `
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCa8SM60MEabNel
k9rwWp2Rg0C0UNQEqRLnKWWVKZt/s0/Jj6B9bRKMFjTWwWQwgupEV2TEfy8ULCCv
WMut2NzeLHGny/YO6DffkxELk11gnl50xaLTCXdNZ9YJ8lH6j1Es2RobMIOR+Dr9
v5ViXtoV0DP7wsR4LssppANcQ8FdjL4s2miJsOtw0zNuOieBTstA4cHZ1PzEISfU
DuF0uo0YEopBg1AzccGISTgtzBiRxHaMVdKCmhH5eJ9U9hVnfefFXYsPC/xO3M9j
4VNs1GM5PcvGrzUf+BIAObPqtDOPZCuF7LTjwGdQEMeA1HZz7M8zH4be2lsdG9vT
RieEHhMnAgMBAAECggEACz58pAQKP3SuoaF9PfwVez3fMDa9bCko6gWjDZQbaMUG
gUYfC3si4W+rHfqi3rJhddwxv+DK9dfN92umPFOEk8r95IN0s9g+VcdCcWicWiqk
CC1fh5kkQ0XJzqb7NAe6iFqo/lgi9DDjdw60NJNVmEenvhmAUIh0zezNIaD5I2S5
mQQyeMxaOV1Cggu0/ljhBmyZsfyC0vrkxy/OR2LKAuFpurd5wkqa62AIfZBzNW0T
mCVNgR3SA+2Oc5lpA8jHJH/e+UEtjCXSCEuj/DpfUwrYTCQn4tddCDMRCPpHOuqm
3p+DitV/QGQNfKAKe/NuBzwEgZjXY2SrVfcI859MIQKBgQD9V8i8Bj1qAK1vPa17
8k21UWV723CC9O9XX+QnPzoe7bCI0iUR3OhpbOD0ZrYLCCUC4ICZd8cQhAqG1RWC
Cdzve6UZ2y3+1JL5ISX0Vkyd1/VJ3Eho9hHNLUhw2PY5sTn6gCApR5nPJ3J2Gx8B
6jSMsd+D5DRPdoDRjtM79WEsRQKBgQCckSaWEWba6dLhSyDaYozajFtTNBm4fbdR
T4iFt7R1nIbKTzj4RKV79Ox4cSDG0N/GEWjVp9HCtdR0KHhVgiJtWKE3p7GzjliT
ZtA9uPXRJU+l7S0YAXZQ55tJvc8wfdJABogtLduOJyYTWjceM0dVF9rU0QWWufrr
jU9z6052ewKBgCkAvzVnUSNJ7sgVVHG+GsOg4+ry7jfTyrT6iSOtAQwmbi8GzAcj
GN6PR61mvkn0zIC1szqjfy12IXoHHM8KJ57/BQ61QbF/2DXIHqt4GDhnzoRgybtr
MCBkFthk1R0rSPX5LLthokw71zO0WgVmUZD/7Owc0DaYOGsyUY/fvBV9AoGAVONK
JYFn3/d489f1BxL5xaDl/xW3gFUBKJ/TqJRyznXAiz4q6Ejn5G5mK+NCXyluuohD
69uimkxV1Wj/3XTCT8EHIBLXAUCDe9/5tg1rkisFpTQUB/j6+mCozHGSPXtqnHYu
LTi42rkVJtb6HXC2E0fsyQhPXGqXxlEGrBX/o7MCgYBmXg48QgHOjnoCsLsrcBsH
xHwMAmUFE7XzB8L4sfc8bRI0RmqdHZfh8Qa0FcmFJfRfgpKwfXg6WFC2krGUZmcS
7x/5Rp1Gxj3c58/q/X4hRXDeCbXZ1Nn/jm9JMbADXlLLlGHopQ7h1qxE0yyq6toc
Gxs6VHKB4HcBOtYjuKXzIg==
-----END PRIVATE KEY-----`;

        cert    = `
-----BEGIN CERTIFICATE-----
MIIDcjCCAlqgAwIBAgIBATANBgkqhkiG9w0BAQUFADAlMSMwIQYDVQQDExpsb2Nh
bGhvc3QgdGVzdCBjZXJ0aWZpY2F0ZTAeFw0yNTEwMjExNzUxMDBaFw0yNjEwMjEx
NzUxMDBaMCUxIzAhBgNVBAMTGmxvY2FsaG9zdCB0ZXN0IGNlcnRpZmljYXRlMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmvEjOtDBGmzXpZPa8FqdkYNA
tFDUBKkS5ylllSmbf7NPyY+gfW0SjBY01sFkMILqRFdkxH8vFCwgr1jLrdjc3ixx
p8v2Dug335MRC5NdYJ5edMWi0wl3TWfWCfJR+o9RLNkaGzCDkfg6/b+VYl7aFdAz
+8LEeC7LKaQDXEPBXYy+LNpoibDrcNMzbjongU7LQOHB2dT8xCEn1A7hdLqNGBKK
QYNQM3HBiEk4LcwYkcR2jFXSgpoR+XifVPYVZ33nxV2LDwv8TtzPY+FTbNRjOT3L
xq81H/gSADmz6rQzj2Qrhey048BnUBDHgNR2c+zPMx+G3tpbHRvb00YnhB4TJwID
AQABo4GsMIGpMAkGA1UdEwQCMAAwIAYDVR0RBBkwF4IJbG9jYWxob3N0hwR/AAAB
hwR/AAACMB0GA1UdDgQWBBTFTq3s81JbUmUg+u94ZQ7kHOAzZjALBgNVHQ8EBAMC
AvQwOwYDVR0lBDQwMgYIKwYBBQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYB
BQUHAwEGCCsGAQUFBwMIMBEGCWCGSAGG+EIBAQQEAwIA5zANBgkqhkiG9w0BAQUF
AAOCAQEAk0B0HgWBtnmuCjlI81SpbUYbhp6UUm3oqvs5bvJLeVdcomy4ym/P2lHC
YJhPVaTmruAmB+2Q60b9KSLvHKalxZzf6W//zCROvh5VbZI2WH7FFIuH7u2yGvew
Lmgn6YU6BCc98bvR1h6tVYUa2M4uRCbz7ch2Cd43qVmOFGO4GcZX85QUiglkCYee
rnezXV68vTU+eK31leuQCVQc5Efp2NjLzR6SjzyujjIPm5dUKNZnKQrzyWGlhXLS
NyN5dLsPb8EocwT7GIdywFI3T0e8dITTMG82lqzpYUUy9fh417f2MAEbdG+vDHa4
dahJ5GrzvRUijuPmZVg20O7j8tGsWA==
-----END CERTIFICATE-----`;
        
}        