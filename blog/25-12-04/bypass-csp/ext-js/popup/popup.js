        
        

window.onload   = ()=>{

  
        var $   = (root,sel)=>(!sel && (sel=root,root=document),root.querySelector(sel));
        

        var button = $('[value=run]');
        
        button.addEventListener('click', async () => {
          
              var input = $('textarea');
              var script = input.value;
              await execInPage(script);
              
        });

        
        var code    = `
        
              (async()=>{
              
      
                    var url   = 'https://raw.githubusercontent.com/javascript-2020/stackoverflow/main/console-log.js';
                    var js    = await fetch(url).then(res=>res.text());
                    eval(js);
                    
              })();
        
        `;
        execInPage(code);
        
        
        async function execInPage(code) {
          
              var [tab] = await chrome.tabs.query({
                    currentWindow: true,
                    active: true
              });
              
              chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (code) => {
                          var el = document.createElement('script');
                          el.textContent = code;
                          document.head.appendChild(el);
                    },
                    args: [code],
                    world: 'MAIN'
              });
              
        }



}//onload


