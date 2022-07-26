import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/user",
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import("@/views/User"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
