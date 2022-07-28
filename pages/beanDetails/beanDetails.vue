<template>
	<view class="main">
		<view class="bean">鲜豆<span style="color: red; font-weight: bold;">:  {{details.beans}}</span></view>
		<view class="showOption">
			<view class="showing">全部</view>
			<view class="option">已获取</view>
			<view class="option">已消耗</view>
		</view>
		<view class="itemContainer">
			<view class="item" v-for="(item,index) in msg" :key="index">
				<view class="volunteer">
					<view class="volunteerTime">{{item.beans_action_describe}}</view>
					<view class="beanChange">鲜豆{{item.beans_action_number}}</view>
				</view>
				<view class="changeTime">{{item.beans_action_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:{},
				msg:{},
				show:1
			}
		},
		onLoad(option) {
			this.details = getApp().globalData.UserInfo
			console.log(this.details)
		},
		onShow(){
			//获取鲜豆收支信息
			let app = getApp()
			uni.request({
				url: 'http://yibinmall.chenglee.top:8080/beansAction/byUserId/' + this.details.id,
				method:"GET",
				header: {
					'Authorization':"Bearer "+app.globalData.Authorization,
				},//请求头
				dataType: "json",
				sslVerify: false, 
				success: res => {
					console.log(res)
					this.msg = res.data.object
				},
				fail: err => {
					uni.showToast({
						icon: 'none',
						title: "获取鲜豆收支信息失败，请重试！"
					});
				}
			})
		},
		methods: {
	
		}
	}
</script>

<style>
	.main{
		height: 100vh;
		padding: 5vw;
		background-color: rgb(245,245,245);
	}
	
	.item{
		height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
		
	.msg{
		margin: 2vh 0vw;
		font-size: 10px;
		color: rgb(152,152,152);
	}
	
	.showOption{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.option{
		width: 14vw;
		height: 4vh;
		color: rgb(152,152,152);
		background-color: white;
		font-size: 10px;
		text-align: center;
		line-height: 4vh;
		border-radius: 10%;
	}
	
	.showing{
		width: 14vw;
		height: 4vh;
		color: red;
		background-color: white;
		font-size: 10px;
		text-align: center;
		line-height: 4vh;
		border-radius: 10%;
	}
	
	.item{
		margin-top: 3vh;
		height: 7vh;
		padding: 3vw;
		background-color: white;
		border-radius: 5%;
	}
	
	.volunteer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.volunteerTime{
		font-size: 10px;
		font-weight: bold;
	}
	
	.beanChange{
		color: red;
		font-size: 12px;
		font-weight: bold;
	}
	
	.changeTime{
		color: rgb(152,152,152);
		font-size: 13px;
	}
</style>