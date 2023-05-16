<template>
	<view class="detailsBody">
		<view class="goods">
				<view class="goodsPic">
					<image class="goodsImg" :src="details.coupons.main_picture"></image>
				</view>
				<view class="goodsInfo">
					<view class="goodsDes">
						<view v-show="details.coupons.star > 0" class="goodsStar">{{details.coupons.star}}星</view>
						<view class="goodsTxt">
							{{details.coupons.coupon_name}}
						</view>
					</view>
					<view class="goodsSale">
						<view style="color: #000000;">
							共青价：
						</view>
						鲜豆  {{details.panicBuyingCoupons.panic_buying_price}}
					</view>
					<view class="goodsSaleInfo">
						市场价：￥{{details.coupons.market_price}}
					</view>
					<view class="goodsSaleInfo">
						抢购开始时间：
						<view style="color: red">
							{{details.panicBuyingCoupons.panic_buying_start_time}}
						</view>
					</view>
					<view class="goodsSaleInfo">
						抢购截止时间：
						<view style="color: red">
							{{details.panicBuyingCoupons.panic_buying_end_time}}
						</view>
					</view>
				</view>
		</view>
		<view class="goodsDetailsWrapper">
			<view class="nav">
				—— 商品详情 ——
			</view>
			<view class="ticketDetails">
				<view class="useTime">
					<view class="left">
						使用时间
					</view>
					<view class="right">
						{{details.coupons.available_time}}
					</view>
				</view>
				<view class="address">
					<view class="left">
						使用地址
					</view>
					<view class="right">
						{{details.coupons.place_of_use}}
					</view>
				</view>
				<view class="attention">
					<view class="left">
						注意事项
					</view>
					<view class="right">
						<view class="first">
							{{details.coupons.notice}}
						</view>
						<!-- <view class="second">
							2.此消费券不兑换现金，只能才购买商品时抵扣！
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="goodsSale">
				<view style="color: #000000;">
					共青价：
				</view>
				鲜豆  {{details.panicBuyingCoupons.panic_buying_price}}
			</view>
			<!-- <button type="default" @click="buy">立即兑换</button> -->
			<button type="default" @click="buy" v-if="details.remainEndSeconds >= 0">立即兑换</button>
			<button type="default" class="overTime" @click="buy" v-else>抢购已结束</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:{}
			}
		},
		onLoad(option) {
			// console.log(option.details)
			// decodeURIComponent 解密传过来的对象字符串
			this.details = JSON.parse(decodeURIComponent(option.details))
			console.log(this.details)
		},
		methods: {
			buy(){
				if (this.details.remainBeginSeconds > 0){
					uni.showToast({
						icon: 'none',
						title: "抢购时间未到，请耐心等待"
					});
				}else if (this.details.remainEndSeconds < 0){
					uni.showToast({
						icon: 'none',
						title: "抢购时间已过"
					});
				}else if(getApp().globalData.hasUserInfo != 1){
					uni.showToast({
						icon: 'none',
						title: "用户未登录"
					});
					setTimeout(()=>{
						uni.navigateTo({
							url: '../login/login'
						})
					},1000)
				}else {
					let details = encodeURIComponent(JSON.stringify(this.details))
					uni.navigateTo({
						url:'../panicTicketOrder/panicTicketOrder?details='+details
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../styles/detailsPage.scss";
</style>
