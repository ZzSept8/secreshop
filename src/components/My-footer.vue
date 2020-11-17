<template>
  <div>
    <div class="index-footer">
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="home">
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/bf5c0dc78a5d1980155f1349ab7dd440.png"
            v-if="selected !== 'home'"
          />
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/d6219f23014ba9ad9e816b04b9b23db0.png"
            v-else
          />
          首页
        </mt-tab-item>
        <mt-tab-item id="cats">
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/abde5d7da8e3b64013c49f73aff13020.png"
            v-if="selected !== 'cats'"
          />
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/9de0de160e6ed0aa5bd89365cde78172.png"
            v-else
          />
          分类
        </mt-tab-item>
        <mt-tab-item id="cart">
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/a2f052971c5a13b45610d0f66b6e0b9f.png"
            v-if="selected !== 'cart'"
          />
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/9676c48280e7782d7e16866590acfeef.png"
            v-else
          />
          购物车
        </mt-tab-item>
        <mt-tab-item id="my">
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/7faaa6a527e0d1fa36cf13b86c32f703.png"
            v-if="selected !== 'my'"
          />
          <img
            slot="icon"
            src="../../public/images_index/bottom_menu/b3b041649d7e960a7ca5d86de1bdae7b.png"
            v-else
          />
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
   computed: {
    ...mapState(["isLogined"])
  },
  data() {
    return {
      //获取当前路由地址
      selected: this.$route.path.replace("/", "") || "home",
    };
  },
  watch: {
    selected(e) {
      if (e == "home") {
        this.$router.push("/");
      }
      if (e == "cart") {
        this.$router.push("/cart");
      }
      if (e == "cats") {
        this.$router.push("/cats");
      }
      if (e == "my") {
        if (this.isLogined == 0) {
          this.$router.push("/login");
        } else {
          this.$router.push("/my");
        }
      }
    },
  },
};
</script>
<style scoped>
.index-footer {
  margin-top: 60px;
}
.index-footer /deep/.mint-tab-item-label {
  font-size: 13px;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: #d9232e;
}
</style>