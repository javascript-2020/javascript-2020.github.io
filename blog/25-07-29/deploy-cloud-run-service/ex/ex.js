

(async()=>{


/*


https://developers.google.com/oauthplayground/


permissions:

- IAM Service Account Credentials API v1
  - https://www.googleapis.com/auth/cloud-platform
  
https://www.googleapis.com/auth/devstorage.full_control


*/



        var token     = '';
        
        
        var project   = '';
        var bucket    = '';
        var zip       = 'src.zip';
        var service   = 'myService';
        var region    = 'us-central1';
        var timeout   = '900s';
        
      
        var config = {
        
              source: {
                    storageSource: {bucket,object:zip}
              },
              steps: [
                    {
                          name    : 'gcr.io/cloud-builders/docker',
                          args    : ['build','-t',`gcr.io/${project}/${service}:latest`,'.']
                    },
                    {
                          name    : 'gcr.io/cloud-builders/docker',
                          args    : ['push',`gcr.io/${project}/${service}:latest`]
                    },
                    {
                          name    : 'gcr.io/cloud-builders/gcloud',
                          args    : [
                                          'run','deploy',service,
                                          '--image',`gcr.io/${project}/${service}:latest`,
                                          '--region',region,
                                          '--platform','managed',
                                          '--allow-unauthenticated'
                                    ]
                    }
              ],
              timeout
              
        };


        var url       = `https://cloudbuild.googleapis.com/v1/projects/${project}/builds`;
        var headers   = {
              authorization     : `Bearer ${token}`,
              'content-type'    : 'application/json'
        };
        var body      = JSON.stringify(config);

        
        var res       = await fetch(url,{method:'post',headers,body});
        var result    = await res.json();
        
        
        console.log('build triggered:');
        console.log(result);
        

        
})();