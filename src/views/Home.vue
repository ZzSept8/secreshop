<template>
  <div>
    <!-- search-header -->
    <div class="search-header">
      <van-row>
        <van-col span="7">
          <div class="dota2-img">
            <img
              class="dota-img"
              src="http://static.dota2.com.cn/shop/mobile/images/logo_dota2.png"
              alt=""
            />
            <img
              class="header-img"
              src="http://static.dota2.com.cn/shop/mobile/images/logo_dota2shop.png"
              alt=""
            />
          </div>
        </van-col>
        <van-col span="14">
          <div>
            <van-search v-model="value"  @search="onSearch" placeholder="" />
          </div>
        </van-col>
        <van-col span="3">
          <div class="home-img">
            <router-link to='/my'>
            <img
              src="http://static.dota2.com.cn/shop/mobile/images/icon_user.png"
              alt=""
            />
            </router-link>
            
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- search-header结束 -->
    <!-- 首页轮播图 -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, k) of homeswipe" :key="k"
          ><img :src="item.img" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 首页轮播图结束 -->
    <!-- 新品首售 -->
    <div>
      <div class="new-products">
        <span>新品首售</span>
      </div>
    </div>
    <!-- 新品首售结束 -->
    <!-- new swipe -->
    <div>
      <van-swipe :loop="false" :width="160" :show-indicators="false">
        <van-swipe-item v-for="(item, k) of newSwipe" :key="k"
          ><router-link to="/"><img :src="item.img" alt="" /></router-link
        ></van-swipe-item>
      </van-swipe>
    </div>
    <!-- new swipe结束 -->
    <!-- 登录注册电脑版 -->
    <div class="home-maring" v-if="userlist.length>0">
      <van-row type="flex" justify="space-around">
        <van-col span="6"><button >{{my}}</button></van-col>
        <van-col span="6"><button @click="logout" >注销</button></van-col>
        <van-col span="6"><router-link to="/">电脑版</router-link></van-col>
      </van-row>
    </div>
    <div v-else class="home-maring">
      <van-row type="flex" justify="space-around">
        <van-col span="6"><router-link to="/login">登录</router-link></van-col>
        <van-col span="6"><router-link to="reg">注册</router-link></van-col>
        <van-col span="6"><router-link to="/">电脑版</router-link></van-col>
      </van-row>
    </div>
    <!-- 登录注册电脑版结束 -->
    <div class="home-font">
      <p>完美世界（北京）软件科技发展有限公司</p>
    </div>
    <!-- 底部组件 -->
    <My-footer></My-footer>
    <!-- 底部组件结束 -->

  </div>
</template>

<script>
import Vue from "vue";
import { Col, Row, Swipe, SwipeItem, Search } from "vant";

import { mapState } from "vuex";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
export default {
   computed: {
    ...mapState(["userlist"])
  },
  data() {
    return {
      value: "",
      homeswipe: [],
      newSwipe: [],
      my:''
    };
  },
  //在创建前给body设置一个背景图
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color: #f3f3f3");
  },
  mounted() {
      this.axios.get('/homeHeaderSwipe').then(res=>{
        this.homeswipe=res.data.result;
      });
      this.axios.get('/homeFooterSwipe').then(res=>{
        this.newSwipe=res.data.result
      })
      if (this.userlist.length>0) {
        let phone=this.userlist[0].phone
      this.my= phone.substr(0,3) + "****" + phone.substr(7)
      }
      
  },
  methods: {
    logout(){
      this.$store.commit('logout')
     location.reload()
    },
    onSearch(value){
     // console.log(value)
      this.$router.push({
        path:'/list',
        query:{value:value}
      })
    }
  },
};
</script>
<style  scoped>
.search-header {
  background-color: #e32332;
}
.dota-img {
  width: 22px;
}
.header-img {
  width: 60px;
}
.search-header > div div > .van-search {
  padding: 3px;
  background-color: #e32332;
}
.search-header > div div > .van-cell {
  padding: 0;
}
.home-img >a> img {
  margin-top: 5px;
  width: 15px;
}
.van-row>>>.van-col button{
  border:none;
  width:100%;
  height:100%;
}
</style>
<style >
.van-swipe-item > img {
  width: 100%;
}
.new-products {
  font-size: 14px;
  padding: 5px 0;
  width: 100%;
  color: #648cde;
  background-size: 100% auto;
  background-image: url(http://static.dota2.com.cn/shop/mobile/images/title_newgood.jpg);
}
.van-swipe-item {
  margin-right: 2px;
}
.van-swipe-item > a {
  width: 100%;
  height: 1;
}
.van-swipe-item > a > img {
  margin-right: 20px;
  width: 100%;
}
.home-maring{
  margin-top: 20px;
}
.home-maring>div div{
  border: 1px solid #bfbfbf;
  padding: 5px;
  color: #999;
  font-size: 14px;
}
a:link {color: #999;} /* 未被访问的链接 蓝色 */
a:visited {color: #999} /* 已被访问过的链接 蓝色 */
a:hover {color: #999} /* 鼠标悬浮在上的链接 蓝色 */
a:active {color: #999} /* 鼠标点中激活链接 蓝色 */

.home-font{
  color: #999;
  margin-top: 20px;
  padding: 5px;
  border-top: 1px solid #bfbfbf;
  font-size: 14px;
}
</style>
