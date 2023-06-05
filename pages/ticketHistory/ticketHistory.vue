<template>
	<view class="page">
		<view class="nav">
			<view v-for="(item, index) in navArr" :key="index" class="navItem"
				:class="{ 'navItemActive': navActiveIndex === index }" @click="onNavItemClicked(index)">
				{{item.name}} ({{item.count}})
			</view>
		</view>
		<view class="content">
			<!-- 优惠券 -->
			<view :class="{
				'item': true,
				'item--used': item.exchange.exchange_status === '已使用',
				'item--expired': item.exchange.exchange_status === '已过期'
				}" v-for="(item, index) in displayTicket" :key="index">
				<view class="itemWrapper">
					<img class="itemPic" height="80" :src="item.coupons.main_picture" alt="">
					<img v-show="item.exchange.exchange_status === '已使用'" class="icon-used" src="../../static/img/exchange-icon.svg" alt="">
					<img v-show="item.exchange.exchange_status === '已过期'" class="icon-expired" src="../../static/img/exchange-icon-2.svg" alt="">
					<view class="itemInfo">
						<view class="itemDescription">
							<view v-if="item.star > 0" class="itemStar">{{item.coupons.star}}星</view>
							<view class="itemTitle">{{item.coupons.coupon_name}}</view>
						</view>
						<view class="itemPriceWrapper">
							<view class="itemPriceText1">鲜豆</view>
							<view class="itemBean itemPriceText2">{{item.coupons.coupon_price}}</view>
						</view>
						<view class="itemDateWrapper">
							<!-- <view class="itemDate">兑换截止时间: {{item.coupons.date_use_end.split(" ")[0]}}</view> -->
							<view class="itemDate">立减金兑换截止时间: <br>{{item.coupons.date_use_end}}</view>
							<!-- <view class="itemDate" v-else>使用日期: {{item.exchangeDDL.split(" ")[0]}}</view> -->
							<button v-if="item.exchange.exchange_status !== '已过期'" class="goodsButton" @click="onExchangeClicked(item)">兑换立减金</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品 -->
			<view class="item" v-for="(item, index) in displayItems" :key="item.id">
				<view class="itemWrapper">
					<img class="itemPic" height="80" :src="item.goods.goods_main_picture" alt="">
					<view class="itemInfo">
						<view class="itemDescription">
							<view v-if="item.star > 0" class="itemStar">{{item.goods.star}}星</view>
							<view class="itemTitle">{{item.goods.goods_name}}</view>
						</view>
						<view class="itemDateWrapper">
							<view class="itemDateWrapper-2">
								<view class="itemPriceWrapper">
									<view class="itemPriceText1">鲜豆</view>
									<view class="itemBean itemPriceText2">{{item.goods.goods_price}}</view>
								</view>
								<view class="buyingDate">下单时间: <br>{{item.exchange.params.orderTime}}</view>
							</view>
							<view class="buttonContainer">
								<button class="goodsButton" @click="toEvaluate(item)">我要评价</button>
								<button class="goodsButton" @click="toShowingOrder(item)">查看订单</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showPop" class="modal">
			<view class="uni-textarea">
				<textarea placeholder-style="color:#999999" placeholder="请输入详细描述,不超过50字" maxlength="50" name="advice"/>
			</view>
			<button @click="closeModal()" class="login" >确定</button>
		</view>
	</view>
</template>

