



/*

aes-encrypt-decrypt-nodejs.js

30-04-26


*/



const crypto = require("crypto");

function importAesKey(base64) {
  return Buffer.from(base64, "base64"); // raw 32‑byte key
}


function aesEncryptNode(keyBuf, plaintext) {
  const iv = crypto.randomBytes(12);
  
  const cipher = crypto.createCipheriv("aes-256-gcm", keyBuf, iv);
  
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final()
  ]);
  
  const tag = cipher.getAuthTag();
  
  return {
    iv: iv.toString("base64"),
    data: encrypted.toString("base64"),
    tag: tag.toString("base64"),
  };
}



function aesDecryptNode(keyBuf, encrypted) {
  const iv = Buffer.from(encrypted.iv, "base64");
  const data = Buffer.from(encrypted.data, "base64");
  const tag = Buffer.from(encrypted.tag, "base64");
  
  const decipher = crypto.createDecipheriv("aes-256-gcm", keyBuf, iv);
  decipher.setAuthTag(tag);
  
  const decrypted = Buffer.concat([
    decipher.update(data),
    decipher.final()
  ]);
  
  return decrypted.toString("utf8");
}







