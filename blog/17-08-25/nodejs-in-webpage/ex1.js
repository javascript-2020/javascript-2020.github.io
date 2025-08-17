
(async()=>{
                                                                    console.clear();
                                                                    console.log('webcontainer example');
                                                                    console.log();
                                                                    
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
                                                                    console.log('installing ...');
      await install();
                                                                    console.log('running ...');      
      await run(`
      
            var txt   = require('fs').readFileSync('test.txt','utf8');
            console.log(txt);
            
      `);
                                                                    console.log('complete');
                                                                    console.log('teardown ...');
      await webcontainer.teardown();
                                                                    console.log('done.');
      
      async function install(){
      
      }//install
      
      
      async function run(js){
      
            await webcontainer.fs.writeFile('main.js',js);
      
            var process   = await webcontainer.spawn('node',['main.js']);
            var stream    = new WritableStream({write(data){console.log(data)}});
            process.output.pipeTo(stream);
  
            var code      = await process.exit;
            if(code!=0){
                  console.log('an error occurred');
            }
            
      }//run

})();

