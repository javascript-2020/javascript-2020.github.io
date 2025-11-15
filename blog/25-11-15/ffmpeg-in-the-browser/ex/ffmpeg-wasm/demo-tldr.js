


(async()=>{
console.clear();
  
        var {zip}     = await import('https://cdn.jsdelivr.net/gh/javascript-2020/libs/js/io/tiny-unzip/tiny-unzip.m.js');
        var get       = url=>fetch(url).then(res=>res.blob());
        var blob      = await get('https://raw.githubusercontent.com/javascript-2020/external/main/ffmpeg/ffmpeg-wasm/ffmpeg-wasm.zip');
        var fnstr     = (fn,_,js,i1,i2)=>(js=fn+'',i1=js.indexOf('{'),i2=js.lastIndexOf('}'),js.slice(i1+1,i2));
        
        
        var files     = await zip.rd(blob);
        files.forEach(({name,blob})=>files[name]=blob);
        files['ffmpeg-core.wasm']   = window.URL.createObjectURL(files['ffmpeg-core.wasm']);
        var txt       = ['ffmpeg-core.js','index.js','ffmpeg.js','814.ffmpeg.js'];
        await Promise.all(txt.map(async name=>files[name]=await files[name].text()));
        
        var sandbox       = {};
        
        sandbox.worker    = function(){

              self.fetch        = url=>new Promise(async res=>res(new Response('Not Found',{status:404})));
              self.onmessage    = ({data:{lib,file}})=>{var importScripts=()=>self.eval(lib);eval(file)}
                                  
        }//worker        
        
        sandbox.main    = function(){
                                  
        (()=>{
        
              var globalThis    = {document:{currentScript:{src:'https://null.com/'}}};
              function Worker(url){
                                                                                console.log('worker-sandbox',`${url}`);
                    var js        = fnstr(sandbox.worker);
                    var blob      = new Blob([js]);
                    var url2      = window.URL.createObjectURL(blob);
                    var worker    = new window.Worker(url2);
                    var lib       = files['ffmpeg-core.js'];
                    var name      = url.pathname.split('/').at(-1);
                    var file      = files[name];
                    worker.postMessage({lib,file});
                    return worker;
                    
              }//worker
  
              eval(files['ffmpeg.js']);
              
        })();
                    
        }//main        
        
        eval(fnstr(sandbox.main));
        eval(files['index.js']);        

        var {fetchFile}   = FFmpegUtil;
        var {FFmpeg}      = FFmpegWASM;
        
        var ffmpeg        = new FFmpeg();
        await ffmpeg.load({coreURL:'ffmpeg-core.js',wasmURL:files['ffmpeg-core.wasm']});

        ffmpeg.on('log',({message})=>console.log(message));
        await ffmpeg.exec(['-version']);
        
        
})();


  