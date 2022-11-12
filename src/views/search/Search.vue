<template>
  <div class="search">
    <div class="top">
      <form action="/">
        <!-- <van-search
          v-model="key_word"
          show-action
          placeholder="请输入搜索关键词"
          @input="onSearch"
          @cancel="onCancel"
        /> -->

        <van-search
          v-model.trim="key_word"
          show-action
          placeholder="请输入搜索关键词"
          @input="onSearch"
        >
          <template #left>
            <div @click="$router.back()">返回</div>
          </template>
          <template #action>
            <div @click="onSearchsou">搜索</div>
          </template>
        </van-search>
      </form>
    </div>

    <div class="list">
      <van-list v-show="key_word.length">
        <van-cell
          v-for="(item, index) in listArr"
          :key="index"
          :title="item.title"
          @click="canshu(item.title)"
        />
      </van-list>
    </div>

    <div class="recommended" v-show="!key_word.length">
      <div class="tuijian">
        <p>大家都在搜</p>
        <ul>
          <li>1111111111111111</li>
          <li>11111111111111111</li>
          <li>111111122111111111</li>
          <li>111111111111111111331</li>
        </ul>
      </div>

      <div class="history">
        <p>历史搜索</p>
        <div class="historyList">
          <van-cell
            v-for="(item, index) in search_history"
            :key="index"
            @click="clickHistory(item.value)"
          >
            <van-icon name="clock-o" :border="false" /> {{ item.value }}
          </van-cell>
        </div>
        <span
          class="clearhistory"
          @click="clearhistory"
          v-show="search_history.length"
          >清空历史记录</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Form, List, Cell } from "vant";

// 引入局部axios
import { apiSearch } from "@/api/search";

let timer = null;
export default {
  name: "Search",
  components: {
    [Search.name]: Search,
    [Form.name]: Form,
    [List.name]: List,
    [Cell.name]: Cell,
  },
  data() {
    return {
      key_word: "",

      // dataArr: [],

      listArr: [],

      search_history: [],
    };
  },
  created() {
    let search_history = localStorage.getItem("search_history");
    if (search_history) {
      this.search_history = JSON.parse(search_history);
      console.log(this.search_history);
    }
  },

  beforeDestroy() {
    clearTimeout(timer);
    timer = null;
  },

  methods: {
    // 输入触发
    onSearch(val) {
      // this.$toast(val);

      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        let { key_word } = this;

        // console.log(apiSearch);

        apiSearch({ key_word }).then(({ code, count, data }) => {
          if (code === 0) {
            console.log(data);
            this.listArr = data;
          }
        });
      }, 500);
    },

    // 搜索
    onSearchsou() {
      let { key_word, search_history } = this;

      let index = search_history.findIndex((item) => item.value === key_word);
      if (index >= 0) {
        search_history.splice(index, 1);
      }

      search_history.unshift({
        value: key_word,
        timestamp: +new Date(),
      });

      localStorage.setItem("search_history", JSON.stringify(search_history));

      // alert(111);
      this.$router.push({
        path: "/SearchCount",
        query: { key_word },
      });
    },

    // 点击将参数传上去
    canshu(item) {
      console.log(item);
      this.key_word = item;

      this.onSearchsou();
    },

    // 清空历史记录
    clearhistory() {
      localStorage.removeItem("search_history");
      this.search_history = [];
    },

    clickHistory(item) {
      this.key_word = item;
      this.onSearchsou();
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  background: #eee;
  // height: 1000px;
  height: 100vh;
}

.tuijian {
  height: 150px;
  background: #fff;
  padding: 0 10px;
  p {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 7px 10px;
      border: 1px solid #d4d4d4;
      border-radius: 50px;
      margin: 10px 10px 0 0;
    }
  }
}

.history {
  height: 500px;
  background: #fff;
  margin-top: 20px;
  padding: 0 10px;

  p {
    line-height: 30px;
    font-size: 14px;
    color: #666;
  }
}

.historyList /deep/ .van-cell {
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}

.clearhistory {
  display: block;
  text-align: center;
  line-height: 50px;
  color: #666;
}
</style>