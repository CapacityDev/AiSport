
export default {
	appInfo:{
		name:'博客园',
		descr:'开发者的网上家园',
		site:'www.cnblogs.com',
		version: '3.6.0',
		copyright: '©2016 powered by react-native',
		registerUri: 'https://passport.cnblogs.com/register.aspx?ReturnUrl=http://www.cnblogs.com/',
		declare: '博客园创立于2004年1月，是一个面向开发者的知识分享社区。自创建以来，博客园一直致力并专注于为开发者打造一个纯净的技术交流社区，推动并帮助开发者通过互联网分享知识，从而让更多开发者从中受益。博客园的使命是帮助开发者用代码改变世界。'
	},
	authorInfo: {
		name:'togayther',
		email:'sleepsleepsleep@foxmail.com',
		homepage: 'https://github.com/togayther',
		declare: '本软件为个人学习交流作品，内容来源于博客园官方开放接口，版权归博客园及原作者所有。'
	},
	commentTail: 'from [url=http://fir.im/togayther]rn-cnblogs[/url]',
	apiDomain:'http://192.168.42.51:8080/sportx/'
};

export const postCategory = {
	home: "home",
	rank: "rank",
	news: "news",
	blink: "blink",
	question: "question",
	favorite: "favorite",
	answer: "answer"
};

export const authData = {
	pubKey : "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB", //向博客园申请后填入
 	clientId: "d9e571c4-68da-4a34-aadc-f8f3e395ffd8",//向博客园申请后填入
 	clientSecret: "2YnxaY86t4ogxrKP-9fbg-KmMgJ0gMXN1IfUTEtxWFVYTlVWyXy4WtUvsaf6cAlyNFiyOiw23LvyKmOt"//向博客园申请后填入
};

export const pageSize = 10;

export const storageKey = {
	OFFLINE_POSTS: "OFFLINE_POSTS",
	USER_TOKEN: "USER_TOKEN",
	TAIL_CONTENT: "TAIL_CONTENT",
	TAIL_ENABLED: "TAIL_ENABLED"
};
