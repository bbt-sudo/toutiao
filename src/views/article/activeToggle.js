import { apiLike, unApiLike, apiAddFav, apiRemoveFav, addComment } from '@/api/article'

export default {
    // 点赞
    articleLikeToggle() {
        // console.log(111);
        // 先判断用户是否登录
        // 可以从vuex中取 但是由于多个地方要用 我们写在混入中

        console.log(this.$parent.article.is_like);


        if (!this.clickToggle()) return

        let { article: { is_like }, article_id, user_id } = this
        // console.log(is_like);
        // console.log(article_id, user_id);

        let api = is_like ? unApiLike : apiLike
        api({ article_id, user_id }).then(res => {
            this.$toast(res.msg)
            if (res.code === 0) {
                this.$parent.article.is_like = !is_like
            }
        })
        // if (!is_like) {
        //     apiLike({ article_id, user_id }).then(res => {
        //         console.log(res);
        //     })
        // } else {
        //     unApiLike({ article_id, user_id }).then(res => {
        //         console.log(res);
        //     })
        // }
    },
    // 收藏
    articleFavToggle() {

        if (!this.clickToggle()) return

        let { article: { is_fav }, article_id, user_id } = this
        // console.log(is_fav);
        // console.log(article_id, user_id);

        let api = is_fav ? apiRemoveFav : apiAddFav
        api({ article_id, user_id }).then(res => {
            console.log(res);
            this.$toast(res.msg)
            if (res.code === 0) {
                this.$parent.article.is_fav = !is_fav
            }
        })
    },
    // 显示文本域
    showPopup() {
        this.show = true;
        this.$nextTick(() => {
            this.$refs.input.focus();
        });

        let parent = this.$parent

        parent.placeholder = '留下神评再走吧'
        parent.comment_type = 0
        parent.reply_comment_id = ''
    },


    // 发布评论
    submitComment() {
        let { content, user_id, article_id, reply_comment_id, comment_type } = this
        if (content.length <= 0) {
            this.$toast('请输入文字')
            return
        }


        // ['_id', 'user_id', 'info', 'article_id', 'comment_type', 'reply_comment_id', 'reply_num', 'content', 'create_time', 'like_count', 'is_like']

        // console.log(this.$parent.article.comment);


        addComment({ content, user_id, article_id, reply_comment_id, comment_type }).then(res => {
            console.log(res);
            this.$toast(res.msg)
            if (res.code === 0) {
                this.show = false


                let articleList = this.$parent.$refs.commentsList

                // 回复文章时展示我们创建的数据   其他时候不展示
                if (comment_type === 0) {


                    // 模拟一个数据放到数组中这样就可以做到不刷新出来数据了

                    let { userInfo: { avatar, _id, nickname, username } } = this

                    let createCommentList = {
                        _id: res.data.id,
                        user_id,
                        article_id,
                        reply_comment_id,
                        comment_type,
                        reply_num: 0,
                        content,
                        create_time: +new Date(),
                        like_count: 0,
                        is_like: false,
                        info: { avatar, _id, nickname, username },
                        is_create: 1
                    }
                    // console.log(createCommentList);

                    // 每次成功时让显示的评论数加1
                    this.$parent.article.comment++
                    // 向数组中追加一条数据  不刷新页面
                    articleList.list.unshift(createCommentList)

                    // 发送成功后 清空内容
                    this.content = ''
                    // 每次点击的时候让起始条数加1
                    articleList.skip++

                    // this.$router.go(0)


                } else if (comment_type === 1) {
                    // 每次成功时让显示的评论数加1
                    this.$parent.article.comment++  // 角标++
                    let { preSendIndex } = this
                    // 对应下标的数量++
                    articleList.list[preSendIndex].reply_num++

                    this.comment = ''


                    this.$parent.replyShow = true
                }

                // endif



            }
        })

    }



}