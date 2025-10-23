      <style>
  body        {display:flex;flex-direction:column;gap:10px}
  #progress   {border:1px solid lightgray;padding:1px;height:20px}
  #bar        {background:lightblue;height:100%;width:0}
  
      </style>

      
      <input id=upload type=file>

      
      <div id=progress>
        <div id=bar></div>
      </div>

      
      <div id=result>ready</div>
      
      
      <script>
                                                                                console.clear();
        var url   = 'https://localhost:3010/upload';
        
        upload.onchange   = e=>{
        
              result.textContent    = 'starting upload';
              bar.style.width       = 0;
              
              var file    = upload.files[0];
              
              var xhr   = new XMLHttpRequest();
              
              xhr.open('post',url);
              
              xhr.upload.onprogress   = e=>{
                                                                                console.log('upload.onprogress');
                                                                                console.log(e);
                    if(e.lengthComputable){
                          var p             = e.loaded/e.total*100;
                          bar.style.width   = p+'%';
                    }
                    
              }//onprogress
              
              xhr.onload    = ()=>{
                                                                                //  readyState will be 4
                                                                                console.log("DONE",xhr.readyState);
                    bar.style.width       = '100%';
                    result.textContent    = 'done';
                    
              }//onload
                    
              xhr.send(file);
              
        }//onchange


      </script>
            
