/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-06 15:33:34
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-08 15:36:19
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout/index.vue";

Vue.use(VueRouter);

const routes = [
  { // 布局页
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: Layout,
    children: [
      { // 首页
        path: "/home",
        name: "Home",
        component: () => import("../views/Home/index.vue")
      },
      { // 订单
        path: "/order",
        name: "Order",
        component: () => import("../views/Order/index.vue")
      },
      { // 我的
        path: "/mine",
        name: "Mine",
        component: () => import("../views/Mine/index.vue")
      },
    ]
  },
  { // 搜索
    path: "/search",
    name: "Search",
    component: () => import("../views/Search/index.vue")
  },
  { // 城市
    path: "/city",
    name: "City",
    component: () => import("../views/City/index.vue")
  },
];

const router = new VueRouter({
  routes,
});

export default router;
