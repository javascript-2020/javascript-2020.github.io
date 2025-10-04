

        var url   = 'https://ext-code.com/utils/video/scan-video-file-for-objects/scan-video-file-for-objects.html';
        
        var {app,BrowserWindow}   = require('electron');
        app.whenReady().then(create);
        
        function create(){
          
              var win   = new BrowserWindow({width:1600,height:1200});
              win.loadURL(url)
              win.webContents.openDevTools();
              
        }//create
        
        app.on('certificate-error',(event,webContents,url,error,certificate,callback)=>{
          
              event.preventDefault();
              callback(true);
              
        });

        
        
        