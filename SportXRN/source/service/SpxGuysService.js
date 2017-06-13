import _ from 'lodash';
import * as requestService from './request';
import { Base64 } from '../common/base64';
import * as storageService from './storage';
import { authData, storageKey, pageSize } from '../config';
import dataApi from '../config/api';
import * as DataTrans from '../util/datatrans';

// 获取用户密码加密hash盐
export function getUserPwdSalt() {
  let fetchApi = dataApi.spxGuys.salt;
  return requestService.get(fetchApi);
}

// 账号校验
export function usernoValid(userno) {
  let fetchApi = dataApi.spxGuys.usernoValid;
  return requestService.get(fetchApi);
}

// 用户注册
export function guysRegist(userInfo) {
  let fetchApi = dataApi.spxGuys.guysRegist;
  let sendObj = {};
  DataTrans.concatSendObjByObj(sendObj, userInfo, 'signupInfo');
  let data = JSON.stringify({signupInfo: userInfo});
  // let data = `signupInfo.userFirstName=${userInfo.userFirstName}&signupInfo.userLastName=${userInfo.userLastName}&signupInfo.phoneNo=${userInfo.phoneNo}`;
  let headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
  data = new FormData(sendObj);
  return requestService.post(fetchApi, data, headers);
}
