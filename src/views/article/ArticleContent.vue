<template>
  <div class="articleContent">
    <header>
      <div class="left">
        <img
          src="https://p1.toutiaoimg.com/medium/321c80005b6d5a51b0a8d"
          @click="$router.back()"
        />
        <div>
          <h3>小莱头条</h3>
          <p>看见更大的世界</p>
        </div>
      </div>
      <div class="right">打开App</div>
    </header>
    <div class="banner">
      <h1>{{ article.title }}</h1>
      <div class="zhong">
        <div class="zuo">
          <span class="span1"><img :src="article.avatar" alt="" /></span>
          <div>
            <p>{{ article.nickname }}</p>
            <span>{{ timer }}</span>
          </div>
        </div>
        <div class="you">关注</div>
      </div>
    </div>

    <div class="zhan">
      <p>{{ article.content }}</p>
      <img v-for="(img, index) in article.imageSrc" :key="index" :src="img" />
    </div>
  </div>
</template>

<script>
// 计算时间的小工具
import { timeForm } from "@/utils/timeform.js";
export default {
  name: "articleContent",

  props: {
    article: {
      requeird: true,
    },
  },
  computed: {
    // 计算时间
    timer() {
      return timeForm(this.article.time);
    },
  },
};
</script>

<style lang="less" scoped>
header {
  //   width: 100%;
  // height: ;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;

    img {
      width: 44px;
      height: 41px;
      margin-right: 5px;
    }
  }
  .right {
    width: 80px;
    height: 25px;
    background: red;
    line-height: 25px;
    text-align: center;
    color: #fff;
  }
}

.banner {
  h1 {
    padding: 20px;
    font-size: 24px;
    word-break: break-all;
  }
}
.zhong {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    p {
      width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .zuo {
    display: flex;
    .span1 {
      display: block;
      width: 40px;
      height: 40px;
      background: chartreuse;
      border-radius: 300px;
      overflow: hidden;
      margin-right: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .you {
    width: 40px;
    height: 25px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 25px;
  }
}

.zhan {
  padding: 0 20px;
  p {
    padding: 10px 0;
    word-break: break-all;
  }
  img {
    width: 100%;
    padding: 10px 0;
  }
}
</style>