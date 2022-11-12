import request from './request.js'


export const getCateList = () => request.get('/api/get_cate_list')


export const getArticleList = (p) => request.post('/api/get_article_list', p)