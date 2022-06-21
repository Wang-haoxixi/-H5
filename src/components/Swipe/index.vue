<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-07 11:16:10
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-07 11:40:57
-->
<template>
  <van-swipe class="swipe-box" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in swipeData" :key="index">
      <img :src="item.img" width="100%" height="118px">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  export default {
    name: "Swipe",
    props: {
      // 轮播数据
      swipeData: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swipe-box {
    border-radius: 10px;
  }
</style>