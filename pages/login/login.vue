<template>
	<view class="main">
		<view class="head">
			<img src="../../static/img/hand.png" width="50" height="50" alt="">
			<span class="title">鲜豆商城</span>
		</view>
		<!-- <img class="handBackgroundSmall" src="../../static/img/hand-bg.png" width="100" height="100" alt=""> -->
		<div class="handBackgroundSmall"></div>
		<view class="body">
			<form @submit="formSubmit">
				<view class="cardWord">
					<input placeholder-class="login-input-placeholder" class="login-input" type="number" name="ICBC_card_num" placeholder="请输入社保卡号">
				</view>
				<view class="identifyWord">
					<input placeholder-class="login-input-placeholder" class="login-input" type="text" name="idCard" placeholder="请输入身份证号">
				</view>
				<button form-type="submit" class="login" >授权登录</button>
			</form>
		</view>
	</view>

</template>

<script>
	import {baseURL} from '../../publicAPI/baseData.js'
	export default {
		data() {
			return {
				key:'',
			}
		},
		methods: {
			formSubmit(data){
				//正则校验社保卡号前六位是否为6217212314
				// 6217212314999999999
				// 51253419720212703X
				// 510524200203160384
				let reg = /^6217212314/
				let app = getApp()
				//请求体
				let msg = {
					idCard: data.detail.value.idCard,
					token: app.globalData.token
				}
				console.log(data.detail.value.ICBC_card_num.length)
				app.globalData.idCard = data.detail.value.idCard
				if (reg.test(data.detail.value.ICBC_card_num) == true && data.detail.value.ICBC_card_num.length == 19){
					uni.request({
						// http://yibinmall.chenglee.top:81/province/
						url: '/province/user/info',//开发者服务器接口地址
						method: "POST",
						data: msg,//请求的参数
						dataType: "json",
						sslVerify: false,
						success: res => {
							console.log(res)
							if (res.data.code == "200"){
								//重新封装属性名，发向服务器
								app.globalData.UserInfo = {
									id: res.data.data.id,
									real_name: res.data.data.realname,
									card_num: res.data.data.cardNum,
									card_type: res.data.data.cardType,
									icbc_card_num: data.detail.value.ICBC_card_num,
									avatar: res.data.data.avatar,
									mobile: res.data.data.mobile,
									beans: res.data.data.score,
									star: res.data.data.certificate,
									hours: res.data.data.hours
								}
								console.log(app.globalData.UserInfo)

								uni.request({
									url: baseURL + '/user_info',//开发者服务器接口地址
									method: "POST",
									data: app.globalData.UserInfo,//请求的参数
									header: {
										'Authorization':"Bearer "+app.globalData.Authorization,
									},//请求头
									dataType: "json",
									sslVerify: false,
									success: res => {
										app.globalData.hasUserInfo = 1
										app.globalData.UserInfo.beans = res.data.object
										console.log(res)
										uni.navigateTo({
											url: '../mall/mall'
										})
									},
									fail: err => {
										console.log(err)
										uni.showToast({
											icon: 'none',
											title: '登录错误'
										});
									}
								})
							}else{
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							}
						},
						fail: err => {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: err
							});
						}
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: "请检查社保卡号是否正确"
					});
				}

			}
		},
		onLoad(option) {
			if (option.details){
				// decodeURIComponent 解密传过来的对象字符串
				this.details = JSON.parse(decodeURIComponent(option.details));
				console.log(this.details)
			}

			//获取token
			let data = {
				appId:"yb001",
				secret:"123456Aa."
			}

			let app = getApp()
			uni.request({
				url: '/province/data/getToken',//开发者服务器接口地址
				method: "POST",
				data: data,//请求的参数
				header: {
					'Authorization':"Bearer "+app.globalData.Authorization,
				},//请求头
				dataType: "json",
				sslVerify: false,
				success: res => {
					//将token存入全局变量中
					let app = getApp()
					app.globalData.token = res.data.data
				},
				fail: err => {
					uni.showToast({
						icon: 'none',
						title: "获取省平台token失败，请重试！"
					});
				}
			})
		},
	}
</script>

<style lang="scss" scoped>
	.main{
		position: fixed;
		box-sizing: border-box;
		height: calc(100vh - var(--window-top));
		width: 100%;
		padding: 6vh 8vw 0;
		background-color: #FFF3DC;
		background-image: url(../../static/img/login.png);
		background-size: cover;
	}
	.head{
		color: #666666;
		font-size: 24px;
		font-weight: bolder;
		margin-bottom: 4vh;
		display: flex;
		align-items: center;
		.title {
			margin-left: 16px;
			// font-style: italic;
		}
	}
	.handBackgroundSmall {
		position: absolute;
		top: 1vh;
		right: 8vw;
		background-image: url(../../static/img/hand-bg.png);
		width: 40vw;
		height: 40vw;
		background-size: contain;
		background-repeat: no-repeat;
	}
	.body {
		position: relative; // 必须加上，否则z-index失效
		z-index: 2;
		font-size: 16px;
		.login-input{
			box-sizing: border-box;
			height: 6vh;
			// width: 74vw;
			// padding: 14px 30px;
			padding: 0 8vw;
			margin: 3vh auto;
			// border: 1px rgb(200, 200, 200) solid;
			background-color: #FFFFFF;
			border-radius: 200px;
		}
		.login-input, .login-input-placeholder {
			color: #666666;
		}

		.login-input-placeholder {
			color: #CCCCCC;
		}

		.login{
			margin-top: 60px;
			// width: 90vw;
			height: 6vh;
			line-height: 6vh;
			background-color: #E81E00;
			color: #FFFFFF;
			border-radius: 200px;
			font-weight: bold;
			font-size: inherit;
		}
	}

</style>
