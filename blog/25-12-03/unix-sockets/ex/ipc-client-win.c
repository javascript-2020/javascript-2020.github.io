

//  ipc-client-win.c

        
        #include <windows.h>
        #include <stdio.h>
        
        
        int main(void){
          
              const char *pipeName    = "\\\\.\\pipe\\mypipe";
                                                                                printf("Connecting to server...\n");
              HANDLE hPipe    = CreateFileA(
                    pipeName,
                    GENERIC_READ | GENERIC_WRITE,                               //  read + write
                    0,                                                          //  no sharing
                    NULL,                                                       //  default security
                    OPEN_EXISTING,                                              //  must already exist
                    0,                                                          //  default attributes
                    NULL                                                        //  no template
              );
          
              if(hPipe==INVALID_HANDLE_VALUE){
                                                                                printf("CreateFile failed with error %lu\n", GetLastError());
                    return 1;
              }
                                                                                printf("Connected to server.\n");          
                                                                                //  Read message from server
              char buffer[256];
              DWORD bytesRead;
              if(ReadFile(hPipe,buffer,sizeof(buffer)-1,&bytesRead,NULL)){
                    buffer[bytesRead] = '\0';
                                                                                printf("Received from server: %s\n", buffer);
              } else {
                                                                                printf("ReadFile failed with error %lu\n", GetLastError());
                    CloseHandle(hPipe);
                    return 1;
              }
          
                                                                                //  Send reply to server
              const char *reply   = "Hello back from client!";
              DWORD bytesWritten;
              if(!WriteFile(hPipe,reply,(DWORD)strlen(reply),&bytesWritten,NULL)){
                                                                                printf("WriteFile failed with error %lu\n",GetLastError());
                    CloseHandle(hPipe);
                    return 1;
              }
                                                                                printf("Sent reply to server.\n");
          
              CloseHandle(hPipe);
              
              
              return 0;
              
        }//main


