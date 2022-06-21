/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-06 15:33:34
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-06 16:59:59
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // 编译过程中将 import 语句自动转换为按需引入的方式
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
};
