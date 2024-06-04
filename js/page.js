
var image   = {};


        window.addEventListener('load',()=>{
        
              var hdr                       = $('#hdr');
              var h1                        = hdr.offsetHeight;
              var ftr                       = $('#ftr');
              var h2                        = ftr.offsetHeight;
              var background                = $('#background');
              background.style.top          = h1+'px';
              background.style.height       = window.innerHeight-h1-h2+'px';
              
              
              $.all('.code').forEach(node=>{
              
                    var img         = document.createElement('img');
                    img.className   = 'code-copy';
                    img.onclick     = click;
                    img.src         = image.copy;
                    node.append(img);
                    
                    function click(){
                    
                          var txt   = node.textContent.trim();
                          navigator.clipboard.writeText(txt);
                          
                    }//click
                    
              });
              
        });//load
        
        
        
        
        
        function $(root,sel){
        
              if(!sel){
                    sel   = root;
                    root    = document;
              }
              var node    = root.querySelector(sel);
              return node;
              
        }//$
        
        $.all=function(root,sel){
        
              if(!sel){
                    sel   = root;
                    root    = document;
              }
              var list    = [...root.querySelectorAll(sel)];
              return list;
              
        }//all
        
        
        image.copy    =
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAAXNSR0IArs4c6QAAAVZJREFUOE/tk7'+
'1LA0EQxd/shhCild1Z2llZKvgHCAErK5vIETDega2NIMHOxsrskrR+F5bpbK1sBFGC2oitiKCgnGGfLBi5RJNoKy4sLDtvfrPz2B'+
'GklrV2D8B8+u6b82Uul5sOw/DRxyQlEGvtCQAnIvXuROfciFJqk+QrgLNsNjtTKpWevgBIXsdxvNANMMaMicgVgBCAL3AQRVEoxp'+
'gpEdkgmQEwAeCoH4DkpFJqlOQuSeOffQvgjuQFgDkAjT6Apta6mCTJudZ6UUSWPIAAilEU7XgPerVQq9XyzjlvcgHA20eL+R8DfE'+
'KlUskEQTBOclgp9dJqteyvAN3GWmuP/wF/0wMAmuT+gJFuh5fT/2DbGLMlIrM9kv3kBgD8OD+0NR2AQVWttTckD+M4Xv0EGGOeRa'+
'Thdz8AySEA6yTrHYBqtboiImsi4gWD1qlSqlAul+/bwneEUCXJL+OFxQAAAABJRU5ErkJggg=='
;
