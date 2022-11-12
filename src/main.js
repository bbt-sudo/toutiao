import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局的vant
import '@/common/vant-global.js'
// 引入全局的mimax
import gMixin from '@/common/global-mimax.js'

Vue.config.productionTip = false
Vue.mixin(gMixin)

import init from '@/common/init'

init().then(res => {
  // console.log(res);
  new Vue({
    router,
    // data: {
    //   // 判断是否有哪个值
    //   showLogin,
    //   userInfo: {},
    // },
    store,
    render: h => h(App),
    mounted() {
      console.log(this);
    },


  }).$mount('#app')



})

