<template>
	<view class="main">
		<view class="head">
			志愿四川·宜宾专区
		</view>
		<view class="body">
			<form @submit="formSubmit">
				<view class="cardWord">工行社保卡
					<input type="number" name="ICBC_card_num">
				</view>
				<view class="identifyWord">身份证号
					<input type="text" name="idCard">
				</view>
				<button form-type="submit">登入</button>
			</form>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			formSubmit(data){
				//正则校验社保卡号前六位是否为621721
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
							console.log("成功")
							console.log(res)
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
	}
	.head{
		text-align: center;
		color: red;
		font-size: 30px;
		font-weight: bolder;
	}
	input{
		border: 1px rgb(200, 200, 200) solid;
	}
</style>