<template>
  <div class="home">
    <!-- <h1>主页</h1> -->
    <div class="topHeight">
      <div class="topFixed">
        <div class="search" @click="$router.push('/search')">
          <div>
            <van-icon name="search" />
            <p>{{ title }}</p>
          </div>
        </div>
        <div>
          <van-tabs v-model="active">
            <van-tab
              v-for="item in homeArr"
              :key="item._id"
              :title="item.name"
            ></van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <!-- 分类导航栏 -->
    <div class="content">
      <ul class="content">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getArticleList"
          :immediate-check="false"
        >
          <template #loading>
            <div>
              <LoadingSvg />
            </div>
          </template>

          <!-- 引入组件   公共组件 articlelist -->

          <article-list :list="articleData"></article-list>
          <!-- <ArticleList :articleData="articleData"></ArticleList> -->
        </van-list>
      </ul>
    </div>
  </div>
</template>

<script>
// 首页
// @ is an alias to /src
import { Tab, Tabs, List } from "vant";

// 引入axios 的
import { getCateList, getArticleList } from "@/api/home.js";

import LoadingSvg from "@/components/LoadingSvg.vue";

// import config from "@/config";

import { QNImgFilter } from "@/utils";

// 引入公共组件
import ArticleList from "../components/ArticleList/index.vue";

export default {
  name: "HomePageView",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [LoadingSvg.name]: LoadingSvg,
    ArticleList,
  },
  data() {
    return {
      // tabs 组件的索引
      active: 0,
      // 开发依赖
      title: process.env.VUE_APP_TITLE,

      // get请求的数据
      // homeArr: [], // 分类id

      articleData: [], //文章数据

      // ----------------------------------------下拉加载的数据---------------------------------------
      loading: false, //下拉加载的组件  加载中的状态
      // 如果loading为true  等于上一次的请求没有成功  10-20
      // 不会给下一次的数据  20-30
      finished: false, // 所有数据是否加载完毕

      limit: 10, // 一次加载多少条

      skip: 0, // 页码  渲染多少条  页面显示多少条
    };
  },
  // -------------------------------
  computed: {
    homeArr() {
      return this.$store.state.cateModules.cateListDate;
    },
    // 获取到点击那个导航栏的id
    cate_id() {
      return this.homeArr[this.active]?._id;
    },
  },

  mounted() {
    console.log(this.articleData);
    // if (this.articleData.length === 0) {
    //   this.getArticleList();
    // }

    // console.log();
    // 调用 getCateList   get 获取的数据

    console.log(this.homeArr);

    // console.log(config.baseImgUrl);
  },

  watch: {
    // 监视哪个数据有变化   可以使用立即执行解决bug
    cate_id: {
      // immediate: true,
      immediate: true,

      handler(n) {
        // console.log(n);
        if (!n) {
          return;
        }

        this.articleData = []; //分类id变化
        this.finished = false; // 重置操作
        this.getArticleList();
      },
    },
  },

  methods: {
    // get请求的数据  获取分类

    // --------------------------------------------------------------------------

    // post请求的数据
    getArticleList() {
      // console.log(this.cate_id);
      // let { cate_id } = this;
      getArticleList({
        cate_id: this.cate_id,
        skip: this.articleData.length, //页码
        limit: this.limit, //请求多少条数据
      }).then(({ data, code, count }) => {
        // 将数据传给分类id
        if (code === 0) {
          // this.articleData = data;
          console.log(data);

          // 调整图片大小 --------------------------

          let newData = data.map((item) => {
            // item.img.
            item.imageSrc = item.imageSrc.map((img) => {
              return QNImgFilter(img);
            });

            return item;
          });

          console.log(newData);

          this.articleData.push(...newData);

          // this.skip = this.articleData.length;

          // 判断一下 数据加载完毕 如果加载完毕 把finished设为true
          // 否则把loading设为fasle
          if (this.articleData.length >= count) {
            this.finished = true;
          } else {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.search {
  height: 60px;
  background: chocolate;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    width: 80%;
    height: 38px;
    border-radius: 30px;
    p {
      color: #666;
    }
  }
}

.content {
  width: 100%;
  margin-bottom: 50px;
  li {
    width: 100%;
    // height: 115px;
    // padding: 5px 5px 0 5px;
  }
}

.topHeight {
  height: 105px;
}

.topFixed {
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>
