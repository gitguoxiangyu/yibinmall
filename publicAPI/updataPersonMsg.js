function updatePersonMsg (){
	let app = getApp()
	let msg = {
		username: "admin",
		password: "admin123"
	}
	let data = {
		appId:"ZYSC_YB",
		secert:"123456"
	}
	//获取服务器token
	uni.request({
		url: 'http://yibinmall.chenglee.top:8080/get_token',//开发者服务器接口地址
		method: "POST",
		data: msg,//请求的参数
		dataType: "json",
		sslVerify: false, 
		success: res => {
			//将服务器token存入全局变量中
			let app = getApp()
			app.globalData.Authorization = res.data
			//获取省平台token
			let person = {
				idCard: app.globalData.idCard,
				token: app.globalData.token
			}
			uni.request({
				url: 'http://yibinmall.chenglee.top/province/data/getToken',//开发者服务器接口地址
				method: "POST",
				data: data,//请求的参数
				header: {
					'Authorization':"Bearer "+app.globalData.Authorization,
				},//请求头
				dataType: "json",
				sslVerify: false, 
				success: res => {
					app.globalData.token = res.data.data
					uni.request({
						url: 'http://yibinmall.chenglee.top/province/user/info',//开发者服务器接口地址
						method: "POST",
						data: person,//请求的参数
						dataType: "json",
						sslVerify: false, 
						success: res => {
							console.log(res)
							app.globalData.UserInfo = {
								id: res.data.data.id,
								real_name: res.data.data.realname,
								card_num: res.data.data.cardNum,
								card_type: res.data.data.cardType,
								ICBC_card_num: app.globalData.UserInfo.ICBC_card_num,
								avatar: res.data.data.avatar,
								mobile: res.data.data.mobile,
								beans: res.data.data.score,
								star: res.data.data.certificate,
							}
						},
						fail: err => {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: '鲜豆更新错误'
							});
						}
					})
				},
				fail: err => {
					uni.showToast({
						icon: 'none',
						title: "获取token失败，请重试！"
					});
				}
			})
		},
		fail: err => {
			uni.showToast({
				icon: 'none',
				title: "获取token失败，请重试！"
			});
		}
	})
}
export default updatePersonMsg