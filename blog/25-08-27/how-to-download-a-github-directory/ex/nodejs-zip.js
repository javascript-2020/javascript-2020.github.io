

    var sandbox   = {};
    sandbox.cjs   = txt=>Promise.resolve(eval(`(()=>{var exports={},module={};${txt};return module.exports})()`));
    var url       = 'https://raw.githubusercontent.com/stuk/jszip/main/dist/jszip.min.js';
    var JSZip     = await fetch(url).then(res=>res.text().then(sandbox.cjs));
    console.log(JSZip);
    
