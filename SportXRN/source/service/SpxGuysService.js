import _ from 'lodash';
import * as requestService from './request';
import { Base64 } from '../common/base64';
import * as storageService from './storage';
import { authData, storageKey, pageSize } from '../config';
import dataApi from '../config/api';
import * as StringUtil from '../util/stringutil';
import * as DataTrans from '../util/datatrans';
import * as Encrypt from '../util/encrypt';

// 获取登录用户名加密hash盐
export function getUserPwdSalt() {
  let fetchApi = dataApi.spxGuys.salt;
  return requestService.get(fetchApi);
}

// 获取用户密码加密hash盐
export function getUserNoSalt() {
  let fetchApi = dataApi.spxGuys.usernosalt;
  return requestService.get(fetchApi);
}

// 账号校验
export function usernoValid(userno) {
  let fetchApi = dataApi.spxGuys.usernoValid;
  return requestService.get(fetchApi);
}

// 用户注册
export function guysRegist(userInfo) {
  // 数据校验
  if (userInfo) {
    if (!StringUtil.isEmpty(userInfo.encryptionSalt)) {
      return new Promise((resolve, reject) => {
        reject('注册失败，您可以尝试重新注册一下。');
      });
    }
    if (!StringUtil.isEmpty(userInfo.signinPwd)) {
      return new Promise((resolve, reject) => {
        reject('注册失败，您可以尝试重新注册一下。');
      });
    }
    if (!StringUtil.isEmpty(userInfo.usernoSalt)) {
      return new Promise((resolve, reject) => {
        reject('注册失败，您可以尝试重新注册一下。');
      });
    }
    if (!StringUtil.isEmpty(userInfo.userFirstName)) {
      return new Promise((resolve, reject) => {
        reject('姓氏可能没有填写，请确认一下。');
      });
    }
    if (!StringUtil.isEmpty(userInfo.userLastName)) {
      return new Promise((resolve, reject) => {
        reject('名字可能没有填写，请确认一下。');
      });
    }
    if (!StringUtil.isEmpty(userInfo.phoneNo)) {
      return new Promise((resolve, reject) => {
        reject('电话可能没有填写，请确认一下。');
      });
    }
    userInfo.signinCode = Encrypt.EncryptPBKDF2(userInfo.phoneNo, userInfo.usernoSalt);// 登录标识
  }
  // 数据加密
  userInfo.encryptionSalt = Encrypt.EncryptAES(userInfo.encryptionSalt);
  userInfo.signinPwd = Encrypt.EncryptAES(userInfo.signinPwd);
  userInfo.userFirstName = Encrypt.EncryptAES(userInfo.userFirstName);
  userInfo.userLastName = Encrypt.EncryptAES(userInfo.userLastName);
  userInfo.phoneNo = Encrypt.EncryptAES(userInfo.phoneNo);
  userInfo.signinCode = Encrypt.EncryptAES(userInfo.signinCode);// 登录标识
  // 组装数据并请求
  let fetchApi = dataApi.spxGuys.guysRegist;
  let sendObj = {};
  DataTrans.concatSendObjByObj(sendObj, userInfo, 'signupInfo');
  let formData = new FormData();
  let proptNames = Object.keys(sendObj);
  for (let i=0; i<proptNames.length; i++) {
    formData.append(proptNames[i], sendObj[proptNames[i]]);
  }
  let headers = {
    'Content-type': 'multipart/form-data'
  };
  getUserNoSalt();
  //return requestService.post(fetchApi, formData, headers);
}
