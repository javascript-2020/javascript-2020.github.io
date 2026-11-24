


/*

//llama-cpp-using-tools.js:

24-11-26


note:

requires loopback-network permission


*/


(async()=>{
                                                                                // 1. local functions
        var local    = {
              square_number   : ({n})=>{
              
                                                                                console.log(`[ Local ] Executing square_number(${n})`);
                                      return {result:n*n};
                                      
                                }
        };
        
                                                                                // 2. The JSON schema telling Qwen3 what the function does and what args it takes
        var tools   = [
                            {
                                  type        : 'function',
                                  function    : {
                                                      name          : 'square_number',
                                                      description   : 'calculates the square of a given number.',
                                                      parameters    : {
                                                                            type          : 'object',
                                                                            properties    : {
                                                                                                  n   : {type:'number',description:'the number to square'}
                                                                                            },
                                                                            required      : ['n']
                                                                      }
                                                }
                            }
        ];
        
                                                                                // Run it:
        var txt   = await runToolAgent('what is the square of 42 ?');
        console.log(txt);
        
        
                                                                                // 3. The agent loop
        async function runToolAgent(userPrompt){
        
              var endpoint        = 'https://127.0.0.1:8443/v1/chat/completions';
              var messages        = [
                                          {role:'system',content:'You are a helpful assistant. Use provided tools when asked to calculate.'},
                                          {role:'user',content:userPrompt}
                                    ];
                                    
                                                                                console.log('TURN 1: Ask the model',userPrompt);
              var res             = await fetch(endpoint,{
                                                                method    : 'POST',
                                                                headers   : {'Content-Type':'application/json'},
                                                                body      : JSON.stringify({messages,tools,temperature:0.2,stream:false})
                                                          });
              var data            = await res.json();
                                                                                console.json(data);
              var assistantMsg    = data.choices[0].message;
              
                                                                                // Check if Qwen3 decided to call a tool
              if(assistantMsg.tool_calls && assistantMsg.tool_calls.length>0){
                                                                                console.json(assistantMsg);
                                                                                // Keep the assistant's tool_call message in history
                    messages.push(assistantMsg);
                    
                    for(let call of assistantMsg.tool_calls){
                    
                          var name      = call.function.name;
                                                                                // llama-server returns arguments as a JSON string
                          var args      = JSON.parse(call.function.arguments);
                                                                                // Execute your local JS function
                          var output    = local[name](args);
                                                                                // Append the tool result back to conversation history
                          messages.push({
                                              role            : 'tool',
                                              tool_call_id    : call.id,
                                              content         : JSON.stringify(output),
                          });
                          
                    }//for
                    
                                                                                console.log('TURN 2: Send the tool result back so the model can finish');
                    res             = await fetch(endpoint,{
                                                                  method    : 'post',
                                                                  headers   : {'content-type':'application/json'},
                                                                  body      : JSON.stringify({messages,tools,temperature:0.2,stream:false})
                                                           });
                    data            = await res.json();
                    assistantMsg    = data.choices[0].message;
              }
              
                                                                                console.log('Total tokens (Turn 2):', data.usage.prompt_tokens);
              return assistantMsg.content;
              
        }//runToolAgent
        
        
})();




