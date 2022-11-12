import { getArticleDetail } from "@/api/article.js";
export default {
    data() {
        return {
            article: {}, // 文章详情的数据
        };
    },

    computed: {
        //   文章ID
        article_id() {
            return this.$route.query._id;
        },
        // 用户ID
        user_id() {
            return this.$store.state.userModules.uid;
        },
    },

    created() {
        this.getArticleDetail();
        // console.log(this.$route.query._id);

        // console.log(timeForm(+new Date()));
    },

    methods: {
        // 文章详情的请求
        getArticleDetail() {
            let { article_id, user_id } = this;
            console.log(article_id, user_id);
            getArticleDetail({ article_id, user_id }).then((res) => {
                console.log(res);
                if (res.code === 0) {
                    this.article = res.data;



                }
            });
        },
    },
}