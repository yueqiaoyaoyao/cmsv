<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="待分配角色用户">
      <el-input v-model="name" placeholder="待分配角色人" />
    </el-form-item>
    <el-form-item label="角色">

      <el-select v-model="value" placeholder="角色">
        <el-option
            v-for="role in roles"
            :key="role.rid"
            :label="role.roleName"
            :value="role.rid" />
      </el-select>

    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import router from "@/router";
import request from "@/utils/request";

export default {
  name: "Role",
  data(){
    return{
      uid:-1,
      name: '',
      roles: [],
      value: ''
    }
  },
  created() {
    if (sessionStorage.getItem("authUid") != null){
      this.uid = sessionStorage.getItem("authUid")
      this.name = sessionStorage.getItem("authName")
    }
    this.getRoles()
  },
  methods:{
    onSubmit(){
      console.log(this.value)

    },
    getRoles(){
      request.get("role/find").then(res=>{
        console.log(res)
        this.roles = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>