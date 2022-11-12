<template>
  <div>
    <div class="head">
      <van-nav-bar
        title="收藏"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <global-list :API="API" :user_id="user_id">
      <template v-slot="{ list }">
        <article-list :list="list"></article-list>
      </template>
    </global-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

import GlobalList from "../../components/GlobalList/index.vue";

import ArticleList from "../../components/ArticleList/index.vue";

import { get_fav_list as API } from "@/api/publish.js";
export default {
  name: "MyCollect",
  components: {
    [GlobalList.name]: GlobalList,
    [ArticleList.name]: ArticleList,
  },
  computed: {
    ...mapState("userModules", ["userInfo"]),
    // uid() {
    //   return this.$store.state.userModules.uid;
    // },

    user_id() {
      return this.$store.state.userModules.userInfo._id;
    },
  },
  data() {
    return {
      API,
      //   user_id: this.userInfo._id,
    };
  },
  mounted() {
    console.log(this.userInfo);
    // console.log(this.API());
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
</style>