<!--
 * @Description: 
 * @Author: 搜索页面
 * @Date: 2022-06-08 09:50:55
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-13 15:12:01
-->
<template>
  <div class="search">
    <div class="search-warp">
      <SearchDiv ref="searchRef" :show="true" :searchValue.sync="searchValue" :searchFlag.sync="searchFlag" @search="search" />
    </div>
    <!-- 搜索中 -->
    <div class="search-history" v-show="searchFlag">
      <!-- 头部占位 -->
      <div style="height: 56px"></div>
      <!-- 搜索历史 -->
      <div v-if="!searchValue">
        <div class="h3-title f j-c-b">搜索历史 <img src="@/assets/icons/history-delete.png" width="16px" height="16px" @click="handleClear"></div>
        <!-- 无搜索记录 -->
        <div class="no-data" v-if="!localRecords || localRecords.length == 0">(￣.￣) 您没有相关搜索记录~</div>
        <!-- 有搜索记录 -->
        <div class="records-list f f-w-w" v-if="localRecords && localRecords.length > 0">
          <span class="ellipsis-single" v-for="(item) in localRecords" :key="item" @click="handleRecord(item)">{{ item }}</span>
        </div>
      </div>
      <!-- 输入联想 -->
      <div class="search-list" v-if="searchValue">
        <div class="f a-i-c padding-bottom-24" v-for="(item, index) in aboutData" :key="index" @click="searchResult(item, index)">
          <img src="@/assets/icons/search-find.png" width="16px" height="16px">
          <span class="ellipsis-single padding-left-7" v-html="item"></span>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result" v-show="!searchFlag">
      <!-- 头部占位 -->
      <div style="height: 56px"></div>
      <!-- 有数据 -->
      <template v-if="cardData && cardData.length > 0">
        <van-list v-model="loading" :finished="finished" :immediate-check="false" :offset="0" finished-text="(￣.￣) 亲，没有更多了~" @load="onLoad">
          <Card v-for="(item, index) in cardData" :key="index" :cardData="item" />
        </van-list>
      </template>
      <!-- 无数据 -->
      <template v-else>
        <van-empty class="empty-image" :image="require('@/assets/images/search-empty.png')" description="没有找到您搜索的商家" />
      </template>
    </div>
  </div>
</template>

<script>
  import SearchDiv from "@/components/SearchDiv"
  import Card from "@/components/Card"
  import { dealAboutData } from "@/utils/common"
  // 接口
  import { ShopSearch } from "@/api/shop"
  export default {
    name: "Search",
    components: { SearchDiv, Card },
    data () {
      return {
        // 搜索状态
        searchFlag: true,
        // 搜索内容
        searchValue: "",
        // 本地搜索记录
        localRecords: JSON.parse(localStorage.getItem("searchRecords")),
        // 卡片数据
        cardData: [],
        // 联想HTML数据
        aboutData: [],
        // 查找项
        searchData: [],
        // 是否处于加载状态
        loading: false,
        // 是否已加载完成
        finished: false,
        // 分页
        page: 1,
        // 分页量
        pageSize: 10,
        // 最后一页
        lastPage: 0,
      }
    },
    watch: {
      // 监听搜索关键字变化
      searchValue: {
        handler (newVal) {
          this.reset();
          if (this.searchValue) {
            this.searchShop();
          }
        }
      }
    },
    methods: {
      // 搜索
      search (data) {
        let searchRecords = JSON.parse(localStorage.getItem("searchRecords"));
        if (!searchRecords || searchRecords.length == 0) {
          searchRecords = [];
          searchRecords.unshift(this.searchValue);
          this.localRecords = searchRecords;
          localStorage.setItem("searchRecords", JSON.stringify(searchRecords));
        } else {
          const index = searchRecords.indexOf(this.searchValue);
          if (index == -1) {
            searchRecords.unshift(this.searchValue);
            this.localRecords = searchRecords;
            localStorage.setItem("searchRecords", JSON.stringify(searchRecords));
          } else {
            searchRecords.splice(index, 1);
            searchRecords.unshift(this.searchValue);
            this.localRecords = searchRecords;
            localStorage.setItem("searchRecords", JSON.stringify(searchRecords));
          }
        }
        // 显示商家列表
        this.searchFlag = false;
        this.reset();
        // 商家搜索
        this.searchShop();
      },
      // 商家搜索
      searchShop () {
        const requestData = {
          shop_name: this.searchValue,
          lng: 106.609319,
          lat: 29.648762,
          city: this.$store.state.app.cityName === "全国" ? "" : this.$store.state.app.cityInfo.code,
          page: this.page,
          pageSize: this.pageSize,
        }
        this.loading = true;
        ShopSearch(requestData).then(res => {
          const data = res.data.data.list;
          if (data && data.length >= 0) {
            this.lastPage = res.data.data.last_page;
            // 卡片数据
            this.cardData = this.cardData.concat(data);
            // 分页+1
            this.page += 1;
            // 查找项
            this.searchData = data.map(item => item.shop_name);
            // 联想HTML数据
            this.aboutData = this.searchData.map(item => dealAboutData(this.searchValue, item));

            this.loading = false;
            // 此处判断数据是否已经加载完毕
            if (this.page > this.lastPage) {
              return this.finished = true;
            }
          } else {
            this.finished = true;
          }
        }).catch(err => {
          this.finished = true;
        })
      },
      // 上拉触底
      onLoad () {
        console.log("onLoad..")
        this.searchShop();
      },
      // 重置列表请求
      reset () {
        this.page = 1;
        this.cardData = [];
        this.finished = false;
      },
      // 点击联想字段
      searchResult (item, index) {
        this.searchFlag = false;
        this.reset();
        this.$refs.searchRef.keyword = this.searchData[index];
      },
      // 点击历史项
      handleRecord (data) {
        this.searchFlag = false;
        this.reset();
        this.$refs.searchRef.keyword = data;
      },
      // 清空搜索历史
      handleClear () {
        localStorage.clear();
        this.localRecords = [];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    background-color: #ffffff;
    position: relative;

    .search-warp {
      padding: 10px 16px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 4;
      background-color: #fff;
    }

    .search-history {
      min-height: 242px;
      padding: 6px 24px 10px;
    }

    .h3-title {
      font-weight: 500;
      color: $black-main-color;
      line-height: 20px;
      font-size: 14px;
    }

    .no-data {
      padding-top: 24px;
      line-height: 18px;
      color: $black-three-color;
      font-size: 13px;
    }

    .records-list {
      span {
        color: $black-main-color;
        font-size: 13px;
        line-height: 18px;
        padding: 3px 26px;
        background-color: #f5f6f7;
        margin-right: 10px;
        margin-top: 16px;
        border-radius: 12px;
      }
    }

    .search-result {
      background-color: #f5f6f7;
      padding: 10px 16px;
    }
  }
</style>