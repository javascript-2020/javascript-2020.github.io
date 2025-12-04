        
        
//  ipc-server-win.c


        #include <windows.h>
        #include <stdio.h>

        
        int main(void) {
                                                                                // Named pipe path
              const char *pipeName    = "\\\\.\\pipe\\mypipe";
          
                                                                                // Create the named pipe
              HANDLE hPipe    = CreateNamedPipeA(
                    pipeName,
                    PIPE_ACCESS_OUTBOUND,                                       // Server writes, client reads
                    PIPE_TYPE_BYTE | PIPE_WAIT,                                 // Byte stream, blocking mode
                    1,                                                          // Max instances
                    1024,                                                       // Out buffer size
                    1024,                                                       // In buffer size
                    0,                                                          // Default timeout
                    NULL                                                        // Security attributes
              );
          
              if(hPipe==INVALID_HANDLE_VALUE){
                    printf("CreateNamedPipe failed with error %lu\n",GetLastError());
                    return 1;
              }
          
              printf("Waiting for client to connect...\n");
          
                                                                                // Wait for a client (Node.js) to connect
              BOOL connected    = ConnectNamedPipe(hPipe,NULL) ? TRUE : (GetLastError()==ERROR_PIPE_CONNECTED);
          
              if(!connected){
                    printf("ConnectNamedPipe failed with error %lu\n",GetLastError());
                    CloseHandle(hPipe);
                    return 1;
              }
          
                                                                                // Send a test message
              const char *msg   = "Hello from C over Windows Named Pipe!";
              DWORD written;
              WriteFile(hPipe,msg,(DWORD)strlen(msg),&written,NULL);
          
              printf("Sent message to client.\n");
          
                                                                                // Close pipe
              CloseHandle(hPipe);
              
              
              return 0;
              
        }//main


