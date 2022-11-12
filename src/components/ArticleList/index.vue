<template>
  <ul>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- <p>刷新次数: {{ count }}</p> -->

      <li v-for="(item, index) in list" @click="chuanID(item._id)" :key="index">
        <!-- {{ item._id }} -->
        <div class="ulList">
          <div class="top" v-if="item.imageSrc.length === 1">
            <p>{{ item.title }}</p>
            <img
              v-for="(img, index) in item.imageSrc"
              :key="index"
              :src="img"
              v-lazy="img"
              alt=""
              @error="imgError"
            />
          </div>
          <div class="top2" v-else>
            <p>{{ item.title }}</p>
            <div>
              <!-- 过滤器 -->
              <img
                @error="imgError"
                :src="itemImg"
                v-lazy="itemImg"
                v-for="(itemImg, index) in item.imageSrc"
                :key="index"
              />
            </div>
          </div>
          <div class="bottom">
            <span>作者:{{ item.author }}</span>
            <span>评论{{ item.comment }}</span>
            <span>发布日期{{ new Date(item.time).toLocaleDateString() }}</span>
            <span>×</span>
          </div>
        </div>
      </li>

      <template #loading>
        <div>
          <LoadingSvg />
        </div>
      </template>
    </van-pull-refresh>
  </ul>
</template>

<script>
import globalMimax from "../../common/global-mimax.js";

import { PullRefresh } from "vant";

import LoadingSvg from "@/components/LoadingSvg.vue";
export default {
  name: "ArticleList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },
  components: {
    [PullRefresh.name]: PullRefresh,
    [LoadingSvg.name]: LoadingSvg,
  },

  methods: {
    chuanID(_id) {
      this.$router.push({
        path: "/article",
        query: {
          _id,
        },
      });
    },

    onRefresh() {
      setTimeout(() => {
        // Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    // imgError(e) {
    //   console.log(e);
    // },
  },

  mixins: [globalMimax],
};
</script>

<style lang="less" scoped>
li {
  width: 100%;
  // height: 115px;
  // padding: 5px 5px 0 5px;
}

.top2 {
  display: flex;
  flex-direction: column;
  p {
    height: 45px;
  }
  div {
    display: flex;
    justify-content: space-between;
    img {
      width: 30%;
      height: 71px;
      // float: left;
      object-fit: cover;
    }
  }
}
.ulList {
  // width: 100%;
  // padding: 5px 5px 0 5px;
  // padding-bottom: 10px;
  margin: 10px 10px 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  .top {
    // width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      width: 180px;
      height: 42px;
      // word-break: break-all;
      text-overflow: ellipsis;
      // display: inline-block;
      display: -webkit-box;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 2; /* 这里是超出几行省略 */
      overflow: hidden;
    }
    img {
      height: 65px;
      width: 130px;
      float: right;
      object-fit: cover;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #888;
  }
}
.bottom span:nth-child(1) {
  width: 35%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.bottom span:nth-child(2) {
  width: 15%;
  text-align: center;
}
.bottom span:nth-child(3) {
  text-align: center;
  width: 40%;
}
.bottom span:nth-child(4) {
  text-align: center;
  width: 10%;
  // float: right;
}
</style>