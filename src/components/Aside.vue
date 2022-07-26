<template>
<div>

  <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      :default-active="$route.path"
      router
  >
    <div  v-for="menu in menus" :key="menu.mid">
      <el-menu-item :index="menu.path">
        <el-icon><component :is="menu.icon"></component></el-icon>
        <span>{{ menu.menuName }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</div>



</template>

<script>
import request from "@/utils/request";

export default {
  name: "Aside",
  data(){
    return{
      menus: []
    }
  },
  created() {
    request.get("/menu/auths").then(res =>{
      console.log(res)
      this.menus = res.data
    })
  }
}
</script>

<style scoped>

</style>