<template>
  <div class="page-register">
    <div class="header">
      <header>
        <a href="#" class="site-logo"></a>
        <div class="login">
          <span>已有美团账号?</span>
          <router-link :to="{name: 'login'}">登录</router-link>
        </div>
      </header>
    </div>
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            @input="input"
          ></el-input>
          <div class="pw-strength">
            <div :class="['bar', strengthClass]"></div>
            <div class="letter">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="ruleForm.rePassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">同意以下协议并注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <footer>
      <p class="copyright">
        ©<a class="f1" href="https://www.meituan.com">meituan.com</a>&nbsp;
        <a class="f1" target="_blank" href="http://www.miibeian.gov.cn/">京ICP证070791号</a>&nbsp;
        <span class="f1">京公网安备11010502025545号</span>
    </p>
    </footer>
  </div>
</template>
<script>
export default {
    data(){
        var userNamePass = (rule,value,callback)=>{
          if(value === ''){
            callback(new Error('请输入手机号'))
          }else{
            if(!((this.ruleForm.userName.length == 11) && (typeof (this.ruleForm.userName.length * 1) == 'number'))){
            callback(new Error('请输入11位手机号码'))
            }
          }
            callback();
        }
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.passWord !== '') {
            this.$refs.ruleForm.validateField('passWord');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }};
      return {
        timer:null,
        strengthClass:"",
        ruleForm:{
          userName:"",
          password:"",
          rePassword:"",
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          rePassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName: [
            { validator: userNamePass, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
        input() {
        var regStr = /(\w)+/g;
        var regNum = /(\d)+/g;
        var reg = /_/g;
        var strongth = this.ruleForm.password.match(reg) &&  this.ruleForm.password.match(regStr) && this.ruleForm.password.match(regNum);
        if (this.ruleForm.password.length > 20 || (this.ruleForm.password.length > 6 && strongth)) {
            this.strengthClass = 'strong';
        }else if (this.ruleForm.password.length < 6) {
            this.strengthClass = 'week';
        } else if (!this.ruleForm.password) {
            this.strengthClass = '';
        } else{
            this.strengthClass = 'normal';
        }
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.timer = setTimeout(()=>{
              this.$store.commit("setName",this.ruleForm.userName)
              this.$router.push({name:"Index"});
            },1000)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    destroyed(){
      clearTimeout(this.timer);
    }
}
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>