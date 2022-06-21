<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-07 15:53:47
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-13 18:41:05
-->
<template>
  <div class="card-item">
    <van-card>
      <!-- 图片 -->
      <template #thumb>
        <div class="bg-img">
          <img :src="cardData.logo || cardData.shop.logo" width="100%" height="100%">
          <span class="num">{{ cardData.consume_count }}人约</span>
        </div>
      </template>
      <!-- 标题 -->
      <template #title>
        <div class="title">{{ cardData.shop_name }}</div>
      </template>
      <!-- 描述 -->
      <template #desc>
        <div class="time-address">
          <div class="font-size-12 padding-top-4 color-888 f a-i-c"><img class=" margin-right-4" src="@/assets/icons/card-business-hours.png" width="12px" /> 营业时间 {{ cardData.business_hours_start }} - {{ cardData.business_hours_end }}</div>
          <div class="font-size-12 padding-top-4 padding-bottom-6 color-888 f a-i-c"><img class="address-icon margin-right-4" src="@/assets/icons/card-address.png" width="12px" /> <div>{{ cardData.address }} ｜ {{ cardData.distance }}km</div></div>
          <ul class="tags f f-w-w">
            <li v-for="(item, index) in cardData.tag_text" :key="index">{{ item }}</li>
          </ul>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      cardData: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>