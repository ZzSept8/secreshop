<template>
  <div>
    <!-- cart-header -->
    <div class="cart-header">
      <van-sticky :offset-top="5">
        <van-row type="flex" justify="space-between">
          <van-col span="2">
            <router-link to="/"><van-icon name="arrow-left" /></router-link>
          </van-col>
          <van-col span="18">我的购物车</van-col>
          <van-col span="4">
            <van-button size="mini" @click="compileBtn" type="danger"
              >整理</van-button
            >
          </van-col>
        </van-row>
      </van-sticky>
    </div>
    <!-- cart-header结束 -->
    <!-- cartgoods -->
    <!-- 商品操作 -->
    <div class="cart-goods">
      <div class="cart-goods-header">
        <van-row type="flex" justify="space-between">
          <van-col span="2">
            <div>
              <van-checkbox
                v-model="checked"
                @click="checkAll"
                shape="square"
              ></van-checkbox>
            </div>
          </van-col>
          <van-col span="18">商品信息</van-col>
          <van-col span="4"> 操作 </van-col>
        </van-row>
      </div>
      <!-- 商品操作结束 -->
      <!-- 商品列表 -->
      <div class="goods-list" v-if="cart.length > 0">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-row
            type="flex"
            justify="space-between"
            v-for="(item, k) of cart"
            :key="k"
          >
            <van-col span="2">
              <van-checkbox shape="square" :name="item.goods_id"></van-checkbox>
            </van-col>
            <van-col span="18">
              <div class="cart-goods-list">
                <router-link to="/">
                  <img :src="item.classfiy_img" alt="" />
                </router-link>
                <p class="font-style">
                  <router-link to="/">{{ item.title }}</router-link>
                  <span class="price-font">￥{{ item.price }}</span
                  ><br />
                </p>
              </div>
            </van-col>
            <van-col span="4">
              <div class="goods-btn">
                <span>
                  <button @click="inc(k)">-</button>
                </span>
                <input :value="item.sum" type="number" />
                <span>
                  <button @click="dec(k)">+</button>
                </span>
              </div>
            </van-col>
          </van-row>
        </van-checkbox-group>
      </div>

      <!-- 商品列表结束 -->
      <div class="button-box">
        <div class="goods-button">
          <span class="goods-price">{{ price.toFixed(2) }}</span>
          <br />
          商品
          <span class="goods-sum">{{ sum }}</span>
        </div>
        <router-link v-if="compile" to="/">提交订单</router-link>
        <!-- 点击整理删除 -->
        <div v-else class="goods-del">
          <van-button size="normal" @click="del()" type="danger"
            >删除</van-button
          >
        </div>
        <!-- 点击整理删除结束 -->
        <div></div>
      </div>
    </div>
    <!-- cartgoods结束 -->
  </div>
</template>
<script>
import Vue from "vue";
import { Sticky, Icon, Col, Row, Button, Checkbox, CheckboxGroup } from "vant";
import { mapState } from "vuex";

