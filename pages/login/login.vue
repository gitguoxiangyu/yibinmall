<template>
	<view class="main">
		<view class="head">
			<img src="../../static/img/hand.png" width="50" height="50" alt="">
			<span class="title">志愿四川·宜宾专区</span>
		</view>
		<!-- <img class="handBackgroundSmall" src="../../static/img/hand-bg.png" width="100" height="100" alt=""> -->
		<div class="handBackgroundSmall"></div>
		<view class="body">
			<form @submit="formSubmit">
				<view class="identifyWord">
					<input placeholder-class="login-input-placeholder" class="login-input" maxlength="18" type="text" name="idCard" placeholder="请输入身份证号">
				</view>
				<view class="cardWord">
					<input placeholder-class="login-input-placeholder" class="login-input" maxlength="19" type="number" name="ICBC_card_num" placeholder="请输入宜宾工行社保卡号">
				</view>
				<button form-type="submit" class="login" >授权登录</button>
			</form>
		</view>
	</view>

</template>

<script>
	import {baseURL} from '../../publicAPI/baseData.js'
	import { getAuthorization } from '../../publicAPI/newToken.js'
	import { request } from '../../publicAPI/request.js'
	import { login } from '../../publicAPI/userInfo.js'
	export default {
		data() {
			return {
				key:'',
			}
		},
		methods: {
			/** 点击登录 */
			formSubmit(data){
				//正则校验社保卡号前六位是否为6217212314
				// 6217212314999999999
				// 51253419720212703X
				// 510524200203160384
				const idReg = /^(\d{15}|\d{17}[0-9Xx])$/
				let reg = /^6217212314/
				console.log(data.detail.value.ICBC_card_num.length)
				let errMsg = ""
				if (!data.detail.value.idCard) {
					errMsg = "请输入身份证号"
				} else if (!data.detail.value.ICBC_card_num) {
					errMsg = "请输入社保卡号"
				} else if (idReg.test(data.detail.value.idCard) !== true) {
					errMsg = "请检查身份证号是否正确"
				} else if (reg.test(data.detail.value.ICBC_card_num) !== true || data.detail.value.ICBC_card_num.length !== 19) {
					errMsg = "请检查社保卡号是否正确"
				}
				if (errMsg) {
					uni.showToast({
						icon: "none",
						title: errMsg,
					})
					return
				}

				const loginData = {
					idCard: data.detail.value.idCard,
					ICBC_card_num: data.detail.value.ICBC_card_num,
				}

				let app = getApp()
				app.globalData.idCard = data.detail.value.idCard
				login(loginData).then(res => {
					uni.setStorageSync("loginData", loginData)
					app.globalData.hasUserInfo = 1
					// app.globalData.UserInfo.beans = res.data.object
					console.log(res)

					uni.navigateTo({
						url: '../mall/mall'
					})
				}).catch(res => {
					console.error("登录错误", res)
					const msg = res.data.msg || res.data.message
					uni.showToast({
						icon: 'none',
						title: '登录错误: ' + msg
					});
				})

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

			request({
				url: '/province/data/getToken',//开发者服务器接口地址
				method: "POST",
				data: data,//请求的参数
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
	page{
		width: 100%;
		padding: 12vw 8vw 0;
		background-color: #FFF3DC;
		background-image: url(../../static/img/login.png);
		background-size: cover;
	}
	.head{
		color: #666666;
		font-size: 24px;
		font-weight: bolder;
		margin-bottom: 8vw;
		display: flex;
		align-items: center;
		.title {
			margin-left: 16px;
			// font-style: italic;
		}
	}
	.handBackgroundSmall {
		position: absolute;
		top: 2vw;
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
			height: 12vw;
			// width: 74vw;
			// padding: 14px 30px;
			padding: 0 8vw;
			margin: 6vw auto;
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
			height: 12vw;
			line-height: 12vw;
			background-color: #E81E00;
			color: #FFFFFF;
			border-radius: 200px;
			font-weight: bold;
			font-size: inherit;
		}
	}

</style>
