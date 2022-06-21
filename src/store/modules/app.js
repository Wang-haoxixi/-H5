/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-10 10:29:40
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-10 14:15:04
 */
const state = {
  // 城市名称
  cityName: "全国",
  // 区县城市code
  areaCode: "",
  // 全城code集
  cityCodeArr: [],
  // 选择城市后的数据
  selectedCity: {},
  // 当前城市信息
  cityInfo: {},
}
const getters = {
  cityName: state => state.cityName,
}
// 提交方法， 改变state中的值（同步）
const mutations = {
  // 根据当前城市code,过滤获取到城市信息
  SET_CITY_INFO(state, value) {
    const allCitys = JSON.parse(sessionStorage.getItem("allCitys"));
    // 第一层循环
    allCitys.forEach(item => {
      if (item.code == state.selectedCity.code) {
        state.cityInfo = item.children[0];
        // sessionStorage.setItem("cityInfo", JSON.stringify(state.cityInfo));
        // console.log("直辖市", state.cityInfo)
        return false
      } else {
        // 第二层循环
        item.children.forEach(_item => {
          if (_item.code == state.selectedCity.code) {
            state.cityInfo = _item;
            // sessionStorage.setItem("cityInfo", JSON.stringify(state.cityInfo));
            // console.log("市级", state.cityInfo)
            return false
          }
        })
      }
    })
  },

  // 过滤出全城code集
  SET_CITY_CODE_ARR(state, value) {
    let arr = [];
    const allCitys = JSON.parse(sessionStorage.getItem('allCitys'));
    allCitys.forEach(item => {
      item.children.forEach(_item => {
        if (_item.parent_id == state.cityInfo.parent_id) {
          arr.push(_item.code);
        }
      })
    });
    state.cityCodeArr = arr;
    // console.log(state.cityCodeArr);
  },

  // 设置城市名称
  SET_CITY_NAME(state, value) {
    state.cityName = value;
  },

  // 设置 选择城市后的数据
  SET_SELECTED_CITY(state, value) {
    state.selectedCity = value;
  },

  // 设置区县code
  SET_AREA_CODE(state, value) {
    state.areaCode = value;
  }
}
const actions = { // 提交mutations中的方法并运行 (直接commit中的方法，或运行异步代码返回出去，回调处理事情)

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
