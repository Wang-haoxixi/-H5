<!--
 * @Description:  
 * @Author: 城市选择
 * @Date: 2022-06-08 15:34:37
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-14 09:05:52
-->
<template>
  <div class="city">
    <van-nav-bar z-index="2" fixed title="城市选择" left-text="" left-arrow @click-left="onClickLeft">
      <template #left>
        <img src="@/assets/icons/navbar-goback.png" width="24px">
      </template>
    </van-nav-bar>
    <!-- 头部占位 -->
    <div style="height: 46px"></div>
    <div class="header">
      <van-search clear-trigger="always" v-model="cityName" shape="round" placeholder="输入城市名、拼音或首字母查询" @input="input" />
      <div class="refresh-current" v-show="!cityName">
        <div class="title f a-i-c">
          您所在地区 <img src="@/assets/icons/city-location-update.png" @click="handleUpdate" width="16px" height="16px" class="margin-left-6">
        </div>
        <div class="current">
          <van-button size="small" round>{{ this.$store.state.app.cityName }}</van-button>
        </div>
      </div>
    </div>
    <!-- IndexBar -->
    <van-index-bar :sticky-offset-top="188" z-index="1" v-show="!cityName">
      <div v-for="(value, key, index) in citysData" :key="index">
        <van-index-anchor :index="key" />
        <template v-for="(_item, _index) in value">
          <van-cell :title="_item.name" :key="_index" v-if="_item.pinyin == key" @click="handleCity(_item)" />
        </template>
      </div>
    </van-index-bar>
    <!-- 搜索时 -->
    <div class="search-result" v-show="cityName">
      <div v-for="(value, key, index) in searchData" :key="index">
        <div class="flag">{{ key }}</div>
        <div class="name" v-for="(_item, _index) in value" :key="_index">{{ _item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // 城市数据
  import city from "@/utils/city.json";
  // 字母
  import { letter } from "@/utils/common.js";
  export default {
    name: "City",
    data () {
      return {
        // 城市名称
        cityName: "",
        // 重构后的城市数据
        citysData: [],

        // 搜索后的数据
        searchData: [],
      }
    },
    created () {
      this.citysData = city.city;
      this.resetCity();
    },
    methods: {
      // 点击左侧搜索
      onClickLeft () {
        this.$router.back();
      },
      // 更新所在地区
      handleUpdate () {},
      // 重构城市数据
      resetCity () {
        let newData = {};
        letter.forEach(ele => {
          newData[ele] = [];
          city.city.forEach(item => {
            if (item.pinyin == ele) {
              newData[ele].push(item);
            }
          })
        });
        this.citysData = newData;
      },
      // 选择城市
      handleCity (item) {
        // 设置城市名称
        this.$store.commit("app/SET_CITY_NAME", item.name);
        // 设置 选择城市后的数据对象
        this.$store.commit("app/SET_SELECTED_CITY", item);
        // 根据当前城市code,过滤获取到城市信息
        this.$store.commit("app/SET_CITY_INFO");
        // 过滤出全城code集
        this.$store.commit("app/SET_CITY_CODE_ARR");
        // 返回上一页
        this.$router.back();
      },
      // 输入框内容变化时触发
      input (val) {
        let newData = {};
        for (let key in this.citysData) {
          let itemObj = [];
          this.citysData[key].forEach(item => {
            if (val && item.name.includes(val)) {
              itemObj.push(item);
            }
          })
          if (itemObj && itemObj.length > 0) {
            newData[key] = itemObj;
          }
        }
        this.searchData = newData;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .city {
    .header {
      position: fixed;
      top: 46px;
      left: 0px;
      right: 0px;
      z-index: 2;
    }

    .refresh-current {
      background-color: #fff;
    }

    .current {
      padding-left: 16px;
      padding-bottom: 14px;
    }

    .van-button {
      padding: 4px 25px;
    }
  }

  .title {
    padding: 6px 0 16px 16px;
    font-size: 14px;
    color: $black-three-color;
    line-height: 20px;
  }

  .search-result {
    margin-top: 54px;
    color: $black-main-color;
    font-size: 14px;

    .flag {
      padding-left: 24px;
      line-height: 20px;
      background-color: #F5F6F7;
    }

    .name {
      padding: 15px 24px;
      background-color: #fff;
    }
  }
</style>