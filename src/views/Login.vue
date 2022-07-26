<template>
    <div id="d1">
      <div style="width: 300px; margin: 100px auto">
        <div style="font-size: 30px; text-align: center; padding: 30px 0; color: black">请登录</div>
        <el-form ref="form" :model="form" size="normal" :rules="rules">
          <el-form-item prop="username">
            <el-input prefix-icon="User" v-model="form.userName" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" v-model="form.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "Login",
  data(){
    return{
      vedioCanPlay: false,
      fixStyle: '',
      form: {},
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
      validCode: ''
    }
  },
  methods:{
    login(){
      console.log(this.form)
      localStorage.setItem("token","")
      request.post("/user/login",this.form).then(res =>{
        console.log(res)
        if(res.code === 200) {
          localStorage.setItem("token",res.data.token)
          ElMessage({
            showClose: true,
            message: res.msg,
            type: "success",
          })
          router.push("/")
        } else {
          ElMessage({
            showClose: true,
            message: res.msg,
            type: "error",
          })
          router.push("/login")
        }
      })
    }
  }
}
</script>

<style scoped>
#d1{
  width: 100%;
  height: 100vh;
  background-color: #3e056c;
  overflow: hidden;
}
</style>


