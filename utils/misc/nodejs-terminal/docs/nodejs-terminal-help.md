
## nodejs-terminal help

This environment provides a full Node.js runtime and NPM interface directly in your browser.

It supports a **multi-instance terminal**, allowing you to open multiple tabs to run a dev server in
one and execute shell commands in another simultaneously.

Secure, sandboxed execution of Node.js, JavaScript and TypeScript.




### servers and opening ports

when servers are run, check the `ports` viewport to show the associated url

<img style='width:30px;height:30px;cursor:pointer;border:1px solid lightgray;vertical-align:middle' class=icon onclick='btn.ports()' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAACN1BMVEVHcEwHI1xAXInc8vmcutHX6/PQ7PcMJ17R7PfZ8Pcba5kLKGAXLl0NHEXS7fbT7faVtM0iP3IvTHwHGVGGor8UMGcHGVkiN2AMJ19jgKTT7fbS7PYMJ1/S7fgfg6wOKWANLGOuy97O6PTC2ujS7ffU7/jR7PfQ7PcDH1l6l7YaPXIkPnEGH1oXL13b6+3S7PbR7PdQa5UbcZ6LqcUEDUbQ7PfV7/lki64nRHZ7nryDoL0MJ17Q7PcOKF5ykLHO6vXR7fiUscpnhKgGIlvT7vhhfqMgPXHS7fg5V4Y1UoFmfJ8TN20fPnEMKF45Un/M6PROa5QQKVzc7PQlNWVFYo6SQ0lEbZc8WocCFVZkfaE0UX9ZWVY0QVubgk/Q7PfR7PbR7PbR7PbS7vnS7PbS7PasyNvS7PazytwLJ17L5vLR7PbU7/kigKkYRnkgfKUdbJkca5c0a5cQPnONqcMRK2Ecbpp9mLYPLGSyzd/S7PbT7vhWc5pvjK7S7fgHJFwQLmYpRnhGYo3M6PQxTn+EepFifaFFUnv/4tiNmrWivtRuZlOZo7dnhKhPYopYTW5vhKU0QVt0aVKRobv/9e53iKj///////9DWYT////Q7PfT7/rS7vnR7fi82OjU8PrT7vmxzuC00OLQ6/bN6fUnm7/9wEPL6PO31OUsaJXF4u+AclIll7wbX5BznLwcdqJhhamPrshUgKa/2+q51eWoxNmSfU/zukTKoElNeKBZkbTK5/PB3ey+mUt75vObAAAAmXRSTlMArJgV/gXomtUJ/rxqAiAb/cbKEfi5H5TF0CkjNrX6cbL+TBCWaMT6rvPLVUSTAk+wGf37CuBV/cn+8YbJTvCS8/XqtJvp2/nxyze90j6V59h+Y4v3Nv3PGcaGxW7+61yNeftGMOA6U1/Yc37+0ejLyu+lxYrQwM2sO63f7OSp4tbU3+ud06ZKnPzEgfbIb7237/h9haiwXOQ3QIpQAAACOElEQVQoz63TVVcbURQF4Axxd4O4hwQvUIq7u1vd3T2l7u4nM0mTEIeiBdq0P66ZyIKUPrIf9zdr7px77xAIOxChQiFhEwhkepHC3i38V9nqyuPUjrL9haZL1GqqbRuz+lnSIwcBnPWX1ZVXT3EzeddFDfUMyQnwrSKX2lnuqzqUyefOnj/Nw/m76orq1yxQ9m3lYxdUfsZSghn+heVZgL0Fm5p94ufC3Dz+cmfJvJ9RjgEALSet+QZnRfFc2BVvUU/Yz8BXAajNT/FhCqoNFy/68DK2zBjBnwNwZKf4AICvpkuL4iX6I1fkRuPB4GRSycr4mnt2u+KtE4uzNeSNJxQsJCeYSEswqaTGSop4Xw2Ov3+TNTHxWEQjJjjHAeAWXeNrLBZx38vXH75+xvvhR72c5FgUgGBzIyLou9eJyD5+GvgiZUkIQnlvcjROKaA8saYhFIuQRmW2jv53f6bfdgvl95M7r6+C2C2kxeMGzP2sy86aXg8ENibH5CZ68tMN2Eo70uLFB4sN2ac2AoHA+nOJvDY1d0GrS4DwPTj7RmxTa9FodG1SMq5Lsd4UGb3DrHcDYL8fPH0hzcvLk7LGevTpTS8z30aYbSG3M2hlPnyS7IbV7DSTDR4BImsT8ZrFTFlPViKD1ZsnSrxJEiAWphhpnFlcdeG5XsTech+ITdqGdj7/7tBSEMUwrLWJmHnb6EbaisezGkscNW2Avu2qc41KR53ZXFeqNHL/+y/QOTd0uqMcMmGn8hdpQsEZmw2sUgAAAABJRU5ErkJggg=='>

