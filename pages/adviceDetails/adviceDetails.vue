<template>
	<view class="main">
		<form @submit="adviceSubmit">
			<view class="type">
				<view class="typeName">投诉类型</view>
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
					<textarea v-model="advice" placeholder-style="color:#999999" placeholder="请输入投诉内容，不超过500字"
						maxlength="500" name="advice" />
				</view>
				<view class="contentHead">图片 (最多 3 张)</view>
				<uni-file-picker ref="upload" :limit="3" fileMediatype="image" mode="grid" @select="uploadImage"
					@fail="uploadFailed" @delete="deleteImage"></uni-file-picker>
				<view style="margin-top: 4vw;" v-show="imageList.length || uploadFailedFlag">
					<view v-if="!uploadFinished">图片上传中...</view>
					<view v-else-if="uploadFailedFlag" style="color: red;">图片上传失败，请稍后重试</view>
					<view v-else>图片上传成功</view>
				</view>
				<button :disabled="submitted" form-type="submit" class="submit">提交</button>
			</view>

		</form>
	</view>
</template>

<script>
	import {
		baseURL,
		rootURL
	} from '../../publicAPI/baseData'
	import { getAuthorization } from '../../publicAPI/newToken';
	import { request } from '../../publicAPI/request';
	import { getLoginTask } from '../../publicAPI/userInfo';
	export default {
		data() {
			return {
				adviceType: ["商品问题", "优惠券问题", "商城体验不佳", "其他"],
				index: 0,
				advice: "",
				imageList: [
					// {
					// 	url: "",
					// 	remoteUrl: "",
					// 	status: "", // pending, success, fail, canceled, invalid
					// }
				],
				uploadFailedFlag: false, // 本次上传是否失败
				submitted: false, // 是否已提交，用于阻止重复提交
			}
		},
		computed: {
			/** 是否上传结束，包括成功和失败 */
			uploadFinished() {
				return !this.imageList.find(image => image.status === "pending")
			},
		},
		methods: {
			onAdviceTypeChange(e) {
				this.index = e.detail.value;
			},
			/** el-file-picker组件的上传函数，支持一次性上传多张图片 */
			uploadImage(temp) {
				console.log("上传图片", temp)
				for (const file of temp.tempFiles) {
					let invalid = false
					if (file.size / 1024 / 1024 > 3.0) {
						uni.showToast({
							icon: "none",
							title: "图片大小不能超过 3MB",
						})
						invalid = true
					}
					this.imageList.push({
						url: file.path,
						remoteUrl: "",
						uid: file.uuid,
						status: invalid ? "invalid" : "pending",
						uploadTask: null,
					})
				}
				// 删除无效图片
				for (let i = 0; i < temp.tempFiles.length;) {
					const targetIndex = this.imageList.findIndex(image => image.uid === temp.tempFiles[i].uuid)
					if (targetIndex > -1 && this.imageList[targetIndex].status === "invalid") {
						this.imageList.splice(targetIndex, 1)
						this.$refs.upload.clearFiles(targetIndex)
						temp.tempFiles.splice(i, 1)
					} else {
						++i
					}
				}
				console.log("imageList", this.imageList)
				console.log("tempFiles", temp.tempFiles)

				// 开始上传
				this.uploadFailedFlag = false; // 清除失败标记
				const app = getApp()
				temp.tempFiles.forEach(file => {
					const targetImage = this.imageList.find(image => image.uid === file.uuid)
					targetImage.uploadTask = uni.uploadFile({
						url: rootURL + "/file/upload",
						file: file.file,
						name: "file",
						header: {
							'Authorization': "Bearer " + getAuthorization(),
						},
						success: res => {
							const data = JSON.parse(res.data)
							if (data.code !== 200) {
								this.uploadFailedFlag = true;
								console.error(file.name + "上传失败", data)
								// 删除上传失败的文件
								const targetIndex = this.imageList.findIndex(image => image.uid ===
									file.uuid)
								this.imageList.splice(targetIndex, 1)
								this.$refs.upload.clearFiles(targetIndex)
								return
							}
							console.log(file.name + "上传成功", data)
							if (Array.isArray(data.object)) {
								const targetIndex = this.imageList.findIndex(image => image.uid ===
									file.uuid);
								if (targetIndex > -1) {
									this.imageList[targetIndex].status = "success"
									this.imageList[targetIndex].remoteUrl = data.object[0]
								}
							}
						},
						fail: res => {
							const data = res.data
							// 删除上传失败的文件
							const targetIndex = this.imageList.findIndex(image => image.uid === file.uuid)
							this.imageList.splice(targetIndex, 1)
							if (targetImage.status === "pending") {
								// 网络原因导致失败（不是用户手动取消），需要手动从组件中删除图片
								this.$refs.upload.clearFiles(targetIndex)
								this.uploadFailedFlag = true;
								console.error(file.name + "上传失败", data)
							}
						},

					})
				})
			},
			/** 上传失败的回调 */
			uploadFailed(temp) {
				console.error("上传失败", temp)
				uni.showToast({
					icon: "none",
					title: "上传失败，请稍后重试",
				})
			},
			/** 删除图片 */
			deleteImage(temp) {
				console.log("deleteImage", temp)
				const targetIndex = this.imageList.findIndex(image => image.uid === temp.tempFile.uuid)
				if (targetIndex === -1) return
				const image = this.imageList[targetIndex]
				if (image.status === "pending") {
					// 正在上传时主动删除
					image.status = "canceled" // 不显示失败信息
					image.uploadTask.abort() // 取消上传，会执行uploadFile中的fail部分
				} else {
					// success状态下主动删除
					this.imageList.splice(targetIndex, 1)
				}
			},
			/** 提交 */
			adviceSubmit() {
				if (!this.uploadFinished) {
					uni.showToast({
						icon: "none",
						title: "请等待图片上传完成"
					})
					return
				}

				getLoginTask().then(() => {
					const app = getApp()
					const data = {
						complaintUserId: app.globalData.UserInfo.id,
						complaintContent: this.advice,
						complaintPicture: this.imageList.map(image => image.remoteUrl),
						complaintType: this.index + 1,
						complaintUserName: app.globalData.UserInfo.real_name,
					}
					data.complaintContent = data.complaintContent.trim()
					if (!data.complaintContent) {
						uni.showToast({
							icon: "none",
							title: "请输入投诉内容",
						})
						return
					}

					if (this.submitted) return
					this.submitted = true
					request({
						url: baseURL + '/complaint',
						method: 'POST',
						header: {
							'Authorization': "Bearer " + getAuthorization(),
						},
						data: data,
						dataType: "json",
						sslVerify: false,
						success: res => {
							if (res.data.code !== 200) {
								console.error(res.data);
								uni.showToast({
									icon: 'none',
									title: res.data.message,
								})
								this.submitted = false
								return;
							}
							uni.showToast({
								icon: 'success',
								title: '提交成功！',
							})
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
							this.submitted = false
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f5f5;
	}

	.type {
		display: flex;
		background-color: white;
		height: 12vw;
		line-height: 12vw;
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
		// height: 80vw;
		background-color: white;
		padding: 0 5vw 6vw;
		margin: 6vw 0;
		font-size: 16px;

		.contentHead {
			height: 12vw;
			line-height: 12vw;
			font-weight: 400;
			color: #2a2a2a;
		}

		uni-textarea {
			width: unset; // 扩大响应区域
		}

		// uni-file-picker加上图片圆角、隐藏进度条
		/deep/ .uni-file-picker {
			// 图片
			// .file-image {
			// 	border-radius: 6px;
			// }

			.uni-progress-bar {
				display: none;
			}

			// 边框
			.file-picker__box-content {
				border-radius: 6px !important;
			}
		}

		.submit {
			width: 20vw;
			// height: 12vw;
			line-height: 10vw;
			font-size: 15px;
			margin-top: 6vw;
			margin-right: 0;
			border: 1px #999999 solid;
			border-radius: 200px;
			&::after {
				display: none; // 解决按钮双层边框问题
			}
		}
	}
</style>
