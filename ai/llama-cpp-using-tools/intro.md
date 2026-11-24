# Building a Tool-Aware Agent with Llama.cpp : A Step-by-Step Guide

**Date:** November 24, 2024  
**Tags:** AI Agents, Llama.cpp, Qwen3, JavaScript, Local LLM, Tool Usage, Agent Loops  

---

## Introduction

In this blog post, we walk through a practical JavaScript script that demonstrates how to build a **local AI agent**
capable of using tools — like mathematical functions — in a loop. This implementation leverages **Llama.cpp** as the
local language model backend and integrates with the llm via a custom API endpoint, enabling the agent to reason,
call tools, and return results in a fully self-contained environment.

This isn’t just about running a model — it’s about creating intelligent, interactive systems where the AI can *act*
on its environment by calling functions and returning results, mimicking real-world reasoning and execution.

> **Note:** This script requires the `loopback-network` permission to communicate with external endpoints.
Ensure your environment supports this for local tool integration.

---

## How It Works: The Agent Loop Explained

At its core, the system follows a **tool-aware agent loop**:

1. The user asks a question (e.g., *"What is the square of 42?"*).
2. The local LLM (Qwen3) analyzes the prompt and decides whether to use a tool.
3. If a tool is needed, the agent calls the function (e.g., `square_number`), executes it locally, and sends the
 result back into the conversation.
4. The model then uses that result to complete its final response.

This cycle enables **reasoning + execution**, a key feature in modern AI agents.

---

## The Script Breakdown

### 1. Local Functions

We define a simple local function that performs a calculation:

```js
var local = {
      square_number   : ({n})=>{
                                      return {result:n*n};
                                }
};
```

This function takes a number `n`, squares it, and returns the result. It runs entirely on the client side — no server or external dependency.

---

### 2. Tool Definition (JSON Schema)

The AI model needs to know what tools are available. We
 define this in a structured JSON schema:

```js
var tools = [
              {
                type        : 'function',
                function    : {
                      name          : 'square_number',
                      description   : 'Calculates the square of a given number.',
                      parameters    : {
                            type          : 'object',
                            properties    : {
                                  n   : {type:'number',description:'The number to square' }
                            },
                            required      : ['n']
                      }
                }
              }
];
```

This schema tells the llm : *"You can use the `square_number` function with a number input."*

It’s essential for the model to understand how to invoke tools correctly.

---

### 3. Running the Agent

The core logic runs with a simple prompt:


```js
var txt   = await runToolAgent('what is the square of 42 ?');
console.log(txt);
```

This triggers the full agent loop, which we’ll now explore in detail.

---

## The `runToolAgent` Function: Step-by-Step Flow

### Step 1: Initial Prompt

The agent starts by sending the user’s message to the LLM:

```js
var messages    = [
      { role: 'system', content: 'You are a helpful assistant. Use provided tools when asked to calculate.' },
      { role: 'user', content: userPrompt }
];
```

The system message guides the model to use tools when appropriate.

### Step 2: First Response from Qwen


The model receives the prompt and may decide to call a tool. For example:

> "I need to calculate the square of 42."

If so, it returns a `tool_call` object like:

```json
{
      "tool_calls"    : [
            {
                  "id"          : "call_123",
                  "type"        : "function",
                  "function"    : {
                        "name"        : "square_number",
                        "arguments"   : "{\"n\": 42}"
                  }
            }
      ]
}
```

We capture this and parse the arguments:

```js
var args      = JSON.parse(call.function.arguments);
var output    = local[name](args);
```

The local `square_number` function is executed, returning `{result:1764}`.

### Step 3: Send Tool Result Back

The result is appended to the conversation history as a `tool` message:

```js
messages.push({
      role            : 'tool',
      tool_call_id    : call.id,
      content         : JSON.stringify(output)
});
```

Now, the model sees the result and can complete its final response.

### Step 4: Final Response

The agent sends the updated conversation to the model again, prompting it to finish the thought:

```js
var res     = await fetch(endpoint,{ ... });
var data    = await res.json();
return assistantMsg.content;
```

The final output is:  
> "The square of 42 is 764."

---

## Key Benefits of This Approach

| Benefit | Description |
|-------|-------------|
| **Local Execution** | All computation happens on your machine — no cloud dependency. |
| **Tool Flexibility** | You can extend this to support math, file reading, API calls, or database queries. |
| **Transparent Reasoning** | The agent shows its thought process and actions. |
| **Reusability** | The agent loop can be reused with different tools or models. |

---

## Next Steps & Future Enhancements

- Add more tools: e.g., `add`, `subtract`, `get_weather`, `search_web`.
- Integrate with file systems or databases.
- Add error handling for invalid inputs.
- Support streaming responses for real-time interaction.
- Build a GUI or CLI interface for user interaction.

---

## Conclusion

This script is a foundational example of how to build a **local, tool-aware AI agent** using JavaScript and a local LLM like Qwen3.
By combining structured tool definitions with a clear agent loop, we create systems that can reason, act, and learn — all
without relying on cloud APIs.

Whether you're building a personal assistant, a coding tutor, or a smart automation system,
this pattern is both powerful and accessible.

> Start small. Add tools. Watch the agent grow.








