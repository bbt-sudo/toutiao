import request from './request'

export const userEditUserInfo = (p) => request.post('/user/editUserInfo', p)
export const userUpdatePwd = (p) => request.post('/user/updatePwd', p)


export const userForget = (p) => request.post('/user/forget', p)