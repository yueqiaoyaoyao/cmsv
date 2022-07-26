<template>
<div>
  <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>用户管理</span>
      </template>
        <el-menu-item index="1-1">
          <el-icon><List /></el-icon>
          <span>用户列表</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><Key /></el-icon>
          <span>用户授权</span>
        </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><setting /></el-icon>
      <span>角色管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><setting /></el-icon>
      <span>文档管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><document /></el-icon>
      <span>新闻查看</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>