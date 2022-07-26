import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/Layout";
import Login from "@/views/Login";
import request from "@/utils/request";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import("@/views/Home"),
      },{
        path: 'user',
        name: 'User',
        component: () => import("@/views/User"),
      },{
        path: 'role',
        name: 'Role',
        component: () => import("@/views/Role"),
      }, {
        path: 'document',
        name: 'Document',
        component: () => import("@/views/Document"),
      },{
        path: 'read',
        name: 'Read',
        component: () => import("@/views/Read"),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to.path)
  if(to.path === '/login' || to.path === '/' || from.path === '/login')
    next()
  let token = localStorage.getItem("token")
  if(token === null || token === ""){
    next('/login')
  }
  request.post("/menu/Jump",String(to.path)).then(res => {
    console.log(res)
    if(res.code === 200)
      next()
    else
      next('login')
  })
})

export default router
