<template>
  <div class="issue">
    <!-- <h1>发布</h1> -->
    <div class="top">
      <p>发布</p>
    </div>

    <!-- 标题 -->
    <div class="headline">
      <van-cell-group>
        <div class="guan">
          <!-- 标题区------------------ -->
          <li>
            <van-field
              v-model="postData.title"
              label="文本"
              placeholder="请输入用户名"
            />
          </li>
          <!-- 选择模块区------------------ -->
          <li>
            <van-field
              readonly
              clickable
              name="picker"
              :value="value"
              label="选择器"
              placeholder="点击选择城市"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                value-key="name"
                :columns="cateListDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
          </li>
          <!-- 文本域区 -->
          <li>
            <div class="textarea">
              <div class="topTextarea">
                <div class="leftTextarea">内容</div>
                <div class="rightTextarea">
                  <textarea
                    v-model="postData.content"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <div class="bottom">{{ postData.content.length }}/1000</div>
            </div>
          </li>
          <!-- 上传图片区 -->
          <li>
            <div class="depositImg">
              <van-uploader
                v-model="fileList"
                multiple
                :after-read="afterRead"
                :max-count="3"
              />
            </div>
          </li>
        </div>
      </van-cell-group>
    </div>

    <div class="btn">
      <button @click="submitData">提交</button>
    </div>
  </div>
</template>

<script>
import { Field, Form, CellGroup, Popup, Picker, Uploader } from "vant";

import { mapState } from "vuex";

import { apiAddArticle, uploadFile } from "@/api/publish";

export default {
  name: "Issue",
  components: {
    [Field.name]: Field,
    [Form.name]: Form,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Uploader.name]: Uploader,
  },
  data() {
    return {
      postData: {
        title: "", // 标题
        content: "", // 内容
        cate_id: "", // 分类id
        cate_name: "", // 分类名字
        author: "", //作者id
        author_id: "", // uid
        imageSrc: [], // 要上传的图片
      },
      // 选择模块数据
      value: "",
      // columns: cateListDate,
      showPicker: false,
      // 上传图片存放地址
      fileList: [],
    };
  },
  methods: {
    // 选择模块  确认时触发
    onConfirm(value) {
      console.log(value);
      this.value = value.name;
      this.showPicker = false;

      this.postData.cate_id = value._id;
      this.postData.cate_name = value.name;
    },

    // 上传图片事件
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      console.log(this.fileList);

      if (this.fileList.length > 0) {
        // let result = await uploadFile(this.fileList[0].file);
        // console.log(result);

        let task = this.fileList.map((v, k) => {
          return uploadFile(this.fileList[k].file);
        });

        console.log(task);

        this.postData.imageSrc = await Promise.all(task);
      }
    },

    // 提交数据
    submitData() {
      let { uid, userInfo } = this;

      if (!uid) {
        this.$toast("未登录，请先登录");
        this.$router.push("/register");
        return;
      }

      this.postData.author = userInfo._id;
      this.postData.author_id = uid;

      console.log(this.postData.imageSrc);

      // this.postData.imageSrc.push(
      //   "http://toutiao.longxiaokj.com/1636337306399_7u1r25cgiz.jpeg"
      // );

      console.log(this.postData);

      if (this.fileList.length === 2) {
        this.$toast("请上传1张或3张");
      }

      apiAddArticle(this.postData).then((res) => {
        console.log(res);
      });
    },
  },

  computed: {
    ...mapState("cateModules", ["cateListDate"]),
    ...mapState("userModules", ["uid", "userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.issue {
  background: #efefef;
  width: 100%;
  height: 100vh;
  .top {
    height: 40px;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
// 文本域
.textarea {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  background: #fff;

  .topTextarea {
    display: flex;
    width: 100%;
    .leftTextarea {
      width: 50px;
    }
    .rightTextarea {
      width: 100%;
      textarea {
        width: 100%;
        display: block;
        border: none;
      }
    }
  }
  .bottom {
    text-align: right;
  }
}

// 图片

.depositImg {
  background: #fff;
  display: flex;
  align-items: center;
}

.btn {
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 80%;
    height: 45px;
    background: cornflowerblue;
  }
}

.guan {
  background: #efefef;
  li {
    margin-bottom: 20px;
  }
}
</style>
