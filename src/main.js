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

axios.interceptors.request.use(
  config=>{
    if (localStorage.getItem('userToken')){
      console.log()
      config.headers.Authorization = localStorage.getItem('userToken')
    }
    return config;
  },
  err=>{
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response=> {
    if (response.data.status==0) {
        router.replace('/login');
        console.log('token 过期')
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
