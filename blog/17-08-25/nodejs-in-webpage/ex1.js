
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
      
      var webcontainer    = await WebContainer.boot();
      await webcontainer.mount(files);
      await install();
      
      run(`
      
            var txt   = require('fs').readFileSync('test.txt','utf8');
            console.log(txt);
            
      `);
      
      
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

