

# file-server.js

## Description

This server can run locally and allow access to the local filesystem from the browser / javascript through https requests

```

        var res   = await fetch('https://localhost:3000/my-file.txt',{headers:{mode:'load',auth:'abc-123'}})
        var txt   = await res.text();
        consolelog(txt);
        
```

the client-side library can found at

[file-server.js](/libs/js/io/file-server/file-server.html)
      
      
