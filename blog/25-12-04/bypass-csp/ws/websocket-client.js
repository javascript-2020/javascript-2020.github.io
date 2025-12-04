


(()=>{
  
        var ws          = new WebSocket('https://localhost:8443/');
        ws.onopen       = e=>{console.log('ws.onopen');ws.send('hello')};
        ws.onclose      = e=>console.log('ws.onclose');
        ws.onerror      = e=>console.log('ws.onerror');
        ws.onmessage    = ({data})=>console.log('ws.onmessage',data);
        
})();


