<template>
	<view class="main">
		<view class="bean">鲜豆<span style="color: red; font-weight: bold;">:  {{details.beans}}</span></view>
		<view class="showOption">
			<view class="option" v-for="(item,index) in nav" :key="index" @click="change(index)">
				<!-- 若item.active为true ,则该盒子的class为optionactive -->
				<view :class="{optionactive:item.active}">
					{{nav[index].name}}
				</view>
			</view>
		</view>
		<view class="itemContainer">
			<view class="item" v-for="(item,index) in displayMsg" :key="index">
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
				nav:[
					{
						name: "全部",
						active: true
					},
					{
						name: "已获取",
						active: false
					},
					{
						name: "已消耗",
						active: false
					}
				],
				details:{},
				msg:[],
				displayMsg:[],
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
			let msg = {
				username: "admin",
				password: "admin123"
			}
			uni.request({
				url: 'http://yibinmall.chenglee.top:8080/get_token',//开发者服务器接口地址
				method: "POST",
				data: msg,//请求的参数
				dataType: "json",
				sslVerify: false, 
				success: res => {
					//将token存入全局变量中
					let app = getApp()
					app.globalData.Authorization = res.data
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
							let arr = res.data.object
							arr.forEach((item,index)=>{
								item.beans_action_time = item.beans_action_time.substring(0,10) + " " + item.beans_action_time.substring(11,19)
							})
							arr.reverse()
							this.msg = arr
							this.displayMsg = arr
						},
						fail: err => {
							uni.showToast({
								icon: 'none',
								title: "获取鲜豆收支信息失败，请重试！"
							});
						}
					})
				},
			})
		},
		methods: {
			change(index){
				this.nav.forEach((item,index) => {
					item.active = false
				})
				this.nav[index].active = true
				if (index == 0){
					this.displayMsg = this.msg
				}else if(index == 1){
					let arr = []
					this.msg.forEach((item,index) => {
						if(item.beans_action_number > 0){
							arr.push(item)
						}
					})
					this.displayMsg = arr
				}else if(index == 2){
					let arr = []
					this.msg.forEach((item,index) => {
						if(item.beans_action_number < 0){
							arr.push(item)
						}
					})
					this.displayMsg = arr
				}
			}
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
		margin-top: 5vh;
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
	.optionactive{
		color: red;
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