<template>
  <div>
    <!-- my-header -->
    <div>
      <van-nav-bar title="个人中心"  @click-left="goBack" left-arrow />
    </div>
    <!-- my-header结束 -->
    <!-- 个人资料 -->
    <div>
      <div class="my-back">
        <!-- 头像 -->

        <img :src='userheade' alt="" />

        <!-- 个人信息 -->

        <span class="my-phone" >{{this.my}}</span>

        <!-- 头像结束 -->
        <!-- 注销 -->

        <button class="del-login" @click="logout">注销</button>

        <!-- 注销结束 -->
      </div>
    </div>
    <!-- 个人资料结束 -->
    <!-- user profile -->
    <div class="user-profile">
      <van-grid>
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/nav_wallet.png"
          text="待付款0"
        />
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/nav_truck.png"
          text="待收货0"
        />
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/nav_cs.png"
          text="售后中0"
        />
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/nav_pen.png"
          text="待评价0"
        />
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/icon_coupon.png"
          text="优惠券0"
        />
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/nav_fav.png"
          text="收藏0"
        />
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/nav_alarm.png"
          text="预约0"
        />
        <van-grid-item
          icon="http://static.dota2.com.cn/shop/mobile/images/nav_comment.png"
          text="评价0"
        />
      </van-grid>
    </div>
    <!-- user profile结束 -->
    <!-- 订单信息开始 -->
    <div class="line-box">
      <van-cell
        icon="http://static.dota2.com.cn/shop/mobile/images/icon_book.png"
        title="我的订单"
        is-link
        to="/"
      />
      <van-cell
        icon="http://static.dota2.com.cn/shop/mobile/images/icon_address.png"
        title="收货信息"
        is-link
        to="/"
      />
      <van-cell
        icon="http://static.dota2.com.cn/shop/mobile/images/nav_cs.png"
        title="我的售后"
        is-link
        to="/"
      />
      <van-cell
        icon="http://static.dota2.com.cn/shop/mobile/images/icon_faq.png"
        title="FAQ"
        is-link
        to="/"
      />
      <van-cell
        icon="http://static.dota2.com.cn/shop/mobile/images/icon_faq.png"
        title="更改个人信息"
        is-link
        to="/update"
      />
    </div>
    <!-- 订单信息开始 -->
    
    <!-- 底部组件 -->
    <My-footer></My-footer>
    <!-- 底部组件结束 -->
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Grid, GridItem, Icon, Cell, CellGroup } from "vant";

import { mapState } from "vuex";
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(NavBar);
export default {
    computed: {
    ...mapState(["userlist"])
  },
  data() {
    return {
      my:'',
      userheade:''
    };
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f1f1f1;");
   
  },
  mounted() {
     if (this.userlist.length>0) {
        let phone=this.userlist[0].phone
      this.my= phone.substr(0,3) + "****" + phone.substr(7)
      }
      this.user()
  },
  methods: {
    onClickLeft(){
      this.$router.push('/')
    },
    user(){
       this.userlist.forEach((item) => {
        this.userid = item.id;
      });
      this.axios.get('/user',{ params: { userid: this.userid } }).then(res=>{
        this.userheade=res.data.result[0].img
        console.log(res.data.result)
      })
    },

    logout(){
      this.$store.commit('logout')
      this.$router.push('/');
     location.reload()
    },
     goBack(){
     this.$router.go(-1)
    }
  },
};
</script>
<style scoped>
.van-nav-bar >>> .van-icon {
  font-weight: 400;
  font-size: 24px;
  color: black;
}
.van-cell >>> .van-cell__title {
  color: #cacaca;
  text-align: left;
}
.my-back {
  position: relative;
  padding: 53px 0;
  background-image: url(http://static.dota2.com.cn/shop/mobile/images/user_banner.jpg);
  background-size: 100% auto;
}
.my-back > img {
  position: absolute;
  left: 22px;
  top: 27px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.my-phone {
  color: #fff;
  position: absolute;
  left: 80px;
  top: 45px;
}
.user-profile {
  margin-bottom: 3px;
  border-bottom: 1px solid #e4e4e4;
}
.del-login {
  color: #fff;
  text-align: center;
  border: 1px solid #f76e6e;
  width: 32px;
  font-size: 8px;
  border-radius: 3px;
  background: none;
  position: absolute;
  right: 10px;
  top: 40px;
}
.line-box >>> .van-cell {
  padding: 15px;
}
</style>