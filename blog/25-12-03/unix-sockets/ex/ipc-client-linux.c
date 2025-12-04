

//  ipc-client-linux.c

        
        #include <sys/socket.h>
        #include <sys/un.h>
        #include <stdio.h>
        #include <unistd.h>
        #include <string.h>

        
        int main() {
          
              int sock    = socket(AF_UNIX, SOCK_STREAM, 0);
              if(sock<0){
                    perror("socket");
                    return 1;
              }
          
              struct sockaddr_un addr;
              memset(&addr,0,sizeof(addr));
              addr.sun_family   = AF_UNIX;
              strcpy(addr.sun_path,"/tmp/mysock");
          
              if(connect(sock,(struct sockaddr*)&addr,sizeof(addr))<0){
                    perror("connect");
                    close(sock);
                    return 1;
              }
          
                                                                                //  Read message from server
              char buf[256];
              int n   = read(sock,buf,sizeof(buf)-1);
              if(n>0){
                    buf[n]    = '\0';
                    printf("Client received: %s\n",buf);
              }
          
                                                                                //  Send reply to server
              const char *reply   = "Hello back from client!";
              write(sock,reply,strlen(reply));
          
              close(sock);
              return 0;
            
        }//main


