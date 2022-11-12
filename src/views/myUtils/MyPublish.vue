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
    <!-- <h1 :class="$style.red">1111111111111</h1> -->
    <!-- <h1 class="red">1111111111111</h1> -->
    <!-- <button @click="a++">加+++++</button> -->
    <global-list :API="API" :uid="uid" :limit="30">
      <template v-slot="{ list }">
        <!-- {{ list }} -->
        <article-list :list="list"></article-list>
      </template>
    </global-list>
  </div>
</template>

<script>
// import { apiSearch as API } from "@/api/search.js";

import { get_user_article_list as API } from "@/api/publish.js";

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
      a: 100,
    };
  },

  computed: {
    uid() {
      return this.$store.state.userModules.uid;
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

<style>
/* .red {
  color: red;
  font-size: v-bind(a + "px");
} */
/* 
:root {
  --h: 100px;
}
.red {
  height: var(--h);
} */
.van-nav-bar__content {
  height: 60px;
  /* font-size: 20px; */
}
.van-nav-bar__title {
  font-size: 20px;
}
</style>