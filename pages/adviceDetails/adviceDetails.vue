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
					<textarea v-model="advice" placeholder-style="color:#999999" placeholder="请输入详细描述，不超过200字"
						maxlength="200" name="advice" />
				</view>
				<view>
					<form>
						<view class="cu-bar bg-white margin-top">
							<view class="action">
								图片上传
							</view>
							<view class="action">
								{{imgList.length}}/4
							</view>
						</view>
						<view class="cu-form-group">
							<view class="flex-sub">
								<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
									:data-url="imgList[index]">
									<view class="totalImg">
										<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
											<text class='cuIcon-close'>×</text>
										</view>
										<image :src="imgList[index]" mode="widthFix" style="width: 15vw;"></image>
									</view>
								</view>
								<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
									<img src="../../static/img/camera.png" alt="" srcset="">
								</view>
							</view>
						</view>

					</form>
				</view>
				<button :disabled="submitted" form-type="submit" class="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		baseURL
	} from '../../publicAPI/baseData'
	export default {
		data() {
			return {
				adviceType: ["商品问题", "优惠券问题", "商城体验不佳", "其他"],
				index: 0,
				advice: "",
				submitted: false, // 是否已提交，用于阻止重复提交
				imgList: [],
				uploadedImgList: []
			}
		},
		methods: {
			onAdviceTypeChange(e) {
				this.index = e.detail.value;
			},
			adviceSubmit() {
				const app = getApp()
				
				this.uploadImage().then((res)=>{
					const data = {
						complaintUserId: app.globalData.UserInfo.id,
						complaintContent: this.advice,
						complaintPicture: res,
						complaintType: this.index + 1,
						complaintUserName: app.globalData.UserInfo.real_name,
					}
					uni.request({
						url: baseURL + '/complaint',
						method: 'POST',
						header: {
							'Authorization': "Bearer " + app.globalData.Authorization,
						}, //请求头
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
								icon: 'success',
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
				})
				
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			//删除
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除这张图片？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},

			uploadImage() {
				let app =getApp()
				let xhrArr = []
				this.imgList.forEach((item) => {
					let xhr = new Promise((reslove,reject)=>{
						uni.uploadFile({
							url: '/prod-api/file/upload', //post请求的地址
							filePath: item,
							name: 'file',
							header: {
								'Authorization': "Bearer " + app.globalData.Authorization,
							}, //请求头
							success: (uploadFileRes) => {
								
								reslove(JSON.parse(uploadFileRes.data).object[0])
							},
							fail: (error) => {
								reject(error)
							}
						})
					})
					xhrArr.push(xhr)
				})
				return Promise.all(xhrArr)
			// uni.uploadFile({
			// 	url: '/prod-api/file/upload', //post请求的地址
			// 	files: this.imgList,
			// 	name: 'file',
			// 	header: {
			// 		'Authorization': "Bearer " + app.globalData.Authorization,
			// 	}, //请求头
			// 	success: (uploadFileRes) => {
			
			// 	},
			// 	fail: (error) => {
			
			// 	}
			// })
		 }
		}
	}
</script>

<style lang="scss">
	.main {
		height: 100vh;
		background-color: #f5f5f5;
	}

	.type {
		display: flex;
		background-color: white;
		height: 6vh;
		line-height: 6vh;
		padding-left: 5vw;
		font-size: 16px;

		.typeName {
			color: #2a2a2a;
			font-weight: 400;
		}

		.typeOptions {
			margin-left: 8vw;
			// width: ;
			flex-grow: 4;
		}
	}

	.content {
		height: 70vh;
		background-color: white;
		padding: 0 5vw;
		margin: 3vh 0;
		font-size: 16px;

		.contentHead {
			height: 6vh;
			line-height: 6vh;
			font-weight: 400;
			color: #2a2a2a;
		}

		uni-textarea {
			width: unset;
		}

		.submit {
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
	.flex-sub{
		display: flex;
		flex-direction: row;
		.totalImg{
			width: 15vw;
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
