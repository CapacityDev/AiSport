
/**
 * 空值判断
 * @param str 待校验的字符串
 * @return 不存在值时返回false（undefined、null、空、空格），存在值是返回true
 */
export function isEmpty(str) {
  let res = false;
  if (str) {
    if ("" != str.trim()) {
      res = true;
    }
  }
  return res;
}
