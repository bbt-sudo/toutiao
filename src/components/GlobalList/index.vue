<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="apiSearchAPI"
    >
      <!-- 将数据传给要用的组件 -->
      <slot :list="list"></slot>

      <template #finished>
        <slot name="finished" :len="list.length"></slot>
      </template>

      <template #loading>
        <div>
          <LoadingSvg />
        </div>
      </template>
    </van-list>

    <!-- {{ list }} -->
    <!-- {{ skip }} -->
  </div>
</template>

<script>
// import { apiSearch } from "@/api/search.js";

import { List } from "vant";

import LoadingSvg from "@/components/LoadingSvg.vue";

// 引入list组件

export default {
  name: "GlobalList",

  props: {
    API: {
      type: Function,
      //   defu
    },

    // 可以利用props的默认值指定条数
    limit: {
      type: Number,
      default: 8,
    },
  },
  components: {
    [List.name]: List,
    [LoadingSvg.name]: LoadingSvg,
    // ArticleList,
  },

  data() {
    return {
      skip: 0,
      // limit: 10,
      list: [], // 循环的评论内容

      loading: false,
      finished: false,
    };
  },

  computed: {
    //   key_word() {
    //     return this.$route.query.key_word;
    //   },
  },
  mounted() {
    // console.log(this.$attrs);
    // console.log(this.limit);
    // console.log(this.skip);
    // console.log(this.API);
    // $attrs  获取到父级传过来的数据但是没有用props接收的数据
  },

  methods: {
    apiSearchAPI() {
      let { skip, limit, API, $attrs } = this;
      API({ ...$attrs, skip, limit }).then((res) => {
        console.log(res);

        this.list.push(...res.data);

        let len = this.list.length;

        // console.log(this.list.length);
        this.finished = len >= res.count;

        this.loading = false;

        this.skip = len;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>