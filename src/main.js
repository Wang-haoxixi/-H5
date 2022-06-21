/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-06 15:33:34
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-06 16:56:30
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入vant.js
import '@/utils/vant';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
