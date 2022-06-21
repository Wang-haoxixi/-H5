<!--
 * @Description: 
 * @Author: 首页
 * @Date: 2022-06-07 08:59:29
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-13 15:36:37
-->
<template>
  <div class="home">
    <!-- <div style="height: 44px"></div> -->
    <!-- 导航栏 -->
    <NavBar :navBarConfig="navBarConfig" :bgColor="bgColor" />
    <!-- 假搜索 -->
    <div class="search-warp" :style="{ 'background-color': bgColor }">
      <SearchDiv :show="show" disabled />
    </div>
    <div class="container">
      <!-- 轮播 -->
      <div class="swipe-content">
        <Swipe :swipeData="swipeData" />
      </div>
      <!-- 下拉菜单 -->
      <div id="dropdown-menu">
        <DropdownMenu ref="dropdownMenuRef" @getShopList="getShopList" :areas="areas" :appointment.sync="appointment" :distance.sync="distance" />
      </div>
      <div style="height: 48px" v-show="show"></div>
      <!-- 商家卡片项数据 -->
      <van-list v-model="loading" :finished="finished" :immediate-check="false" :offset="50" finished-text="(￣.￣) 亲，没有更多了~" @load="onLoad">
        <Card v-for="(item, index) in cardData" :key="index" :cardData="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  import SearchDiv from "@/components/SearchDiv";
  import Swipe from "@/components/Swipe";
  import DropdownMenu from "@/components/DropdownMenu";
  import Card from "@/components/Card";
  // 接口
  import { ShopList } from "@/api/shop";
  import { CityList, AreasList } from "@/api/city";
  export default {
    name: 'HomeView',
    components: { NavBar, SearchDiv, Swipe, DropdownMenu, Card },
    data () {
      return {
        /**
         * 导航栏配置
         */
        navBarConfig: {
          // 标题
          title: "小巴康养",
          // 左侧图片
          leftImg: require("@/assets/icons/navigation-bar-exit.png"),
          // 右侧图片
          rightImg: require("@/assets/icons/navigation-bar-info.png"),
          // 图片大小
          width: "24px"
        },
        /**
         * 轮播数据
         */
        swipeData: [
          { img: require("@/assets/images/banner-online-appointment.png") },
          { img: require("@/assets/images/banner-new-appointment.png") },
          { img: require("@/assets/images/banner-guard.png") },
        ],
        // 卡片数据
        cardData: [],
        // 菜单是否已经悬浮
        show: false,
        // 背景色
        bgColor: 'rgba(255, 255, 255, .0)',
        // 区域数据
        areas: [],
        // 区域code
        // areaCode: '',
        // 预约优先
        appointment: 0,
        // 距离优先
        distance: 0,
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
        // 所有城市数据
        allCitys: [],
      }
    },
    created () {
      // 获取所有城市列表
      this.getAllCity();
      // 获取商家列表
      this.getShopList();
      // 获取子级城市列表
      this.getAreasList();
    },
    methods: {
      //改变元素#dropdown-menu的top值
      handleScroll () {
        // 获取文档在窗口左上角垂直方向滚动的像素
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log("scrollTop", scrollTop)
        // 获取 dropdown-menu 元素的顶部偏移量
        // let offsetTop = document.querySelector('#dropdown-menu').offsetTop;
        // console.log("offsetTop", offsetTop)
        if (scrollTop <= 338) {
          // 计算透明值
          let alphaValue = scrollTop / 338;
          this.show = false;
          this.bgColor = `rgba(255, 255, 255, ${alphaValue})`;
          document.querySelector('#dropdown-menu').style.position = 'static';
          document.querySelector('#dropdown-menu').style.margin = '';
        } else {
          this.bgColor = `rgba(255, 255, 255, 1)`;
          document.querySelector('#dropdown-menu').style.top = '100px';
          document.querySelector('#dropdown-menu').style.position = 'fixed';
          document.querySelector('#dropdown-menu').style.margin = '0 16px';
          this.show = true;
        }
      },
      // 获取商家列表
      getShopList (flag) {
        // 下拉菜单选项值是否改变 重置数据
        if (flag) {
          this.page = 1;
          this.cardData = [];
          this.finished = false;
        }
        // 请求参数
        let requsetData = {
          city: "", // 城市
          district: "", // 区域（城市名）
          appointment: this.appointment, // 预约最多(状态：1选择，0不选)
          distance: this.distance, // 距离优先(状态：1选择，0不选)
          lng: 106.609319, // 经度(数字类型)
          lat: 29.648762, // // 纬度
          page: this.page, // 分页
          pageSize: this.pageSize, // 分页量
        };
        if (this.$store.state.app.cityName == "全国") {
          requsetData.city = "";
          requsetData.district = "";
        } else {
          if (this.$store.state.app.areaCode) {
            requsetData.city = [this.$store.state.app.areaCode];
            requsetData.district = this.$store.state.app.areaCode;
          } else {
            requsetData.city = this.$store.state.app.cityCodeArr;
            requsetData.district = "";
          }
        }
        this.loading = true;
        // return false
        ShopList(requsetData).then(res => {
          let data = res.data.data.list;
          if (data && data.length >= 0) {
            this.lastPage = res.data.data.last_page;
            this.cardData = this.cardData.concat(data);
            this.page += 1;
            this.loading = false;
            // 此处判断数据是否已经加载完毕
            if (this.page > this.lastPage) {
              return this.finished = true;
            }
          } else {
            this.finished = true;
          }
        }).catch(() => {
          this.finished = true;
        })
      },
      // 获取所有城市列表
      getAllCity () {
        CityList().then(res => {
          const data = res.data.data.list;
          if (data && data.length >= 0) {
            this.allCitys = data;
            sessionStorage.setItem("allCitys", JSON.stringify(this.allCitys))
          }
        })
      },
      // 获取子级城市列表
      getAreasList () {
        AreasList({ parent_id: this.$store.state.app.cityInfo.id }).then(res => {
          const data = res.data.data.list;
          if (data && data.length >= 0) this.areas = data;
        })
      },
      // 上拉触底
      onLoad () {
        console.log("onLoad..")
        this.getShopList();
      },
    },
    mounted () {
      //给window添加一个滚动监听事件
      window.addEventListener('scroll', this.handleScroll)
    },
    // 销毁
    destroyed () {
      // 回到顶部
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // 离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.handleScroll);
      // 设置区县城市code为空字符
      this.$store.commit("app/SET_AREA_CODE", "");
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    background-image: url("@/assets/images/home-top-bg.png");
    background-color: #f5f6f7;
    background-size: 100% 403px;
    background-repeat: no-repeat;

    .search-warp {
      position: fixed;
      top: 46px;
      left: 0;
      right: 0;
      padding: 10px 16px 10px;
      z-index: 3;
    }

    .container {
      padding: 0px 16px 10px;

      .swipe-content {
        padding-top: 317px;
      }

      #dropdown-menu {
        // position: fixed;
        top: 300px;
        /*开始处于距离顶部545px的位置，之后随着滚动条滚动top值改变，然后在top==100时停止*/
        left: 0;
        right: 0;
        box-sizing: border-box;
        z-index: 2;
      }
    }
  }
</style>