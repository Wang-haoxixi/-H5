/*
 * @Description: 城市相关接口
 * @Author: xxx
 * @Date: 2022-06-10 09:04:33
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-10 14:22:10
 */
import service from "@/utils/request.js";

// 获取公共服务城市列表
export function CityList(params) {
    return service.request({
        method: 'get',
        url: '/platformsys/index/areas/list',
        params,
    })
}
// 获取公共服务子级城市列表
export function AreasList(params) {
    return service.request({
        method: 'get',
        url: '/platformsys/index/areas/children',
        params,
    })
}