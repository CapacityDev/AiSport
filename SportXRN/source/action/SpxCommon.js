/**
 * 公共action
 */
import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as commonService from '../service/SpxCommonService';

// 获取图形验证码
export const getPicCaptcha = createAction(
 types.SPX_GET_PIC_CAPTCHA,
 async({picCapCkOld})=> {
   return await commonService.getPicCaptcha(picCapCkOld);
 },
 ({resolved, rejected})=> {
   return {
     resolved,
     rejected
   }
 }
);
