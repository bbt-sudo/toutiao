
import { Toast } from 'vant'

import { getCateList } from '@/api/home'

import store from '@/store'



export default {
    namespaced: true,  // 命名空间
    state: {
        cateListDate: []
    },
    getters: {
    },
    mutations: {
        GET_CATE_LIST(state, val) {
            state.cateListDate = val
        }
    },
    actions: {

        getCateList({ commit }) {
            getCateList().then((res) => {
                // 将请求的内容赋值给homeArr
                // this.homeArr = res.data;
                // console.log(this.homeArr);
                commit('GET_CATE_LIST', res.data)
            });
        },

    },
}