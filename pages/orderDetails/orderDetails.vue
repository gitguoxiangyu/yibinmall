<template>
	<view class="main">
		<view class="item">
			<view class="head">
				<view class="container">
					<img src="../../static/img/wanda100.jpg" alt="商品图片" class="goodImg">
					<view class="goodText">
						<view class="goodDetail">{{details.describe}}</view>
						<view class="goodPrice">共青价：<span style="color: red; font-weight: bold;" >鲜豆{{details.bean}}</span></view>
					</view>
				</view>
				<view class="deliveryWay">
					<view class="way">配送方式：</view>
					<view class="deliver">线下商家配送（ 送货上门 ）</view>
				</view>
			</view>
			<view class="body">
				<view class="person">
					<view>收货人</view>
					<view>{{person.name}}</view>
				</view>
				<view class="tel">
					<view>收货电话</view>
					<view>{{person.tel}}</view>
				</view>
				<view class="address">
					<view>收货地址</view>
					<view>{{person.address}}</view>
				</view>
			</view>
			<view class="foot">
				<view class="bean">
					<view>商品鲜豆</view>
					<view>{{details.bean}}</view>
				</view>
				<view class="star">
					<view>会员星级</view>
					<view>{{details.star}}</view>
				</view>
				<view class="flashTime">
					<view>截至兑换日期</view>
					<view>{{details.flashTime}}</view>
				</view>
				<view class="sum"><span style="color: red; font-weight: bold;" >鲜豆{{details.bean}}</span>合计： </view>
			</view>
		</view>
		<view class="pay">
			<view style="color: red; font-weight: bold;">
				鲜豆{{details.bean}}
			</view>
			<view class="btn"><button class="btn">立即支付</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:{},
				person:{
					name:"吴青年",
					tel:1801234578,
					address:"宜宾市叙州区青年服务中心"
				}
			}
		},
		onLoad(option) {
			if (option.details){
				// decodeURIComponent 解密传过来的对象字符串
				this.details = JSON.parse(decodeURIComponent(option.details));
				console.log(this.details)
			}
		},
		methods: {
			// buy(){
			// 	let details = encodeURIComponent(JSON.stringify(this.details))
			// 	uni.navigateTo({
			// 		url:'../orderDetails/orderDetails?details='+details
			// 	})
			// }
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
	
	.person{
		/* margin: 1vh 0; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.tel{
		margin: 1vh 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.address{
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
</style>