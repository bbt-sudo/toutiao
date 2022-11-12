<template>
  <div class="footer">
    <footer>
      <div class="left" @click="showPopup">
        <van-icon size="1.6rem" name="edit" />
        写评论
      </div>
      <div class="right" v-show="!is_relay">
        <!-- 看评论是否大于0条 大于的话显示 小于则隐藏-->
        <!-- :badge="article.comment > 0 ? article.comment : ''" -->
        <van-icon size="1.6rem" name="chat-o" :badge="article.comment || ''" />
        <!-- 收藏 -->
        <van-icon
          @click="articleFavToggle"
          :color="article.is_fav ? 'red' : ''"
          size="1.6rem"
          name="star"
        />
        <!-- 点赞 -->
        <van-icon
          @click="articleLikeToggle"
          size="1.6rem"
          name="like"
          :color="article.is_like ? 'red' : ''"
        />
        <!-- 分享------------------------------------------------ -->
        <van-icon size="1.6rem" name="share-o" @click="showShare = true" />

        <!-- <van-cell title="显示分享面板" @click="showShare = true" /> -->
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />

        <!-- ---------------------------------------------------------------------------- -->
      </div>
      <!-- {{ isYan }} -->
    </footer>
    <van-popup v-model="show" position="bottom">
      <div class="tanchu">
        <textarea
          ref="input"
          @keyup.enter="jianpan"
          v-model.trim="content"
          name="text"
          :placeholder="placeholder"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <span>{{ content.length }}/1000</span>
        <button @click="submitComment">发布</button>
      </div>
    </van-popup>
    <!-- <van-popup v-model="show">内容</van-popup> -->
  </div>
</template>

<script>
import activeToggle from "./activeToggle.js";

import { Popup, ShareSheet } from "vant";

import QRCode from "qrcode";

export default {
  name: "ArticleFooter",
  components: {
    [Popup.name]: Popup,
    [ShareSheet.name]: ShareSheet,
  },
  data() {
    return {
      show: false,

      content: "",

      // 分享
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
        { name: "QQ", icon: "qq" },
      ],
    };
  },
  props: {
    article: {
      required: true,
    },
    // 文章ID
    article_id: {
      required: true,
    },
    // 用户ID
    user_id: {
      required: true,
    },
    placeholder: {
      default: "留下神评再走吧",
      type: String,
    },

    reply_comment_id: {
      // 为0时可以不写  为1时输入评论id
      default: "",
      type: String,
    },
    comment_type: {
      // 请求为0回复文章  为1时回复评论
      default: 0,
      type: [String, Number],
    },

    preSendIndex: {
      default: 0,
      type: Number,
    },

    is_relay: {
      default: false,
    },
  },

  computed: {
    userInfo() {
      return this.$store.state.userModules.userInfo;
    },
  },
  mounted() {
    // console.log(this.userInfo);
    // console.log(this.$parent.$refs.commentsList.list);
  },
  methods: {
    ...activeToggle,

    jianpan() {
      this.submitComment();
    },

    // 封装上传的方法
    getTitle() {
      let { title } = this.article;

      title += "  想看更多有趣新闻？  那就来莱头条吧";

      title = encodeURIComponent(title);

      return title;
    },
    getPic() {
      let _img = "http://toutiao.longxiaokj.com/a023e9a3909f21667185407164.gif";
      let {
        imageSrc: [img],
      } = this.article;

      // 查看里面是否有图片 如果有则直接执行  没有则走默认
      img = img || _img;

      // 文字编码  encodeURIComponent
      img = encodeURIComponent(img);

      return img;
    },

    getUrl() {
      // 为了测试
      let { article_id } = this;
      return encodeURIComponent(
        "https://static-d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/toutiao/index.html#/article?_id=" +
          article_id
      );
      // location.href  获取本地的链接
      // 拼接所需的数据
    },

    // 分享的方法

    // 微信---------------------
    shareWX() {
      console.log("shareWX");
      let url = decodeURIComponent(this.getUrl());

      QRCode.toDataURL(url)
        .then((url) => {
          console.log(url);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // 微博---------------------------------
    shareWB() {
      console.log("shareWB");

      let title = this.getTitle();
      let img = this.getPic();

      // 上传到微博
      window.open(
        `https://service.weibo.com/share/share.php?title=${title}&pic=${img}`
      );
    },
    // QQ------------------------------------
    shareQQ() {
      console.log("shareQQ");
      let title = this.getTitle();
      let img = this.getPic();
      let url = this.getUrl();
      //
      // &title=入坑两个月自研创业公司 - 哇哦谢谢你 - 掘金
      // &summary=一、拿offer 其实入职前，我就感觉到有点不对劲，居然要自带电脑。而且人事是周六打电话发的offer！自己多年的工作经验，讲道理不应该入这种坑，还是因为手里没粮心中慌，工作时间长的社会人，还是不要
      // &pics=https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/favicon-300x300.34d45a4.png
      // &site=掘金

      window.open(
        `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&pics=${img}$site=小莱`
      );
    },
    // 复制链接--------------------------------------------------
    shareLink() {
      // 1.创建一个input框
      let input = document.createElement("input");
      // 2.将内容赋值给input框
      input.value = "复制👇勉遮俱❀，阀颂給郝👉" + window.atob(this.article_id);
      // 3.将input框追加到网页上
      document.body.appendChild(input);
      // 4.让文本框选中内容
      input.select();
      // 5.复制内容
      document.execCommand("copy");
      // 6.删除input框
      input.remove();

      this.$toast("复制成功 快去分享给小伙伴吧");
    },
    // 分享海报
    poster() {
      this.$emit("render");
    },
    // 分享
    onSelect({ name }) {
      this.$toast(name);
      this.showShare = false;

      let shareMethods = {
        微信: this.shareWX,
        微博: this.shareWB,
        QQ: this.shareQQ,
        复制链接: this.shareLink,
        分享海报: this.poster,
      };

      shareMethods[name].call(this);
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;

  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  left: 0;
}
footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: #fff;

  .left {
    display: flex;
    align-items: center;
    height: 38px;
    flex: 4;
    border-radius: 15px;
    background: #f3f3f3;
    justify-content: center;
  }
  .right {
    flex: 6;
    display: flex;
    justify-content: space-around;
    align-content: center;
    height: 38px;
    line-height: 38px;
    .van-icon {
      display: flex;
      align-items: center;
    }
  }
}

// 弹出层

.tanchu {
  // width: ;
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  textarea {
    border: none;
  }
  span {
    text-align: right;
  }
  button {
    height: 50px;
    border: none;
    color: #fff;
    background: olive;
  }
}
</style>