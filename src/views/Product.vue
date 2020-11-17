<template>
  <div>
    <!-- 顶部导航栏  -->
    <div class="product-header">
      <van-icon @click="goBack" size="28" name="arrow-left" />
      <!-- 锚点 -->
      <div>
        <router-link to="/">商品</router-link>
        <router-link to="/">详情</router-link>
        <router-link to="/">评论</router-link>
        <router-link to="/">发现</router-link>
      </div>
      <!-- 锚点结束 -->
      <div class="product-home">
        <router-link to="/"
          ><van-icon size="28" name="wap-home-o"
        /></router-link>
      </div>
    </div>
    <!-- 顶部导航栏结束 -->
    <!-- 商品 -->
    <div v-for="(item, k) of goods" :key="k">
      <!-- 商品详情轮博 -->
      <div>
        <van-swipe @change="onChange"  >
          <van-swipe-item v-for="(i,k) of swipe" :key="k"
            ><img
               v-lazy="i.img"
              alt=""
          /></van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/4</div>
          </template>
        </van-swipe>
      </div>
      <!-- 商品详情轮博结束 -->
      <!-- 商品详情 -->
      <div class="goods-list">
        <p>{{ item.title }}</p>
        <p class="goods_details_intro">
          {{ item.title1 }}
        </p>
        <p class="goods-price">{{ item.price.toFixed(2) }}</p>
      </div>
      <!-- 商品详情结束 -->
    </div>
    <!-- 商品结束 -->

    <!-- 选择地址 -->
    <van-cell is-link  @click="showPopup"
      >运输: <span>上海</span>至
      <span>北京</span>
    </van-cell>
    <van-popup v-model="show" position="top" :style="{ height: '50%' }">
      <van-area
        title="标题"
        :area-list="this.areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
    </van-popup>
    <!-- 选择地址结束 -->
    <!-- 运费 -->
    <div class="freight">
      运费
      <span> ￥18.00 </span>
    </div>
    <!-- 运费结束 -->
    <!-- 购买数量 -->
    <div class="goods-sum">
      <span>数量</span>
      <van-stepper v-model="sum" min="1" max="99" />
    </div>
    <!-- 购买数量结束 -->
    <!-- 商品详情 -->
    <div class="goods-details">
      <p class="datalis">详情</p>
      <p v-for="(z,k) of goods" :key="k">
        <img :src="z.details" alt="" />
      </p>
    </div>
    <!-- 商品详情结束 -->
    <!-- 加入购物车 -->
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="star" text="收藏" />
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-button
          @click="addCart"
          type="warning"
          text="加入购物车"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <!-- 加入购物车结束 -->
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";

