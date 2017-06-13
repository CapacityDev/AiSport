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
  let formData = new FormData();
  let proptNames = Object.keys(sendObj);
  for (let i=0; i<proptNames.length; i++) {
    formData.append(proptNames[i], sendObj[proptNames[i]]);
  }
  return requestService.post(fetchApi, formData);
}
