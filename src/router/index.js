import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageView from '../views/HomePageView.vue'

import userRouter from './modules/user.js'   // 用户模块的路由表
import amend from './modules/amend.js'   // 修改个人信息模块
import search from './modules/search.js'   // 修改个人信息模块
import MyPublish from './modules/myUtils.js'   // 我的发布之类的小工具
import article from './modules/article.js'   // 详情页
// import SetUpThe from '../../../headline2/src/router/modules/SetUpThe.js/index.js'

// 引入vuex
import store from '@/store'

import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
  // 主页
  {
    path: '/',
    name: 'home',
    component: HomePageView,
    meta: { root: true, cache: true }
  },
  // 发布
  {
    path: '/issue',
    name: 'issue',
    component: () => import('../views/Issue.vue'),
    meta: { root: true, auth: true }
  },
  // 我的
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My.vue'),
    meta: { root: true }
  },
  ...userRouter,

  ...amend,

  ...search,

  ...MyPublish,

  ...article

]


const router = new VueRouter({
  routes
})


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // next()

  if (to.meta.auth) {
    if (store.state.userModules.showLogin) {
      next()
    } else {
      Toast('您未登录，请先登录')
      setTimeout(() => {
        next('/register')
      }, 800);
    }
  } else {
    next()
  }
})




export default router
