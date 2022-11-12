import request from './request.js'


// 获取文章详情
export const getArticleDetail = (p) => request.post('/api/get_article_detail', p)


// 获取评论列表
export const commentList = (p) => request.post('/api/get_comment_list', p)

// 引入点赞和取消点赞
export const apiLike = (p) => request.post('/api/like', p)
export const unApiLike = (p) => request.post('/api/unlike', p)



// 引入收藏和取消收藏
export const apiAddFav = (p) => request.post('/api/add_fav', p)
export const apiRemoveFav = (p) => request.post('/api/remove_fav', p)


// 评论和回复评论   
export const addComment = (p) => request.post('/api/add_comment', p)
export const getReplyList = (p) => request.post('/api/get_reply_list', p)




// 评论的点赞和取消点赞
export const commentLike = (p) => request.post('/api/comment_like', p)
export const commentUnlike = (p) => request.post('/api/comment_unlike', p)