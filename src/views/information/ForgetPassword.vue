<template>
  <div class="ForgetPassword">
    <div class="topPass">
      <div class="left" @click="$router.back()">
        <van-icon name="arrow-left" />
        返回
      </div>
      <div class="right"><h4>忘记密码</h4></div>
    </div>

    <van-form ref="form">
      <div class="oldPass">
        <van-field
          class="username"
          v-model="username"
          type="text"
          name="username"
          label="手机号"
          placeholder="请输入原密码"
          :rules="[
            { required: true, message: '请填写密码' },
            { pattern: regPassword, message: '请输入6-12位的密码' },
          ]"
        />
      </div>

      <div class="newPass">
        <van-field
          class="password"
          v-model="password"
          type="password"
          name="password"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[
            { required: true, message: '请填写密码' },
            { pattern: regPassword, message: '请输入6-12位的密码' },
          ]"
        />
      </div>

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

      <div class="subPass" @click="forgetPass">
        <van-button color="#3f4144" size="large">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
let times = null;
import { Form, Field } from "vant";
import { userSendSms } from "@/api/login.js";
import { userForget } from "@/api/information.js";
export default {
  name: "ForgetPassword",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
  },
  data() {
    return {
      username: "", // 手机号
      password: "", // 新密码
      vercode: "", //验证码
      regSms: /^.*([0-9]{6}).*/, // 正则验证手机号

      regPassword: /^.*([0-9]{6,12}).*/, // 正则验证密码

      // 判断用户是否发送验证码
      isYzm: true,

      tips: "发送验证码",
      num: 10,

      loading: false, // 加载状态
    };
  },
  methods: {
    // 发送验证码   两种方式  老师讲的第二种
    sendYzm() {
      console.log(this.$refs.form);
      if (!this.isYzm) return;
      this.$refs.form
        .validate("username")
        .then((res) => {
          this.isYzm = false; //如果为不可点击状态 就让逻辑中断

          this.loading = true;
          // axios
          return userSendSms({
            mobile: this.username,
            type: "login",
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

    forgetPass() {
      console.log(userForget());
      let { username, password, vercode } = this;
      console.log(username, password, vercode);
      userForget({ username, password, vercode })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.$toast(res.message + "," + "即将跳回主页");
            setTimeout(() => {
              this.$router.push("/register");
            }, 1000);
          } else {
            this.$toast(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.topPass {
  display: flex;
  height: 55px;
  background: #000;
  color: #fff;
  padding: 0 10px;
  align-items: center;
  .left {
    width: 90px;
    font-size: 18px;
  }
  .right {
    width: 100%;
    text-align: center;
    h4 {
      font-size: 23px;
      font-weight: 500;
      margin-right: 40px;
    }
  }
}
</style>