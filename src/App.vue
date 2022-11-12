<template>
  <div id="app">
    <!-- 底部栏 -->
    <div class="APPbottom">
      <div class="bottomApp">
        <van-tabbar
          route
          v-model="active"
          :active-color="gColor"
          v-show="bottomShow"
        >
          <van-tabbar-item name="home" to="/" icon="home-o"
            >首页</van-tabbar-item
          >
          <van-tabbar-item name="search" to="/issue" icon="search"
            >发布</van-tabbar-item
          >
          <van-tabbar-item name="friends" to="/my" icon="friends-o"
            >我的</van-tabbar-item
          >
        </van-tabbar>
      </div>
    </div>

    <keep-alive>
      <router-view v-if="$route.meta.cache" />
    </keep-alive>
    <router-view v-if="!$route.meta.cache" />
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "App",

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  created() {
    this.$store.dispatch("cateModules/getCateList");
  },
  computed: {
    // 底部的显示与隐藏
    bottomShow() {
      return this.$route.meta.root;
    },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less">
@import url("https://at.alicdn.com/t/c/font_3713076_avhyooo96t7.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>