Vue.use(Icon);
Vue.use(Sticky);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
export default {
  computed: {
    ...mapState(["cartGoods", "isLogined", "userlist"]),
  },
  data() {
    return {
      //判断编辑
      compile: true,
      result: [],
      price: 0,
      sum: 0,
      checked: false,
      //用户id
      userid: 0,
      cart: [],
    };
  },
  watch: {
    result(val) {
      this.getSum();
    },
  },
   beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#fff;");
  },
  mounted() {
    if (this.isLogined == 0) {
      // 没有登录的时候 从浏览器缓存那数据
      this.cart = this.cartGoods;
    } else {
      //如果登录了就从数据库拿数据
      //传用户id查询购物车数据
      this.userlist.forEach((item) => {
        this.userid = item.id;
      });

      this.axios
        .get("/selectcart", { params: { userid: this.userid } })
        .then((res) => {
          this.cart = res.data.result;
        });
    }
  },
  methods: {
    getSum() {
      this.sum = 0;
      this.price = 0;
      this.cartGoods.forEach((item) => {
        //用es6数组新特性 判断选中商品的id id是唯一的
        this.result.find((index) => {
          if (index == item.id) {
            this.sum += item.sum;
            this.price += item.sum * item.price;
          }
        });
      });
    },
    //全选和反选
    checkAll() {
      if (this.checked == true) {
        this.$refs.checkboxGroup.toggleAll(true);
        this.getSum();
      } else {
        this.$refs.checkboxGroup.toggleAll();
        this.getSum();
      }
    },
    //购买数量
    inc(k) {
      if (this.isLogined == 0) {
        this.$store.commit("increment", k);
        this.getSum();
      } else {
        if (this.cart[k].sum > 1) {
          this.cart[k].sum--;
          this.axios
        .get("/increment", {
          params: {
            userid: this.userid,
            sum: this.cart[k].sum,
            cart_id: this.cart[k].cart_id,
          },
        })
        .then((res) => {
          this.cart = res.data.result;
        });
        }
      }
    },
    dec(k) {
      if (this.isLogined == 0) {
        this.$store.commit("decrement", k);
        this.getSum();
      } else {
        if (this.cart[k].sum < 99) {
          this.cart[k].sum++;
          this.axios
        .get("/increment", {
          params: {
            userid: this.userid,
            sum: this.cart[k].sum,
            cart_id: this.cart[k].cart_id,
          },
        })
        .then((res) => {
          this.cart = res.data.result;
        });
        }
      }
    },
    //删除
    del() {
      if (this.isLogined == 0) {
        this.$store.commit("del", this.result);
        this.getSum();
      } else {
        console.log(this.result)
        this.axios.get('del',{params:{
          gid:this.result,
          userid:this.userid
        }}).then(res=>{
          this.cart=res.data.result
        })
      }
    },
    //点击编辑
    compileBtn() {
      if (this.compile == true) {
        this.compile = false;
      } else {
        this.compile = true;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style  scoped>
.cart-header > div >>> .van-sticky--fixed {
  padding: 10px 0;
  border-bottom: 2px solid #d7d7d7;
}
.cart-goods {
  margin-top: 50px;
  padding: 0 10px;
}
.cart-goods > .cart-goods-header {
  padding: 10px 0;
  border-bottom: 1px solid #e4e4e4;
}
.van-col div a >>> img {
  width: 35px;
  border: 1px solid #d7d7d7;
}
.van-col >>> .van-checkbox-group {
  height: 100%;
  margin: auto;
}
.van-checkbox-group >>> .van-checkbox {
  margin-top: 5px;
}
.van-checkbox >>> .van-checkbox__icon {
  font-size: 14px;
}
.goods-list {
  margin-top: 10px;
  border-bottom: 1px solid #e4e4e4;
  padding: 10px 0;
}
.cart-goods-list {
  display: flex;
  text-align: left;
}
.cart-goods-list > p {
  margin-left: 13px;
}
.font-style > a {
  color: #000;
  font-size: 4px;
}
.price-font {
  color: #ccc;
  font-size: 4px;
}
.goods-sku {
  color: #ccc;
  font-size: 4px;
}
.goods-btn {
  display: flex;
  margin-top: 5px;
}
.goods-btn > input {
  text-align: center;
  width: 22px;
  border: none;
}
.goods-btn span {
  width: 36px;

  border: 1px solid #e4e4e4;
}
.goods-btn span > button {
  text-align: center;
  border: none;
  background-color: #fff;
}
.button-box {
  border-top: 1px solid #e4e4e4;
  width: 100%;
  position: fixed;
  bottom: 1px;
}
.goods-button {
  margin-top: 10px;
  height: 100%;
  float: left;
  font-size: 8px;
}
.goods-price {
  font-size: 16px;
  font-weight: 500;
  color: #eb0909;
}
.goods-sum {
  color: #ed0909;
  font-size: 12px;
}
.button-box > a {
  padding: 15px 0;
  text-align: center;
  color: #fff;
  background-color: #cf0000;
  float: right;
  width: 180px;
}
.goods-del {
  width: 200px;
  float: right;
}
.goods-del > button {
  padding: 25px 0;
  width: 100%;
}
</style>