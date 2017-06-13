/**** ajax请求组装sendObjs参数公共方法  ***/

/**
 * 把公共报文头参数字符串转换为对应json对象格式
 *
 * @param upCommStr
 *            公共报文头参数字符串
 * @returns 公共报文头对象
 */
export function parseUpCommStrToObj(upCommStr) {
  let Obj = {};
	let upCommArray = upCommStr.split("&");
	for ( let i = 0; i < upCommArray.length; i++) {
		if (upCommArray[i] == "")
			continue;
		let tempStrArr = upCommArray[i].split("=");
		Obj[tempStrArr[0]] = tempStrArr[1];
	}
	return Obj;
}

/**
 * 组装请求jsonObj(把对应对象的所有属性组装到请求的sendObj中)
 *
 * @param sendObj
 *            请求sendObj
 * @param dtoObj
 *            对应dto对象
 * @param dtoName
 *            对应后台Action dto的属性名称
 */
export function concatSendObjByObj(sendObj, dtoObj, dtoName) {
  if (typeof dtoName == "undefined") {
		for ( var pro in dtoObj) {
			if (typeof (dtoObj[pro]) == "function") {
				continue;
			}
			sendObj[pro] = dtoObj[pro];
		}
	} else {
		for ( var pro in dtoObj) {
			if (typeof (dtoObj[pro]) == "function") {
				continue;
			}
			// 判断此处对象是否为一个数组如果是的话我们调用下面组装数组的方法
      if (dtoObj[pro] && typeof dtoObj[pro]==='object' && Array == dtoObj[pro].constructor) {
				concatSendObjByArray(sendObj, dtoObj[pro], dtoName + "." + pro);
			} else {
				if (typeof (dtoObj[pro]) == "object") {
					concatSendObjByObj(sendObj, dtoObj[pro], dtoName + "."
							+ pro);
				} else {
					sendObj[dtoName + "." + pro] = dtoObj[pro];
				}
			}
		}
	}
}

/**
 * 组装请求jsonObj(把对应循环域数组组装到请求的sendObj中)
 *
 * @param sendObj
 *            请求sendObj
 * @param objArray
 *            对应循环域数组
 * @param dtoName
 *            对应后台Action 循环域数组dto的属性名称
 */
export function concatSendObjByArray(sendObj, dtoObj, dtoName) {
  for ( var i = 0; i < objArray.length; i++) {
		var tempObj = objArray[i];
		for ( var p in tempObj) {
			if (typeof (tempObj[p]) == "function") {
				continue;
			}
			sendObj[dtoName + "[" + i + "]." + p] = tempObj[p];
		}
	}
}
