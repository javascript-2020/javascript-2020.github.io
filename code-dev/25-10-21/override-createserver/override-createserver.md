# override createserver

this code snippet demonstrates overriding createServer function of nodejs http modules to add additional functionailty.
It came about from trying to create a demo in webcontainers which was really beyond the capacity of webcontainers, so override
createserver was used to hook into the request received function and respond to /setup url before it ever reached the 
server in question.
      
      
      
