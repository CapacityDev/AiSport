import * as requestService from './request';
import dataApi from '../config/api';

/************密钥管理************/
// 获取RSA公钥
export function getRSAPublicKey() {
  let fetchApi = dataApi.spxCipher.getRSAPbK;
  return requestService.get(fetchApi);
}
