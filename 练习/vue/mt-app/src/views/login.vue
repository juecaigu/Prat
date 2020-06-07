<template>
  <div class="page-login">
    <header class="login-header">
      <router-link :to="{path:'/index'}" class="logo" tag="a"></router-link>
    </header>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        />
      </div>
      <div class="form">
        <h4 class="tips" v-if="error"><span class="tips-error"></span><span class = "text">{{ error }}</span></h4>
        <div class = "contains">
        <p class = "type">
          <span class = "left">账号登录</span>
          <span class = "right" v-if="loginType" @click="changeType">账号密码码登录<span class="el-icon-mobile" style="font-size:14px;margin-left:4px"></span></span>
          <span class = "right" v-if="!loginType" @click="changeType">手机验证码登录<span class="el-icon-s-custom"  style="margin-left:4px"></span></span>
        </p>
        <el-input placeholder="手机" prefix-icon="el-icon-user" v-model="userName" @blur="checkName" @focus="clear"></el-input>
        <el-input placeholder="密码" show-password prefix-icon="el-icon-lock" v-model="passWord" v-if="!loginType" @blur="checkPass" @focus="clear"></el-input>
        <el-input placeholder="动态码" prefix-icon="el-icon-lock" v-model="mobilePassWord" v-if="loginType" @blur="checkMobile" @focus="clear"></el-input>
        <span class = "btn-passWord" v-if="loginType">获取手机动态码</span>
        <p class="foot">
          <a href="#">忘记密码？</a>
        </p>
        <el-button type="primary" class="btn-login" @click="login">登录</el-button>
        <p class="reg">
          <span>还没有账号？</span>
          <router-link :to="{name:'register'}">免费注册</router-link>
        </p>
        <div class="oauth-wrapper">
          <h3 class="title-wrapper">
            <span class="title">用合作网站账号登录</span>
          </h3>
          <div class="oauth cf">
            <a
              class="oauth__link oauth__link--qq"
              href="/account/connect/tencent"
              data-mtevent="{&quot;la&quot;:&quot;oauth/qq&quot;}"
              target="_blank"
            ></a>
            <a
              class="oauth__link oauth__link--weibo"
              href="/account/connect/sina"
              data-mtevent="{&quot;la&quot;:&quot;oauth/sina&quot;}"
              target="_blank"
            ></a>
          </div>
        </div>
      </div>
        </div>
    </div>
    <footer>
      <ul>
        <li>
          <a href="#">关于美团</a>
        </li>
        <li>
          <a href>加入我们</a>
        </li>
        <li>
          <a href>商家入驻</a>
        </li>
        <li>
          <a href>帮助中心</a>
        </li>
        <li>
          <a href>美团手机版</a>
        </li>
      </ul>
      <p>©2018 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
    </footer>
  </div>
</template>
<script>
export default {
    data(){
        return {
            userName:"",
            passWord:"",
            error:null,
            loginType:false,
            mobilePassWord:""
        }
    },
    methods:{
        login(){
            if(this.check()){
              this.$router.push({name:"Index"})
              this.$store.commit("setName",this.userName)
            }
        },
        check(){
          if(!(this.checkName() && this.checkPass() && this.checkMobile())){
            return false;
          }
          if(this.userName == "12345678911"){
            if(this.passWord == "admit123" || this.mobilePassWord == "000000"){
              return true;
            }
          }
          this.error = "账号密码错误"
        },
        checkName(){
           if(!this.userName){
            this.error = "请输入账号"
            return false
           }
           if(!(((typeof (this.userName * 1)) == "number") && (this.userName.length == 11))){
              this.error = "请输入正确的手机号"
              return false;
          }
          this.error = "";
          return true;
        },
        checkPass(){
          if(!this.passWord){
            this.error = "请输入密码"
            return false;
          }
          console.log((/[^a-zA-Z0-9]/g).exec(this.passWord))
          if(!(this.passWord.length == 8 && !(/[^a-zA-Z0-9]/g).exec(this.passWord))){
            this.error = "请输入8位数字字母组成密码"
            return false;
          }
          this.error = "";
           return true;
        },
        checkMobile(){
            if(this.loginType){
              if(!this.mobilePassWord){
                this.error = "请输入验证码"
                return false;
              }
              if(!(((typeof (this.mobilePassWord * 1)) == "number") && (this.mobilePassWord.length == 6))){
                this.error = "请输入六位数验证码"
                return false;
              }
            }
            
          this.error = "";
          return true;
        },
        changeType(){
            this.loginType = !this.loginType;
            this.error = null;
            this.userName = "";
            this.passWord = "";
            this.mobilePassWord = "";
        },
        clear(){
          this.error = "";
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/login/index.scss"
</style>