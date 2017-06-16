import * as CryptoJS from 'crypto-js';
import * as UUID from './uuid';
import * as StringUtil from './stringutil';
import Crypto from 'crypto';

let AuthTokenKeyAES = '68bfc76eb9984253'; //AES密钥
let AuthTokenIvAES = 'a1f0b7372ef129c7'; //AES向量

/*AES加密（使用默认密钥）*/
export function encryptAESDefaultSK(data) {
  let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Latin1.parse(AuthTokenKeyAES), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/*AES加密（生成加密密钥），不支持空字符加密*/
export function encryptAESGenerateSK(data) {
  let sk = UUID.generateUUID();
  let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Latin1.parse(sk), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let encryptedData = encrypted.toString();
  if (StringUtil.isEmpty(sk) && StringUtil.isEmpty(encryptedData)) {
    // 成功
    return { success: true, msg: '数据加密成功', sk: sk, encryptedData: encryptedData };
  } else {
    // 失败
    return { success: false, msg: '数据加密失败' }
  }
}

/*AES加密（生成加密密钥），不支持空字符加密，回调形式返回*/
export function encryptAESGenerateSKPromise(data) {
  let sk = UUID.generateUUID();
  let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Latin1.parse(sk), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let encryptedData = encrypted.toString();
  return new Promise(function(resolve, reject){
    if (StringUtil.isEmpty(sk) && StringUtil.isEmpty(encryptedData)) {
      resolve({ sk: sk, encryptedData: encryptedData });
    } else {
      reject('数据加密失败');
    }
  });
}

/*AES解密（使用默认密钥）*/
export function decryptAESDefaultSK(data) {
  let decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Latin1.parse(AuthTokenKeyAES), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/*AES解密（使用传入密钥），不支持空字符解密*/
export function decryptAESBySK(sk, encryptedData) {
  let decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Latin1.parse(sk), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  if (StringUtil.isEmpty(sk) && StringUtil.isEmpty(decryptedData)) {
    return { success: true, msg: '数据解密成功', sk: sk, decryptedData: decryptedData };
  } else {
    return { success: false, msg: '数据解密失败' };
  }
}

/*AES解密（使用传入密钥），不支持空字符解密，回调形式返回*/
export function decryptAESBySKPromise(sk, encryptedData) {
  let decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Latin1.parse(sk), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIvAES),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  return new Promise(function(resolve, reject){
    if (StringUtil.isEmpty(sk) && StringUtil.isEmpty(decryptedData)) {
      resolve({ sk: sk, decryptedData: decryptedData });
    } else {
      reject('数据解密失败');
    }
  });
}

/*获取AES密钥*/
export function getAESSecretKey() {
  return UUID.generateUUID();
}

/*RSA公钥加密*/
export function encryptRSAByPubKey(pubKey, data) {
  let publicKey = `-----BEGIN PUBLIC KEY-----`
  + `\n`
  + pubKey
  + `\n`
  + `-----END PUBLIC KEY-----`;
  let encrypted = Crypto.publicEncrypt({
    padding: 1,
    key: publicKey
  }, new Buffer(data), false);
  return encrypted.toString();
}

/*PBKDF2*/
export function encryptPBKDF2(data, solt) {
  let encrypted = CryptoJS.PBKDF2(data, solt, { keySize: 256/32, iterations: 1200 });// 长度64
  return encrypted.toString();
}