<script>
	import { baseURL } from '../../publicAPI/baseData.js'
	import { correctTime } from '../../utils/common.js'
	import CryptoJS from "crypto-js"
	import { request } from '../../publicAPI/request.js'
	import { getAuthorization } from '../../publicAPI/newToken.js'
	import { getLoginTask } from '../../publicAPI/userInfo.js'

	export default {
		data() {
			return {
				navArr: [
					{
						name: "全部",
						count: 0,
					},
					{
						name: "已过期",
						count: 0,
					},
					{
						name: "未使用",
						count: 0,
					},
					{
						name: "已使用",
						count: 0,
					}
				],
				navActiveIndex: 0,
				goods: [],
				ticket: [],
				displayTicket: [],
				displayItems:[],
				showPop:false,
			}
		},
		onShow() {
		},
		onLoad() {
			getLoginTask().then(() => {
				let app = getApp()
				request({
					// url: 'http://yibinmall.chenglee.top:8080/exchange/page',
					url: baseURL + '/exchange/byUserId/' + app.globalData.UserInfo.id,
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer " + getAuthorization(),
					},//请求头
					dataType: "jsonbigint",
					sslVerify: false,
					success: res => {
						let arr = res.data.object
						this.ticket = []
						this.goods = []
						this.displayTicket = []
						this.displayItems = []
						arr.forEach((item,index) => {
							if (item.coupons != null){
								item.coupons.date_use_begin = correctTime(item.coupons.date_use_begin)
								item.coupons.date_use_end = correctTime(item.coupons.date_use_end)
								item.coupons.exchange_deadline = correctTime(item.coupons.exchange_deadline)
								this.ticket.push(item)
								this.displayTicket.push(item)
							}else if(item.goods != null){
								item.goods.exchange_deadline = correctTime(item.goods.exchange_deadline)
								item.goods.update_time = correctTime(item.goods.update_time)
								item.exchange.params.orderTime = correctTime(item.exchange.params.orderTime)
								this.goods.push(item)
								this.displayItems.push(item)
							}
						})
						console.log(this.ticket)
						console.log(this.goods)
						this.displayItems = this.displayItems.reverse()
						this.updateNavItemCount()
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "获取商品信息失败，请重试！"
						});
					}
				})
			})

		},
		methods: {
			/**
			 * 更新导航栏计数
			 */
			updateNavItemCount() {
				console.log("navArr", this.navArr)
				if (Array.isArray(this.ticket) && Array.isArray(this.goods)) {
					this.navArr[0].count = this.ticket.length + this.goods.length
					this.navArr[1].count = 0
					this.navArr[2].count = 0
					this.navArr[3].count = this.goods.length
					this.ticket.forEach(item => {
						if (item.exchange.exchange_status === "已过期") {
							this.navArr[1].count++
						} else if (item.exchange.exchange_status === "已兑换未使用") {
							this.navArr[2].count++
						} else if (item.exchange.exchange_status === "已使用") {
							this.navArr[3].count++
						}
					})
				}
			},
			onNavItemClicked(index) {
				this.navActiveIndex = index;
				if(index === 0){
					this.displayTicket = this.ticket
					this.displayItems = this.goods
				}
				else if(index === 1){
					let arr = []
					this.ticket.forEach((item,index)=>{
						if(item.exchange.exchange_status === "已过期"){
							arr.push(item)
						}
					})
					this.displayTicket = arr
					this.displayItems = null
				}
				else if(index === 2){
					let arr = []
					this.ticket.forEach((item,index)=>{
						if(item.exchange.exchange_status === "已兑换未使用"){
							arr.push(item)
						}
					})
					this.displayTicket = arr
					this.displayItems = null
				}
				else if(index === 3){
					// console.log("0000")
					let arr = []
					this.ticket.forEach((item,index)=>{
						if(item.exchange.exchange_status === "已使用"){
							arr.push(item)
						}
					})
					this.displayTicket = arr
					this.displayItems = this.goods
				}
			},

			/**
			 * 兑换优惠券接口
			 * @param {Object} item
			 */
			async onExchangeClicked(item) {
				// console.log("displayTicket", this.displayTicket)
				console.log("item", item)

				// 工行接口兑换链接只会返回一次，之后便再也不会返回
				// 为了避免兑换链接丢失，如果更新后台状态时出现网络问题，会使用LocalStorage缓存兑换链接

				// 检查exchange中是否保存有链接
				// if 保存有链接
				// 		link = 链接
				// 		直接跳转链接
				// 		（可以在此处检查LocalStorage，将存在的记录删除）
				// else
				// 		向工行发请求
				// 		if 成功（"000000"）
				// 			link = 链接
				// 			向后台发请求，更改兑换状态，并且保存link
				// 			if 请求成功
				// 				跳转链接
				// 			else （网络错误）
				// 				直接将link保存到LocalStorage
				// 		else if 已兑换过（100008）
				// 			从LocalStorage中取出链接
				// 			if 链接存在
				// 				link = 链接
				// 				向后台发请求，更改兑换状态，并保存link（不管成功或失败，都没有任何提示）
				// 				跳转链接
				// 			else
				// 				报错：已被兑换过（无法处理的错误）
				// 		else if 由于网络原因失败
				// 			提示网络错误，稍后重试
				//
				// if link
				// 		跳转链接

				return getLoginTask().then(async () => {
					const app = getApp()
					if (!app.globalData.UserInfo || !item.exchange) {
						return
					}

					const order_id = item.exchange.order_id
					// 远端记录中的link
					let link = item.exchange.link
					// LocalStorage中用于保存link的对象
					let storage = uni.getStorageSync("ticketHistoryLinks")
					// console.log("ticketHistoryLinks before", storage)
					if (!storage) storage = {}

					if (link) {
						delete storage[order_id]
					} else {
						// 获取兑换链接
							// console.log("UserInfo", app.globalData.UserInfo)
							// console.log("exchange", item.exchange)

						const rawData = {
							user: app.globalData.UserInfo.id + "",
							cash: item.coupons.market_price, // 按照之前的约定，立减金金额是2的倍数，需要在后台管理系统中做出对应调整
							order_id: order_id,
							act_id: "ybApp",
							task: "test"
						}
						// console.log("rawData", JSON.stringify(rawData))

						let key = "V!rGgMk72pk*sW@5"
						// console.log("===key===", key)
						key = CryptoJS.enc.Utf8.parse(key)
						// console.log("===key===", key)

						// AES加密
						const vlinkdata = CryptoJS.AES.encrypt(JSON.stringify(rawData), key, {
							mode: CryptoJS.mode.ECB,
							padding: CryptoJS.pad.Pkcs7,
						}).toString(CryptoJS.format.OpenSSL)
						// console.log("vlinkdata encrypted", vlinkdata)


						await request({
							// url: "https://didao.lovemojito.com/icbcMiNi/collection/placeOutOrder.php",
							url: baseURL + "/exchange/getLink",
							method: "POST",
							data: { vlinkdata: vlinkdata },
							header: {
								'Authorization': "Bearer " + getAuthorization(),
								"Content-Type": "application/x-www-form-urlencoded",
								// "Host": "didao.lovemojito.com",
							},
						}).then(res => {
							console.log("placeOutOrder.php", res)

							let data = res.data.object
							if (typeof data === "string") {
								data = JSON.parse(data)
							}
							if (data.code != "000000") {
								// 接口返回错误信息
								return Promise.reject(res)
							}

							// 成功获取link
							link = data.link
							console.log("获取立减金兑换链接成功 link:", link)

							// 更新优惠券使用状态
							return request({
								url: baseURL + `/exchange/couponStatus/${item.exchange.coupons_item_id}?link=${link}`,
								method: "POST",
								header: {
									'Authorization': "Bearer " + getAuthorization(),
								},
							}).then(res => {
								console.log("/exchange/couponStatus/", res)
								if (res.data.code !== 200) {
									// 后台接口返回错误信息
									return Promise.reject(res)
								}
							}).catch(res => {
								console.error("更改优惠券兑换状态失败", res)
								// 在LocalStorage中保存link
								storage[order_id] = link
							})
						}).catch(res => {
							console.error("获取立减金兑换链接失败", res)
							let msg = ""
							if (res.statusCode === 200) {
								let data = res.data.object
								if (typeof data === "string") {
									data = JSON.parse(data)
								}
								if (data.code == 100008) {
									// 已经兑换过
									// 检查LocalStorage中是否有记录
									link = storage[order_id]
									if (!link) {
										// LocalStorage中没有记录，无法处理
										msg = "该优惠券已经兑换过"
										msg = "未知错误！"
									} else {
										// LocalStorage中有记录，则使用记录的链接更新优惠券使用状态
										request({
											url: baseURL + `/exchange/couponStatus/${item.exchange.coupons_item_id}?link=${link}`,
											method: "POST",
											header: {
												'Authorization': "Bearer " + getAuthorization(),
											},
										}).then(res => {
											console.log("/exchange/couponStatus/", res)
											if (res.data.code !== 200) {
												return Promise.reject(res)
											}
										}).catch(res => {
											console.error("更改优惠券兑换状态失败", res)
										})
									}
								} else {
									// 除“已兑换过”的其他错误
									msg = data.msg
								}
							} else {
								// 网络错误
								msg = "网络错误，请稍后重试"
							}
							uni.showToast({
								icon: "none",
								title: msg,
							})
						})
					}
					// console.log("ticketHistoryLinks", storage)
					uni.setStorageSync("ticketHistoryLinks", storage)

					// 跳转链接，此处是一个引导打开微信小程序的H5页面
					// #ifdef H5
					if (link) {
						console.log("link:", link)
						location.href = link
					}
					// #endif
				})
			},
			toShowingOrder(item) {
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../showingOrder/showingOrder?details=' + details
				})
			},
			toEvaluate(item){
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../evaluateDetails/evaluateDetails?details=' + details
				})
			},
			change(){
				console.log("000")
				this.showPop = true
			},
			closeModal(){
				this.showPop = false
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
		// height: 100%;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		padding: 20px 20px 26px;
		background-color: #ffffff;
		box-shadow: 0 0 5px 0 #cccccc;
		font-size: 16px;

		.navItem {
			display: inline-block;
			position: relative;
			// box-sizing: border-box;
		}

		.navItemActive {
			font-weight: bold;
		}

		.navItemActive::after {
			content: " ";
			position: absolute;
			box-sizing: border-box;
			left: 20%;
			bottom: -10px;
			height: 2px;
			width: 60%;
			border: solid 2px #f53a33;
			background-color: #f53a33;
			border-radius: 20px;
		}
	}

	.item {
		position: relative;
		margin: 12px;
		border-radius: 6px;
		background-color: #ffffff;
		overflow: hidden;

		.itemWrapper {
			position: relative;
			display: flex;
			padding: 8px;
			font-size: 15px;
		}

		.itemPic {
			border-radius: 6px;
		}

		.itemInfo {
			padding: 0 0 0 10px;
			position: relative;
			flex-grow: 1;

			.itemDescription {
				position: relative;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;

				.itemStar {
					display: inline;
					color: #ffffff;
					background-color: #f53a33;
					border-radius: 5px;
					font-size: 12px;
					padding: 0px 5px;
					margin-right: 6px;
				}

				.itemTitle {
					display: inline-block;
					font-weight: bold;
					margin-right: 50px;
				}
			}

			.itemPriceWrapper {
				display: flex;
				align-items: flex-end;
				padding: 4px 0;
				.itemPriceText1 {
					font-weight: bold;
					color: #f53a33;
				}
				.itemPriceText2 {
					font-weight: bold;
					font-size: 18px;
					padding: 0 2px;
					color: #f53a33;
					// line-height: 32px;
				}

				.itemPrice {
					display: flex;
					align-items: flex-end;
				}
			}

			.itemDateWrapper {
				// width: 60vw;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				.itemDate {
					flex-grow: 1;
					font-size: 12px;
				}
				.buttonContainer{
					// width: 18vw;
				}
				.goodsButton{
					// height: 24px;
					font-size: 13px;
					white-space: nowrap;
					// display: inline-block;
					line-height: 24px;
					color: #f53a33;
					border: solid 1px #f53a33;
					border-radius: 20px;
					padding: 2px 10px;
					margin-top: 4px;
					background-color: #ffffff;
					&::after {
						display: none;
					}
				}
				.buyingDate{
					// padding-top: 4vw;
					flex-grow: 1;
					font-size: 12px;
					// font-weight: bold;
					// color: #f53a33;
				}
				// .exchangeButton {
				// 	// position: absolute;
				// 	// bottom: 0;
				// 	// right: 0;
				// 	// height: 24px;
				// 	font-size: 13px;
				// 	display: inline-block;
				// 	line-height: 24px;
				// 	color: #f53a33;
				// 	border: solid 1px #f53a33;
				// 	border-radius: 20px;
				// 	padding: 2px 8px;
				// 	margin: 2px 0;
				// 	background-color: #ffffff;
				// 	&::after {
				// 		display: none;
				// 	}
				// }
				.button-hover {
					background-color: #f5f5f5;
				}
			}

		}

		// 已使用、已过期优惠券淡化显示
		&.item--used .itemWrapper, &.item--expired .itemWrapper {
			opacity: 0.3;
		}
		// 已过期优惠券变灰
		&.item--expired .itemWrapper {
			filter: saturate(0);
		}
		// 已使用、已过期图标
		.icon-used, .icon-expired {
			position: absolute;
			top: -5px;
			right: 5px;
			width: 60px;
			height: 60px;
			transform: rotate(-20deg);
			opacity: 0.5;
		}
	}
	/* 弹窗 */
	.modal{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: grey;
		width: 70vw;
		height: 60vw;
		border: 1px rgb(195,195,195) solid;
		padding: 2vw 3vw;
	}
