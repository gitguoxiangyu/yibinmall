<template>
	<view class="body">
		<view class="goods">
				<view class="goodsPic">
					<image class="goodsImg" :src="'http://yibinmall.chenglee.top:8080' + details.coupons.main_picture"></image>
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
		<view class="goodsDetails">
			<view class="nav">
				—— 商品详情 ——
			</view>
			<view class="details">
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
			<button type="default" @click="buy">立即兑换</button>
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
				}else if(getApp().globalData.hasUserInfo == 0){
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
	page{
		background-color: #F5F5F5;
		image{
			image-rendering: pixelated;
		}
		.body{
			width: 100vw;
			height: 100vh;
			.goods{
				width: 100vw;
				// height: 60vh; // 取消固定高度，防止内容溢出
				background-color: #FFFFFF;
				.goodsPic{
					height: 46vh;
					position: relative;
					.goodsImg{
						width: 100%;
						height: 100%;
					}
				}
				.goodsInfo{
					// height: 12vh;
					padding-left: 0.5vw;
					padding-top: 0.5vh;
					.goodsDes{
						position: relative;
						white-space: normal;   //使文本多行显示
						text-overflow: ellipsis;  //多余的部分用省略号来代替
						overflow: hidden;      // 隐藏多余的部分
						display: -webkit-box;       //浮动布局
						-webkit-line-clamp: 2;      //显示的行数
						-webkit-box-orient: vertical;   //垂直排列
						.goodsStar{
							display: inline-block;
							padding: 1px 4px;
							margin-left: 3px;
							margin-right: 6px;
							transform: translateY(-2px);
							vertical-align: middle;
							text-align: center;
							background-color: red;
							border-radius: 5px;
							font-size: 10px;
							color: #FFFFFF;
						}
						.goodsTxt{
							white-space: normal;   //使文本多行显示
							font-weight: bold;
							display: inline;
						}
					}
					.goodsSaleInfo{
						margin-top: 1vh;
						display: flex;
						font-size: 14px; // 原本的8px太小了
						color: #999999;
					}
					.goodsSale{
						margin-top: 1vh;
						height: 3vh;
						display: flex;
						align-items:flex-end;
						color: red;
						font-size: 14px;
						.saleBean,.salePrice{
							font-size: 22px;
						}
					}
				}
			}
			.goodsDetails{
				.nav{
					height: 4vh;
					line-height: 4vh;
					text-align: center;
					font-size: 10px;
					color: #cccccc;
				}
				.details{
					height: 30vh;
					background-color: #FFFFFF;
					padding-top: 1.5vh;
					.useTime,.address,.attention{
						display: flex;
						justify-content: space-between;
						margin-top: 1.5vh;
						font-size: 14px;
						.left{
							width: 20vw;
							margin-left: 3vw;
						}
						.right{
							margin-right: 3vw;
						}
					}
					.attention{
						.right{
							view{
								margin-bottom: 2vh;
								color: red;
							}
						}
					}
				}
			}
			.footer{
				width: 100vw;
				height: 6vh;
				position: fixed;
				bottom: 0;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				flex-direction: row;
				.goodsSale{
					margin-left: 4vw;
					height: 3vh;
					display: flex;
					align-items:flex-end;
					color: red;
					.saleBean,.salePrice{
						font-size: 22px;
					}
				}
				button{
					margin-left: 30vw;
					width: 28vw;
					height: 3vh;
					background-color: red;
					color: #FFFFFF;
					line-height: 3vh;
					text-align: center;
					border-radius: 12px;
				}
			}
		}
	}
</style>
