<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="cats-header">
      <mt-header fixed title="分类">
          <mt-button @click="goBack" slot="left" icon="back"></mt-button>
      </mt-header>
    </div>
    <!-- 顶部导航栏结束 -->
    <!-- 商品分类 -->
    <div class="cats-top">
      <van-row type="flex" justify="space-around">
        <van-col span="12" v-for="(item, k) of classfiy" :key="k"
          ><div>
            <router-link  :to="{path:'/list',query:{id:item.id}}">
              <img v-lazy="item.img" alt="" />
              <p>{{ item.title }}</p>
            </router-link>
          </div></van-col
        >
      </van-row>
    </div>
    <!-- 商品分类结束 -->
    <!-- 底部组件 -->
    <My-footer></My-footer>
    <!-- 底部组件结束 -->
  </div>
</template>
<style scoped>
.cats-header .mint-header {
  background-color: #fff;
  font-size: 18px;
  color: #323232;
  padding: 25px 0;
  border-bottom: 1px solid #d7d7d7;
}
.cats-top {
  margin-top: 65px;
}
.van-col >>> div {
  margin: 0 auto;
  width: 60%;
}
.van-col >>> div img {
  width: 100%;
}
/* .mint-header .mint-header-button{
        background-color: brown;
    } */
</style>
<script>
import Vue from "vue";
import { Col, Row ,Lazyload} from "vant";
Vue.use(Lazyload);
Vue.use(Col);
Vue.use(Row);
export default {
  data() {
    return {
      classfiy: [],
    };
  },
  //在创建前给body设置一个背景图
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color: #fff");
  },
  mounted() {
    this.axios.get("/secreshop_classfiy").then((res) => {
      this.classfiy = res.data.results;
     
    });
  },
  methods: {
    goBack(){
     this.$router.go(-1)
    }
  },
};
</script>