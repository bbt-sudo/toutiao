// 引入axios
import axios from 'axios'
// 引入config.js
import config from './config'
axios.defaults.baseURL = config.baseURL


// 请求拦截 发送给服务器前 先经过请求拦截器 请求拦截其放行 才可往下走
axios.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

// 响应拦截 服务器返回数据时 先经过响应拦截 拦截器放行 页面才拿得到数据
axios.interceptors.response.use((data) => {
    return data.data
}, (err) => {
    return Promise.reject(err)
})

export default axios