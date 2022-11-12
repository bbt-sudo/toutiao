<template>
  <div class="InFormAtion">
    <div class="top">
      <span><van-icon name="arrow-left" @click="$router.back()" /></span>
      <p>个人信息</p>
    </div>

    <div class="banner">
      <div class="content">
        <!-- 头像-------------------------------------------------------- -->
        <div class="avatar">
          <van-cell is-link class="tou"
            ><div class="cellContent">
              <span>头像</span>
              <label for="imgs">
                <img :src="postDataAll.avatar" alt=""
              /></label>
              <input type="file" id="imgs" hidden @change="changeFile" /></div
          ></van-cell>
          <!-- <van-popup v-model="show" position="right">内容</van-popup> -->
        </div>
        <!-- 昵称-------------------------------------------------------------------------- -->
        <div class="name">
          <van-cell is-link @click="showPopup"
            >昵称：{{ postDataAll.nickname }}</van-cell
          >
          <van-popup v-model="showName" position="right">
            <div class="namePopup">
              <div class="hezi">
                <div>
                  <van-icon size="20px" name="arrow-left" @click="fanhui" />
                  <h4>更改名字</h4>
                  <van-button
                    :disabled="disabled"
                    type="primary"
                    @click.native="baocun"
                    >保存</van-button
                  >
                  <!-- <button>保存</button> -->
                </div>
              </div>

              <input type="text" @input="changeText" v-model="oldnickname" />

              <p>好名字可以让你的朋友更容易记住你哦</p>
            </div>
          </van-popup>
        </div>
        <!-- 性别------------------------------------------ -->
        <div class="sex">
          <van-cell>
            <van-radio-group v-model="postDataAll.sex">
              <van-radio name="男神">男神</van-radio>
              <van-radio name="女神">女神</van-radio>
              <van-radio name="">隐藏</van-radio>
            </van-radio-group>
          </van-cell>
        </div>
        <!-- 生日------------------------------------------- -->
        <div class="birthday">
          <van-cell title="出生日期" :value="date" @click="show = true" />
          <van-calendar
            v-model="show"
            @confirm="onConfirm"
            :min-date="minDate"
            :max-date="maxDate"
            :default-date="defaultDate"
            color="#1989fa"
          />
        </div>

        <div class="submitInform">
          <van-button type="primary" size="large" @click="submitTi"
            >提交个人信息</van-button
          >
        </div>
      </div>
    </div>

    <div class="changePassword">
      <van-cell is-link @click="showPopupPassword" class="changeXiu"
        >修改密码</van-cell
      >
      <van-popup v-model="showPassword" position="right">
        <div class="popupPassword">
          <div class="topPass">
            <div class="left" @click="showPassword = false">
              <van-icon name="arrow-left" />
              返回
            </div>
            <div class="right"><h4>修改密码</h4></div>
          </div>

          <van-form>
            <div class="oldPass">
              <van-field
                class="oldPassword"
                v-model="oldPassword"
                type="password"
                name="oldPassword"
                label="原密码"
                placeholder="请输入原密码"
                :rules="[
                  { required: true, message: '请填写密码' },
                  { pattern: regPassword, message: '请输入6-12位的密码' },
                ]"
              />
            </div>

            <div class="newPass">
              <van-field
                class="newPassword"
                v-model="newPassword"
                type="password"
                name="newPassword"
                label="新密码"
                placeholder="请输入新密码"
                :rules="[
                  { required: true, message: '请填写密码' },
                  { pattern: regPassword, message: '请输入6-12位的密码' },
                ]"
              />
            </div>

            <div class="subPass">
              <van-button
                @click="yesChangePassword"
                color="#3f4144"
                size="large"
                >确认修改</van-button
              >
            </div>
          </van-form>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { userEditUserInfo, userUpdatePwd } from "@/api/information";

import { uploadFile } from "@/api/publish";

