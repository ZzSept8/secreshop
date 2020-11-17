<template>
  <div>
    <!-- header -->
    <div class="list-header">
     <van-icon @click="goBack" size="28px" name="arrow-left"
      />
      <div>
        <van-search
          background="#fff"
          @search="onSearch"
          v-model="value"
          placeholder=""
        />
      </div>
    </div>
    <!-- header结束 -->
    <!-- 没有搜索的商品 -->
    <div v-if="!aa">
      <div class="icon-not">
        <span
          ><van-icon
            name="http://static.dota2.com.cn/shop/mobile/images/icon_not.png"
        /></span>
        <div class="font-not">抱歉，当前没有符合要求的商品</div>
        <div class="font-soso">换个词搜搜</div>
      </div>
    </div>

    <!-- 没有搜索的商品结束 -->
<!-- 有商品开始 -->
    <div v-else>
      <!-- 排序 -->
      <div class="rank">
        <p>
          <router-link to="/"> 销量</router-link>
          <router-link to="/"> 价格</router-link>
          <router-link to="/"> 上架时间</router-link>
        </p>
      </div>
      <!-- 排序结束 -->
      <!-- 商品 -->
      <div>
        <div class="goods-padding">
          <van-row type="flex" justify="space-between">
            <van-col span="11" v-for="(item, k) of classfiyGoods" :key="k"
              ><div class="classfiy-goods">
                <router-link :to="`/product/${item.id}`">
                  <img v-lazy="item.classfiy_img" alt="" />
                  <p class="goods-title">{{ item.title }}</p>
                  <p class="van-multi-ellipsis--l2 goods-list">
                    {{ item.title1 }}
                  </p>
                  <span class="goods-price">
                    ￥{{ item.price.toFixed(2) }}</span
                  >
                </router-link>
              </div></van-col
            >
          </van-row>
        </div>
      </div>
      <!-- 商品结束 -->
    </div>
<!-- 有商品结束 -->
    <!-- 底部组件 -->
    <My-footer></My-footer>
    <!-- 底部组件结束 -->
  </div>
</template>
<script>
import Vue from "vue";

import { Search, Icon, Grid, GridItem, Col, Row, Lazyload } from "vant";

Vue.use(Lazyload);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(Search);
export default {
  data() {
    return {
      classfiyGoods: [],
      value: "",
      aa: true,
    };
  },
  mounted() {
    if (this.$route.query.id) {
      let cid = this.$route.query.id;
      this.axios.get("/lists", { params: { cid: cid } }).then((res) => {
        this.classfiyGoods = res.data.results;
      });
    }
    if (this.$route.query.value) {
      this.search();
      if ((classfiyGoods.length = 0)) {
        this.aa=true
      }else{
        this.aa=false
      }
    }
  },
  methods: {
    search() {
      //获取地址栏中的搜索条件 然后再向服务器发请求
      let value = this.$route.query.value;

      this.axios.get("/search?value=" + value).then((res) => {
        this.classfiyGoods = res.data.results;
        //判断 搜索到商品信息
        if (this.classfiyGoods.length == 0) {
          this.aa = false;
        } else {
          this.aa = true;
        }
      });
    },
    onSearch(value) {
      this.$router.push({
        path: "/list",
        query: { value: value },
      });
      location.reload(); //搜索后刷新一下页面
      //this.search()
    },
    goBack(){
     this.$router.go(-1)
    }
  },
};
</script>
<style  scoped>
.list-header i {
  margin-top: 12px;
  float: left;
}
.rank > p {
  text-align: right;
}
.rank > p > a {
  margin: 0 10px;
  color: #000;
  font-size: 10px;
}
.goods-padding {
  padding: 0 10px;
}
.classfiy-goods > a > img {
  width: 100%;
}
.goods-title {
  font-size: 14px;
  color: #333;
}
.goods-list {
  font-size: 8px;
}
.goods-price {
  color: #e90404;
}
.icon-not {
  width: 100%;
}
.icon-not > span > i > img {
  width: 100px;
  height: 158px;
  margin: 5px auto;
}
.font-not {
  color: #ccc;
  font-size: 12px;
}
.font-soso {
  padding-top: 20px;
  padding-left: 20px;
  color: #999;
  text-align: left;
  font-size: 10px;
}
</style>