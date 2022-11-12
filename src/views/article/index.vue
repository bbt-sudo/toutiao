<template>
  <div>
    <!-- 文章详情 -->
    <!-- {{ article }} -->
    <div class="head">
      <!-- 将articleMixin中的article 传给子组件 -->
      <article-content id="content" :article="article"></article-content>
    </div>
    <!-- 文章评论 -->
    <div class="comments">
      <global-list
        :API="API"
        :article_id="article_id"
        :user_id="user_id"
        ref="commentsList"
      >
        <!-- <template v-slot="{list}"> -->
        <template v-slot="{ list }">
          <comment-list
            @replymsg="replymsg"
            :list="list"
            :article="article"
            @isLikeToggleBian="isLikeToggleBian"
          ></comment-list>
        </template>

        <template #finished="{ len }">
          <div>
            <div v-if="len === 0">
              <van-empty
                class="custom-image"
                image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无评论，大家快来请沙发"
              />
              <!-- <p>快来抢沙发</p> -->
            </div>
            <div v-else>
              <p>没有更多数据了</p>
            </div>
          </div>
        </template>
      </global-list>
    </div>

    <!-- 底部栏 -->
    <footer>
      <article-footer
        ref="footer"
        @render="render"
        :preSendIndex="preSendIndex"
        :reply_comment_id="reply_comment_id"
        :placeholder="placeholder"
        :comment_type="comment_type"
        :article="article"
        :article_id="article_id"
        :user_id="user_id"
      ></article-footer>
    </footer>

    <!-- 回复的弹出层 -->
    <van-popup
      v-model="replyShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 头部 -->
      <div class="replyPopupTop">1条评论</div>
      <!-- 评论区 -->
      <div class="replyPopupPing">
        <ul>
          <li>
            <div class="ping">
              <div class="pingZuo">
                <img :src="replyInfoBus.info?.avatar" alt="" />
              </div>
              <div class="pingYou">
                <div class="shang">
                  <div>
                    <span>{{ replyInfoBus.info?.nickname }}</span>
                    <!-- <p>{{ replyInfoBus.create_time | timer }}</p> -->
                  </div>
                  <p>
                    <van-icon
                      @click="
                        isLikeToggleBian({
                          comment_id: replyInfoBus._id,
                          isLike: replyInfoBus.is_like,
                          index: replyInfoBus?.index,
                        })
                      "
                      :color="replyInfoBus.is_like ? 'red' : 'gray'"
                      name="good-job"
                    />
                    <span>{{
                      replyInfoBus.like_count > 0 ? replyInfoBus.like_count : ""
                    }}</span>
                  </p>
                </div>
                <p class="pp">{{ replyInfoBus.content }}</p>
                <div class="xia">
                  <div>
                    <a
                      @click="
                        $emit('replymsg', {
                          replyInfoBus: { index, ...replyInfoBus },
                        })
                      "
                      >回复{{
                        replyInfoBus.reply_num > 0
                          ? replyInfoBus.reply_num
                          : ""
                      }}<van-icon name="arrow"
                    /></a>
                    <!-- <p>发布</p> -->
                  </div>
                  <span>...</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 评论列表 -->
        <div class="comments">
          <global-list
            :API="REPLY_API"
            :article_id="article_id"
            :user_id="user_id"
            :reply_comment_id="reply_comment_id"
            :key="commenListKey"
          >
            <!-- <template v-slot="{list}"> -->
            <template v-slot="{ list }">
              <comment-list
                @replymsg="replymsg"
                :list="list"
                :article="article"
                @isLikeToggleBian="isLikeToggleBian"
              ></comment-list>
            </template>

            <template #finished="{ len }">
              <div>
                <div v-if="len === 0">
                  <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="暂无评论，大家快来请沙发"
                  />
                  <!-- <p>快来抢沙发</p> -->
                </div>
                <div v-else>
                  <p>没有更多数据了</p>
                </div>
              </div>
            </template>
          </global-list>
        </div>

        <footer>
          <article-footer
            ref="footer"
            @render="render"
            :preSendIndex="preSendIndex"
            :reply_comment_id="reply_comment_id"
            :placeholder="placeholder"
            :comment_type="comment_type"
            :article="article"
            :article_id="article_id"
            :user_id="user_id"
            :is_relay="true"
          ></article-footer>
        </footer>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 引入评论列表的数据
import {
  commentList as API,
  getReplyList as REPLY_API,
} from "@/api/article.js";
// 引入文章的混入
import articleMixin from "./articleMixin.js";
// 引入文章内容的组件
import ArticleContent from "./ArticleContent";
// 引入评论列表
import CommentList from "../../components/CommentList/index.vue";

