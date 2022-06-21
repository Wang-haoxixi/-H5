<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-07 09:24:32
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-07 10:14:58
-->
<template>
    <van-nav-bar :title="navBarConfig.title" fixed :style="{ 'background-color': bgColor }">
        <!-- 左侧区域内容 -->
        <template #left>
            <img :src="navBarConfig.leftImg" :width="navBarConfig.width">
        </template>
        <!-- 右侧区域内容 -->
        <template #right>
            <img :src="navBarConfig.rightImg" :width="navBarConfig.width">
        </template>
    </van-nav-bar>
</template>

<script>
export default {
    name: "NavBar",
    props: {
        // 导航栏配置
        navBarConfig: {
            type: Object,
            default: () => { }
        },
        // 导航栏背景色
        bgColor: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
</style>