import {
  Tab,
  Tabs,
  Icon,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Popup,
  Area,
  Stepper,
  Lazyload
} from "vant";
Vue.use(Stepper);
Vue.use(Area);
Vue.use(Popup);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload);
export default {
   computed: {
    ...mapState(["cartGoods", "isLogined", "userlist"]),
  },
  data() {
    return {
      //判断购物车商品是否又数据
      goods: [],
      //从mock模拟的轮播图数据
      swipe: [],
      sum: 1,
      current: 0,
      area: [],
      arr:[],
      cart:{},
      userid:0,
      show: false,
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
          130000: "河北省",
          140000: "山西省",
          150000: "内蒙古自治区",
          210000: "辽宁省",
          220000: "吉林省",
          230000: "黑龙江省",
          310000: "上海市",
          320000: "江苏省",
          330000: "浙江省",
          340000: "安徽省",
          350000: "福建省",
          360000: "江西省",
          370000: "山东省",
          410000: "河南省",
          420000: "湖北省",
          430000: "湖南省",
          440000: "广东省",
          450000: "广西壮族自治区",
          460000: "海南省",
          500000: "重庆市",
          510000: "四川省",
          520000: "贵州省",
          530000: "云南省",
          540000: "西藏自治区",
          610000: "陕西省",
          620000: "甘肃省",
          630000: "青海省",
          640000: "宁夏回族自治区",
          650000: "新疆维吾尔自治区",
          710000: "台湾省",
          810000: "香港特别行政区",
          820000: "澳门特别行政区",
          900000: "海外",
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
          130100: "石家庄市",
          130200: "唐山市",
          130300: "秦皇岛市",
          130400: "邯郸市",
          130500: "邢台市",
          130600: "保定市",
          130700: "张家口市",
          130800: "承德市",
          130900: "沧州市",
          131000: "廊坊市",
          131100: "衡水市",
          140100: "太原市",
          140200: "大同市",
          140300: "阳泉市",
          140400: "长治市",
          140500: "晋城市",
          140600: "朔州市",
          140700: "晋中市",
          140800: "运城市",
          140900: "忻州市",
          141000: "临汾市",
          141100: "吕梁市",
          150100: "呼和浩特市",
          150200: "包头市",
          150300: "乌海市",
          150400: "赤峰市",
          150500: "通辽市",
          150600: "鄂尔多斯市",
          150700: "呼伦贝尔市",
          150800: "巴彦淖尔市",
          150900: "乌兰察布市",
          152200: "兴安盟",
          152500: "锡林郭勒盟",
          152900: "阿拉善盟",
          210100: "沈阳市",
          210200: "大连市",
          210300: "鞍山市",
          210400: "抚顺市",
          210500: "本溪市",
          210600: "丹东市",
          210700: "锦州市",
          210800: "营口市",
          210900: "阜新市",
          211000: "辽阳市",
          211100: "盘锦市",
          211200: "铁岭市",
          211300: "朝阳市",
          211400: "葫芦岛市",
          220100: "长春市",
          220200: "吉林市",
          220300: "四平市",
          220400: "辽源市",
          220500: "通化市",
          220600: "白山市",
          220700: "松原市",
          220800: "白城市",
          222400: "延边朝鲜族自治州",
          230100: "哈尔滨市",
          230200: "齐齐哈尔市",
          230300: "鸡西市",
          230400: "鹤岗市",
          230500: "双鸭山市",
          230600: "大庆市",
          230700: "伊春市",
          230800: "佳木斯市",
          230900: "七台河市",
          231000: "牡丹江市",
          231100: "黑河市",
          231200: "绥化市",
          232700: "大兴安岭地区",
          310100: "上海市",
          320100: "南京市",
          320200: "无锡市",
          320300: "徐州市",
          320400: "常州市",
          320500: "苏州市",
          320600: "南通市",
          320700: "连云港市",
          320800: "淮安市",
          320900: "盐城市",
          321000: "扬州市",
          321100: "镇江市",
          321200: "泰州市",
          321300: "宿迁市",
          330100: "杭州市",
          330200: "宁波市",
          330300: "温州市",
          330400: "嘉兴市",
          330500: "湖州市",
          330600: "绍兴市",
          330700: "金华市",
          330800: "衢州市",
          330900: "舟山市",
          331000: "台州市",
          331100: "丽水市",
          340100: "合肥市",
          340200: "芜湖市",
          340300: "蚌埠市",
          340400: "淮南市",
          340500: "马鞍山市",
          340600: "淮北市",
          340700: "铜陵市",
          340800: "安庆市",
          341000: "黄山市",
          341100: "滁州市",
          341200: "阜阳市",
          341300: "宿州市",
          341500: "六安市",
          341600: "亳州市",
          341700: "池州市",
          341800: "宣城市",
          350100: "福州市",
          350200: "厦门市",
          350300: "莆田市",
          350400: "三明市",
          350500: "泉州市",
          350600: "漳州市",
          350700: "南平市",
          350800: "龙岩市",
          350900: "宁德市",
          360100: "南昌市",
          360200: "景德镇市",
          360300: "萍乡市",
          360400: "九江市",
          360500: "新余市",
          360600: "鹰潭市",
          360700: "赣州市",
          360800: "吉安市",
          360900: "宜春市",
          361000: "抚州市",
          361100: "上饶市",
          370100: "济南市",
          370200: "青岛市",
          370300: "淄博市",
          370400: "枣庄市",
          370500: "东营市",
          370600: "烟台市",
          370700: "潍坊市",
          370800: "济宁市",
          370900: "泰安市",
          371000: "威海市",
          371100: "日照市",
          371300: "临沂市",
          371400: "德州市",
          371500: "聊城市",
          371600: "滨州市",
          371700: "菏泽市",
          410100: "郑州市",
          410200: "开封市",
          410300: "洛阳市",
          410400: "平顶山市",
          410500: "安阳市",
          410600: "鹤壁市",
          410700: "新乡市",
          410800: "焦作市",
          410900: "濮阳市",
          411000: "许昌市",
          411100: "漯河市",
          411200: "三门峡市",
          411300: "南阳市",
          411400: "商丘市",
          411500: "信阳市",
          411600: "周口市",
          411700: "驻马店市",
          419000: "省直辖县",
          420100: "武汉市",
          420200: "黄石市",
          420300: "十堰市",
          420500: "宜昌市",
          420600: "襄阳市",
          420700: "鄂州市",
          420800: "荆门市",
          420900: "孝感市",
          421000: "荆州市",
          421100: "黄冈市",
          421200: "咸宁市",
          421300: "随州市",
          422800: "恩施土家族苗族自治州",
          429000: "省直辖县",
          430100: "长沙市",
          430200: "株洲市",
          430300: "湘潭市",
          430400: "衡阳市",
          430500: "邵阳市",
          430600: "岳阳市",
          430700: "常德市",
          430800: "张家界市",
          430900: "益阳市",
          431000: "郴州市",
          431100: "永州市",
          431200: "怀化市",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          110107: "石景山区",
          110108: "海淀区",
          110109: "门头沟区",
          110111: "房山区",
          110112: "通州区",
          110113: "顺义区",
          110114: "昌平区",
          110115: "大兴区",
          110116: "怀柔区",
          110117: "平谷区",
          110118: "密云区",
          110119: "延庆区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区",
          120106: "红桥区",
          120110: "东丽区",
          120111: "西青区",
          120112: "津南区",
          120113: "北辰区",
          120114: "武清区",
          120115: "宝坻区",
          120116: "滨海新区",
          120117: "宁河区",
          120118: "静海区",
          120119: "蓟州区",
          130102: "长安区",
          130104: "桥西区",
          130105: "新华区",
          130107: "井陉矿区",
          130108: "裕华区",
          130109: "藁城区",
          130110: "鹿泉区",
          130111: "栾城区",
          130121: "井陉县",
          130123: "正定县",
          130125: "行唐县",
          130126: "灵寿县",
          130127: "高邑县",
          130128: "深泽县",
          130129: "赞皇县",
          130130: "无极县",
          130131: "平山县",
          130132: "元氏县",
          130133: "赵县",
          130181: "辛集市",
          130183: "晋州市",
          130184: "新乐市",
          130202: "路南区",
          130203: "路北区",
          130204: "古冶区",
          130205: "开平区",
          130207: "丰南区",
          130208: "丰润区",
          130209: "曹妃甸区",
          130224: "滦南县",
        },
      },
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    showPopup() {
      this.show = true;
    },
    confirm(vla) {
      this.area = vla;
      console.log(this.area);
    },
    addCart() {
      if (this.isLogined==0) {
        let Cart = {
        id: this.goods[0].id,
        price: this.goods[0].price.toFixed(2),
        img: this.goods[0].classfiy_img,
        title: this.goods[0].title,
        sum: this.sum,
      };
      this.$store.commit("productGoods", Cart);
      this.$router.push("/cart");
      }else{
         this.userlist.forEach((item) => {
         this.userid = item.id;
      });
      this.arr=[]
      let obj={
            gid:this.goods[0].id,
            sum:this.sum
          }
          this.arr.push(obj)
        this.cart={
          userid:this.userid,
          arr:this.arr
        }
        this.axios.post('/Addcart',this.cart).then(res=>{
          ///

        })
      }
      
    },
    //更具id查询商品的轮播图
    listswipe() {
            let id = this.$route.params.id;
      this.axios.get("/productswipe",{ params: { id: id } }).then((res) => {
      this.swipe=res.data.results;
      });
    },
    product() {
      let id = this.$route.params.id;
      this.axios.get("/details", { params: { id: id } }).then((res) => {
        this.goods = res.data.results;
      });
    },
    goBack(){
     this.$router.go(-1)
    }

  },

  mounted() {
    
    this.listswipe();
    this.product();
   
  },
};
</script>
<style  scoped>
*{
  margin: 0;
  padding: 0;
}
a {
  color: #000;
}
.product-header {
  width: 100%;
  display: inline-block;
}
.product-header > i {
  padding-top: 12px;
  float: left;
  padding-bottom: 5px;
}
.product-header > div {
  margin-top: 16px;
  margin-left: 50px;
  float: left;
}
.product-home {
  float: right;
  margin-top: 12px !important;
  margin-left: 40px !important;
}
.product-header > div > a {
  margin-top: 20px;
  padding: 12px 10px;
}
.custom-indicator {
  color: #fff;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  background-color: #ccc;
}
.goods-list {
  text-align: left;
  padding: 0 8px;
}
.goods_details_intro {
  padding-top: 10px;
  color: #9a9a9a;
  font-size: 12px;
}
.goods-price {
  font-size: 28px;
  font-weight: 400;
  padding-top: 10px;
  color: #e90404;
}
.van-goods-action >>> .van-goods-action-button--first {
  background: #e27b3c !important;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.van-goods-action >>> .van-goods-action-button--last {
  background: #cf0000 !important;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.van-goods-action >>> .van-goods-action-button {
  height: 47px;
}
.freight {
  color: #cacaca;
  text-align: left;
  padding: 13px;
}
.freight > span {
  color: #000;
}
.goods-sum {
  color: #cacaca;
  padding: 13px;
  text-align: left;
}
.goods-sum > span {
  float: left;
}
.van-stepper {
  padding-left: 50px;
}
.van-stepper >>> .van-stepper__minus {
  width: 20px;
  height: 20px;
}
.van-stepper >>> .van-stepper__plus {
  width: 20px;
  height: 20px;
}
.van-stepper >>> .van-stepper__input {
  background: none;
  width: 24px;
  height: 24px;
}
.datalis {
  color: #000;
  font-weight: 400;
  padding: 10px 0;
}
.goods-details {
  width: 100%;
}
.goods-details > p > img {
  width: 100%;
}
</style>