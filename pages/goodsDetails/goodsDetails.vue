<template>
	<view class="detailsBody">
		<!-- 顶部，主图，基本信息 -->
		<view class="goods">
				<view class="goodsPic">
					<image class="goodsImg" :src="details.goods_main_picture"></image>
				</view>
				<view class="goodsInfo">
					<view class="goodsDes">
						<view v-show="details.star > 0" class="goodsStar">{{details.star}}星</view>
						<view class="goodsTxt">
							{{details.goods_name}}
						</view>
					</view>
					<view class="goodsSale">
						<view style="color: #000000;">
							共青价：
						</view>
						鲜豆  {{details.goods_price}}
					</view>
					<view class="goodsSaleInfo">
						市场价：￥{{details.market_price}}
					</view>
					<view class="goodsSaleInfo">
						兑换截止时间：
						<view style="color: red">
							{{details.exchange_deadline}}
						</view>
					</view>
				</view>
		</view>
		<!-- 商品评价 -->
		<view class="evaluationWrapper" @click="goToEvaluation">
			<view class="evaluationHeader">
				<view class="title">商品评价 ({{evaluationCount}})</view>
				<view class="more" v-show="evaluationCount"><uni-icons type="right"></uni-icons></view>
			</view>
			<view class="evaluation" v-if="evaluationCount">
				<view class="userName">
					<image class="userAvatar" :src="evaluation.userAvatar" mode="aspectFill"></image>
					<text>{{evaluation.userName}}</text>
				</view>
				<view class="content">{{evaluation.goodsEvaluation}}</view>
				<view class="evaluationImageList" v-if="evaluation.evaluationPicture && evaluation.evaluationPicture.length">
					<image class="evaluationImage" mode="aspectFill" v-for="url in evaluation.evaluationPicture" :key="url" :src="url" alt="">
				</view>
				<view class="time">{{evaluation.createTime}}</view>
			</view>
		</view>
		<!-- 商品详情（图片） -->
		<view class="goodsDetailsWrapper">
			<view class="nav">
				—— 商品详情 ——
			</view>
			<view class="goodsDetails" v-for="(item,index) in describe" :key="index">
				<image :src="item" mode="widthFix"></image>
			</view>
			<view class="emptyTip" v-show="!describe || describe.length === 0">暂无图片</view>
		</view>
		<view class="footer">
			<view class="goodsSale">
				<view style="color: #000000;">
					共青价：
				</view>
				鲜豆  {{details.goods_price}}
				<!-- <view class="saleBean">

				</view> -->
				<!-- <view style="color:#000000">+</view>
				￥
				<view class="salePrice">
					{{details.price}}
				</view> -->
			</view>
			<button type="default" class="btn" @click="buy">立即兑换</button>
		</view>
	</view>
</template>

<script>
	import {baseURL} from '../../publicAPI/baseData.js'
	import { getAuthorization } from '../../publicAPI/newToken.js';
	import { request } from '../../publicAPI/request.js';
	import { getLoginTask } from '../../publicAPI/userInfo.js';
	import { correctTime } from '../../utils/common.js';
	export default {
		data() {
			return {
				evaluationList: [],
				evaluation: {
					id: "",
					userAvatar: "",
					userName: "",
					goodsEvaluation: "",
					evaluationPicture: [],
					createTime: "",
				},
				evaluationCount: 0,
				details: {},
				item: {},
				describe:[],
			}
		},
		onLoad(option) {
			if (option.details){
				// decodeURIComponent 解密传过来的对象字符串
				this.details = JSON.parse(decodeURIComponent(option.details));
				console.log(this.details)
				if (this.details.goods_describe) {
					this.describe = this.details.goods_describe.split(";")
				}
				console.log(this.describe)
			}

			// 获取商品评价
			const app = getApp()
			request({
				url: baseURL + "/goodsEvaluation/evaluationByGoodsId",
				method: "GET",
				header: {
					'Authorization':"Bearer " + getAuthorization(),
				},//请求头
				data: {
					goodsId: this.details.goods_id,
				},
				success: res => {
					if (res.data.code !== 200) {
						return
					}
					console.log("商品评价列表", res.data)
					if (Array.isArray(res.data.object)) {
						res.data.object.forEach(item => {
							item.createTime = correctTime(item.createTime)
							item.userAvatar = item.params.userAvatar
							item.userName = item.params.userName
							if (!item.userName) {
								item.userName = "*" + "**"
							} else {
								item.userName = item.userName[0] + "**"
							}
						})
						this.evaluationList = res.data.object
						this.evaluation = res.data.object[0]
						this.evaluationCount = res.data.object.length;
						console.log("商品评价", this.evaluation)
					}

				}
			})
		},
		methods: {
			/** 跳转到商品评价页面 */
			goToEvaluation() {
				if (!Array.isArray(this.evaluationList) || this.evaluationList.length === 0) {
					return
				}
				const list = encodeURIComponent(JSON.stringify(this.evaluationList))
				uni.navigateTo({
					url: "/pages/evaluatePage/evaluatePage?list=" + list,
				})
			},
			/** 点击立即兑换 */
			buy(){
				getLoginTask().then(() => {
					if(getApp().globalData.hasUserInfo != 1){
						uni.showToast({
							icon: 'none',
							title: "用户未登录"
						});
						setTimeout(()=>{
							uni.navigateTo({
								url: '../login/login'
							})
						},1000)
					}else{
						let details = encodeURIComponent(JSON.stringify(this.details))
						uni.navigateTo({
							url:'../orderDetails/orderDetails?details='+details
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../styles/detailsPage.scss";
</style>


// let app = getApp()
			// uni.request({
			// 	url: 'http://yibinmall.chenglee.top:8080/goods/' + this.details.goods_id,
			// 	method: "GET",
			// 	// data: msg,
			// 	header: {
			// 		'Authorization':"Bearer "+app.globalData.Authorization,
			// 	},//请求头
			// 	dataType: "json",
			// 	sslVerify: false,
			// 	success: res => {
			// 		console.log(res)
			// 	},
			// 	fail: err => {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: "获取商品信息失败，请重试！"
			// 		});
			// 	}
			// })
