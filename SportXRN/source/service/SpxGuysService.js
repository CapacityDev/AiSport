import _ from 'lodash';
import * as requestService from './request';
import { Base64 } from '../common/base64';
import * as storageService from './storage';
import { authData, storageKey, pageSize } from '../config';
import dataApi from '../config/api';

// 获取用户密码加密hash盐
export function getUserPwdSalt(){
    let fetchApi = dataApi.spxGuys.salt;
    return requestService.get(fetchApi);
}
