import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// user 用户信息
import userModules from './modules/user'
import cateModules from './modules/cate'




export default new Vuex.Store({

  modules: {
    userModules,
    cateModules
  }
})
