<template>
  <dic id="d1">
    <div id="d2">后台管理</div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30" style="position: relative; top: 10px"></el-avatar>
           张三
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item >个人信息</el-dropdown-item>
            <el-dropdown-item >修改密码</el-dropdown-item>
            <el-dropdown-item @click="exit">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </dic>

</template>

<script>
import router from "@/router";
import request from "@/utils/request";

export default {
  name: "Header",
  methods:{
    exit(){
      localStorage.setItem("token","")
      request.delete("/user/logout")
      router.push("/login")
    }
  }
}
</script>

<style scoped>
#d1{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
#d2{
  width: 200px;
  padding-left: 30px;
  font-weight: bold;
  color: dodgerblue;
}

</style>