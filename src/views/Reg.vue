<template>
  <div>
    <div class="reg-body">
      <!-- log -->
      <div>
        <img
          src="https://safestatic.games.wanmei.com/passport/reg/images/icon.png"
          alt=""
        />
      </div>
      <!-- log结束 -->
      <!-- 注册表单 -->
      <div class="reg-form">
        <mt-field
          :attr="{ maxlength: 12 }"
          placeholder="输入手机号"
          @blur.native.capture="checkPhone"
          :state="PhoneState"
          v-model="phone"
        ></mt-field>
        <mt-field
          type="password"
          :attr="{ maxlength: 16 }"
          placeholder="输入密码"
          @blur.native.capture="checkPassword"
          :state="PasswordState"
          v-model="password"
        ></mt-field>
        <mt-field
          :attr="{ maxlength: 6 }"
          placeholder="输入姓名"
          @blur.native.capture="checkUserName"
          :state="UserNameState"
          v-model="username"
        ></mt-field>
        <mt-field
          :attr="{ maxlength: 18 }"
          placeholder="输入身份证号"
          @blur.native.capture="checkIdCart"
          :state="IdCartState"
          v-model="idcart"
        ></mt-field>
        <mt-button @click="Reg()" size="large" type="danger"
          >立即注册</mt-button
        >
      </div>
      <!-- 注册表单结束 -->
    </div>
  </div>
</template>

<style  scoped>
.reg-body {
  margin-top: 50px;
}
.reg-body > div > img {
  width: 70px;
  margin-bottom: 30px;
}
.reg-form {
  padding: 0 20px;
}
.reg-form > a {
  background: none;
}
.reg-form > button {
  margin-top: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: 10;
}
</style>
<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      username: "",
      idcart: "",
      PhoneState: "",
      PasswordState: "",
      UserNameState: "",
      IdCartState: "",
    };
  },
  //在创建前给body设置一个背景图
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute(
        "style",
        "line-height: 0.12rem;background: url(https://safestatic.games.wanmei.com/passport/reg/images/bg_02.jpg) no-repeat #09181f;background-size: cover;"
      );
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
    //   验证姓名
    checkUserName() {
      let reg = /^['\u3400-\u9fa5']{2,4}/;
      if (reg.test(this.username)) {
        this.UserNameState = "success";
        return true;
      } else {
        this.UserNameState = "error";
        this.$toast({
          message: "姓名为必填项,格式不正确",
          position: "top",
          duration: "2000",
        });
        return false;
      }
    },
    //   验证身份证
    checkIdCart() {
      let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (reg.test(this.idcart)) {
        this.IdCartState = "success";
        return true;
      } else {
        this.IdCartState = "error";
        this.$toast({
          message: "身份证为必填项,格式不正确",
          position: "top",
          duration: "2000",
        });
        return false;
      }
    },
    //注册请求
    Reg() {
      if (
        this.checkPhone() &&
        this.checkPassword() &&
        this.checkUserName() &&
        this.checkIdCart()
      ) {
        this.axios
          .post(
            "/reg",
            "phone=" +
              this.phone +
              "&password=" +
              this.password +
              "&username=" +
              this.username +
              "&idcart=" +
              this.idcart
          )
          .then((res) => {
            //用户注册成功
            if (res.data.code == 1) {
              this.$router.push("/login");
            } else {
              this.$messagebox("注册提示", "手机号已被注册 ");
            }
          });
      }
    },
  },
};
</script>