then create an iframe using the url

<img style='width:30px;height:30px;cursor:pointer;border:1px solid lightgray;vertical-align:middle' class=icon onclick='btn.ports()' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAw1BMVEUrecM8RlEsesU8RlAtesA9RlArecMvecAuer8/SVPKzc+GjJJXlM5DiMlLjcvQ4PDc6PQueb9YYWk8hMcyfsRDTFY9R1E8Rk+Mtdy81OuYveDF2u00fsWox+Qzeb0+R09HcEx5qtc4gcW30elKU11wd36fo6gtecI9RlA8RlA9Rk+tyuXv9Pl8q9hqoNK4u792fYQveb56gYg+R1G6vsFrc3rHyswwer+Bh42Ump8yer5IS0orecM8RlApeMM5Q00od8KQ9boaAAAAPHRSTlP7QZr3XXL+cp/88fXy9fPs7Z/09vr5/Zzq7e7s9+kkKgDx9On38+bLbtZr7e3q7urpaPAd6erkRObpPwF4XDSbAAABE0lEQVQoz5WR2W6DMBBFhyykSY0BswTSsDR70n3f7MH//1U1fiASBUs9sixZR3M11oWyOI17OFg/UBxFL0cLTkLEsYhFfRTVGfWaw1hUb1/DHWO7qXpHz5cNTOu4+nyN3rfbWaT05mHW8FjpabFhgkUR0+nTMzr8MDQwhxfLQAEfAwMjmHADFzCx/6XRrIPQpMP0XnZrVLmSeFRil8aA2FwuUqBO4/1GY5BmwEP3TiYuxfa0smmASDwHl1njGy2TWyrVvQaOK+8G2tPO1XqFS/da8nDhkfZ07TOos2XiEflnNeUJqL25TWjH5spLna3/36E5UtdBQyUhtY2NYatQ39y3D08GbQ8g30Mv+28o81EvefkLrY2Is/tHNSYAAAAASUVORK5CYII='>

you can download a https server from the more menu <img style='width:15px;height:24px;border:1px solid gray;padding:2px;background:buttonface;box-sizing:border-box;cursor:pointer;border-radius:3px;vertical-align:middle' class=icon onclick='more.click()' src='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEVHcEwbmPYcgfMchvQbsfkay/wbtvkbnfccefMayfwbmfYch/QchvQbtfkbmfYa1P0ddfIcivQcl/Ycj/Ubp/gcmfYdbPEbrvkazPwcmfYbqfgayfwayPwbv/sbvvobsvkazPwbqvga0fwbvPobtvocjvUbofcbpvccfPMcgPMcgvMdafAdbfEckfUbtvka0PwcfPIaxvsbwfsbvPodb/EcnPYclvYckfUbpvccjPQdd/IbofcbrPiPy8D0AAAAMHRSTlMAA/79/v7+5ycVZ3Y3h0xhu9jp8kFeF9OkVfQOrZi+Mh1z/iUJQ+/dx4fOYq7hybzs5xU1AAABIklEQVQ4y+2Ux3aDMBBFpTR6M92AwYB7S6EG/v+7MsJJnBBKVsnGdwHozT1HQgxC6MrfEkiSM+Y4khSgUxhazLDHWGF4QveAO2gyLnGQ9QS4wcDaXGJYiPGegVnU50UzUvdgTsd7AfrMaEaqXvO+sfAAHP0uzz+SmhCfR7FwB5gdpm+SyoeHEJ5P67o2tbanmRBP5/iSgFkUxaplaisIv3kAu6yqihK/RiIF0ZJtT6NTaZpS9iWwm0D/uXB7kmXZ5LOgN0O7ayvEQ57nKtssCbMqDA5i9+YulLIsVQ5MzKnwqCz6Phev3AIcxhy5K3x/A/DbG2CzIdctP9RS9PrxnTU92KOYll8bZHqs7Wk5AcY9hIx9kuyN3/xuxm5nXA+df+cNJSAgjMbiFSoAAAAASUVORK5CYII='>





