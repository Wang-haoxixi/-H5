/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-09 17:44:04
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-09 17:44:23
 */
/**
* 联想处理
* searchKey: 搜索关键字
* text: 原数据
*/
export function dealAboutData(searchKey, text) {
  const charReg = /[\[\]\\]/gi; //替换需要转义的字符（这些字符在正则中代表特殊含义）
  const newText = searchKey.replace(charReg, '\\$&') //把输入中需要转义的字符替换（替换后正则规则就匹配原有字符本身）
  const reg = new RegExp(`[${newText}]`, 'gi'); //把替换后的字符串在[]中，匹配规则代表只要匹配到[]中任意一个字符
  const html = text.replace(reg, "<span style='color: #2CD8AA'>$&</span>") //进行替换，gi会替换所有符合规则的字符，并且不区分大小写
  return html; //vue中使用v-html 来使用
}

/**
 * 从A到Z字母数组
 */
export const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];