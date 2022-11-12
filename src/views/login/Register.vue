<template>
  <div class="register">
    <!-- <h1>登录</h1> -->
    <!-- 头部 -->
    <div class="top">
      <span>
        <van-icon name="arrow-left" color="#ffffff" @click="back" />
      </span>
      <div>
        <router-link to="/register">登录</router-link>
        <a>/</a>
        <router-link to="/login">注册</router-link>
      </div>
    </div>

    <!-- 登录区 -->
    <div class="registerForm">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="手机号"
          placeholder="手机号"
          :rules="[
            { required: true, message: '请填写用户名' },
            { pattern: regUsername, message: '请输入正确的手机号' },
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[
            { required: true, message: '请填写密码' },
            { pattern: regPassword, message: '请输入6-12位的密码' },
          ]"
        />
        <div class="forget">
          <router-link to="/forget">忘记密码</router-link>
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { NavBar, Form, Field } from "vant";

import { userLogin } from "@/api/login";

// 引用vuex的方法
import { mapMutations } from "vuex";
export default {
  name: "Register",
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
  },
  data() {
    return {
      username: "", //手机号
      password: "", // 密码

      regUsername: /^.*([1][3,4,5,7,8,9][0-9]{9}).*/, // 正则验证手机号
      regPassword: /^.*([0-9]{6,12}).*/, // 正则验证密码
    };
  },
  methods: {
    // 退后一步
    back() {
      this.$router.push({
        path: "/my",
      });
    },

    ...mapMutations("userModules", [
      "CHANGE_SHOW_LOGIN",
      "SET_USER_INFO",
      "SET_TOKEN",
      "SET_UID",
    ]),

    // 提交的时候获取账号和密码  登录
    onSubmit(values) {
      // console.log("submit", values);

      userLogin(values).then((res) => {
        if (res.code === 0) {
          this.$toast(res.message);
          let { token, tokenExpired, uid, userInfo } = res;
          this.$router.push({
            path: "/my",
          });
          localStorage.setItem("tokenExpired", tokenExpired);
          localStorage.setItem("token", token);

          this.CHANGE_SHOW_LOGIN(true);
          this.SET_USER_INFO(userInfo);
          this.SET_TOKEN(token);
          this.SET_UID(uid);
        } else {
          // console.log(res);
          this.$toast(res.message);
        }
      });
    },
  },

  mounted() {
    console.log(111);
  },
};
</script>

<style lang="less" scoped>
// 跳转区
.top {
  display: flex;
  height: 50px;
  background: #019bfa;
  align-items: center;
  padding: 0 10px;
  span {
    display: block;
    width: 20px;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #fff;
      margin: 0 3px;
    }
  }
}

.forget {
  margin-left: 20px;
}
</style>