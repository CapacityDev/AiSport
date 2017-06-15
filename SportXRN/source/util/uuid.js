
/**
 * 生成全局唯一标识符
 * @param uppercase
 *            是否大写，TRUE大写，FALSE小写
 * @param tag
 *            是否保留横杠分隔，TRUE保留，FALSE剔除
 * @return 返回生成的字符串，默认小写不带横杠分隔符
 */
export function generateUUID(uppercase = false, tag = false) {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  if (uppercase) {
    uuid = uuid.toLocaleUpperCase();
  }
  if (tag) {
  } else {
    uuid = uuid.replace(/[-]/g, '');
  }
  return uuid;
}
