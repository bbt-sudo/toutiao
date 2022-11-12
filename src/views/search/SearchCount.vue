<template>
  <div>
    <div class="head">
      <van-nav-bar
        title="我的发布"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <global-list :API="API" :key_word="key_word">
      <template v-slot="{ list }">
        <!-- {{ list }} -->
        <article-list :list="list"></article-list>
      </template>
    </global-list>
  </div>
</template>

<script>
import { apiSearch as API } from "@/api/search.js";

import GlobalList from "../../components/GlobalList/index";

import ArticleList from "@/components/ArticleList/index.vue";
export default {
  name: "SearchCount",
  components: {
    // [ArticleList.name]: ArticleList,
    // ArticleList,
    GlobalList,
    // [GlobalList.name]: GlobalList,
    [ArticleList.name]: ArticleList,
  },
  data() {
    return {
      API,
    };
  },

  computed: {
    key_word() {
      return this.$route.query.key_word;
    },
  },

  methods: {
    onClickLeft() {
      this.$toast("返回");
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar__content {
  height: 60px;
  /* font-size: 20px; */
}
.van-nav-bar__title {
  font-size: 20px;
}
</style>