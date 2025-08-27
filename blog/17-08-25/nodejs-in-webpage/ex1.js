

<script>

(async()=>{
                                                                                console.clear();
                                                                                console.log('webcontainer example');
                                                                                console.log();
        var nodejs    = `
        
              import fs from 'fs';
              import chalk from 'chalk';
              
              var txt   = fs.readFileSync('test.txt','utf8');
              var str   = chalk.blue(txt);
              console.log(str);
              
        `;

        
        var {WebContainer}    = await import('https://cdn.jsdelivr.net/npm/@webcontainer/api/+esm');
        
        const files   = {
          
              'test.txt'        : {file:{contents:'helloworld'}},
              
              'package.json'    : {
                                        file: {
                                              contents: `
                                                    {
                                                          "name": "node-test",
                                                          "version": "1.0.0",
                                                          "scripts": {
                                                          }
                                                    }
                                              `,
                                        },
                                  },
        };
        
                                                                                console.log('booting ...');
        var webcontainer    = await WebContainer.boot();
                                                                                console.log('mounting file system ...');
        await webcontainer.mount(files);
        
        await package_json();
        await install();
                                                                                console.log('running ...');      
        await run(nodejs);
                                                                                console.log('complete');
                                                                                console.log('teardown ...');
        await webcontainer.teardown();
                                                                                console.log('done.');
        
        async function package_json(){
                                                                                console.log('installing package.json ...');
              var process   = await webcontainer.spawn('npm',['install']);
              var stream    = new WritableStream({write(data){console.log(data)}});
              process.output.pipeTo(stream)
              var code      = await process.exit;
              return code;
        
        }//package_json
        
        
        async function install(){
                                                                                console.log('installing ...');
              var process   = await webcontainer.spawn('npm',['install','chalk']);
              var stream    = new WritableStream({write(data){console.log(data)}});
              process.output.pipeTo(stream)
              var code      = await process.exit;
              return code;
              
        }//install
        
        
        async function run(js){
        
              await webcontainer.fs.writeFile('main.mjs',js);
        
              var process   = await webcontainer.spawn('node',['main.mjs']);
              var stream    = new WritableStream({write(data){console.log(data)}});
              process.output.pipeTo(stream);
    
              var code      = await process.exit;
              if(code!=0){
                    console.log('an error occurred');
              }
              
        }//run

})();




</script>



