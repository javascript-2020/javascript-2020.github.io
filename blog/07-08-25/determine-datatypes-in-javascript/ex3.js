
        var iframe      = document.createElement('iframe');
        iframe.onload   = onload;
        document.body.append(iframe);

        
        function onload(){
        
              iframe.contentWindow.eval(`
              
                    var list    = [];
                    
              `);
              
              console.log(iframe.contentWindow.list instanceof Array);    //  false
              
              iframe.remove();
              
        }//onload
        
