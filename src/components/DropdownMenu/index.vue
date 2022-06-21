<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-07 11:56:13
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-13 15:45:34
-->
<template>
  <div class="filter-data f">
    <!-- 下拉菜单 -->
    <div class="dropdown-menu f-1">
      <van-dropdown-menu active-color="#2CD8AA">
        <van-dropdown-item v-model="value" ref="addressItem" @open="open">
          <template #title>
            <span :style="{ color: title != '区域' ? '#2CD8AA' : '#333333' }">
              {{ title }}
            </span>
          </template>
          <!-- 当前地点定位为全国 -->
          <van-empty class="empty-image" :image="require('@/assets/images/search-empty.png')" v-if="city === '全国'" description="当前地点定位为全国，请先选择城市，再选择对应区域。" />
          <!-- 当前地点定位不是全国 -->
          <div class="address-item" v-else-if="city !== '全国'">
            <van-grid :border="false" :column-num="4">
              <van-grid-item>
                <span class="name" :class="{ 'active': value == 0 }" @click="changeAddress({ name: '全城', code: '' })">全城</span>
              </van-grid-item>
            </van-grid>
            <van-grid :border="false" :column-num="4">
              <van-grid-item v-for="(item, index) in areas" :key="index">
                <span class="name ellipsis-single" :class="{ 'active': value == item.code }" @click="changeAddress(item)">{{ item.name }}</span>
              </van-grid-item>
            </van-grid>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <span class="filter-item f-1" :style="{ color: appointment == 1 ? '#2CD8AA' : '#333333' }" @click="handleApply">预约最多</span>
    <span class="filter-item f-1" :style="{ color: distance == 1 ? '#2CD8AA' : '#333333' }" @click="handleDistance">距离优先</span>
  </div>
</template>

<script>
  export default {
    name: "DropdownMenu",
    props: {
      // 区域数据
      areas: {
        type: Array,
        default: () => []
      },
      // 区域code
      areaCode: {
        type: String,
        default: ""
      },
      // 预约最多
      appointment: {
        type: Number,
        default: 0
      },
      // 距离优先
      distance: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        // 当前城市
        city: this.$store.state.app.cityName,
        // 菜单项标题
        title: "区域",
        // 菜单选项值
        value: 0,
      }
    },
    watch: {
      // 监听下拉项是否改变，改变则重新加载商家列表
      title: {
        handler (newVal) {
          this.$emit("getShopList", true);
        }
      },
    },
    methods: {
      // 选择城市
      changeAddress (data) {
        console.log(data)
        // 设置区县code(全程：""; 区县：有值)
        this.$store.commit("app/SET_AREA_CODE", data.code && data.code);
        this.value = data.code;
        this.title = data.name;
        // 关闭下拉菜单
        this.$refs.addressItem.toggle();
      },
      open () {
        // console.log(this.$refs.addressItem)
      },
      // 预约最多
      handleApply () {
        this.appointment == 0 ? this.$emit("update:appointment", 1) : this.$emit("update:appointment", 0);
        this.$emit("update:distance", 0);
        this.$emit("getShopList", true);
      },
      // 距离优先
      handleDistance () {
        this.distance == 0 ? this.$emit("update:distance", 1) : this.$emit("update:distance", 0);
        this.$emit("update:appointment", 0);
        this.$emit("getShopList", true);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .address-item {
    padding: 0 16px;

    .name {
      display: inline-block;
      width: 78px;
      line-height: 24px;
      text-align: center;
      font-size: 13px;
      color: $black-main-color;
      border-radius: 12px;
      background-color: #f5f6f7;
      padding: 0 10px;
      box-sizing: border-box;

      &.active {
        background-color: $second-main-color;
        color: #fff;
      }
    }
  }
</style>