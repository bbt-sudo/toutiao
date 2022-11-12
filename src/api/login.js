import request from './request'


//注册
export const userSendSms = (p) => request.post('/user/sendSms', p)

export const userReg = (p) => request.post('/user/reg', p)

// 登录
export const userLogin = (p) => request.post('/user/login', p)

// 用户信息
export const userGetUserInfoAPI = (params) => request.get('user/getuserInfo', {
    params
})