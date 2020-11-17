import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import qs from 'qs'
import axios from 'axios'
import 'vant/lib/index.css';

import './mock.js'

import MyFooter from './components/My-footer.vue'
Vue.prototype.qs=qs,
Vue.prototype.axios=axios,
axios.defaults.baseURL='http://127.0.0.1:3000'
Vue.use(Mint);
Vue.config.productionTip = false
Vue.component("MyFooter", MyFooter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
