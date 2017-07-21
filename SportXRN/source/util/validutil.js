/**
 * 输入校验工具
 * Created by Icey on 21/07/2017.
 */

const mobileReg = /^1\d{10}$/;// 手机号。11位数字，以1开头
const phoneReg = /^0\d{2,3}-?\d{7,8}$/;// 电话号码。区号+号码，区号以0开头，3位或4位号码由7位或8位数字组成区号与号码之间可以无连接符，也可以“-”连接
// 邮箱
// 规则：姑且把邮箱地址分成“第一部分@第二部分”这样
// 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
// 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;// 邮箱

/**
 * 输入校验
 * @param intext	输入字符串
 * @param vt		校验类型
 * 1-手机号码，2-电话号码，3-邮箱
 * @return			校验结果：true-通过，false-不通过
 */
export function valid(intext, vt) {
	
	if (!intext || !vt) {
		return false;
	}
	if (1 == vt) {
		// 手机号码
		return mobileReg.test(intext);
	} else if (2 == vt) {
		// 电话号码
		return phoneReg.test(intext);
	} else if (3 == vt) {
		// 邮箱
		return emailReg.test(intext);
	} else if (4 == vt) {
		
	} else if (5 == vt) {
		
	} 
	return uiElementPx *  deviceHeightDp / uiHeightPx;
}