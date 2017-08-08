/**
 * 公共service
 */
import _ from 'lodash';
import * as requestService from './request';
import {
  Base64
} from '../common/base64';
import * as storageService from './storage';
import {
  authData,
  storageKey,
  pageSize
} from '../config';
import dataApi from '../config/api';
import * as StringUtil from '../util/stringutil';
import * as DataTrans from '../util/datatrans';
import * as Encrypt from '../util/encrypt';
import * as UUID from '../util/uuid';
import * as SpxCipherService from './SpxCipherService';


export function getPicCaptcha(picCapCkOld) {
  return requestService.post(dataApi.spxCommon.getPicCaptcha + '?picCapCkOld=' + picCapCkOld);
}
