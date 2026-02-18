

        var path      = require('path');
        var fs        = require('fs');
        
        
        var test      = setup();
        var docroot   = test.docroot;
        
        var n         = test.tests.length;
        for(var i=0;i<n;i++){
        
              var item      = test.tests[i];
              var url       = item.url;
              
              
              console.log();
              console.log(i,item.note);
              console.log('docroot    :',docroot);
              console.log('value      :',item.url);
              //console.log('expected   :',item.expected);
              
              var {abs,error}   = resolve(url,docroot);
              abs && console.log('abs        : ',abs);
              error && console.log('error      : ',error);
              
              console.log();
              
        }//for
        
        
        
        function setup(){
        
              return {
              
                "docroot"   : "/var/www",
                "tests"     : [
                  {
                    "url": "/index.html",
                    "expected": "/var/www/index.html",
                    "note": "Basic file"
                  },
                  {
                    "url": "/css/style.css",
                    "expected": "/var/www/css/style.css",
                    "note": "Nested file"
                  },
                  {
                    "url": "/images/",
                    "expected": "/var/www/images/",
                    "note": "Directory with trailing slash"
                  },
                  {
                    "url": "/folder/sub/file.txt",
                    "expected": "/var/www/folder/sub/file.txt",
                    "note": "Deep nested file"
                  },
                  
                  /* Traversal attempts */
                  {
                    "url": "/../secret.txt",
                    "expected": false,
                    "note": "Simple traversal"
                  },
                  {
                    "url": "/../../etc/passwd",
                    "expected": false,
                    "note": "Traversal to root"
                  },
                  {
                    "url": "/foo/../../secret.txt",
                    "expected": false,
                    "note": "Traversal inside nested path"
                  },
                  {
                    "url": "/..",
                    "expected": false,
                    "note": "Parent directory"
                  },
                  {
                    "url": "/../",
                    "expected": false,
                    "note": "Parent directory with slash"
                  },
                  
                  /* Encoded traversal */
                  {
                    "url": "/%2e%2e/secret.txt",
                    "expected": false,
                    "note": "Encoded .."
                  },
                  {
                    "url": "/foo/%2e%2e/%2e%2e/passwd",
                    "expected": false,
                    "note": "Double encoded traversal"
                  },
                  {
                    "url": "/%2e%2e/%2e%2e/etc/passwd",
                    "expected": false,
                    "note": "Encoded traversal to root"
                  },
                  
                  /* Double-encoded traversal */
                  {
                    "url": "/%252e%252e/%252e%252e/etc/passwd",
                    "expected": "/var/www/%2e%2e/%2e%2e/etc/passwd",
                    "note": "Double-encoded stays inside docroot after single decode"
                  },
                  
                  /* Mixed slash styles */
                  {
                    "url": "/..\\..\\Windows\\win.ini",
                    "expected": false,
                    "note": "Windows backslash traversal"
                  },
                  {
                    "url": "/folder\\sub\\file.txt",
                    "expected": "/var/www/folder/sub/file.txt",
                    "note": "Windows slashes inside docroot"
                  },
                  
                  /* Absolute path attempts */
                  {
                    "url": "/etc/passwd",
                    "expected": "/var/www/etc/passwd",
                    "note": "Absolute path becomes relative after slice"
                  },
                  {
                    "url": "C:\\Windows\\win.ini",
                    "expected": false,
                    "note": "Windows absolute path attack"
                  },
                  {
                    "url": "/C:/Windows/win.ini",
                    "expected": false,
                    "note": "Windows absolute path with leading slash"
                  },
                  
                  /* Malformed garbage */
                  {
                    "url": "/....//....//etc/passwd",
                    "expected": false,
                    "note": "Weird dot spam traversal"
                  },
                  {
                    "url": "/foo/%",
                    "expected": false,
                    "note": "Malformed percent encoding"
                  },
                  {
                    "url": "/foo/%0",
                    "expected": false,
                    "note": "Malformed percent encoding 2"
                  },
                  
                  /* Unicode weirdness */
                  {
                    "url": "/föö/bar.txt",
                    "expected": "/var/www/föö/bar.txt",
                    "note": "Unicode filename"
                  },
                  {
                    "url": "/%C0%AFetc/passwd",
                    "expected": false,
                    "note": "Overlong UTF-8 slash"
                  },
                  
                  /* Directory edge cases */
                  {
                    "url": "/",
                    "expected": "/var/www/",
                    "note": "Root directory"
                  },
                  {
                    "url": "/./",
                    "expected": "/var/www/",
                    "note": "Dot directory"
                  },
                  {
                    "url": "/folder/./file.txt",
                    "expected": "/var/www/folder/file.txt",
                    "note": "Dot inside path"
                  },
                  {
                    "url": "/folder///sub///file.txt",
                    "expected": "/var/www/folder/sub/file.txt",
                    "note": "Multiple slashes"
                  },
                  
                  /* Ultra-weird attacker payloads */
                  {
                    "url": "/..////..////etc/passwd",
                    "expected": false,
                    "note": "Slash spam traversal"
                  },
                  {
                    "url": "/foo/%2e%2e%2f%2e%2e%2fetc/passwd",
                    "expected": false,
                    "note": "Encoded slash traversal"
                  },
                  {
                    "url": "/foo/%F0%9F%92%A9/bar.txt",
                    "expected": "/var/www/foo/💩/bar.txt",
                    "note": "Emoji in path"
                  }
                ]
              }
              
        }//setup
        
        
        
        
        