{
      "targets"   : [
            {
            
                  "target_name"     : "always-on-top",
                  "sources"         : ["always-on-top.cpp"],
                  
                  "include_dirs"    : ["node_modules/node-addon-api"],
                  
                  "dependencies"    : ["<!(node -p \"require('node-addon-api').gyp\")"],
                  
                  "defines"         : ["NODE_ADDON_API_CPP_EXCEPTIONS"],
                  "cflags_cc"       : ["-std=c++17"]
                  
            }
      ]
}


      