/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-10 09:04:33
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-13 14:15:28
 */
import axios from "axios";

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
// 创建axios实例, 赋给常量 service
const service = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    /**
     * 在发送请求之前做些什么
    */
    // 配置请求头
    // config.headers.Token = getToken();
    // config.headers.UserName = getUserName();
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAwMzQ5MTc0OTg2N2E0NzYzMDNkZmNiNTI2Njg2MDIwM2FmNmQ4NTkzYjA0MjczYWJlOGIxZmZmYjk3YzU4MzdmY2E5OTY5MjVkYzRmY2M4In0.eyJhdWQiOiIxMiIsImp0aSI6IjAwMzQ5MTc0OTg2N2E0NzYzMDNkZmNiNTI2Njg2MDIwM2FmNmQ4NTkzYjA0MjczYWJlOGIxZmZmYjk3YzU4MzdmY2E5OTY5MjVkYzRmY2M4IiwiaWF0IjoxNjU1MDgyMzExLCJuYmYiOjE2NTUwODIzMTEsImV4cCI6MTY4NjYxODMxMSwic3ViIjoiMTAwMDAwMDY0NyIsInNjb3BlcyI6W10sImlzcyI6Im1lbWJlciJ9.A_ENd-hhC7Qq2We0mjhPy5y3AksYzEAb2LO_Mt5Z2BApyI8Mvvz5yd6rsXboDynIzJtGABjzN3niYi6Wqw-v38KAX4m7g9Fuwhc5fliRtcJu4_JkysDDLWHEbCFRprYNJWD1FeExjknV_xTzAHZWHlXhX5Iza8zUOf9RC6kYiwwknMTAwqd8-2QlcfX4v8vkcoX-XQv9ySlyJDjMtCSGo_JLUtw0-Ra6nElaZb_6WE10i_W52pjmB6hDYs6slmW0VvAQLaZ_Q_HT1c3f6tymflR-KfwjtdskfOTJdMtb5SeHxIIiQMNRRerVzJgkx5ZgeNX5BhS575S4QgtqH5gHa2j1tfK_h-0JsErhYc6wGmaAfZunVxFGdKIopcJPj3qbGiONNVitlbQGfNOud9u0qU2AYZcWk2YGuq04W_foteVVpNHSYTerqt6-dkcguTLAJCNA1UBrD8myZRShUYzRcMShFrA61toG-Z11L1TeekxDqWneq7yCVxajLiBzTcmLGjthqlIvjQG6RoLTlJoUfjM_sU-aBg-qVrCvn0rUs_OAa1BtW4FaKUVpfqWGFc-PJjs3BToFKbSrePA2-tg2YHl-Hrv0gbq9rQbF63qRzRCKwfSJ06XJsvcn3zlI0_wPwfDcCqPtWzrNIxweM6d5vA_F5SXh2_LFCgZxKWD2i48'
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    /**
     * 对响应数据做点什么
     */
    // if (response.data.resCode !== 0) {
    //     Message.error(response.data.message)
    //     return Promise.reject(response);
    // } else {
    //     return response;
    // }
    return response;
}, function (error) {
    // 对响应错误做点什么
    // code...
    return Promise.reject(error);
});

export default service;