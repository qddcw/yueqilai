import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Layout from "../components/layout/layout.vue"


Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      path: "/",
      name: "layout",
      component: Layout,
      redirect: '/details',
      children: [{
        path: "/releaseActivity",
        name: "releaseActivity",
        component: () =>
          import("../views/releaseActivity"),
        meta: {
          title: '发布活动',
          keepAlive: true
        }
      }]
    },
    {
      path: "/activityDetails",
      component: Layout,
      children: [{
        path: "/activityDetails",
        name: "activityDetails",
        component: () =>
          import("../views/releaseActivity/activityDetails"),
        meta: {
          title: '活动详情'
        }
      }]
    },
    {
      path: "/activityNumbers",
      component: Layout,
      children: [{
        path: "/activityNumbers",
        name: "activityNumbers",
        component: () =>
          import("../views/releaseActivity/activityNumbers"),
        meta: {
          title: '活动人数'
        }
      }]
    },
    {
      path: "/activityTime",
      component: Layout,
      children: [{
        path: "/activityTime",
        name: "activityTime",
        component: () =>
          import("../views/releaseActivity/activityTime"),
        meta: {
          title: '活动时间'
        }
      }]
    },
    {
      path: "/activityAddress",
      component: Layout,
      children: [{
        path: "/activityAddress",
        name: "activityAddress",
        component: () =>
          import("../views/releaseActivity/activityAddress"),
        meta: {
          title: '活动地址'
        }
      }]
    },
    {
      path: "/details",
      component: Layout,
      children: [{
        path: "/details",
        name: "details",
        component: () =>
          import("../views/details"),
        meta: {
        }
      }]
    },
    {
      path: "/home",
      component: Layout,
      children: [{
        path: "/home",
        name: "home",
        component: () =>
          import("../views/home"),
        meta: {
          title: '书籍列表'
        }
      }]
    },
    {
      path: "/allbook",
      component: Layout,
      children: [{
        path: "/",
        name: "allbook",
        component: () =>
          import("../views/allBook"),
        meta: {
          title: '书籍列表'
        }
      }]
    },





  ]
}, ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router