### note :

- menus and viewports can be mvoed, left click and drag ( components that capture cursor use ctrl )
- menus and viewports can be resized, right click and drag ( components that capture cursor use ctrl )




---


## Quick Start

The terminal is already initialized and ready for commands.


### Initialize a Project

Create a `package.json` to start managing your dependencies:

`npm init -y`


### Install Packages

You can install any pure-JavaScript package from the npm registry:

`npm install <package-name>`


---

## File System Basics

Use standard Unix commands to manage your workspace:

* **ls** : List all files in the current directory.
* **pwd** : Show the current path.
* **mkdir** <name> : Create a new directory.
* **rm** <file> : Remove a specific file.
* **cat** <file> : Display file contents in the terminal.
* *etc*

---

## Running Applications

To execute your scripts, use the Node.js binary:

`node index.js`

If your code starts a web server (e.g., using Express), the environment will automatically detect the active port and provide a preview URL.
In the ports sub-menu 
<img style='width:30px;height:30px;cursor:pointer;border:1px solid lightgray;vertical-align:middle' class=icon onclick='btn.ports()' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAACN1BMVEVHcEwHI1xAXInc8vmcutHX6/PQ7PcMJ17R7PfZ8Pcba5kLKGAXLl0NHEXS7fbT7faVtM0iP3IvTHwHGVGGor8UMGcHGVkiN2AMJ19jgKTT7fbS7PYMJ1/S7fgfg6wOKWANLGOuy97O6PTC2ujS7ffU7/jR7PfQ7PcDH1l6l7YaPXIkPnEGH1oXL13b6+3S7PbR7PdQa5UbcZ6LqcUEDUbQ7PfV7/lki64nRHZ7nryDoL0MJ17Q7PcOKF5ykLHO6vXR7fiUscpnhKgGIlvT7vhhfqMgPXHS7fg5V4Y1UoFmfJ8TN20fPnEMKF45Un/M6PROa5QQKVzc7PQlNWVFYo6SQ0lEbZc8WocCFVZkfaE0UX9ZWVY0QVubgk/Q7PfR7PbR7PbR7PbS7vnS7PbS7PasyNvS7PazytwLJ17L5vLR7PbU7/kigKkYRnkgfKUdbJkca5c0a5cQPnONqcMRK2Ecbpp9mLYPLGSyzd/S7PbT7vhWc5pvjK7S7fgHJFwQLmYpRnhGYo3M6PQxTn+EepFifaFFUnv/4tiNmrWivtRuZlOZo7dnhKhPYopYTW5vhKU0QVt0aVKRobv/9e53iKj///////9DWYT////Q7PfT7/rS7vnR7fi82OjU8PrT7vmxzuC00OLQ6/bN6fUnm7/9wEPL6PO31OUsaJXF4u+AclIll7wbX5BznLwcdqJhhamPrshUgKa/2+q51eWoxNmSfU/zukTKoElNeKBZkbTK5/PB3ey+mUt75vObAAAAmXRSTlMArJgV/gXomtUJ/rxqAiAb/cbKEfi5H5TF0CkjNrX6cbL+TBCWaMT6rvPLVUSTAk+wGf37CuBV/cn+8YbJTvCS8/XqtJvp2/nxyze90j6V59h+Y4v3Nv3PGcaGxW7+61yNeftGMOA6U1/Yc37+0ejLyu+lxYrQwM2sO63f7OSp4tbU3+ud06ZKnPzEgfbIb7237/h9haiwXOQ3QIpQAAACOElEQVQoz63TVVcbURQF4Axxd4O4hwQvUIq7u1vd3T2l7u4nM0mTEIeiBdq0P66ZyIKUPrIf9zdr7px77xAIOxChQiFhEwhkepHC3i38V9nqyuPUjrL9haZL1GqqbRuz+lnSIwcBnPWX1ZVXT3EzeddFDfUMyQnwrSKX2lnuqzqUyefOnj/Nw/m76orq1yxQ9m3lYxdUfsZSghn+heVZgL0Fm5p94ufC3Dz+cmfJvJ9RjgEALSet+QZnRfFc2BVvUU/Yz8BXAajNT/FhCqoNFy/68DK2zBjBnwNwZKf4AICvpkuL4iX6I1fkRuPB4GRSycr4mnt2u+KtE4uzNeSNJxQsJCeYSEswqaTGSop4Xw2Ov3+TNTHxWEQjJjjHAeAWXeNrLBZx38vXH75+xvvhR72c5FgUgGBzIyLou9eJyD5+GvgiZUkIQnlvcjROKaA8saYhFIuQRmW2jv53f6bfdgvl95M7r6+C2C2kxeMGzP2sy86aXg8ENibH5CZ68tMN2Eo70uLFB4sN2ac2AoHA+nOJvDY1d0GrS4DwPTj7RmxTa9FodG1SMq5Lsd4UGb3DrHcDYL8fPH0hzcvLk7LGevTpTS8z30aYbSG3M2hlPnyS7IbV7DSTDR4BImsT8ZrFTFlPViKD1ZsnSrxJEiAWphhpnFlcdeG5XsTech+ITdqGdj7/7tBSEMUwrLWJmHnb6EbaisezGkscNW2Avu2qc41KR53ZXFeqNHL/+y/QOTd0uqMcMmGn8hdpQsEZmw2sUgAAAABJRU5ErkJggg=='>

