<template>
	<view class="body">
		<view class="header">
			<view class="headerBac"><image src="../../static/img/headerBac.png"></image></view>
			<view class="usr">
				<view class="headPortait"><image src="../../static/img/headPortrait.png"></image></view>
				<view class="usrInfo">
					<view class="usrInfoHeader">
						<view class="name">吴青年</view>
						<view class="star">
							<image src="../../static/img/star.png"></image>
							<view class="starTxt">3星青年</view>
						</view>
					</view>
					<view class="usrInfoCenter">
						<view class="starRate" :style="{'width' : this.starRate + '%'}"></view>
					</view>
					<view class="usrInfoFooter">青年成长值300,还需要700升级为4星青年</view>
				</view>
			</view>
			<view class="wallet">
				<view class="bean" @click="toBeanDetails">
					<view class="beanHeader">
						<view class="beanName">鲜豆</view>
						<view class="beanNum">1240</view>
					</view>
					<view class="beanFooter">有240个3.31到期 <uni-icons type="arrowright" size="12"></uni-icons></view>
				</view>
				<view class="ticket">
					<view class="ticketHeader">
						<view class="ticketIcon"><uni-icons type="shop" size="22" color="red"></uni-icons></view>
						<view class="ticketName">兑换记录</view>
					</view>
					<view class="ticketFooter">有2张3.31到期 <uni-icons type="arrowright" size="12"></uni-icons></view>
				</view>
			</view>
		</view>
		<view class="nav">
			<view :class="{navActive:item.active}" v-for="(item,index) in navArr" :key="index" @click="changeNavActive(index,navArr)">
				{{item.name}}
			</view>
		</view>
		<view class="subNav">
			<view :class="{subNavActive:item.active}" v-for="(item,index) in subNavArr" :key="index" @click="changeNavActive(index,subNavArr)">
				{{item.name}}
			</view>
		</view>
		<view class="content">
			<view class="hot" v-if="navArr[0].active == true">
				<view class="goods" v-for="(item,index) in goods" :key="index" @click="toGoodsDetails(item)">
						<view class="goodsPic">
							<image class="flashLogo" src="../../static/img/flashSale.png"></image>
							<image class="goodsImg" :src="item.url"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsDes">
								<view class="goodsStar">{{item.star}}星</view>
								<view class="goodsTxt">
									{{item.describe}}
								</view>
							</view>
							<view class="goodsSaleInfo">
								<view class="goodsNum" v-if="!item.isFlashSale">
									仅剩{{item.num}}件
								</view>
								<view class="flashTime" v-if="item.isFlashSale">
									抢购
									<view style="color: red">
										{{item.flashTime}}
									</view>
									开始
								</view>
							</view>
							<view class="goodsSale">
								鲜豆
								<view class="saleBean">
									{{item.bean}}
								</view> 
								<view style="color:#000000">+</view> 
								￥
								<view class="salePrice">
									{{item.price}}
								</view>
							</view>
						</view>
				</view>
			</view>
			<view class="generalPreferential" v-if="navArr[2].active == true">
				<view class="goods" v-for="(item,index) in ticket" :key="index" @click="toTicketDetails(item)">
						<view class="goodsPic">
							<image class="goodsImg" :src="item.url"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsDes">
								<view class="goodsStar">{{item.star}}星</view>
								<view class="goodsTxt">
									{{item.mallName}}通用{{item.money}}元消费券
								</view>
							</view>
							<view class="goodsSaleInfo">
								<view class="goodsNum" v-if="!item.isFlashSale">
									仅剩{{item.num}}件
								</view>
								<view class="flashTime" v-if="item.isFlashSale">
									抢购
									<view style="color: red">
										{{item.flashTime}}
									</view>
									开始
								</view>
							</view>
							<view class="goodsSale">
								鲜豆
								<view class="saleBean">
									{{item.bean}}
								</view> 
							</view>
						</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import icons from '../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	export default {
		components:{"uni-icons":icons},
		data() {
			return {
				starRate:20,
				navArr:[
					{
						name:'热门',
						active:true
					},
					{
						name:'限时抢购',
						active:false
					},
					{
						name:'通用优惠',
						active:false
					},
					{
						name:'商家优惠',
						active:false
					}
				],
				subNavArr:[
					{
						name:'全部',
						active:true
					},
					{
						name:'1-50豆',
						active:false
					},
					{
						name:'51-100豆',
						active:false
					},
					{
						name:'101豆以上',
						active:false
					}
				],
				goods:[
					{
						describe:'（Dyson）AM07 无叶电风 扇 落地扇 强劲稳定气流 进xxxx扇 落地扇 强劲稳定气流 进扇 落地扇 强劲稳定气流 进',
						price:255,
						markPrice:999,
						bean:108,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/goods.png',
						recommedUrl:'../../static/img/recommendReason.png'
					},
					{
						describe:'科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
						price:255,
						markPrice:999,
						bean:108,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/goods.png',
						recommedUrl:'../../static/img/recommendReason.png'
					},
					{
						describe:'（Dyson）AM07 无叶电风 扇 落地扇 强劲稳定气流 进xxxx科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
						price:255,
						markPrice:999,
						bean:108,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/goods.png',
						recommedUrl:'../../static/img/recommendReason.png'
					},
					{
						describe:'科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
						price:255,
						markPrice:999,
						bean:108,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/goods.png',
						recommedUrl:'../../static/img/recommendReason.png'
					}
				],
				ticket:[
					{
						mallName:'万达广场',
						money:100,
						markPrice:100,
						bean:100,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						useTime:'2022-04-16 19:00:00-2022-04-28 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/wanda100.jpg'
					},
					{
						mallName:'莱茵春天',
						money:100,
						markPrice:100,
						bean:100,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						useTime:'2022-04-16 19:00:00-2022-04-28 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/rhine100.jpg'
					},
					{
						mallName:'万达广场',
						markPrice:100,
						bean:100,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						useTime:'2022-04-16 19:00:00-2022-04-28 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/wanda50.jpg'
					},
					{
						mallName:'莱茵春天',
						markPrice:100,
						bean:100,
						num:3,
						star:3,
						isFlashSale:1,//是否为限时抢购
						flashTime:'2022-04-16 18:00:00',
						useTime:'2022-04-16 19:00:00-2022-04-28 18:00:00',
						exchangeDDL:'2022-04-28 18:00:00',
						url:'../../static/img/rhine50.jpg'
					}
				]
			}
		},
		methods: {
			changeNavActive(index,item){
				for (var i = 0; i < item.length; i++) {
					item[i].active = false
					if(index == i) {
						item[i].active = true
					}
				}
			},
			toGoodsDetails(item){
				// console.log("跳转")
				// 加密传递的对象数据
				let details = encodeURIComponent(JSON.stringify(item))
				// console.log(item)
				uni.navigateTo({
					url:'../goodsDetails/goodsDetails?details='+details
				})
			},
			toTicketDetails(item){
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../ticketDetails/ticketDetails?details='+details
				})
			},
			toBeanDetails(item){
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../beanDetails/beanDetails?details='+details
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
		image{
			image-rendering: pixelated;
		}
		.body{
			width: 100vw;
			.header{
				position: relative;
				height: 23vh;
				.headerBac{
					width: 100vw;
					height: 19vh;
					position: absolute;
					top: 0;
					z-index: 1;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.usr{
					position: absolute;
					top: 4vh;
					z-index: 2;
					width: 100vw;
					height: 9vh;
					display: flex;
					flex-direction: row; 
					align-items: center;
					.headPortait{
						width: 60px;
						height: 60px;
						margin-left: 8.4vw;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.usrInfo{
						width: 60vw;
						margin-left: 4vw;
						.usrInfoHeader{
							width: 50vw;
							height: 4vh;
							display: flex;
							.name{
								width: 15vw;
								line-height: 4vh;
								color: #f53a33;
								font-weight: bold;
								font-size: 18px;
							}
							.star{
								height: 4vh;
								width: 22vw;
								position: relative;
								image{
									height: 100%;
									width: 100%;
									position: absolute;
									z-index: -1;
								}
								.starTxt{
									position: absolute;
									right: 1vw;
									font-size: 14px;
									line-height: 4vh;
									color: #f53a33;
									font-style: italic;
									font-weight: bold;
								}
							}
						}
						.usrInfoCenter{
							margin-top: 1vh;
							margin-bottom: 1vh;
							width: 40vw;
							height: 1vh;
							background-color: rgb(255, 255, 255);
							opacity: 0.502;
							border-radius: 2vw;
							.starRate{
								
								height: 100%;
								background-color: rgb(245, 58, 51);
								opacity: 0.502;
								border-radius: 2vw;
								
							}
						}
						.usrInfoFooter{
							height: 3vh;
							font-size: 8px;
							color: #8e8b85;
						}
					}
				}
				.wallet{
					position: absolute;
					top: 15vh;
					z-index: 2;
					width: 94vw;
					height: 8vh;
					border-radius: 5vw;
					background-color: rgb(255, 255, 255);
					margin: 0 0 0 3vw;
					display: flex; 
					flex-direction: row; 
					align-items: center;
					.bean{
						width: 35vw;
						padding-left: 10vw;
						border-right: #95928c 1px solid;
						.beanHeader{
							width: 35vw;
							height: 3vh;
							line-height: 3vh;
							display: flex;
							justify-content: space-between;
							.beanName{
								font-weight: bold;
							}
							.beanNum{
								padding-right: 10vw;
								font-size: 20px;
								color: #f53a33;
								font-weight: bold;
							}
						}
						.beanFooter{
							width: 35vw;
							height: 3vh;
							line-height: 3vh;
							left: 3vh;
							font-size: 10px;
							color: #9b9b9b;
						}
					}
					.ticket{
						width: 45vw;
						padding-left: 10vw;
						.ticketHeader{
							width: 45vw;
							height: 3vh;
							line-height: 3vh;
							display: flex;
							.ticketIcon{
								
							}
							.ticketName{
								margin-left: 1vh;
								font-weight: bold;
							}
						}
						.ticketFooter{
							width: 45vw;
							height: 3vh;
							line-height: 3vh;
							font-size: 10px;
							color: #9b9b9b;
						}
					}
				}			
			}
			.nav{
				pointer-events: auto;
				width: 100vw;
				height: 3vh;
				margin-top: 2vh;
				display: flex;
				justify-content: space-around;
				view{
					font-size: 18px;
					line-height: 2vh;
					text-align: center;
				}
				view:last-child{
					margin-right: 7vw;
				}
				.navActive{
					font-weight: bold;
					border-bottom: 2px solid red;
				}
			}
			.subNav{
				top: 20vh;
				width: 100vw;
				height: 5vh;
				margin-top: 2vh;
				display: flex;
				justify-content: space-around;
				view{
					background-color: #FFFFFF;
					width: 22vw;
					height: 5vh;
					line-height: 5vh;
					text-align: center;
					color: #999999;
					border-radius: 10%;
				}
				view:first-child{
					width: 14vw;
				}
				.subNavActive{
					color: red;
				}
			}
			.content{
				margin-top: 1vh;
				.hot,.flashSale,.generalPreferential,.merchantPreferential{
					display: flex;
					justify-content: center;
					flex-wrap: wrap;/*换行*/
					.goods:nth-child(even){
						margin-left: 3vw;
					}
					.goods{
						width: 45vw;
						height: 32vh;
						background-color: #FFFFFF;
						border-radius: 5px;
						margin-top: 1vh;
						.goodsPic{
							width: 45vw;
							height: 20vh;
							position: relative;
							.goodsImg{
								width: 100%;
								height: 100%;
							}
							.flashLogo{
								position: absolute;
								z-index: 1;
								top: 1vh;
								left: 1vw;
								width: 18vw;
								height: 2vh;
							}
						}
						.goodsInfo{
							width: 45vw;
							height: 10vh;
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
								margin-top: 0.5vh;
								.flashTime,.goodsNum{
									display: flex;
									font-size: 8px;
									color: #999999;
								}
							}
							.goodsSale{
								margin-top: 0.5vh;
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
				}
			}
		}
	}
</style>
