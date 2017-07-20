//post
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID';
export const FETCH_POSTS_BY_CATEGORY = 'FETCH_POSTS_BY_CATEGORY';
export const FETCH_POSTS_BY_CATEGORY_WITHPAGE = 'FETCH_POSTS_BY_CATEGORY_WITHPAGE';

//comment
export const ADD_COMMENT = 'ADD_COMMENT';
export const FETCH_COMMENTS_BY_POST = 'FETCH_COMMENTS_BY_POST';
export const FETCH_COMMENTS_BY_POST_WITHPAGE = 'FETCH_COMMENTS_BY_POST_WITHPAGE';

//author
export const FETCH_AUTHORS_BY_RANK = 'FETCH_AUTHORS_BY_RANK';
export const FETCH_AUTHORS_BY_KEY = 'FETCH_AUTHORS_BY_KEY';
export const FETCH_AUTHOR_DETAIL = 'FETCH_AUTHOR_DETAIL';
export const FETCH_AUTHOR_POSTS_WITHPAGE = 'FETCH_AUTHOR_POSTS_WITHPAGE';
export const FETCH_AUTHOR_POSTS = 'FETCH_AUTHOR_POSTS';

//user
export const LOGIN = 'LOGIN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const FETCH_USER_ASSET = 'FETCH_USER_ASSET';
export const FETCH_USER_ASSET_WITHPAGE = 'FETCH_USER_ASSET_WITHPAGE';

//config
export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const GET_CONFIG = 'GET_CONFIG';
export const REMOVE_CONFIG = 'REMOVE_CONFIG';

//offline
export const OFFLINE_POST_TO_STORAGE = 'OFFLINE_POST_TO_STORAGE';
export const GET_POSTS_FROM_STORAGE = 'GET_POSTS_FROM_STORAGE';
export const REMOVE_POSTS_IN_STORAGE = 'REMOVE_POSTS_IN_STORAGE';
export const REMOVE_POST_IN_STORAGE = 'REMOVE_POST_IN_STORAGE';
export const GET_POST_FROM_STORAGE = 'GET_POST_FROM_STORAGE';

//search
export const SEARCH_BY_KEY = 'SEARCH_BY_KEY';
export const SEARCH_BY_KEY_WITHPAGE = 'SEARCH_BY_KEY_WITHPAGE';
export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT';

//common
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const FETCH_UPDATE_INFO = 'FETCH_UPDATE_INFO';

export const CLEAR_AUTHOR_SEARCH_RESULT = "CLEAR_AUTHOR_SEARCH_RESULT";

// guys
export const SPX_GET_USER_SALT = "SPX_GET_USER_SALT";
export const SPX_GET_USER_NO_SALT = "SPX_GET_USER_NO_SALT";
export const SPX_GET_GUYS_REG_SMS_CAPTCHA = "SPX_GET_GUYS_REG_SMS_CAPTCHA";// 获取用户注册短信验证码
export const SPX_VALID_GUYS_REG_SMS_CAPTCHA = "SPX_VALID_GUYS_REG_SMS_CAPTCHA";// 校验短信验证码
export const SPX_SIGNUP_ACC_VALID = "SPX_SIGNUP_ACC_VALID";// 注册时，用户账号校验
export const SPX_GUYS_REGIST = "SPX_GUYS_REGIST";

// spx common
export const SPX_GET_PIC_CAPTCHA = "SPX_GET_PIC_CAPTCHA";// 获取图形验证码
export const SPX_GET_SMS_CAPTCHA = "SPX_GET_SMS_CAPTCHA";// 获取短信验证码
