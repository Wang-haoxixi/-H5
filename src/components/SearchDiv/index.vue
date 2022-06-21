<!--
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-07 10:34:54
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-14 09:04:03
-->
<template>
  <!-- 假搜索(盒子) -->
  <div class="f">
    <div class="search-div f-1 f a-i-c" :style="{ 'border': `2px solid ${show ? '#F5F6F7' : '#2CD8AA'}`, 'background-color': show ? '#F5F6F7' : '#FFFFFF' }">
      <img src="@/assets/icons/search-location.png" width="16px">
      <span class="address ellipsis-single" @click="toCityPage">{{ city }}</span>
      <span class="line"></span>
      <img src="@/assets/icons/search-find.png" width="16px">
      <div @click="toSearchPage">
        <input type="text" class="input" v-model.trim="keyword" @focus="haneleFocus" :disabled="disabled" placeholder="请输入想要搜索的商家" :style="{ 'background-color': show ? '#F5F6F7' : '#FFFFFF' }">
      </div>
      <img src="@/assets/icons/search-delete.png" width="15px" height="15px" @click="handleClear" v-show="keyword">
    </div>
    <span class="concel" v-show="!disabled" @click="handleRightText">{{ keyword ? "搜索" : "取消" }}</span>
  </div>
</template>

<script>
  export default {
    name: "SearchDiv",
    props: {
      // 菜单是否已经悬浮
      show: {
        type: Boolean,
        default: false,
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false,
      },
      // 搜索内容
      searchValue: {
        type: String,
        default: "",
      },
      // 搜索状态
      searchFlag: {
        type: Boolean,
        default: true,
      }
    },
    data () {
      return {
        // 当前城市
        city: this.$store.state.app.cityName,
        // 检索关键字
        keyword: "",
      }
    },
    watch: {
      // 侦听内部输入框值的变化
      keyword: {
        handler (newVal) {
          // 反向修改传入的searchValue值
          this.$emit("update:searchValue", newVal);
        },
      }
    },
    methods: {
      // 去城市选择页面
      toCityPage () {
        this.$router.push({
          name: "City",
        })
      },
      // 去商家搜索页面
      toSearchPage () {
        if (this.disabled) {
          this.$router.push({
            name: "Search",
          })
        }
      },
      // 清除搜索关键字
      handleClear () {
        this.$emit("update:searchFlag", true);
        this.keyword = "";
      },
      // 点击右侧按钮
      handleRightText () {
        if (!this.keyword) {
          this.$router.back();
        } else {
          this.$emit("search", this.keyword);
        }
      },
      // 监听输入框聚焦
      haneleFocus () {
        this.$emit("update:searchFlag", true);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-div {
    width: 100%;
    height: 36px;
    border-radius: 18px;
    box-sizing: border-box;
    padding: 0 16px;

    .address {
      width: 50px;
      color: $black-main-color;
      font-size: 14px;
      margin-left: 2px;
      flex-shrink: 0;
    }

    .line {
      width: 1px;
      height: 16px;
      background-color: #eeeeee;
      margin: 0 10px 0 0;
    }

    .placeholder {
      margin-left: 3px;
      color: #cccccc;
      font-size: 14px;
    }

    .input {
      border: none;
      width: 100%;
    }

    .input::-webkit-input-placeholder {
      color: #CCCCCC;
      font-size: 14px;
    }

    .input:-moz-placeholder {
      color: #CCCCCC;
      font-size: 14px;
    }

    .input::-moz-placeholder {
      color: #CCCCCC;
      font-size: 14px;
    }

    .input:-ms-input-placeholder {
      color: #CCCCCC;
      font-size: 14px;
    }
  }

  .concel {
    width: 35px;
    color: $black-main-color;
    font-size: 15px;
    margin-left: 12px;
    line-height: 36px;
    flex-shrink: 0;
  }
</style>