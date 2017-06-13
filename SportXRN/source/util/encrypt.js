import * as CryptoJS from 'crypto-js';

let AuthTokenKeyAES = '68bfc76eb9984253'; //AES密钥
let AuthTokenIvAES = 'a1f0b7372ef129c7'; //AES向量

/*AES加密*/
export function EncryptAES(data) {
  var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Latin1.parse(AuthTokenKeyAES), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/*AES解密*/
export function DecryptAES(data) {
  var decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Latin1.parse(AuthTokenKeyAES), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/*PBKDF2*/
export function EncryptPBKDF2(data, solt) {
  var encrypted = CryptoJS.PBKDF2(data, solt, { keySize: 256/32, iterations: 1200 });// 长度64
  return encrypted.toString();
}
