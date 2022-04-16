<template>
	<view class="body">
		<view class="goods">
				<view class="goodsPic">
					<image class="goodsImg" :src="details.url"></image>
				</view>
				<view class="goodsInfo">
					<view class="goodsDes">
						<view class="goodsStar">{{details.star}}星</view>
						<view class="goodsTxt">
							{{details.describe}}
						</view>
					</view> 
					<view class="goodsSale">
						<view style="color: #000000;">
							共青价：
						</view>
						鲜豆
						<view class="saleBean">
							{{details.bean}}
						</view> 
						<view style="color:#000000">+</view> 
						￥
						<view class="salePrice">
							{{details.price}}
						</view>
					</view>
					<view class="goodsSaleInfo">
						市场价：￥{{details.markPrice}}
					</view>
					<view class="goodsSaleInfo">
						兑换截止日期：
						<view style="color: red">
							{{details.exchangeDDL}}
						</view>
					</view>
				</view>
		</view>
		<view class="goodsDetails">
			<view class="nav">
				—— 商品详情 ——
			</view>
			<view class="details">
				<image src="../../static/img/recommendReason.png"></image>
			</view>
		</view>
		<view class="footer">
			<view class="goodsSale">
				<view style="color: #000000;">
					共青价：
				</view>
				鲜豆
				<view class="saleBean">
					{{details.bean}}
				</view> 
				<view style="color:#000000">+</view> 
				￥
				<view class="salePrice">
					{{details.price}}
				</view>
			</view>
			<button type="default">立即兑换</button>
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
			this.details = JSON.parse(decodeURIComponent(option.details));
			console.log(this.details)
		},
		methods: {
			
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
				height: 64vh;
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
					height: 14vh;
					padding-left: 0.5vw;
					padding-top: 0.5vh;
					.goodsDes{
						position: relative;
						.goodsStar{
							position: absolute;
							top: 0.35vh;
							left: 0.4vw;
							width: 8vw;
							height: 2vh;
							line-height: 2vh;
							text-align: center;
							background-color: red;
							border-radius: 5px;
							font-size: 8px;
							color: #FFFFFF;
						}
						.goodsTxt{
							text-indent: 2.2em;      //段前空格
							white-space: normal;   //使文本多行显示
							text-overflow: ellipsis;  //多余的部分用省略号来代替
							overflow: hidden;      // 隐藏多余的部分
							display: -webkit-box;       //浮动布局
							-webkit-line-clamp: 2;      //显示的行数
							-webkit-box-orient: vertical;   //垂直排列
							font-weight: bold;
						}
					}
					.goodsSaleInfo{
						margin-top: 1vh;
						display: flex;
							font-size: 8px;
							color: #999999;
					}
					.goodsSale{
						margin-top: 1vh;
						height: 3vh;
						display: flex;
						align-items:flex-end;
						color: red;
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
					margin-left: 13vw;
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
