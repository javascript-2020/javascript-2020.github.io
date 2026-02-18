

# file-server.js

## Description

This server can run locally and allow access to the local filesystem from the browser / javascript through https requests

```

        var res   = await fetch('https://localhost:3000/my-file.txt');
        var txt   = await res.text();
        consolelog(txt);
        
```

      
      
      
