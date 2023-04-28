export function getToken(successful,fails){
	let msg = {
		username: "admin",
		password: "admin123"
	}
	return uni.request({
		url: 'http://yibinmall.chenglee.top:81/prod-api/auth/get_token',//开发者服务器接口地址
		method: "POST",
		data: msg,//请求的参数
		dataType: "json",
		sslVerify: false, 
		success: successful,
		fail: fails,
	})
}