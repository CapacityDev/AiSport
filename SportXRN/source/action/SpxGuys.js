import {
  createAction
} from 'redux-actions';
import * as types from '../constant/actiontype';
import * as guysService from '../service/SpxGuysService';

// 获取用户密码加密hash盐
export const getUserPwdSalt = createAction(
  types.SPX_GET_USER_SALT,
  async() => {
    return await guysService.getUserPwdSalt();
  },
  ({
    resolved,
    rejected
  } = {}) => {
    return {
      resolved,
      rejected
    }
  }
);

// 获取用户名加密hash盐
export const getUserNoSalt = createAction(
  types.SPX_GET_USER_NO_SALT,
  async() => {
    return await guysService.getUserNoSalt();
  },
  ({
    resolved,
    rejected
  } = {}) => {
    return {
      resolved,
      rejected
    }
  }
);

// 获取用户注册短信验证码
export const getGuysRegSmsCaptcha = createAction(
  types.SPX_GET_GUYS_REG_SMS_CAPTCHA,
  async({
    reqInfo
  }) => {
    return await guysService.getGuysRegSmsCaptcha(reqInfo);
  },
  ({
    resolved,
    rejected
  }) => {
    return {
      resolved,
      rejected
    }
  }
);

// 获取用户注册邮件验证码
export const getGuysRegEmlCaptcha = createAction(
  types.SPX_GET_GUYS_REG_EML_CAPTCHA,
  async({
    reqInfo
  }) => {
    return await guysService.getGuysRegEmlCaptcha(reqInfo);
  },
  ({
    resolved,
    rejected
  }) => {
    return {
      resolved,
      rejected
    }
  }
);

// 校验用户注册短信验证码
export const validGuysRegSmsCaptcha = createAction(
  types.SPX_VALID_GUYS_REG_EML_CAPTCHA,
  async({
    reqInfo
  }) => {
    return await guysService.validGuysRegSmsCaptcha(reqInfo);
  },
  ({
    resolved,
    rejected
  }) => {
    return {
      resolved,
      rejected
    }
  }
);

// 校验用户注册邮箱验证码
export const validGuysRegEmlCaptcha = createAction(
  types.SPX_VALID_GUYS_REG_SMS_CAPTCHA,
  async({
    reqInfo
  }) => {
    return await guysService.validGuysRegEmlCaptcha(reqInfo);
  },
  ({
    resolved,
    rejected
  }) => {
    return {
      resolved,
      rejected
    }
  }
);

// 注册时，登录账号校验
export const signupAccValid = createAction(
  types.SPX_SIGNUP_ACC_VALID,
  async({
    reqInfo
  }) => {
    return await guysService.signupAccValid(reqInfo);
  },
  ({
    resolved,
    rejected
  }) => {
    return {
      resolved,
      rejected
    }
  }
);

// 用户注册
export const guysRegist = createAction(
  types.SPX_GUYS_REGIST,
  async({
    userInfo
  }) => {
    return await guysService.guysRegist(userInfo);
  },
  ({
    resolved,
    rejected
  }) => {
    return {
      resolved,
      rejected
    }
  }
);
