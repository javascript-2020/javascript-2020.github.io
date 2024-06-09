
        var hdr;
        var background;
        var content;
        var scroll;
        var center
        var ftr;
        
        var image   = {};
        
        
        setTimeout(initdom,50);
        
        
        function initdom(){   //c
        
              var winw                      = window.innerWidth;
              
              hdr                           = $('#hdr');
              var h1                        = hdr.offsetHeight;
              
              ftr                           = $('#ftr');
              var h2                        = ftr.offsetHeight;
              
              background                    = $('#background');
              background.style.top          = h1+'px';
              background.style.height       = window.innerHeight-h1-h2+'px';
              
              scroll                        = $('#scroll');
              
              center                        = $('#center');
              var l4                        = center.offsetLeft;
              var t4                        = center.offsetTop;
              var w4                        = center.offsetWidth;
              
              winw                          = scroll.clientWidth;
              var h5                        = scroll.offsetHeight;
              
              content                       = $('#content');
              if(winw>1200){
                    content.style.display           = 'block';
                    content.style.top               = t4+'px';
                    content.style.maxHeight         = h5-10+'px';
                    var w6                          = content.offsetWidth;
                    
                    if(w4+w6+20>winw){
                          var tw                    = winw-w4-30;
                          content.style.left        = '10px';
                          content.style.width       = tw+'px';
                          center.style.marginLeft   = tw+20+'px';
                    }else{
                          var tl                    = (winw-w4-w6-30)/2;
                          content.style.left        = tl+'px';
                          var tl                    = tl+w6+20;
                          center.style.marginLeft   = tl+'px';
                    }
              }
              
              
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
              
        }//initdom
        
        
        
        
        
        
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
        
        $.computed=function(root,sel,prop){
        
              if(!prop){
                    prop    = sel;
                    sel     = root;
                    root    = document;
              }
              var node      = $(root,sel);
              var cstyle    = window.getComputedStyle(node);
              var value     = cstyle.getPropertyValue(prop);
              return value;
              
        }//computed
        
        
        
        image.copy    =
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAAXNSR0IArs4c6QAAAVZJREFUOE/tk7'+
'1LA0EQxd/shhCild1Z2llZKvgHCAErK5vIETDega2NIMHOxsrskrR+F5bpbK1sBFGC2oitiKCgnGGfLBi5RJNoKy4sLDtvfrPz2B'+
'GklrV2D8B8+u6b82Uul5sOw/DRxyQlEGvtCQAnIvXuROfciFJqk+QrgLNsNjtTKpWevgBIXsdxvNANMMaMicgVgBCAL3AQRVEoxp'+
'gpEdkgmQEwAeCoH4DkpFJqlOQuSeOffQvgjuQFgDkAjT6Apta6mCTJudZ6UUSWPIAAilEU7XgPerVQq9XyzjlvcgHA20eL+R8DfE'+
'KlUskEQTBOclgp9dJqteyvAN3GWmuP/wF/0wMAmuT+gJFuh5fT/2DbGLMlIrM9kv3kBgD8OD+0NR2AQVWttTckD+M4Xv0EGGOeRa'+
'Thdz8AySEA6yTrHYBqtboiImsi4gWD1qlSqlAul+/bwneEUCXJL+OFxQAAAABJRU5ErkJggg=='
;