import {
  Popup,
  Cell,
  RadioGroup,
  Radio,
  Calendar,
  Field,
  DatetimePicker,
  Form,
} from "vant";
export default {
  name: "InFormAtion",
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Calendar.name]: Calendar,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Form.name]: Form,
  },
  data() {
    return {
      // 修改密码区

      regPassword: /^.*([0-9]{6,12}).*/, // 正则验证密码

      showPassword: false,

      oldPassword: "", // 旧密码
      newPassword: "", // 新密码

      // 名字的显示与隐藏
      showName: false,

      oldnickname: "", // 旧名称

      disabled: true, // 昵称按钮的属性

      // 单选框  选择性别
      // radio: "男神",

      // ----------------------
      // 生日
      date: "",
      show: false,

      // 默认日期
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
      defaultDate: null,
      // ---------------------------

      postDataAll: {}, // 监视 拷贝出来的数据  要提交的
    };
  },

  methods: {
    showPopup() {
      this.showName = true;
      this.oldnickname = this.postDataAll.nickname;
    },

    // 返回上一级
    fanhui() {
      this.showName = false;
      this.disabled = true;
    },
    // 点击保存新名字
    baocun() {
      this.postDataAll.nickname = this.oldnickname;
      this.showName = false;
      this.disabled = true;
    },
    // 名称文本改变时触发
    changeText() {
      this.disabled = false;
    },

    // 生日------------------------------
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
      // console.log(this.date);

      this.postDataAll.birthday = this.date;
    },

    // 上传头像
    changeFile(e) {
      // console.log();
      let file = e.target.files[0];

      uploadFile(file).then((img) => {
        console.log(img);
        this.postDataAll.avatar = img;
      });
    },
    // 提交个人信息 -------------------------
    submitTi() {
      userEditUserInfo(this.postDataAll).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.$toast(res.msg);

          // console.log(this.postDataAll);
          this.$store.commit("userModules/SET_USER_INFO", this.postDataAll);

          setTimeout(() => {
            this.$router.back();
          }, 800);
        }
        this.$toast(res.msg);
      });
    },

    showPopupPassword() {
      this.showPassword = true;
    },

    // 提交修改密码
    yesChangePassword() {
      let { uid, oldPassword, newPassword } = this;

      if (oldPassword === "") {
        this.$toast("旧密码不可为空哦");
        return;
      } else if (newPassword === "") {
        this.$toast("新密码不可为空哦");
        return;
      }

      if (newPassword === oldPassword) {
        this.$toast("密码一致了呦");
        return;
      }

      userUpdatePwd({
        uid,
        oldPassword,
        newPassword,
      }).then((res) => {
        // console.log(res);
        this.$toast(res.msg);

        if (res.code === 0) {
          this.showPassword = false;

          this.showLogin = false;
          (this.token = null), (this.userInfo = {});

          localStorage.clear();

          this.$router.push("/my");

          this.$router.go();
        }
      });
    },
  },

  watch: {
    userInfo: {
      immediate: true,
      handler(newValue) {
        console.log(newValue);
        let { avatar, birthday, nickname, sex } = newValue;
        // console.log(avatar, birthday, nickname, sex);
        this.postDataAll = { avatar, birthday, nickname, sex };
        this.postDataAll.uid = this.uid;

        this.oldnickname = nickname;

        // 将将要修改生日渲染到页面
        this.date = this.postDataAll.birthday;

        this.defaultDate = birthday ? new Date(birthday) : new Date(2000, 0, 1);

        console.log(this.postDataAll);
      },
    },
  },

  computed: {
    ...mapState("userModules", ["userInfo", "uid", "showLogin", "token"]),
  },
};
</script>

<style lang="less" scoped>
.InFormAtion {
  padding: 0 15px;
  height: 100vh;
  background: #f6f7fc;
}
.top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  // text-align: center;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  p {
    width: 100%;
    text-align: center;
  }
}
.banner {
  width: 100%;
  // height: 500px;
  display: flex;
  justify-content: center;
  .content {
    width: 95%;
    background: #fff;
    // height: 500px;
    padding: 30px 20px;
  }
}

.avatar /deep/ .van-cell {
  height: 80px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.cellContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 16px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 999px;
  }
}
/deep/ .van-cell {
  border-bottom: 1px solid #ccc;
  height: 50px;
}
/deep/ .van-popup {
  height: 100%;
  width: 100%;
}
/deep/ .van-cell__title,
.van-cell__value {
  line-height: 30px;
}
.namePopup {
  // width: 100vm;
  padding: 0 10px;
  .hezi {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    div {
      display: flex;
      justify-content: space-between;
      // padding: 0 10px;
      //   height: 50px;
      width: 100%;
      align-items: center;
      /deep/ .van-button--normal {
        width: 60px;
        height: 35px;
        line-height: 60px;
      }
    }
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    height: 30px;
  }
  p {
    color: #999;
    font-size: 14px;
  }
}

.sex /deep/ .van-radio-group {
  display: flex;
  justify-content: space-around;
  height: 35px;
}

.submitInform {
  // display: flex;
  margin-top: 20px;
}
// 密码区

.popupPassword {
  background: #f6f7fc;
  height: 100vh;
  width: 100%;
}
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
/deep/ .oldPassword {
  // background: red;
  border: none;
  .van-field__value {
    display: flex;
    // align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}

/deep/ .newPassword {
  border: none;
}
/deep/ .changeXiu {
  border: none;
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 16px;
}

.newPass,
.oldPass {
  margin-top: 30px;
}

.subPass {
  padding: 0 15px;

  margin-top: 50px;
}

.changePassword {
  margin-top: 50px;
}
</style>