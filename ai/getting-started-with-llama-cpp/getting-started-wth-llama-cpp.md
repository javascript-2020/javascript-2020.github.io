

## Getting started with llama.cpp

A 1B–1.5B parameter model is a great starting point—it is small enough (often under 1–1.5 GB quantized)
to run quickly on modest hardware while letting you focus on how llama.cpp works.


### Install Build Dependencies on Debian

```

sudo apt update && sudo apt install -y git cmake build-essential libcurl4-openssl-dev

```


Run and confirm both print version numbers without errors.

```

cmake --version 

g++ --version 

```

### Create an ai directory to keep everything contained

```

mkdir -p ~/ai && cd ~/ai

```


### Clone and Build llama.cpp

```

git clone https://github.com/ggml-org/llama.cpp.git && cd llama.cpp

cmake -B build && cmake --build build --config Release -j$(nproc)

```

Check that ` ./build/bin/llama-cli ` exists and confirm the CLI binary built cleanly.

```

./build/bin/llama-cli --help 

```

### Download a 1B Instruct GGUF Model

Create a models folder 

```

mkdir -p ~/ai/models && cd ~/ai/models

```

download a small 1B-class Instruct .gguf file  from Hugging Face.

for example, 

[https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF)

Q4_K_M GGUF of Qwen 2.5 1.5B Instruct

[https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/blob/main/qwen2.5-1.5b-instruct-q4_k_m.gguf](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/blob/main/qwen2.5-1.5b-instruct-q4_k_m.gguf)


### Run the 1B Model in Your Terminal

From inside the ` ~/ai/llama.cpp ` directory, launch an interactive chat session:

```

./build/bin/llama-cli -m ~/models/your-1b-model.Q4_K_M.gguf -c 2048

```

---


The current setup has a NVIDIA Quadro P2000 with 5120 MiB (5 GB) of VRAM, running Driver 550.163.01 (CUDA 12.4) on Debian.

Because the P2000 uses the Pascal architecture (CUDA compute capability 6.1), rebuilding llama.cpp with ` -DGGML_CUDA=ON `
will allow offloading a small model onto the GPU, and a 3B–4B model (or a 7B model partially split across VRAM and system RAM)
will code much better than 1B while fitting the memory budget.


### Install CUDA Toolkit (If nvcc Is Missing)

```

sudo apt update && sudo apt install -y nvidia-cuda-toolkit

```


### Rebuild llama.cpp with CUDA Enabled

```

cmake -B build -DGGML_CUDA=ON && cmake --build build --config Release -j$(nproc)

```

confirm the CLI binary built cleanly.

```

./build/bin/llama-cli --help

```

### Download a 3B–4B Coding GGUF Model

Pick a 3B or 4B code-capable Instruct model in Q4_K_M quantization (around ~2–3 GB on disk) and save the .gguf file into ` ~/models `


[https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507)

Qwen3-4B-Instruct-2507

[https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/blob/main/qwen2.5-1.5b-instruct-q4_k_m.gguf](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/blob/main/qwen2.5-1.5b-instruct-q4_k_m.gguf)


### Run with GPU Offload (-ngl) and Keep Context Reasonable

Launch llama-cli with ` -ngl 99 ` to offload layers to the Quadro P2000 and set a moderate context length
like ` -c 2048 ` (large context windows eat extra VRAM):

```

./build/bin/llama-cli -m ~/models/your-coding-model.Q4_K_M.gguf -c 2048 -ngl 99

```

---

You can check exact memory usage and remaining capacity on Debian using a few terminal commands


### Check System RAM and Swap Availability

Run ` free -h ` in a terminal to see total system RAM, currently used memory, and available memory (which includes reclaimable page cache):

```

free -h

```


### Check Live GPU VRAM Usage

Run ` nvidia-smi ` while llama.cpp is loaded ( or watch it continuously with ` watch -n 1 nvidia-smi ` ):

```

nvidia-smi

watch -n 1 nvidia-smi

```


Verification: Check Memory-Usage (e.g., XXXXMiB / 5120MiB) during model load and generation to see how
many MiB llama-cli or llama-server takes on the Quadro P2000.


### Check Per-Process RAM & RSS Memory

Find the exact resident memory (RSS) used by llama-cli or llama-server:

```

ps aux | grep -E 'llama-|PID' | grep -v grep

```


Look at the RSS column (in KB) to see how much physical system RAM that specific llama.cpp process is holding.


---

## Run llama.cpp Over HTTPS

### Install OpenSSL Dev Headers on Debian

From ` ~/ai/llama.cpp `, make sure the OpenSSL development package is installed:

```

sudo apt update && sudo apt install -y libssl-dev openssl

```

### Reconfigure & Rebuild With CUDA + OpenSSL

If CMake already has a cached config and doesn't pick up OpenSSL cleanly, wipe ` build/ ` first with ` rm -rf build ` )
```

cd ~/ai/llama.cpp

rm -rf build

cmake -B build -DGGML_CUDA=ON -DLLAMA_OPENSSL=ON

cmake --build build --config Release --parallel $(nproc)

```


### Generate a Local Self-Signed Cert for 127.0.0.1

keybits           = 2048 

days              = 365

CN                = llama.cpp

subjectAltName    = DNS:localhost,IP:127.0.0.1

[generate https certificate [ext-code.com]](https://ext-code.com/utils/x509/generate-https-certificate/generate-https-certificate.html)


save key and cert to 

key  ` ~/ai/certs/llama-cpp.key.pem `

cert ` ~/ai/certs/llama-cpp.cert.pem `


### Run The server With --ssl-cert-file and --ssl-key-file

Pass the cert and key files when starting the **server**

```

./build/bin/llama-server \
  -m ~/ai/models/Qwen3-4B-Instruct-2507-Q4_K_M.gguf \
  -c 4096 \
  -n 2048 \
  -ngl 99 \
  --temp 0.7 --top-p 0.8 --top-k 20 \
  --log-verbosity 3 \
  --host 127.0.0.1 \
  --port 8443 \
  --ssl-cert-file ~/ai/certs/llama-cpp.cert.pem \
  --ssl-key-file ~/ai/certs/llama-cpp.key.pem
  
```

(Quick browser note: because it's self-signed, Chrome will still warn you on the first visit to 

[https://127.0.0.1:8443](https://127.0.0.1:8443) 

<!--
until you accept the warning or trust cert.pem—and if your script/console is on a different https:// origin, you may also need
` --cors-origins ` or to run your JS console directly on that [https://127.0.0.1](https://127.0.0.1):<port> page.)
-->


### What's Next : Tool use

Get the model to start using tools

[]()
























