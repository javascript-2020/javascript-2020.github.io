


        importScripts('https://javascript-2020.github.io/libs/js/external/js7zip/js7z-st-fs-ec.js');
        //importScripts('https://ext-code.com/libs/js/external/js7zip/js7z-st-fs-ec.js');
        
        
        var js7z;
        var archive;

        
        self.onmessage    = async function({data}){
          
              switch(data.type){
                
                case 'create'       : create(data);               break;
                case 'add'          : add(data);                  break;
                case 'compress'     : comrpess(data);             break;
                
              }//switch
                
        }//onmessage
        
        
        
        async function create(){
          
              debugger;
              js7z    = await JS7z({print,printErr,onAbort,onExit,override:'https://javascript-2020.github.io/libs/js/external/js7zip/js7z-st-fs-ec.js'});
              js7z.FS.mkdir('/in');
              
              self.postMessage({type:'create'});
          
        }//create
        
        
        function add({repo,buf}){
          
              var uint8   = new Uint8Array(buf);
              js7z.FS.writeFile(`/in/${repo}.zip`,uint8);
          
        }//add
        
        
        function compress({password}){

              var ts      = date();
              archive     = `github-${ts}.7z`;
              
              var args    = ['a'];
              if(password){
                                                                                console.log('password',password);
                    args.push(`-p${password}`);
              }
              args.push('-t7z','-mhe=on',`/${archive}`,'/in/*');
                                                                                console.log(args);
              js7z.callMain(args);        

        }//compress
        
        
        
        function date(){
        
              var now   = new Date();
              var yy    = String(now.getFullYear()).slice(-2);
              var mm    = String(now.getMonth()+1).padStart(2,'0');
              var dd    = String(now.getDate()).padStart(2,'0');
              var hh    = String(now.getHours()).padStart(2,'0');
              var min   = String(now.getMinutes()).padStart(2,'0');
              var ss    = String(now.getSeconds()).padStart(2,'0');
            
              var ts    = `${yy}-${mm}-${dd}---${hh}-${min}-${ss}`;
              return ts;
              
        }//ts


        async function print(str){
                                                                                //console.log('[ print ]',arguments);
                                                                                console.log('[ print ]',str);
        }//print

        
        function printErr(str){
                                                                                //console.log('[ printErr ]',arguments);
                                                                                console.log('[ printErr ]',str);
        }//printErr

        
        function onAbort(str){
                                                                                //console.log('[ onAbort ]',arguments);
                                                                                console.log('[ onAbort ]',str);
        }//onAbort

        
        function onExit(code){
                                                                                console.log('[ onExit ]',code);
              if(code!==0){
                    return;
              }
              
              var buf   = js7z.FS.readFile(`/${archive}`,{encoding:'binary'});
                                                                                //console.log(data);
              self.postMessage({type:'complete',buf},[buf]);
              
              
              /*
              var blob      = new Blob([data],{type:'application/octet-stream'});
              
              var url       = window.URL.createObjectURL(blob);
              var a         = document.createElement('a');
              a.href        = url;
              a.download    = archive;
              a.click();
              */
              
        }//onExit
  
  




        