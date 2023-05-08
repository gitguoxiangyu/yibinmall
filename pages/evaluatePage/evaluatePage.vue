<template>
	<view class="main">
		<view v-for="evaluation in list" :key="evaluation.id" class="evaluation">
			<view class="userName">
				<image class="userAvatar" :src="evaluation.userAvatar" mode="aspectFill"></image>
				<text>{{evaluation.userName}}</text>
			</view>
			<view class="content">{{evaluation.goodsEvaluation}}</view>
			<view class="evaluationImageList"
				v-if="evaluation.evaluationPicture && evaluation.evaluationPicture.length">
				<image class="evaluationImage" mode="aspectFill" v-for="url in evaluation.evaluationPicture" :key="url"
					:src="url" alt="" @click="previewImage(evaluation.evaluationPicture, url)">
			</view>
			<view class="time">{{evaluation.createTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad(option) {
			this.list = JSON.parse(decodeURIComponent(option.list));
			console.log("评价列表", this.list)
		},
		methods: {
			previewImage(urls, currentUrl) {
				uni.previewImage({
					current: currentUrl,
					urls,
					indicator: "default",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}
	.main {
	}

	.evaluation {
		margin-bottom: 10px;
		padding: 10px 20px;
		background-color: #FFFFFF;
		.userName {
			display: flex;
			align-items: center;
			font-weight: bold;
			margin-bottom: 10px;
			.userAvatar {
				margin-right: 10px;
				width: 26px;
				height: 26px;
			}
		}

		.content {
			margin-bottom: 10px;
		}

		.evaluationImageList {
			margin-bottom: 6px;

			.evaluationImage {
				height: 80px;
				width: 80px;
				border-radius: 6px;
				margin-right: 8px;
			}
		}

		.time {
			font-size: 15px;
			color: #999999;
		}
	}
</style>
