import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as guysService from '../service/SpxGuysService';

// 获取用户密码加密hash盐
export const getUserPwdSalt = createAction(
  types.GET_USER_SALT,
  async()=> {
    return await guysService.getUserPwdSalt();
  },
  ({resolved, rejected})=> {
    return {
      resolved,
      rejected
    }
  }
);
