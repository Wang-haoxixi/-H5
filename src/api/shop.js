/*
 * @Description: 商家相关接口
 * @Author: xxx
 * @Date: 2022-06-10 11:35:27
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-13 10:45:37
 */
import service from "@/utils/request.js";

// 商家列表
export function ShopList(data) {
  return service.request({
    method: 'post',
    url: '/health/member/device/list',
    data,
  })
}
// 商家搜索输入联想 
/**
 * 此接口已废弃，用下方search接口
 */
export function SearchAssociation(data) {
  return service.request({
    method: 'post',
    url: '/health/index/shop/association',
    data,
  })
}
// 商家搜索
export function ShopSearch(data) {
  return service.request({
    method: 'post',
    url: '/health/index/shop/search',
    data,
  })
}