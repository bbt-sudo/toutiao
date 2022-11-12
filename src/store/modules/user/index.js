
import { Toast } from 'vant'

import { userGetUserInfoAPI } from '@/api/login'

import store from '@/store'



export default {
    namespaced: true,  // 命名空间
    state: {
        showLogin: false,
        userInfo: {},
        uid: '',
        token: null
    },
    getters: {
    },
    mutations: {
        CHANGE_SHOW_LOGIN(store, val) {
            store.showLogin = val
        },
        SET_USER_INFO(store, val) {
            store.userInfo = val
        },

        SET_TOKEN(store, val) {
            store.token = val
        },
        SET_UID(store, val) {
            store.uid = val
        },

        // 退出登录
        LOGOUT(store) {
            store.showLogin = false,
                store.userInfo = {},
                store.uid = '',
                store.token = null
        }

    },
    actions: {
        userGetUserInfo({ state, commit }, token) {

            return userGetUserInfoAPI({ token }).then(res => {
                console.log(res);

                // Toast(res.message)

                let t1 = Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                });

                // Toast(res.message)

                let { uid, userInfo } = res

                // 所有的 更改state 都需要commit来触发 去触发mutation里的方法
                commit('CHANGE_SHOW_LOGIN', true)
                commit('SET_USER_INFO', userInfo)
                commit('SET_TOKEN', token)
                commit('SET_UID', uid)

                setTimeout(() => {
                    t1.clear()
                }, 500);
            })
        }
    },
}