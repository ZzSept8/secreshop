import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 记录登陆状态
    isLogined: localStorage.getItem('isLogined') ? localStorage.getItem('isLogined') : 0,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '未登录',
    userlist: localStorage.getItem('userlist') ? JSON.parse(localStorage.getItem('userlist')) : [],
    cartGoods: localStorage.getItem('cartGoods') ? JSON.parse(localStorage.getItem('cartGoods')) : [],
    userToken: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : ''
  },
  mutations: {
    //登录
    logined(state, val) {
      //往webstorage中存储呢,因为用户刷新后数据依然要保持
      localStorage.setItem('isLogined', JSON.stringify(1));
      //存储住登陆用户信息//取的时候直接用getItem拿就好了
      localStorage.setItem('username', JSON.stringify('已登录'));
      state.userlist.push(val)
      localStorage.setItem('userlist', JSON.stringify(state.userlist));// 使用json字符串进行数据格式存取
    },
    //数量减
    increment(state, k) {
      if (state.cartGoods[k].sum > 1) {
        state.cartGoods[k].sum--
        localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));// 使用json字符串进行数据格式存取
      }
    },
    //数量加

    decrement(state, k) {
      if (state.cartGoods[k].sum < 99) {
        state.cartGoods[k].sum++
        localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));// 使用json字符串进行数据格式存取
      }
    },
    //添加数据
    productGoods(state, cart) {
      let i = state.cartGoods.findIndex((item) =>
        item.id == cart.id
      );
      //判断购物车中是否有相同的数据
      if (i == -1) {
        state.cartGoods.push(cart)
      } else {
        state.cartGoods[i].sum += cart.sum
      }
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));// 使用json字符串进行数据格式存取
    },
    //删除数据
    del(state, index) {
      index.forEach(item => {
        for (let i = 0; i < state.cartGoods.length; i++) {
          if (item == state.cartGoods[i].id) {
            state.cartGoods.splice(i, 1)
          }
        }
      });
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));// 使用json字符串进行数据格式存取
    },
    //退出登录
    logout() {
      localStorage.setItem('username', JSON.stringify('未登录'))
      localStorage.setItem('isLogined', JSON.stringify(0))
      localStorage.setItem('userlist', JSON.stringify([]))

    }
  },

  actions: {
  },
  modules: {
  }
})
