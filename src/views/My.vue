<template>
  <div class="my">
    <div class="top">
      <p>我的</p>
      <div>
        <span><van-icon size="20px" name="envelop-o" /></span>
        <span
          ><van-icon
            size="20px"
            name="setting-o"
            @click="$router.push('/message')"
        /></span>
      </div>
    </div>
    <!-- 登陆成功后 -->
    <div class="banner2" v-if="showLogin">
      <div class="homeTop">
        <!-- {{ homeArr }} -->
        <div class="left">
          <p>
            <img :src="userInfo.avatar" alt="" />
          </p>
          <span>{{ userInfo.nickname }}</span>
        </div>
        <div class="right">
          <span>个人主页</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="homebottom">
        <ul>
          <li>
            <span>11</span>
            <p>头条</p>
          </li>
          <li>
            <span>11</span>
            <p>获赞</p>
          </li>
          <li>
            <span>11</span>
            <p>粉丝</p>
          </li>
          <li>
            <span>11</span>
            <p>关注</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 登录成功前 -->
    <div class="banner" v-else>
      <h3>登录头条更懂你</h3>
      <h3>内容更有趣</h3>
      <button @click="register">立即登录</button>
    </div>

    <div class="nav">
      <div class="nav-one">
        <ul>
          <li>
            <!-- <van-icon size="20px" name="clock-o" /> -->
            <i class="iconfont aaa icon-xiaoxi"></i>
            <p>消息通知</p>
          </li>
          <li @click="$router.push('/collect')">
            <!-- <van-icon size="20px" name="clock-o" /> -->
            <i class="iconfont aaa icon-shoucang"></i>
            <p>收藏</p>
          </li>
          <li>
            <!-- <van-icon size="20px" name="clock-o" /> -->
            <i class="iconfont aaa icon-liulanlishi"></i>
            <p>浏览历史</p>
          </li>
          <li @click="$router.push('/MyPublish')">
            <!-- <van-icon size="20px" name="clock-o" /> -->
            <i class="iconfont aaa icon-wodefabu"></i>
            <p>我的发布</p>
          </li>
        </ul>
      </div>

      <div class="nav-two">
        <p>再小的想法，也值得被关注</p>
        <div @click="$router.push('/issue')">+发布</div>
      </div>

      <div class="nav-three">
        <div class="shang">
          <h3>更多服务</h3>
          <div>
            <p>全部</p>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="bottom">
          <ul>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-shoucang"></i>
              任务
            </li>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-vip"></i>
              vip服务
            </li>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-kefuzhongxin"></i>
              客服中心
            </li>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-anquanzhongxin"></i>
              安全中心
            </li>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-xiepinglun"></i>
              评论
            </li>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-dianzan"></i>
              点赞
            </li>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-wenti"></i>
              问题
            </li>
            <li>
              <!-- <van-icon size="20px" name="clock-o" /> -->
              <i class="iconfont icon-guanyuwomen"></i>
              关于我们
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 退出登录 -->
    <div class="btnDiv">
      <van-button
        class="btn"
        @click="quitRegister"
        type="primary"
        v-show="showLogin"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from "vant";

import { mapState } from "vuex";

export default {
  name: "My",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
  },

  computed: {
    ...mapState("userModules", ["showLogin", "userInfo"]),
  },

  methods: {
    // 未登录跳转到登录页面  axios请求
    register() {
      this.$router.push({
        path: "/register",
      });
    },

    // 判断是否登录 登陆直接显示主页 未登录显示未登陆页面

    // 退出登录
    quitRegister() {
      alert(111);
      this.$toast("退出成功");
      localStorage.clear();
      this.$store.commit("userModules/LOGOUT");
    },

    shezhi() {
      alert(111);
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 退出登录
.btn {
  width: 90%;
  border-radius: 20px;
}
.btnDiv {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

// 登录成功后
.banner2 {
  height: 190px;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  .homeTop {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      color: #666;
    }
  }
}

.homeTop .left {
  display: flex;
  align-items: center;
  p {
    width: 50px;
    height: 50px;
    border-radius: 500px;
    background: chocolate;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.homebottom {
  ul {
    display: flex;
    height: 100px;
    justify-content: space-around;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-bottom: 5px;
      }
    }
  }
}

// 登录成功前

.my {
  background: #f8f8f8;
  // height: 1500px;
  height: 100vh;
}
.top {
  padding: 0 10px;
  background: #fff;
  height: 55px;
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    span {
      margin-left: 10px;
    }
  }
}
.banner {
  height: 210px;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    width: 140px;
    height: 44px;
    background: #f04142;
    text-align: center;
    line-height: 44px;
    border-radius: 10px;
    border: 0;
    color: #fff;
  }
}
.nav {
  padding: 0 10px;
  .nav-one {
    height: 70px;
    background: #fff;
    ul {
      height: 70px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
.nav-one ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin-top: 5px;
  }
}
.nav-two {
  margin-top: 20px;
  background: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  div {
    width: 80px;
    height: 30px;
    color: #fff;
    background: #f04142;
    text-align: center;
    line-height: 30px;
    border-radius: 30px;
  }
}
.nav-three {
  display: flex;
  background: #fff;
  margin-top: 20px;
  flex-direction: column;
  .shang {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      p {
        color: #666;
      }
    }
  }
}
.bottom {
  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 60px;
      justify-content: center;
      font-size: 13px;
    }
  }
}
.iconfont {
  font-size: 18px;
  padding-bottom: 3px;
}
.aaa {
  font-size: 22px;
  padding-bottom: 0;
}
</style>