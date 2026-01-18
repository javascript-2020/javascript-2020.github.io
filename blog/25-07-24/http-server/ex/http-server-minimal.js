


        var fs          = require('fs');
        
        var key,cert    = setup();
        var port        = 3002;
        var server      = require('https').createServer({key,cert},request).listen(port);
                                                                                console.log(`https://localhost:${port}/`);
                                                                                
        function request(req,res){
                                                                                console.log(req.method,req.url);
              var url   = req.url.slice(1);
              if(url=='')url='index.html';
              
              switch(url){
              
                case 'hello'    : return hello(req,res);
                
              }//switch
              
              if(!fs.existsSync(req.url)){
                    res.writeHead(404).end(`404 Not Found : ${req.url}`);
                    return;
              }
              var stat    = fs.statSync(req.url);
              if(!stat.isFile()){
                    res.writeHead(404).end(`404 Not Found : ${req.url}`);
                    return;
              }
              
              var type    = mime(abs);
              res.writeHead(200,{'content-type':type});
              fs.createReadStream(abs).pipe(res);
              
        }//request
        
        
        function hello(req,res){
        
              res.writeHead(200,{'content-type':'text/html'});
              res.end(`
                    <style>html{font-family:arial}body{margin:20px}</style>
                    <h3>HTTPS Works!</h3>
                    <h4 style='color:blue'>/hello</h4>
              `);
              
        }//hello
        
        
        //function setup(){
        
              key   =
                    '-----BEGIN RSA PRIVATE KEY-----\n'                                   +
                    'MIIEpAIBAAKCAQEAqWZ5x4R8GVoRKeXe++SN54MzUD1BD/eNfmELIedKeof0m/Cx\n'  +
                    'XQZn2KyxYzvPmCKM6qv0Y458sadmaG0HQGUb55lmox6T7U5LjF3C7HM2PZjuQw5Z\n'  +
                    '4nnCEcu/yEcqNU/a5b9noBY132v/0iIvOn5f4ptQZ8JslU6YmCdznt23rgHUjcOx\n'  +
                    'LYdU8xT53HwEvxZoem8hVIYek+mX2nU8AIj0WMx+piqaxtxFHv6PNmNe6M81ggxL\n'  +
                    'Tr7DvECS+Nl+s5ec7uOClsgafKt5ZxvYufsI7vxTC47/Co2TYuNgpIVqmpykg1Yx\n'  +
                    'KyElGzSIpB7bzDlqq8erU98kjCYzjTiy67KJuQIDAQABAoIBABblbOxUsdlTXSKG\n'  +
                    'mV7+g1eZWiQsQ1D/Kra8Mx7//gcVvTAeljp2lS6qGMfK28I6WUWWvE+AgMYaVDMl\n'  +
                    'GWfQwrbI+yBtD51xibCNM711zQ0CUKHrnKaJwntZSLCvPbs68eE/v6fZmKp8FHW4\n'  +
                    'fR2w2xDr4TBFDRwZJXLbUjtUyHDSQSMUiIfAsJoDTloAsYXGm5bqVv+9mxvli0gp\n'  +
                    'lmiFW3CZCmZC9vjid1Gn4CI3SpwU/Mu6a8ldvA/fU6WnTJ+Wlpi8DcvacmaHLqAd\n'  +
                    'U+CXchyi1/Q6TmG3a82QRIntSLA4R+tr6OLQprMre1C9Mb/e+7L0TG0TCYlKLuvj\n'  +
                    '4W3PgckCgYEA/TEYkDtc0m4nXmPwxYJQkPyMT/BGqvoAcKBu7EF28+bN8de53SHP\n'  +
                    'PREsdFgN/vPGvjHsIXhPyNmRkw+kRYtUCmUWD2SJN0weZ0d+Q3NtGSfLiXIlJwaT\n'  +
                    '/vlyxevVg+JW/8c5sL7Fj4vAVxJCJzYM9Kzvsst4t85eAY/DIp09W6cCgYEAq0d3\n'  +
                    'D7aJwWLi2IdPjW2rJ/bdgLMDUGo0x85RCBH2qb7MPAVenQylcknXXvSLrwv93PbJ\n'  +
                    'w+IQuS1hRXmRLSq24TmOX7hWLILBhUh7bEwQqW6cr0TX4QgkbI8CJNwfyTKqj0ye\n'  +
                    'UEEUCnBaDboTqPAXM9+EAQwzmaSlkQM3VPQ0G58CgYEAve/yyWB/Ba11Ay5eFQzp\n'  +
                    'e5q5d858dQ8O/W6dR8bkgZwHqwF2gRk36kvT2YOlHDmsQkoZJhKnZ7kvp+74AOPA\n'  +
                    'q/uhTPLSrRUBSeEsK1WP5msgGX/ztw8MPx7KpweAKWvGcCL4eErk0ga4x5j+34OA\n'  +
                    'vJxvROW3Lcw2YV2DuZfTy8kCgYABv5gCjA158OV56l+whOcTYFzAfJNTFdJ2G7AO\n'  +
                    'EgjfkLgLAM8HcWKa+Q/+wyZN4iR0RfynSD59dW4hxGzr9hypzembJomSqL8K+kNw\n'  +
                    'RpKA+EUXMO+3N1sP1KHj+G9GoYLGNbUEArYOqTjyHO0oc1L5T5XMYPCB6AFcqpi9\n'  +
                    'AEUr5wKBgQC/m5Eq2XWG2XP1i3G0ut0ierM8+XXw1ydiyAOuHM3aUBwtCirsIBAd\n'  +
                    'kGlVjhwrYIs6DfcPf0hdroPmEHl8BBb1zGUISYZSNhVY2Sxfut26nYAIV85pSmrg\n'  +
                    'Lk1ryU8dYQMT7+7GqxfSaznp6iGm/Blfcnk9YbBOgvs7i6ewJC49kg==\n'          +
                    '-----END RSA PRIVATE KEY-----\n'
              ;
              cert    =
                    '-----BEGIN CERTIFICATE-----\n'                                       +
                    'MIIDcjCCAlqgAwIBAgIBATANBgkqhkiG9w0BAQUFADAlMSMwIQYDVQQDExpsb2Nh\n'  +
                    'bGhvc3QgdGVzdCBjZXJ0aWZpY2F0ZTAeFw0yNTA2MjYxNzQ5MDBaFw0yNjA2MjYx\n'  +
                    'NzQ5MDBaMCUxIzAhBgNVBAMTGmxvY2FsaG9zdCB0ZXN0IGNlcnRpZmljYXRlMIIB\n'  +
                    'IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqWZ5x4R8GVoRKeXe++SN54Mz\n'  +
                    'UD1BD/eNfmELIedKeof0m/CxXQZn2KyxYzvPmCKM6qv0Y458sadmaG0HQGUb55lm\n'  +
                    'ox6T7U5LjF3C7HM2PZjuQw5Z4nnCEcu/yEcqNU/a5b9noBY132v/0iIvOn5f4ptQ\n'  +
                    'Z8JslU6YmCdznt23rgHUjcOxLYdU8xT53HwEvxZoem8hVIYek+mX2nU8AIj0WMx+\n'  +
                    'piqaxtxFHv6PNmNe6M81ggxLTr7DvECS+Nl+s5ec7uOClsgafKt5ZxvYufsI7vxT\n'  +
                    'C47/Co2TYuNgpIVqmpykg1YxKyElGzSIpB7bzDlqq8erU98kjCYzjTiy67KJuQID\n'  +
                    'AQABo4GsMIGpMAkGA1UdEwQCMAAwIAYDVR0RBBkwF4IJbG9jYWxob3N0hwR/AAAB\n'  +
                    'hwR/AAACMB0GA1UdDgQWBBRN+qxeeW3ngsZaImHYKWaf4ztRkDALBgNVHQ8EBAMC\n'  +
                    'AvQwOwYDVR0lBDQwMgYIKwYBBQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYB\n'  +
                    'BQUHAwEGCCsGAQUFBwMIMBEGCWCGSAGG+EIBAQQEAwIA5zANBgkqhkiG9w0BAQUF\n'  +
                    'AAOCAQEAgoAgtNpwyHjf/lEaYNxPXU3IuvpBJb0J2pU/vU3ImGTZoCpEjqAnduUB\n'  +
                    'zPIL9jk2xoIn4w2u8h4AALi/0+8/w+Lf39EGVw2v5Obd5/L00aRtYq4syitWh7st\n'  +
                    'cGiJhL6OR6sZw1/Z+MsQWoXn1K8wEusalNs9zTimpn/wt+fFFem5Ao5sFKp7OvxE\n'  +
                    'tJGOIjEq0ErBvbejRMLQTFHaBKsSyA/G8fFyQaAdnOuPHpJJjNfWhrNfr3kxuKsF\n'  +
                    'c7BcCD7p6Q3GVcUsIpAudj6k0ueDottTlQ7PVwiJlWTISvzCrz4dI1dwE7VpZ04Y\n'  +
                    'AZpOcmiSQO2WFjUS/N5y9g+zJs/Osw==\n'                                  +
                    '-----END CERTIFICATE-----\n'
              ;
              return {key,cert};
              
        //}//setup
        
        
        
        
        
        