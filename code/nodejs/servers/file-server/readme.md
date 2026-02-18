

<h1 style='display:flex;gap:20px'>
      file-server.js
      <div style='flex:1'></div>
      <input type=button value='download file' onclick='btn.download()' style='font-size:16px'>
      <input type=button value='download complete' onclick='btn.download.complete()' style='font-size:16px'>
</h1>


## Description

This server can run locally and allow access to the local filesystem from the browser / javascript through https requests

```

        var res   = await fetch('https://localhost:3000/my-file.txt',{headers:{mode:'load',auth:'abc-123'}})
        var txt   = await res.text();
        consolelog(txt);
        
```

the client-side library can found at

[file-server.js](/libs/js/io/file-server/file-server.html)
      
      
## requires

- getmime.js
- keys.js