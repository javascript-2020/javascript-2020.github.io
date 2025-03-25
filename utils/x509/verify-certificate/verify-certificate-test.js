

console.clear();
console.log('verify certificate');
console.log();
console.json=v=>console.log(JSON.stringify(v,null,4));
$.full('#output').replaceChildren();

(async()=>{

      
      await nodeforge();
      
      var root    = await load();
      var store   = nodeforge.pki.createCaStore([root]);
      var cert    = await load();
      cert        = nodeforge.pki.certificateFromPem(cert);
      
      var result    = nodeforge.pki.verifyCertificateChain(store,[cert]);
      console.json(result);
      
      
      
})();



async function nodeforge(){
  
      var txt         = localStorage['node-forge'];
      if(!txt){
            var url   = 'https://cdn.jsdelivr.net/npm/node-forge/+esm';
                                                                        //console.log(url);
            var res   = await fetch(url);
            txt       = await res.text();
            localStorage['node-forge']    = txt;
      }
      var blob        = new Blob([txt],{type:'text/javascript'});
      var url         = window.URL.createObjectURL(blob);
      nodeforge       = await import(url);
      nodeforge       = nodeforge.default;
      pki             = nodeforge.pki;
      
}//nodeforge


function load(){

      var resolve,promise=new Promise(res=>resolve=res);
      
      var input         = document.createElement('input');
      input.type        = 'file';
      input.onchange    = onchange;
      input.click();
      
      return promise;
      
      
      async function onchange(){
      
            var txt   = await input.files[0].text();
            resolve(txt);
            
      }//onchange
      
}//load







