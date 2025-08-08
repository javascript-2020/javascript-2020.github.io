
        var iframe      = document.createElement('iframe');
        iframe.onload   = onload;
        document.body.append(iframe);

        
        function onload(){
        
              iframe.contentWindow.eval(`
              
                    var list    = [];
                    
              `);
              
              var list    = iframe.contentWindow.list;
              console.log(list instanceof Array);    //  false
              
              iframe.remove();
              
        }//onload
        
