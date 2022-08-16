<template>
	<view class="page">
		<view class="nav">
			<view v-for="(item, index) in navArr" :key="index" class="navItem"
				:class="{ 'navItemActive': navActiveIndex === index }" @click="onNavItemClicked(index)">
				{{item.name}}
			</view>
		</view>
		<view class="content">
			<!-- 优惠券 -->
			<view class="item" v-for="(item, index) in displayTicket" :key="index">
				<img class="itemPic" height="100" :src="'http://yibinmall.chenglee.top:8080' + item.main_picture" alt="">
				<view class="itemInfo">
					<view class="itemDescription">
						<view v-if="item.star > 0" class="itemStar">{{item.star}}星</view>
						<view class="itemTitle">{{item.coupon_name}}</view>
					</view>
					<view class="itemPriceWrapper">
						<view class="itemPriceText1">鲜豆</view>
						<view class="itemBean itemPriceText2">{{item.coupon_price}}</view>
					</view>
					<view class="itemDateWrapper">
						<view class="itemDate" v-if="true">截止日期: {{item.exchange_deadline.split(" ")[0]}}</view>
						<view class="itemDate" v-else>使用日期: {{item.exchangeDDL.split(" ")[0]}}</view>
						<button class="exchangeButton" @click="onExchangeClicked(item)">立即兑换</button>
					</view>
				</view>
			</view>
			<!-- 商品 -->
			<view class="item" v-for="(item, index) in displayItems" :key="item.id">
				<img class="itemPic" height="100" :src="'http://yibinmall.chenglee.top:8080' + item.goods_main_picture" alt="">
				<view class="itemInfo">
					<view class="itemDescription">
						<view v-if="item.star > 0" class="itemStar">{{item.star}}星</view>
						<view class="itemTitle">{{item.goods_name}}</view>
					</view>
					<view class="itemPriceWrapper">
						<view class="itemPriceText1">鲜豆</view>
						<view class="itemBean itemPriceText2">{{item.goods_price}}</view>
					</view>
					<view class="itemDateWrapper">
						<view class="itemDate" v-if="true">截止日期: {{item.exchange_deadline.split(" ")[0]}}</view>
						<view class="itemDate" v-else>兑换日期: {{item.update_time.split(" ")[0]}}</view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navArr: [{
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
			}
		},
		created() {
			let app = getApp()
			uni.request({
				// url: 'http://yibinmall.chenglee.top:8080/exchange/page',
				url: 'http://yibinmall.chenglee.top:8080/exchange/byUserId/' + app.globalData.UserInfo.id,
				method: "GET",
				// data: msg,
				header: {
					'Authorization':"Bearer "+app.globalData.Authorization,
				},//请求头
				dataType: "json",
				sslVerify: false, 
				success: res => {
					console.log(res)
					let arr = res.data.object
					arr.forEach((item,index) => {
						if (item.coupons != null){
							//分割 timestamp字符串，使其成为正常显示的时间
							if (item.panic_buying_start){
								item.coupons.panic_buying_start = item.coupons.panic_buying_start.substring(0,10) + " " + item.coupons.panic_buying_start.substring(11,19)
							}
							item.coupons.date_use_begin = item.coupons.date_use_begin.substring(0,10) + " " + item.coupons.date_use_begin.substring(11,19)
							item.coupons.date_use_end = item.coupons.date_use_end.substring(0,10) + " " + item.coupons.date_use_end.substring(11,19)
							item.coupons.exchange_deadline = item.coupons.exchange_deadline.substring(0,10) + " " + item.coupons.exchange_deadline.substring(11,19)
							this.id = Symbol()//为每一个对象添加一个唯一标识符，以此保证v-for的key不重复
							this.ticket.push(item.coupons)
							this.displayTicket.push(item.coupons)
						}else if(item.goods != null){
							if (item.panic_buying_start){
								item.goods.panic_buying_start = item.goods.panic_buying_start.substring(0,10) + " " + item.goods.panic_buying_start.substring(11,19)
							}
							item.goods.exchange_deadline = item.goods.exchange_deadline.substring(0,10) + " " + item.goods.exchange_deadline.substring(11,19)
							item.goods.update_time = item.goods.update_time.substring(0,10) + " " + item.goods.update_time.substring(11,19)
							this.id = Symbol()
							this.goods.push(item.goods)
							this.displayItems.push(item.goods)
						}
					})
					console.log(this.ticket)
					console.log(this.goods)
				},
				fail: err => {
					uni.showToast({
						icon: 'none',
						title: "获取商品信息失败，请重试！"
					});
				}
			})
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
		},
		onLoad() {
			
		},
		methods: {
			onNavItemClicked(index) {
				this.navActiveIndex = index;
				if(index === 0) {
					// 全部
					this.displayItems.length = 0;
					this.displayItems.push(...this.items);
				} else if(index === 1) {
					// 已过期（优惠券）
					this.displayItems.length = 0;
					this.displayItems.push(...this.items);
					for(let i = 0; i < this.displayItems.length;) {
						// 删除未过期的项
						if(this.getDate(this.displayItems[i].exchangeDDL) > new Date()) {
							this.displayItems.splice(i, 1);
						} else {
							++i;
						}
					}
				} else if(index === 2) {
					// 未使用（未过期且未核销的优惠券）
					this.displayItems.length = 0;
					this.displayItems.push(...this.items);
					for(let i = 0; i < this.displayItems.length;) {
						// 删除已过期的项
						if(this.getDate(this.displayItems[i].exchangeDDL) <= new Date()) {
							this.displayItems.splice(i, 1);
						} else {
							++i;
						}
					}
				} else {
					// 已使用（兑换的商品，以及核销的优惠券）
					this.displayItems.length = 0;
				}
			},

			/**
			 * 将时间字符串转换为`Date`对象
			 * @param {string} dateStr `YYYY-MM-DD hh:mm(:ss)`格式的时间字符串
			 * @returns {Date | null}
			 */
			getDate(dateStr) {
				const reg = /(\d{1,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})(:(\d{1,2}))?/;
				const match = dateStr.match(reg);
				if (match == null) return null;

				let [year, month, day, hour, minute, second] = match.slice(1).map((value) => parseInt(value));
				second = parseInt(match[7]);
				if (Number.isNaN(second)) {
					second = 0;
				}

				const d = new Date();
				d.setFullYear(year, month - 1, day);
				d.setHours(hour, minute, second);

				return d;
			},
			onExchangeClicked(item) {
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../ticketExchange/ticketExchange?details=' + details
				})
			}

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
		font-size: 14px;

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
		display: flex;
		margin: 12px;
		padding: 8px;
		border-radius: 6px;
		background-color: #ffffff;
		font-size: 13px;

		.itemPic {
			border-radius: 6px;
		}

		.itemInfo {
			padding: 0 0 0 10px;
			position: relative;

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
					display: inline;

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
				width: 60vw;
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				.itemDate {
					flex-grow: 1;
					font-size: 12px;
				}
				.exchangeButton {
					// position: absolute;
					// bottom: 0;
					// right: 0;
					font-size: 12px;
					display: inline-block;
					line-height: 26px;
					color: #f53a33;
					border: solid 1px #f53a33;
					border-radius: 20px;
					padding: 0 8px;
					margin: 0;
					background-color: #ffffff;
					&::after {
						display: none;
					}
				}
				.button-hover {
					background-color: #f5f5f5;
				}
			}

		}
	}
</style>
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