/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-06 15:33:34
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-10 10:31:08
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from './modules/app'

export default new Vuex.Store({

  modules: {
    app,
  },
});