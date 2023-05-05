<template>
	<view class="detailsBody">
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
						兑换截止日期：
						<view style="color: red">
							{{details.exchange_deadline}}
						</view>
					</view>
				</view>
		</view>
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
			<button type="default" @click="buy">立即兑换</button>
		</view>
	</view>
</template>

<script>
	import {baseURL} from '../../publicAPI/baseData.js'
	export default {
		data() {
			return {
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

		},
		methods: {
			buy(){
				if(getApp().globalData.hasUserInfo == 0){
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