// 引入文章列表
import GlobalList from "../../components/GlobalList/index.vue";

// 引入底部栏组件
import ArticleFooter from "./ArticleFooter.vue";

import { Empty } from "vant";

import { commentLike, commentUnlike } from "@/api/article";

import { Popup } from "vant";

// 引入绘画组件

import html2canvas from "html2canvas";

export default {
  name: "ArticleView",
  mixins: [articleMixin],
  components: {
    // 注册文章内容的组件
    [ArticleContent.name]: ArticleContent,
    // 注册文章列表 的加载
    [GlobalList.name]: GlobalList,

    // 注册评论列表
    [CommentList.name]: CommentList,

    // 注册底部栏组件
    [ArticleFooter.name]: ArticleFooter,

    [Empty.name]: Empty,

    [Popup.name]: Popup,
  },

  data() {
    return {
      API,

      REPLY_API,

      placeholder: undefined, //输入框的提示

      reply_comment_id: "", // 回复的id

      comment_type: 0, // 回复是的类型

      preSendIndex: 0, // 点击哪一项的索引

      replyShow: false, ///回复的弹出层

      replyInfoBus: {},

      // 创建key值   vue检测到key值改变会强制刷新
      commenListKey: 0,
    };
  },

  mounted() {
    // console.log(this.article_id);
    // console.log(this.$refs.commentsList.list);
  },

  methods: {
    // 绘画海报
    render() {
      // console.log(111);
      let el = document.querySelector("#content");
      html2canvas(el, {
        // 允许污染画布？
        allowTaint: true,
        // 允许跨域？
        useCORS: true,
      }).then(function (canvas) {
        // document.body.appendChild(canvas);
        // console.log(canvas);

        // 向图片上绘画内容

        let ctx = canvas.getContext("2d");
        let img = new Image();

        img.src = require("@/assets/1.png");

        img.onload = function (params) {
          ctx.drawImage(img, 0, 0, 640, 405, 300, 300, 64, 48);
          let url = canvas.toDataURL("image/png");
          console.log(url);
        };

        // let url = canvas.toDataURL("image/png");
        // console.log(url);
      });
    },

    // 点赞  /  取消点赞
    isLikeToggleBian({ comment_id, isLike, index }) {
      console.log(comment_id, isLike, index);
      let api = isLike ? commentUnlike : commentLike;
      let { user_id } = this;
      api({
        comment_id,
        user_id,
      }).then((res) => {
        console.log(res);
        console.log(11111111111111);
        if (res.code === 0) {
          let list = this.$refs.commentsList.list;
          list[index].is_like = !isLike;
          console.log(list[index]);
          list[index].like_count = res.count;
          // 让回复评论的赞变成响应式
          this.replyInfoBus.is_like = !isLike;
          this.replyInfoBus.like_count = res.count;
        }
        this.$toast(res.msg);
      });
    },

    //  回复评论

    replymsg({ item }) {
      console.log(item);

      console.log(this.replyInfoBus);

      let {
        reply_num,
        info: { nickname },
        _id: reply_comment_id,
        index,
      } = item;
      // console.log(index);

      let list = this.$refs.commentsList.list;

      // 让key++可以做到刷新
      this.commenListKey++;

      // console.log(list[index]);

      if (reply_num === 0) {
        this.$refs.footer.show = true;
      } else {
        this.replyShow = true;
      }
      this.placeholder = "@回复:" + nickname;
      this.comment_type = 1;
      this.reply_comment_id = reply_comment_id;
      this.preSendIndex = index;
      this.replyInfoBus = {
        index,
        ...list[index],
      };
      console.log(index);
    },
  },
};
</script>

<style lang="less" scoped>
footer {
  height: 64px;
}

.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}

.replyPopupTop {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
}

.replyPopupPing {
  ul {
    display: flex;
    flex-direction: column;
    li {
      margin-top: 20px;
      border-bottom: 1px solid #efefef;
    }
  }
  .spa {
    margin-top: 30px;
  }
}
.replyPopupPing ul li .ping {
  // height: 90px;
  width: 100%;
  display: flex;
  .pingZuo {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 100px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.pp {
  // width: 90vw;
  // width: 70vm;
  word-wrap: break-word;
}

.replyPopupPing ul li .ping .pingYou {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .shang {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    p {
      display: flex;
      height: 35px;
      .active {
        color: red;
      }
    }
  }

  .xia {
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    div {
      display: flex;
      a {
        display: block;
        width: 60px;
        height: 24px;
        background: #d5cbc6;
        border-radius: 25px;
        text-align: center;
        line-height: 24px;
        margin-right: 30px;
      }
    }
  }
}
</style>
