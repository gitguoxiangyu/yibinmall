<template>
	<view class="main">
		<view class="head">
			志愿四川·宜宾专区
		</view>
		<view class="body">
			<form @submit="formSubmit">
				<view class="cardWord">
					<input type="number" name="ICBC_card_num" placeholder="请输入社保卡号" placeholder-style="font-size:26rpx;color:white;">
				</view>
				<view class="identifyWord">
					<input type="text" name="idCard" placeholder="请输入身份证号" placeholder-style="font-size:26rpx;color:white;">
				</view>
				<button form-type="submit" class="login" >登入</button>
			</form>
		</view>
	</view>
	
</template>

<script>
	import crypto from "crypto-js"
	export default {
		data() {
			return {
				key:'',
			}
		},
		methods: {
			formSubmit(data){
				//正则校验社保卡号前六位是否为621721
				//51253419720212703X
				let reg = /^621721/
				let app = getApp()
				//请求体
				let msg = {
					idCard: data.detail.value.idCard,
					token: app.globalData.token
				}
				if (reg.test(data.detail.value.ICBC_card_num) == true){
					uni.request({
						url: 'http://data-tran-yb.nvnbd.com/api/user/info',//开发者服务器接口地址
						method: "POST",
						data: msg,//请求的参数
						dataType: "json",
						sslVerify: false, 
						success: res => {
							console.log(res)
							app.globalData.hasUserInfo = 1
							app.globalData.UserInfo = res.data.data
							// const decryptDes = (message, key) => {
							// 	var keyHex = Crypto.enc.Utf8.parse(key)
							// 	var decrypted = cryptoJs.DES.decrypt(
							// 		{
							// 		ciphertext: cryptoJs.enc.Hex.parse(message)
							// 		},
							// 		keyHex,
							// 		{
							// 		mode: cryptoJs.mode.ECB,
							// 		padding: cryptoJs.pad.Pkcs7
							// 		}
							// 	)
							// 	return decrypted.toString(cryptoJs.enc.Utf8)
							// }
							// var mobile = decryptDes(res.data.data.mobile,msg.token)
							// console.log(mobile)
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
				appId:"ZYSC_YB",
				secert:"123456"
			}
			uni.request({
				url: 'http://data-tran-yb.nvnbd.com/api/data/getToken',//开发者服务器接口地址
				method: "POST",
				data: data,//请求的参数
				dataType: "json",
				sslVerify: false, 
				success: res => {
					//将token存入全局变量中
					let app = getApp()
					app.globalData.token = res.data.data
					this.key = res.data.data
				},
				fail: err => {
					uni.showToast({
						icon: 'none',
						title: "获取token失败，请重试！"
					});
				}
			})
		},
	}
</script>

<style>
	.main{
		height: 100vh;
		padding: 10vh 5vw;
		background-image: url(../../static/img/login.jpg);
	}
	.head{
		text-align: center;
		color: red;
		font-size: 30px;
		font-weight: bolder;
		margin-bottom: 10vh;
	}
	input{
		height: 5vh;
		width: 74vw;
		padding: 0 3vw;
		margin: 3vh auto;
		border: 1px rgb(200, 200, 200) solid;
		border-radius: 3%;
	}
		
	.login{
		width: 80vw;
	}
	
</style>