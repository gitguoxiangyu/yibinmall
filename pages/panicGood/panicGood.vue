<template>
	<view class="body">
		<view class="goods">
				<view class="goodsPic">
					<image class="goodsImg" :src="details.goods.goods_main_picture"></image>
				</view>
				<view class="goodsInfo">
					<view class="goodsDes">
						<view v-show="details.goods.star > 0" class="goodsStar">{{details.goods.star}}星</view>
						<view class="goodsTxt">
							{{details.goods.goods_name}}
						</view>
					</view>
					<view class="goodsSale">
						<view style="color: #000000;">
							共青价：
						</view>
						鲜豆  {{details.panicBuyingGoods.panic_buying_price}}
					</view>
					<view class="goodsSaleInfo">
						市场价：￥{{details.goods.market_price}}
					</view>
					<view class="goodsSaleInfo">
						抢购开始时间：
						<view style="color: red">
							{{details.panicBuyingGoods.panic_buying_start_time}}
						</view>
					</view>
					<view class="goodsSaleInfo">
						抢购截止时间：
						<view style="color: red">
							{{details.panicBuyingGoods.panic_buying_end_time}}
						</view>
					</view>
				</view>
		</view>
		<view class="goodsDetails">
			<view class="nav">
				—— 商品详情 ——
			</view>
			<view class="details" v-for="(item,index) in describe" :key="index">
				<image :src="'http://yibinmall.chenglee.top:8080' + item" mode="widthFix"></image>
			</view>
		</view>
		<view class="footer">
			<view class="goodsSale">
				<view style="color: #000000;">
					共青价：
				</view>
				鲜豆  {{details.panicBuyingGoods.panic_buying_price}}
				<!-- <view class="saleBean">
					
				</view> -->
				<!-- <view style="color:#000000">+</view>
				￥
				<view class="salePrice">
					{{details.price}}
				</view> -->
			</view>
			<button type="default" @click="buy" v-if="details.remainEndSeconds >= 0">立即兑换</button>
			<button type="default" class="overTime" @click="buy" v-else>抢购已结束</button>
		</view>
	</view>
</template>

<script>
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
				this.describe = this.details.goods.goods_describe.split(";")
				console.log(this.describe)
			}
			
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
						url:'../panicGoodOrder/panicGoodOrder?details='+details
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
				height: 72vh; // 取消固定高度，防止内容溢出
				background-color: #FFFFFF;
				.goodsPic{
					height: 48vh;
					position: relative;
					.goodsImg{
						width: 100%;
						height: 100%;
					}
				}
				.goodsInfo{
					height: 20vh;
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
					height: 60vh;
					image{
						width: 100%;
						height: 100%;
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
				justify-content: space-between;
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
					margin-left: 25vw;
					width: 28vw;
					height: 3vh;
					background-color: red;
					color: #FFFFFF;
					line-height: 3vh;
					text-align: center;
					border-radius: 12px;
				}
				.overTime{
					margin-left: 25vw;
					width: 28vw;
					height: 3vh;
					background-color: grey;
					color: #FFFFFF;
					line-height: 3vh;
					text-align: center;
					border-radius: 12px;
					font-size: 3vw;
				}
			}
		}
	}
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