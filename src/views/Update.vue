<template>
  <div>
    <div>
      <van-nav-bar title="更改个人信息" >
        <template #left>
          <van-icon @click="onClickLeft" color="#000" name="arrow-left" size="22" />
        </template>
      </van-nav-bar>
    </div>
    <div></div>
    <div>
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader :after-read="afterRead" default v-model="uploader" />
        </template>
      </van-field>
    </div>
    <div>
      <van-cell-group v-for="(item, k) of user" :key="k">
        <van-field label="姓名" :value="item.username" disabled />
        <van-field label="手机号" :value="item.phone" disabled />
        <van-field label="身份证号" :value="item.IdCard" disabled />
      </van-cell-group>
    </div>

    <van-button
      @click="onSubmit"
      block
      color="linear-gradient(to right, #ff6034, #ee0a24)"
    >
      提交修改
    </van-button>
  </div>
</template>
<style  scoped>
.van-button--block{
    width: 80%;
    margin: 30px auto;
}
</style>
<script>
import Vue from "vue";
import { Uploader, NavBar, Form, Field, Button, Icon } from "vant";
import { mapState } from "vuex";
Vue.use(Form);
Vue.use(Icon);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Uploader);
Vue.use(Button);
export default {
  computed: {
    ...mapState(["userlist"]),
  },
  data() {
    return {
      default: [],
      userid: 0,
      user: [],
      file: {},
      uploader: [{ url: "" }],
    };
  },
  mounted() {
    this.userlist.forEach((item) => {
      // item.id 是登录的用户id
      this.userid = item.id;
    });
    this.axios.get("/user", { params: { userid: this.userid } }).then((res) => {
      this.user = res.data.result;
      this.uploader[0].url = this.user[0].img;
    });
  },
  methods: {
    onSubmit() {
      this.userlist.forEach((item) => {
        // item.id 是登录的用户id
        this.userid = item.id;
      });
      let params = new FormData();
      params.append("file", this.file.file);
      params.append("userid", this.userid);

      //   // 此时可以自行将文件上传至服务器
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      console.log(params);
      this.axios.post("/update", params, config).then((res) => {});
      this.$router.push("/my");
      location.reload();
    },
    afterRead(file) {
      this.file = file;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>