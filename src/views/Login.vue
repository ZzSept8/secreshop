<template>
  <div class="login-back">
    <!-- 页面头开始 -->
    <div class="login-header">
      <mt-header title="完美世界账号登录">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <!-- 页面头结束 -->
    <!--  -->
    <div class="container">
      <!-- 登录表单 -->
      <div class="login-form">
        <div class="input-box">
          <div>
            <img
              src="https://safestatic.games.wanmei.com/sso/mobile_activity/images/icon_user.png"
              alt=""
            />
            <input type="text" v-model="phone" placeholder="请输入完美通行证" />
          </div>
        </div>
        <div class="input-box">
          <div>
            <img
              src="https://safestatic.games.wanmei.com/sso/mobile_activity/images/icon_pwd.png"
              alt=""
            />
            <input
              type="password"
              maxlength="16"
              v-model="password"
              placeholder="请输入密码"
            />
            <img
              src="https://safestatic.games.wanmei.com/sso/mobile_activity/images/eye_open.png"
              alt=""
            />
          </div>
        </div>
        <mt-button @click="phone_login" size="large" type="danger">登录</mt-button>
      </div>
      <!-- 登录表单结束 -->
      <!-- 注册新账号 -->
      <div class="res">
        <mt-header>
          <router-link slot="left" to="/reg">注册新账号</router-link>
          <router-link slot="right" to="/login">忘记密码</router-link>
        </mt-header>
      </div>
      <!-- 注册新账号结束 -->
      <div></div>
    </div>
  </div>
</template>
<style  scoped>
.login-back {
  background-color: #f1f1f1;
  width: 100%;
  height: 100%;
  padding-bottom: 300px;
}
.login-header > header {
  background-color: #f1f1f1;
  color: #4e4e4e;
  font-size: 18px;
  height: 48px;
  border: 1px solid #e8e8e8;
}
.container {
  padding: 0px 15px;
}
.login-form {
  padding-top: 40px;
}
.input-box {
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  text-align: left;
}
.input-box > div {
  padding: 5px 10px;
  width: 100%;
  height: 100%;
}
.input-box > div > img {
  vertical-align: middle;
  width: 18px;
}
.input-box > div > input {
  vertical-align: middle;
  margin-left: 10px;
  height: 30px;
  border: none;
  width: 80%;
  outline: none;
  background: none;
  font-size: 16px;
}
.res {
  margin-top: 20px;
}
.res > header {
  background: none;
  color: #4e4e4e;
  font-size: 15px;
}
</style>
<script>
import { mapState } from "vuex";
export default {
    computed: {
    ...mapState(["cartGoods"])
  },
  data() {
    return {
        phone:'',
        password:'',
        val:[],
        usercart:{}
    };
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f1f1f1;");
  },
  methods: {
     //   验证手机号
    checkPhone() {
      let reg = /^1[3-9]\d{9}$/;
      if (reg.test(this.phone)) {
        this.PhoneState = "success";
        return true;
      } else {
        this.PhoneState = "error";
        this.$toast({
          message: "手机号为必填项",
          position: "top",
          duration: "2000",
        });
        return false;
      }
    },
    //   验证密码
    checkPassword() {
      let reg = /^[0-9a-zA-Z]{6,16}/;
      if (reg.test(this.password)) {
        this.PasswordState = "success";
        return true;
      } else {
        this.PasswordState = "error";
        this.$toast({
          message: "密码必须为字母,数字的组合",
          position: "top",
          duration: "2000",
        });
        return false;
      }
    },
    /*使用手机号登陆 */
        phone_login(){
            if(this.checkPhone() && this.checkPassword()){
                //该将获取到的信息提交到WEB服务器
                let obj = {
                    phone:this.phone,
                    password:this.password,
                }
                this.axios.post('/login',this.qs.stringify(obj)).then(res=>{
                    //如果用户登录成功
                    if(res.data.code == 1){
                    //提交Mutations
                      this.val=[]
                    for (let i = 0; i < this.cartGoods.length; i++) {
                        let gid=this.cartGoods[i].id;
                        let sum=this.cartGoods[i].sum;
                        let cart={
                          gid:gid,
                          sum:sum
                        }
                        this.val.push(cart)
                         this.usercart={
                            userid:res.data.results.id,
                            val:this.val
                          }
                    }
                    console.log(this.usercart)
                    this.axios.post('/cart',this.usercart).then(res=>{
                      console.log(res.data)
                    })
                    localStorage.setItem('cartGoods',JSON.stringify([]));
                    this.$store.commit('logined',res.data.results);
                    this.$router.push('/my');
                   location.reload()
                    } 
                    else{
                        this.$messagebox("登录提示","手机号或密码错误");
                    }
                })
            }
        },
  },
};
</script>