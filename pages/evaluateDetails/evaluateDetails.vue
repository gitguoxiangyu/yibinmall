<template>
	<view class="main">
		<view class="item">
			<view class="head">
				<view class="container">
					<img :src="details.goods.goods_main_picture" alt="商品图片" class="goodImg">
					<view class="goodText">
						<view class="goodDetail">{{details.goods.goods_name}}</view>
						<view class="goodPrice">共青价：<span style="color: red; font-weight: bold;" >鲜豆{{details.goods.goods_price}}</span></view>
					</view>
				</view>
				<form @submit="submit()" class="content">
						<view class="contentHead">评价内容</view>
						<view class="uni-textarea">
							<textarea placeholder-style="color:#999999" placeholder="请输入详细评价,不超过200字" maxlength="200" name="advice"/>
						</view>
						<button form-type="submit" class="submit" >提交</button>
				</form>
			</view>
		</view>
		
	</view>
</template>

<script>
import getToken from '../../publicAPI/getToken.js'
import {baseURL} from '../../publicAPI/baseData.js'
export default {
	data() {
		return {
			showPop: false,
			details:{},
			person:{},
		}
	},
	onLoad(option) {
		if (option.details){
			// decodeURIComponent 解密传过来的对象字符串
			this.details = JSON.parse(decodeURIComponent(option.details));
			console.log(this.details)
		}
	},
	methods: {
		submit(details){
			console.log(details)
			uni.request({
				url: baseURL + '/complaint',
				method: 'POST',
				header: {
					'Authorization':"Bearer " + app.globalData.Authorization,
				},//请求头
				data: data,
				dataType: "json",
				sslVerify: false,
				success: res => {
					if (res.data.code !== 200) {
						uni.showToast({
							icon: 'none',
							title: '提交失败，请稍后重试！',
						})
						return;
					}
					uni.showToast({
						icon:'success',
						title: '提交成功！',
					})
					this.submitted = true
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				},
				fail: res => {
					uni.showToast({
						icon: 'none',
						title: '提交失败，请稍后重试！',
					})
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.main{
		height: 100vh;
		background-color: rgb(245,245,245);
	}
	
	.item{
		height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
		
	.head{
		height: 60vh;
		padding: 5vw;
		background-color: white;
	}
	
	.container{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		height: 30vw;
	}
		
	.goodImg{
		height: 20vw;
		width: 20vw;
		display: inline;
		border-radius: 5%;
	}
	
	.goodText{
		width: 60vw;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.goodDetail{
		width: 60vw;
		height: 13vw;
		overflow: hidden;  
		font-weight: bold;
		font-size: 10px;
	}
	
	.goodPrice{
		width: 60vw;
		height: 12vw;
		font-size: 10px;
	}
	.content{
		height: 40vh;
		background-color: white;
		padding: 0 5vw;
		margin: 3vh 0;
		.contentHead{
			font-size: 14px;
			height: 6vh;
			line-height: 6vh;
			font-weight: 400;
			color: #2a2a2a;
		}
		.submit{
			width: 18vw;
			height: 5vh;
			line-height: 5vh;
			font-size: 15px;
			float: right;
			margin-top: 3vh;
			border: 1px #999999 solid;
			// position: relative;
			// bottom: 2vh;
			// right: 10vw;
		}
	}
</style>