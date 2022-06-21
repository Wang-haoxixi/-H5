<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-08 16:05:56
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-08 17:33:54
-->
<template>
    <van-button class="btn" :color="bgColor" :icon="icon" :style="{ width: width,height: height, color: fontColor, 'border-color': borderColor, }" round>
        <slot></slot>
    </van-button>
</template>

<script>
export default {
    name: "Button",
    props: {
        // 字体颜色
        fontColor: {
            type: String,
            default: ""
        },
        // 边框颜色
        borderColor: {
            type: String,
            default: ""
        },
        // 背景色
        bgColor: {
            type: String,
            default: ""
        },
        // 图标
        icon: {
            type: String,
            default: ""
        },
        // 宽
        width: {
            type: String,
            default: ""
        },
        // 宽
        height: {
            type: String,
            default: ""
        },
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
</style>