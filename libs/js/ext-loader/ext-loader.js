



        var url;
        var headers;
        var token       = localStorage['github-token'];
        if(token){
              url       = 'https://api.github.com/repos/javascript-2020/ext-code/contents/ext-loader.js';
              headers   = {accept:'application/vnd.github.raw',authorization:`bearer ${token}`};
        }else{
              url       = 'https://raw.githubusercontent.com/javascript-2020/ext-code/main/ext-loader.js';
        }
        
        var res   = await fetch(url,{headers});
        var txt   = await res.text();

        if(res.headers.get('content-type').includes('json')){
                                                                                console.log('*** ext : json');
              var json    = JSON.parse(txt);
              var b64     = json.content;
              txt         = atob(b64);
        }else{
                                                                                console.log('*** ext : text');
        }
        
        ext   = eval(txt);



