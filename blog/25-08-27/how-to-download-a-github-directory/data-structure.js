
    (async ()=>{
    
          var owner     = 'javascript-2020';
          var repo      = 'tmp';
          var branch    = 'main';
          var path      = 'myfile.js';
          
          var token     = '';
          var headers   = {};
          if(token){
                headers   = {authorization:`bearer ${token}`};
          }
          
          var url       = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;                                
          var json      = await fetch(url,{headers}).then(res=>res.json());
          console.log(JSON.stringify(json,null,4),'\n');

          var txt       = window.atob(json.content);
          console.log(txt);
    
    })();
    
