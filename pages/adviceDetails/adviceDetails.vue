<template>
	<view class="main">
		<form @submit="adviceSubmit">
			<view class="type">
				<view class="typeName">请选择投诉类型</view>
				<view class="typeOptions">
					<!-- @change="optionChange" -->
					<picker :value="index" :range="adviceType" name="adviceType" @change="onAdviceTypeChange">
						<view class="listItem">{{adviceType[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="content">
					<view class="contentHead">投诉详情</view>
					<view class="uni-textarea">
						<textarea v-model="advice" placeholder-style="color:#999999" placeholder="请输入详细描述，不超过200字" maxlength="200" name="advice"/>
					</view>
					<button :disabled="submitted" form-type="submit" class="submit" >提交</button>
			</view>

		</form>
	</view>
</template>

<script>
import { baseURL } from '../../publicAPI/baseData'
	export default {
		data(){
			return {
				adviceType: ["商品问题","优惠券问题","商城体验不佳","其他"],
				index: 0,
				advice: "",
				submitted: false, // 是否已提交，用于阻止重复提交
			}
		},
		methods:{
			onAdviceTypeChange(e) {
				this.index = e.detail.value;
			},
			adviceSubmit(){
				const app = getApp()
				const data = {
					complaintUserId: app.globalData.UserInfo.id,
					complaintContent: this.advice,
					complaintPicture: [],
					complaintType: this.index + 1,
					complaintUserName: app.globalData.UserInfo.real_name,
				}
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
							console.error(res.data);
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
						console.error(res);
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
		background-color: #f5f5f5;
	}
	.type{
		display: flex;
		background-color: white;
		height: 6vh;
		line-height: 6vh;
		padding: 0 5vw;
		.typeName{
			font-size: 14px;
			color: #2a2a2a;
			font-weight: 400;
		}
		.typeOptions{
			font-size: 14px;
			margin: 0 8vw;
			// width: ;
			flex-grow: 4;
		}
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

<!-- {
						name:"商品损坏",
						typeNum:"1",
					},
					{
						name:"优惠券问题",
						typeNum:"2",
					},
					{
						name:"商城功能",
						typeNum:"3",
					},
					{
						name:"用户体验",
						typeNum:"4",
					},
					{
						name:"其他",
						typeNum:"5",
					}, -->
