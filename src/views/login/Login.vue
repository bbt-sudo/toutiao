<template>
  <div class="login">
    <!-- <h1>注册</h1> -->
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

    <!-- 注册区 -->
    <div class="registerForm">
      <van-form @submit="onSubmit" ref="form">
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
        <!-- 验证码 -->
        <div class="yzm">
          <van-field
            v-model="vercode"
            name="vercode"
            center
            clearable
            :rules="[{ pattern: regSms, message: '请输入6位的验证码' }]"
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button
                @click="sendYzm"
                :loading="loading"
                size="small"
                type="primary"
                >{{ tips }}</van-button
              >
            </template>
          </van-field>
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
import { NavBar, Form, Field, Loading } from "vant";
// 引入单独的axios
import { userSendSms, userReg } from "@/api/login.js";

let times = null;
export default {
  name: "Login",
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Loading.name]: Loading,
  },
  data() {
    return {
      username: "", //手机号
      password: "", // 密码
      vercode: "", //验证码

      regUsername: /^1[345789]\d{9}$/, // 正则验证手机号
      regPassword: /^.*([0-9]{6,12}).*/, // 正则验证手机号
      regSms: /^.*([0-9]{6}).*/, // 正则验证手机号

      // 判断用户是否发送验证码
      isYzm: true,

      tips: "发送验证码",
      num: 10,

      loading: false, // 加载状态
    };
  },
  methods: {
    // 退后一步
    back() {
      this.$router.push({
        path: "/register",
      });
    },

    // 发送验证码   两种方式  老师讲的第二种
    sendYzm() {
      // e.preventDefault();
      // // alert(111);
      // console.log(this.username);
      // if (!this.regUsername.test(this.username)) {
      //   this.$toast("请输入正确的手机号");
      // } else {
      //   userSendSms({
      //     mobile: this.username,
      //     type: "register",
      //   })
      //     .then((res) => {
      //       console.log(res);
      //       this.$toast(res.message);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }

      // console.log(this.$refs.form);

      if (!this.isYzm) return;

      this.$refs.form
        .validate("username")
        .then((res) => {
          this.isYzm = false; //如果为不可点击状态 就让逻辑中断

          this.loading = true;
          // axios
          return userSendSms({
            mobile: this.username,
            type: "register",
          });
        })
        .then(({ data, msg, code }) => {
          if (code === 0) {
            this.loading = false;

            this.$toast(msg + data);
            console.log(data);
            this.tips = this.num + "秒后在获取吧";

            times = setInterval(() => {
              this.num--;
              this.tips = this.num + "秒后在获取吧";
              console.log(this.num);
              if (this.num <= 0) {
                this.tips = "再次获取";
                this.num = 10;
                clearInterval(times);
                this.isYzm = true;
              }
            }, 1000);
          } else {
            this.$toast(msg);
            this.isYzm = true;
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.isYzm = true;
          this.loading = false;
        });
    },

    // 提交全部信息
    // 提交的时候获取账号和密码注册账号
    onSubmit(values) {
      console.log("submit", values);
      userReg(values).then((err) => {
        console.log(err);
      });
    },
  },
  beforeDestroy() {
    clearInterval(times);
  },
};
</script>

<style lang="less" scoped>
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
</style>