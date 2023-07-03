<template>
	<view class="main">
		<view class="blockItem">
			<view class="head">
				<view class="container">
					<img :src="details.goods.goods_main_picture" alt="商品图片" class="goodImg">
					<view class="goodText">
						<view class="goodDetail">{{details.goods.goods_name}}</view>
						<view class="goodPrice">共青价：<span style="color: red; font-weight: bold;" >鲜豆 {{details.goods.goods_price}}</span></view>
					</view>
				</view>
				<view class="deliveryWay">
					<view class="way">配送方式：</view>
					<view class="deliver">线下商家配送（ 送货上门 ）</view>
				</view>
			</view>
			<view class="body" @click="change">
				<view class="option">
					<view>收货人</view>
					<view>{{order.consignee_name}}</view>
				</view>
				<view class="option">
					<view>收货电话</view>
					<view>{{order.consignee_phone}}</view>
				</view>
				<view class="option">
					<view>收货地址</view>
					<view>{{order.consignee_address}}</view>
				</view>
				<view class="option">
					<view>货物数量</view>
					<view>{{order.number}}</view>
				</view>
				<view class="option">
					<view>下单时间</view>
					<view>{{order.order_time}}</view>
				</view>
			</view>
			<view class="foot">
				<view class="option">
					<view>团支部分区</view>
					<view>{{order.volunteer_area}}</view>
				</view>
				<view class="option">
					<view>商品鲜豆</view>
					<view>{{details.goods.goods_price}}</view>
				</view>
				<view class="option">
					<view>会员星级</view>
					<view>{{details.goods.star}} 星</view>
				</view>
				<view class="option">
					<view>市场价</view>
					<view>{{details.goods.market_price}} 元</view>
				</view>
				<view class="option option--rightAligned"><span style="color: red; font-weight: bold;" >鲜豆 {{details.goods.goods_price}}</span>合计： </view>
			</view>
		</view>

	</view>
</template>

<script>
import {baseURL} from '../../publicAPI/baseData.js'
import { correctTime } from '../../utils/common.js'
import { request } from '../../publicAPI/request.js'
import { getAuthorization } from '../../publicAPI/newToken.js'
export default {
	data() {
		return {
			showPop: false,
			details:{},
			person:{},
			order: {}
		}
	},
	onLoad(option) {
		if (option.details){
			// decodeURIComponent 解密传过来的对象字符串
			this.details = JSON.parse(decodeURIComponent(option.details));
			console.log(this.details)
			let app = getApp()
			request({
				url: baseURL + '/orders/orderById?orderId=' + this.details.exchange.order_id,
				method: "GET",
				header: {
					'Authorization':"Bearer " + getAuthorization(),
				},//请求头
				dataType: "json",
				sslVerify: false,
				success: res => {
					this.order = res.data.object
					this.order.order_time = correctTime(this.order.order_time)
					console.log(this.order)
				},
				fail: err => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '订单信息获取错误'
					});
				}
			})
		}
	},
	methods: {
		change(){
			this.showPop = true
		},
		closeModal(){
			this.showPop = false
		},
	}
}
</script>

<style lang="scss">
	@import "../../styles/orderPage.scss";
</style>
