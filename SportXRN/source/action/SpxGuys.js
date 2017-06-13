import { createAction } from 'redux-actions';
import * as types from '../constant/actiontype';
import * as guysService from '../service/SpxGuysService';

// 获取用户密码加密hash盐
export const getUserPwdSalt = createAction(
  types.SPX_GET_USER_SALT,
  async()=> {
    return await guysService.getUserPwdSalt();
  },
  ({resolved, rejected} = {})=> {
    return {
      resolved,
      rejected
    }
  }
);

// 用户注册
export const guysRegist = createAction(
  types.SPX_GUYS_REGIST,
  async({userInfo})=> {
    return await guysService.guysRegist(userInfo);
  },
  ({resolved, rejected})=> {
    return {
      resolved,
      rejected
    }
  }
);
