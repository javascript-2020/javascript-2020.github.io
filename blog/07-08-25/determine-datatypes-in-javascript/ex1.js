            

        var v       = new Uint8Array();
        
        
        var type    = datatype(v);
        
        console.log(type);
        


        function datatype(v){
        
              var str   = Object.prototype.toString.call(v);
              str       = str.slice(8,-1);
              str       = str.toLowerCase();
              return str;
              
        }//datatype


            
