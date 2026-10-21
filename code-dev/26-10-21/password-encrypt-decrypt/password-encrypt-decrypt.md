

## Zero-Dependency Client-Side Encryption in Modern JavaScript, Browser and Nodejs compatible

This snippet implements a clean, self-contained encryption and decryption utility using the native Web Crypto API (crypto.subtle).
It uses PBKDF2 for key derivation (with 100,000 iterations and SHA-256) and AES-GCM (256-bit) for authenticated encryption,
packing everything—salt, initialization vector (IV), and ciphertext—into a single Base64-encoded string using newer
built-in buffer methods like Uint8Array.fromBase64().


### Key Highlights

- **Pure Native APIs :** No external libraries (like crypto-js or tweetnacl) required. Runs out-of-the-box in modern browsers and Node.js environments supporting Web Crypto.
- **Secure Defaults :** Generates cryptographically secure random salts (16 bytes) and IVs (12 bytes) via crypto.getRandomValues().
- **Compact Packaging :** Combines the salt, IV, and encrypted payload into a single unified buffer before converting it to Base64 for easy transport or storage.
- **Module Pattern :** Encapsulated in an IIFE, attaching the decrypt method directly to the main encrypt function for clean scoping.



