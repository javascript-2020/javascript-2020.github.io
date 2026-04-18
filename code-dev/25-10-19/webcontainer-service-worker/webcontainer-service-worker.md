# webcontainer-service-worker

when containers are an amazing technology, allowing a sandboxed, experimental environment to be setup within seconds and torn down
without consideration.  While operation webcontainers use a service worker to intercept network requests and hence they can
provide the illusion of a real web server running within a webpage.  That service worker can only intercept requests coming
from a domain it is bound to, ie example.com, this code snippet attempts to demonstrate that by understanding this relationship
between the html ( iframe ) and the service worker domain, we can produce enhanced functionality.
      
      
      
