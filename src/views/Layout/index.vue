<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-06 15:40:36
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-07 17:26:46
-->
<template>
  <div>
    <!-- 二级路由窗口 -->
    <div class="view">
      <router-view />
    </div>
    <div style="height: 50px;"></div>
    <!-- tabbar -->
    <van-tabbar route active-color="#00E6BF" inactive-color="#DDDDDD" v-model="active">
      <van-tabbar-item v-for="(item, index) in tabbarConfig" :key="index" replace :to="item.url">
        <span class="font-weight-600">{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'LayoutView',
    data () {
      return {
        // 当前tabbar选中的索引值
        active: 0,
        // tabbar配置项
        tabbarConfig: [{
            url: '/home',
            name: '首页',
            activeIcon: require('@/assets/icons/home-tabbar-activated.png'),
            inactiveIcon: require('@/assets/icons/home-tabbar-inactive.png')
          },
          {
            url: '/order',
            name: '订单',
            activeIcon: require('@/assets/icons/order-tabbar-activated.png'),
            inactiveIcon: require('@/assets/icons/order-tabbar-inactive.png')
          },
          {
            url: '/mine',
            name: '我的',
            activeIcon: require('@/assets/icons/mine-tabbar-activated.png'),
            inactiveIcon: require('@/assets/icons/mine-tabbar-inactive.png')
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>