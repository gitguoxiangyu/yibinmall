<template>
	<view class="main">
		<view class="item">
			<view class="head">
				<view class="container">
					<img :src="details.goods.goods_main_picture" alt="商品图片" class="goodImg">
					<view class="goodText">
						<view class="goodDetail">{{details.goods.goods_name}}</view>
						<view class="goodPrice">共青价：<span style="color: red; font-weight: bold;" >鲜豆{{details.goods.goods_price}}</span></view>
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
				<view class="bean">
					<view>商品鲜豆</view>
					<view>{{details.goods.goods_price}}</view>
				</view>
				<view class="star">
					<view>会员星级</view>
					<view>{{details.goods.star}}星</view>
				</view>
				<view class="flashTime">
					<view>市场价</view>
					<view>{{details.goods.market_price}}元</view>
				</view>
				<view class="sum"><span style="color: red; font-weight: bold;" >鲜豆{{details.goods.goods_price}}</span>合计： </view>
			</view>
		</view>
		
	</view>
</template>

<script>
import getToken from '../../publicAPI/getToken.js'
import updatePersonMsg from '../../publicAPI/updataPersonMsg.js'
import {baseURL} from '../../publicAPI/baseData.js'
import { correctTime } from '../../utils/common.js'
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
			uni.request({
				url: baseURL + '/orders/orderById?orderId=' + this.details.exchange.order_id,
				method: "GET",
				header: {
					'Authorization':"Bearer "+app.globalData.Authorization,
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

<style>
	.main{
		height: 100vh;
		background-color: rgb(245,245,245);
	}
	
	.item{
		height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
		
	.head{
		height: 18vh;
		padding: 5vw;
		background-color: white;
	}
	
	.container{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		height: 30vw;
	}
		
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
	}
	
	.goodDetail{
		width: 60vw;
		height: 13vw;
		overflow: hidden;  
		font-weight: bold;
		font-size: 10px;
	}
	
	.goodPrice{
		width: 60vw;
		height: 12vw;
		font-size: 10px;
	}
	
	.deliveryWay{
		font-size: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.body{
		font-size: 10px;
		padding: 5vw;
		background-color: white;
	}
	
	.option{
		margin: 1vh 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.foot{
		font-size: 10px;
		padding: 5vw;
		background-color: white;
	}
	
	.bean{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.star{
		margin: 1vh 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.flashTime{
		margin: 1vh 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.sum{
		margin: 1vh 0;
		display: flex;
		flex-direction: row-reverse;
	}
	
	.pay{
		width: 100vw;
		height: 4vh;
		padding: 5vw;
		position: fixed;
		bottom: 0;
		background-color: white;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.btn{
		width: 28vw;
		height: 3vh;
		margin-right: 10vw;
		background-color: red;
		color: #FFFFFF;
		line-height: 3vh;
		text-align: center;
		border-radius: 12px;
	}
	
	/* 弹窗 */
	.modal{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: white;
		width: 70vw;
		border: 1px rgb(195,195,195) solid;
		padding: 1vh 3vw;
	}
	.inputItem{
		display: flex;
		flex-direction: row;
		font-size: 12px;
		margin:2vh 0;
		vertical-align: sub;
	}
	.input{
		margin-left: 3vw;
		border-bottom: 1px rgb(195,195,195) solid;
	}
	
</style>