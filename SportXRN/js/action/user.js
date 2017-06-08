import { createAction } from 'redux-actions';
import * as types from '../constant/ActionType';
import * as userService from '../service/UserService';

export const login = createAction(
  types.LOGIN,
  async({username, password})=> {
    return await userService.login(username, password);
  },
  ({username, resolved, rejected})=> {
    return {
      username,
      resolved,
      rejected
    }
  }
);

export const refreshToken = createAction(
  types.REFRESH_TOKEN,
  async({token})=> {
    return await userService.refreshToken(token);
  },
  ({token, resolved, rejected})=> {
    return {
      token,
      resolved,
      rejected
    }
  }
);

export const getUserInfo = createAction(
  types.FETCH_USER_INFO,
  async()=> {
    return await userService.getUserInfo();
  },
  ({resolved, rejected} = {})=> {
    return {
      resolved,
      rejected
    }
  }
)

export const getUserAssetByCategory = createAction(
  types.FETCH_USER_ASSET,
  async(category, params = {})=> {
    params.pageIndex = 1;
    return await userService.getUserAsset(category, params);
  },
  (category)=> {
    return {
      pending: true,
      category
    }
  }
)

export const getUserAssetByCategoryWithPage = createAction(
  types.FETCH_USER_ASSET_WITHPAGE,
  async(category, params)=> {
    return await userService.getUserAsset(category, params);
  },
  (category)=> {
    return {
      pending: true,
      category
    }
  }
);

/************************************new************************************/
// 获取用户密码加密hash盐
export const getUserPwdSalt = createAction(
  types.GET_USER_SALT,
  async()=> {
    return await userService.getUserPwdSalt();
  },
  ({resolved, rejected})=> {
    return {
      resolved,
      rejected
    }
  }
);
