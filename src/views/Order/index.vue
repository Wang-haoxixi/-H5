<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-07 08:59:29
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-10 09:20:24
-->
<template>
  <div class="order">
    <!-- 导航栏 -->
    <NavBar :navBarConfig="navBarConfig" />
    <div style="height: 54px"></div>
    <Health-examination v-for="item in 10" :key="item" />
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  import HealthExamination from "./components/health-examination.vue";
  export default {
    name: 'OrderView',
    components: { NavBar, HealthExamination },
    data () {
      return {
        navBarConfig: {
          // 标题
          title: "订单",
          // 左侧图片
          leftImg: require("@/assets/icons/navigation-bar-exit.png"),
          // 右侧图片
          rightImg: require("@/assets/icons/navigation-bar-info.png"),
          // 图片大小
          width: "24px"
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order {
    padding: 0 16px;
  }
</style>