</style>
// if(index === 0) {
				// 	// 全部
				// 	this.displayItems.length = 0;
				// 	this.displayItems.push(...this.items);
				// } else if(index === 1) {
				// 	// 已过期（优惠券）
				// 	this.displayItems.length = 0;
				// 	this.displayItems.push(...this.items);
				// 	for(let i = 0; i < this.displayItems.length;) {
				// 		// 删除未过期的项
				// 		if(this.getDate(this.displayItems[i].exchangeDDL) > new Date()) {
				// 			this.displayItems.splice(i, 1);
				// 		} else {
				// 			++i;
				// 		}
				// 	}
				// } else if(index === 2) {
				// 	// 未使用（未过期且未核销的优惠券）
				// 	this.displayItems.length = 0;
				// 	this.displayItems.push(...this.items);
				// 	for(let i = 0; i < this.displayItems.length;) {
				// 		// 删除已过期的项
				// 		if(this.getDate(this.displayItems[i].exchangeDDL) <= new Date()) {
				// 			this.displayItems.splice(i, 1);
				// 		} else {
				// 			++i;
				// 		}
				// 	}
				// } else {
				// 	// 已使用（兑换的商品，以及核销的优惠券）
				// 	this.displayItems.length = 0;
				// }
/**
			 * 将时间字符串转换为`Date`对象
			 * @param {string} dateStr `YYYY-MM-DD hh:mm(:ss)`格式的时间字符串
			 * @returns {Date | null}
			 */
			// getDate(dateStr) {
			// 	const reg = /(\d{1,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})(:(\d{1,2}))?/;
			// 	const match = dateStr.match(reg);
			// 	if (match == null) return null;

			// 	let [year, month, day, hour, minute, second] = match.slice(1).map((value) => parseInt(value));
			// 	second = parseInt(match[7]);
			// 	if (Number.isNaN(second)) {
			// 		second = 0;
			// 	}

			// 	const d = new Date();
			// 	d.setFullYear(year, month - 1, day);
			// 	d.setHours(hour, minute, second);

			// 	return d;
			// },
