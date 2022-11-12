<template>
  <div class="comment">
    <div class="top">
      <h4>精彩评论</h4>
      <div>
        <span class="commentspan1">{{ article.like }}赞</span>
        <span>|</span>
        <span class="commentspan2">{{ article.fav }}收藏</span>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <van-skeleton title avatar :row="3" :loading="loading">
          <div>
            <li
              v-for="(item, index) in list"
              :key="item._id"
              :class="{ act: item.is_create && index === 0 }"
            >
              <div class="ping">
                <div class="pingZuo">
                  <img :src="item.info?.avatar" alt="" />
                </div>
                <div class="pingYou">
                  <div class="shang">
                    <div>
                      <span>{{ item.info.nickname }}</span>
                      <p>{{ item.create_time | timer }}</p>
                    </div>
                    <p
                      @click="
                        isLikeToggleArticle(item._id, item.is_like, index)
                      "
                    >
                      <van-icon
                        :color="item.is_like ? 'red' : 'gray'"
                        name="good-job"
                      />
                      <span>{{
                        item.like_count > 0 ? item.like_count : ""
                      }}</span>
                    </p>
                  </div>
                  <p class="pp">{{ item.content }}</p>
                  <div class="xia">
                    <div>
                      <a
                        @click="$emit('replymsg', { item: { index, ...item } })"
                        >回复{{ item.reply_num > 0 ? item.reply_num : ""
                        }}<van-icon name="arrow"
                      /></a>
                      <!-- <p>发布</p> -->
                    </div>
                    <span>...</span>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </van-skeleton>
      </ul>

      <!-- <span class="spa">已经到底部了</span> -->
    </div>
  </div>
</template>

<script>
// 引入vant
import { Skeleton } from "vant";

import { timeForm } from "../../utils/timeform";
export default {
  name: "CommentList",
  components: {
    // 骨架屏
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      loading: true,
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    article: {
      type: Object,
    },
  },

  filters: {
    timer(val) {
      return timeForm(val);
    },
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 200);

    // console.log(this.listss);
  },

  computed: {
    listss() {
      return this.list.map((item, index) => {
        console.log(item);
      });
    },
  },

  methods: {
    isLikeToggleArticle(comment_id, isLike, index) {
      this.$emit("isLikeToggleBian", { comment_id, isLike, index });
      console.log(comment_id, isLike, index);
    },

    // replymsg(item) {
    //   // console.log(item);
    //   this.$emit("replymsg", item);
    // },
  },
};
</script>


<style lang="less" scoped>
.comment {
  // min-height: 430px;
  margin-top: 30px;
  padding: 0 20px;
  border-top: 1px solid #ccc;
  //   margin-bottom: 64px;
  .top {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    h4 {
      font-size: 18px;
    }
    div {
      color: #bbb;
      span {
        margin-left: 5px;
      }
    }
  }
  .bottom {
    span {
      color: #bbb;
      display: block;
      text-align: center;
    }
  }
}

.bottom {
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
.bottom ul li .ping {
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

.bottom ul li .ping .pingYou {
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

.shang {
  div {
    display: flex;
    p {
      margin-left: 10px;
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.act {
  transition: all 0 0.3s;
  animation: fade 0.5s;
}
</style>