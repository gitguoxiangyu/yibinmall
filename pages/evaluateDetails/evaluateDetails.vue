<template>
	<view class="main">
		<view class="container">
			<img :src="details.goods.goods_main_picture" alt="商品图片" class="goodImg">
			<view class="goodText">
				<view class="goodDetail">{{details.goods.goods_name}}</view>
				<view class="goodPrice">共青价：<span style="color: red; font-weight: bold;" >鲜豆 {{details.goods.goods_price}}</span></view>
			</view>
		</view>
		<form @submit="submit()">
			<view class="content">
				<view class="contentHead">评价内容</view>
				<view class="uni-textarea">
					<textarea v-model="evaluation" placeholder-style="color:#999999" placeholder="请输入评价内容，不超过200字" maxlength="200" name="advice"/>
				</view>
				<view class="contentHead">图片 (最多 3 张)</view>
				<uni-file-picker ref="upload" :limit="3" fileMediatype="image" mode="grid" @select="uploadImage"
					@fail="uploadFailed" @delete="deleteImage"></uni-file-picker>
				<view style="margin-top: 4vw;" v-show="imageList.length || uploadFailedFlag">
					<view v-if="!uploadFinished">图片上传中...</view>
					<view v-else-if="uploadFailedFlag" style="color: red;">图片上传失败，请稍后重试</view>
					<view v-else>图片上传成功</view>
				</view>
				<button :disabled="submitted" form-type="submit" class="submit" >提交</button>
			</view>
		</form>
	</view>
</template>

<script>
// import getToken from '../../publicAPI/getToken.js'
import {baseURL, rootURL} from '../../publicAPI/baseData.js'
import { getAuthorization } from '../../publicAPI/newToken.js';
import { request } from '../../publicAPI/request.js';
import { getLoginTask } from '../../publicAPI/userInfo.js';
export default {
	data() {
		return {
			showPop: false,
			evaluation: "",
			imageList: [
				// {
				// 	url: "",
				// 	remoteUrl: "",
				// 	status: "", // pending, success, fail, canceled, invalid
				// }
			],
			uploadFailedFlag: false, // 本次上传是否失败
			submitted: false,
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
	computed: {
		// 是否上传结束，包括成功和失败
		uploadFinished() {
			return !this.imageList.find(image => image.status === "pending")
		},
	},
	methods: {
		// el-file-picker组件的上传函数，支持一次性上传多张图片
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
		uploadFailed(temp) {
			console.error("上传失败", temp)
			uni.showToast({
				icon: "none",
				title: "上传失败，请稍后重试",
			})
		},
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
		submit(){
			getLoginTask().then(() => {
				const app = getApp()
				const goods = this.details.goods
				const data = {
					storeId: goods.store_id,
					userId: app.globalData.UserInfo.id,
					goodsId: goods.goods_id,
					evaluationPicture: this.imageList.map(image => image.remoteUrl),
					goodsEvaluation: this.evaluation,
				}
				request({
					url: baseURL + '/goodsEvaluation',
					method: 'POST',
					header: {
						'Authorization':"Bearer " + getAuthorization(),
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
			})
		}
	}
}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}

	.container{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		height: 20vw;
		background-color: white;
		padding: 5vw 6vw;
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
			.goodDetail{
				width: 60vw;
				// height: 13vw;
				overflow: hidden;
				font-weight: bold;
				font-size: 16px;
			}
			.goodPrice{
				width: 60vw;
				// height: 12vw;
				font-size: 16px;
			}
		}
	}

	.content{
		// height: 80vw;
		background-color: white;
		padding: 0 5vw 6vw;
		margin: 6vw 0;
		font-size: 16px;
		.contentHead{
			font-size: 16px;
			height: 12vw;
			line-height: 12vw;
			font-weight: 400;
			color: #2a2a2a;
		}
		uni-textarea {
			width: unset;
		}
		/deep/ .uni-file-picker {
			.file-image {
				border-radius: 6px;
			}

			.uni-progress-bar {
				display: none;
			}

			.file-picker__box-content.is-add {
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
				display: none;
			}
		}
	}
</style>