// this.displayItems.push(...this.items);
			// this.navArr[0].count = this.displayItems.length;
			// // 已过期
			// this.navArr[1].count = 0;
			// // 未使用
			// this.navArr[2].count = 0;
			// this.displayItems.forEach((item) => {
			// 	if(this.getDate(item.exchangeDDL) <= new Date()) { // 等于也算过期
			// 		this.navArr[1].count++;
			// 	} else {
			// 		this.navArr[2].count++;
			// 	}
			// })
			// // 已使用
			// this.navArr[3].count = 0;
<!-- {
	mallName: '万达广场',
	money: 100,
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/wanda100.jpg'
},
{
	mallName: '莱茵春天',
	money: 100,
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/rhine100.jpg'
},
{
	mallName: '万达广场',
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/wanda50.jpg'
},
{
	mallName: '莱茵春天',
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/rhine50.jpg'
} -->

<!-- {
	describe: '（Dyson）AM07 无叶电风 扇 落地扇 强劲稳定气流 进xxxx扇 落地扇 强劲稳定气流 进扇 落地扇 强劲稳定气流 进',
	price: 255,
	markPrice: 999,
	bean: 108,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/goods.png',
	recommedUrl: '../../static/img/recommendReason.png'
},
{
	describe: '科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
	price: 255,
	markPrice: 999,
	bean: 108,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/goods.png',
	recommedUrl: '../../static/img/recommendReason.png'
},
{
	describe: '（Dyson）AM07 无叶电风 扇 落地扇 强劲稳定气流 进xxxx科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
	price: 255,
	markPrice: 999,
	bean: 108,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/goods.png',
	recommedUrl: '../../static/img/recommendReason.png'
},
{
	describe: '科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
	price: 255,
	markPrice: 999,
	bean: 108,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	exchangeDDL: '2022-07-28 18:00:00',
	url: '../../static/img/goods.png',
	recommedUrl: '../../static/img/recommendReason.png'
},
{
	describe: '科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
	price: 255,
	markPrice: 999,
	bean: 58,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	exchangeDDL: '2022-09-28 18:00:00',
	url: '../../static/img/goods.png',
	recommedUrl: '../../static/img/recommendReason.png'
},
{
	describe: '科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx科沃斯 Ecovacs 地宝N9+ 拖地拖洗一体智能扫地机免...xxxx拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..拖地拖洗一体智能扫地机免..',
	price: 255,
	markPrice: 999,
	bean: 108,
	num: 3,
	star: 0,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/goods.png',
	recommedUrl: '../../static/img/recommendReason.png'
}, -->

<!-- {
	mallName: '万达广场',
	money: 100,
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/wanda100.jpg'
},
{
	mallName: '莱茵春天',
	money: 100,
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/rhine100.jpg'
},
{
	mallName: '万达广场',
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/wanda50.jpg'
},
{
	mallName: '莱茵春天',
	markPrice: 100,
	bean: 100,
	num: 3,
	star: 3,
	isFlashSale: 1, //是否为限时抢购
	flashTime: '2022-04-16 18:00:00',
	useTime: '2022-04-16 19:00:00-2022-04-28 18:00:00',
	exchangeDDL: '2022-04-28 18:00:00',
	url: '../../static/img/rhine50.jpg'
} -->