---

## Important Notes

* Native Modules: Packages requiring C++ bindings (node-gyp) are not supported.
* Browser Sandbox: You are limited by browser security. Outbound network requests must support CORS.
* Volatility: This environment runs in-memory. Refreshing the browser will reset the file system unless you have manually exported your work.

---


## Core Features

* **Native Performance**: Powered by WebAssembly and SharedArrayBuffer.
* **Full NPM Support**: Install and manage over 2 million packages.
* **Isolated Environment**: Secure, sandboxed execution of JavaScript and TypeScript.
* **Multi-Tab Interface**: Parallel processing for dev servers and CLI tools.
* **[snippet-console](docs/snippet-console.md)** : ease of use editor to run javascript snippets within the nodejs-terminal environment
* **[snippet-nodejs](docs/snippet-nodejs.md)** : ease of use editor to run ndoejs snippets within the nodejs-terminal environment



## Importing Files

Currently to import files :

- **load local file** 
- **save in webcontainer fs**
      
      
---

## Frequently Asked Questions

### Can I run a database?
You can run in-memory databases like SQLite. For persistent databases, connect via API to external providers.

### Is this a real Linux terminal?
It is a WASM-based Node.js environment that mimics a Linux shell. While it supports most `POSIX` commands, it is specifically optimized for Node.js workflows.

### Can I use Git?
Git is supported through JavaScript-based implementations ( like [isomorphic-git](https://www.npmjs.com/package/isomorphic-git) ), allowing for full version control within the browser sandbox.



## Technical Specifications
* **Runtime:** Node.js (WebContainer API)
* **Architecture:** WebAssembly (WASM) 
* **Security:** Isolated Browser Sandbox
* **Protocol:** Cross-Origin Isolated (COOP/COEP)



## SEO Summary
This browser-based shell provides a high-concurrency Node.js environment.
Developers can utilize a multi-tab terminal for full-stack JavaScript development,
NPM package management, and real-time script execution without local installation.
It is an ideal tool for sandboxed testing, educational coding environments,
and rapid prototyping of Node.js applications.