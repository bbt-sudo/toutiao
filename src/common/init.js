import { Toast } from 'vant'


import store from '@/store'

export default function () {
    return new Promise(function (resolve, reject) {

        let { token, tokenExpired } = localStorage

        if (token) {
            let time = +new Date()
            if (time >= tokenExpired) {
                localStorage.clear()
                resolve()
                Toast('您的账号长时间未登录，请重新登录')
            } else {
                store.dispatch('userModules/userGetUserInfo', token).then(res => {
                    resolve()
                })
            }
        } else {
            resolve()
        }

    })
}