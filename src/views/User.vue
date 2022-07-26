<template>
  <div class="home" style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add()">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>

    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>

    <el-table
        border
        stripe
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%"
    >
      <el-table-column prop="uid" label="用户id"/>
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="userType" label="用户类型" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button  type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.uid)">
            <template #reference>
              <el-button  type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

    <el-dialog v-model="dialogVisible" title="新增用户" width="40%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名" style="width: 80%">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="昵称" style="width: 80%">
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item label="密码" style="width: 80%">
<!--          <el-input v-model="form.password" />-->
          <el-input style=""
                    v-model="form.password"
                    show-password
                    auto-complete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio-group v-model="form.userType" >
            <el-radio label="1" >普通用户</el-radio>
            <el-radio label="0" >管理员</el-radio>、
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="1" >男</el-radio>
            <el-radio label="0" >女</el-radio>
            <el-radio label="2" >未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" style="width: 80%">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" style="width: 80%">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="地址" style="width: 80%">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="备注" style="width: 80%">
          <el-input v-model="form.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer >
      <span class="dialog-footer" >
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="save()">确定</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible1" title="编辑用户" width="40%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户id" style="width: 80%" >
          <el-input v-model="form.uid" readonly/>
        </el-form-item>
        <el-form-item label="用户名" style="width: 80%" >
          <el-input v-model="form.userName" readonly/>
        </el-form-item>
        <el-form-item label="昵称" style="width: 80%">
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio-group v-model="form.userType" >
            <el-radio label="1" >普通用户</el-radio>
            <el-radio label="0" >管理员</el-radio>、
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="1" >男</el-radio>
            <el-radio label="0" >女</el-radio>
            <el-radio label="2" >未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" style="width: 80%">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" style="width: 80%">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="地址" style="width: 80%">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="备注" style="width: 80%">
          <el-input v-model="form.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer >
      <span class="dialog-footer" >
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="update()">确定</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";
import {ElMessage} from "element-plus";

export default {
  name: 'HomeView',
  components: {
  },
  data(){
    return{
      search: "",
      tableData: [],
      currentPage: 0,
      pageSize: 5,
      total: 0,
      form: {},
      dialogVisible: false,
      dialogVisible1: false
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      request.get("/user/find",{
        params:{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res =>{
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum
      this.load()
    },
    handleDelete(id){
      console.log(id)
      request.delete("/user/delete/" + id).then(res => {
        console.log(res)
        let type;
        if(res.code === 200)
          type = "success"
        else
          type = "error"
        ElMessage({
          showClose: true,
          message: res.msg,
          type: type,
        })
        this.load()
      })
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible1 = true
    },
    add(){
      this.form = {}
      this.dialogVisible=true;
      this.load()
    },
    save(){
      console.log(this.form)
      if(this.form.userName === null || this.form.password === null || this.form.userType === null){
        ElMessage({
          showClose: true,
          message: '请至少输入用户名,密码和用户类型',
          type: 'error',
        })
      }else{
        request.post("/user/add",this.form).then(res => {
          console.log(res)
          let type;
          if(res.code === 200)
            type = "success"
          else
            type = "error"
          ElMessage({
            showClose: true,
            message: res.msg,
            type: type,
          })
        })
      }
      this.load()
      this.dialogVisible=false;
    },
    update(){
      console.log(this.form)
      request.put("/user/update",this.form).then(res => {
        console.log(res)
        let type;
        if(res.code === 200)
          type = "success"
        else
          type = "error"
        ElMessage({
          showClose: true,
          message: res.msg,
          type: type,
        })
      })
      this.load()
      this.dialogVisible1=false;
    }
  }
}
</script>
