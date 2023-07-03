<template>
	<view class="main">
		<view class="bean">鲜豆<span class="beanValue">{{details.beans}}</span></view>
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
					<view class="beanChange">鲜豆{{" " + (item.beans_action_number > 0 ? "+" : "") + item.beans_action_number}}</view>
				</view>
				<view class="changeTime">{{item.beans_action_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseURL} from '../../publicAPI/baseData.js'
	import { getAuthorization } from '../../publicAPI/newToken.js'
	import { request } from '../../publicAPI/request.js'
	import { getLoginTask } from '../../publicAPI/userInfo.js'
	import { correctTime } from '../../utils/common.js'
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
			getLoginTask().then(() => {
				this.details = getApp().globalData.UserInfo
				console.log(this.details)
			})
		},
		onShow(){
			getLoginTask().then(() => {
				let app = getApp()
				request({
					url: baseURL + '/beansAction/byUserId/' + this.details.id,
					method:"GET",
					header: {
						'Authorization':"Bearer " + getAuthorization(),
					},//请求头
					dataType: "json",
					sslVerify: false,
					success: res => {
						console.log(res)
						let arr = res.data.object
						arr.forEach((item,index)=>{
							item.beans_action_time = correctTime(item.beans_action_time)
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
			})
		},
		methods: {
			/** 切换标签 */
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

<style lang="scss">
	page {
		background-color: rgb(245,245,245);
	}
	.main{
		padding: 5vw;
		.bean {
			font-size: 16px;
			font-weight: bold;
			.beanValue {
				margin-left: 10px;
				color: red;
				font-size: 3em;
			}
		}
	}

	.msg{
		margin: 4vw 0vw;
		font-size: 10px;
		color: rgb(152,152,152);
	}

	.showOption{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 4vw;
	}

	.option{
		// width: 14vw;
		// height: 8vw;
		color: rgb(152,152,152);
		background-color: white;
		font-size: 14px;
		padding: 4px 14px;
		text-align: center;
		line-height: 8vw;
		border-radius: 10%;
	}
	.optionactive{
		color: red;
		font-weight: bold;
	}

	.item{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-top: 4vw;
		// height: 14vw;
		padding: 12px 14px;
		background-color: white;
		border-radius: 5px;
	}

	.volunteer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.volunteerTime{
		font-size: 14px;
		font-weight: bold;
		padding-right: 8px;
	}

	.beanChange{
		color: red;
		font-size: 14px;
		font-weight: bold;
		white-space: nowrap;
	}

	.changeTime{
		color: rgb(152,152,152);
		font-size: 13px;
		margin-top: 4px;
	}
</style>
