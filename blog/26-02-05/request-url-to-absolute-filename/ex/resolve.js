
/*
  requires
    path,fs
*/

        resolve.df    = false;
        
        async function resolve(url,docroot='.'){
                                                                                resolve.df && console.log('=== resolve v2.0 ===');
                                                                                resolve.df && console.log('url :',url);
                                                                                resolve.df && console.log('docroot :',docroot);
              var err;
              try{
              
                    url         = decodeURI(url);
                    
              }//try
              catch(err2){
              
                    err   = err2;
                    
              }//catch
              if(err){
                                                                                resolve.df && console.error(err);
                    var error   = 'invalid url';
                    return {error};
              }
              
              url         = url.slice(1);
                                                                                resolve.df && console.log('url :',url);
              var root    = path.resolve(docroot);
              root       += path.sep;
                                                                                resolve.df && console.log('root :',root);
              var abs     = path.resolve(docroot,url);
              var err;
              try{
              
                    var stat    = await fs.promises.stat(abs);
                    
              }//try
              catch(err2){
              
                    err   = err2;
                    
              }//catch
              if(err){
                    var error   = err.toString();
                    return {error}
              }
              if(stat.isDirectory()){
                    abs  += path.sep;
              }
                                                                                resolve.df && console.log('abs :',abs);
                                                                                
              if(!abs.startsWith(root)){
                                                                                resolve.df && console.log('fail');
                    var error   = 'resolve';
                    return {error};
              }
              
                                                                                resolve.df && console.log('ok',abs);
              return {abs};
              
        }//resolve
        
        
        
        