<template>
	<view class="ticket">
		<view class="ticketWrapper">
			<view class="top">
				<img :src="ticketDetails.brandImg" alt="">
				<view class="ticketName">{{detail.coupon_name}}</view>
				<!-- <u-qrcode canvasId="qrcode" :value="ticketDetails.code"></u-qrcode> -->
				<canvas id="qrcode" canvas-id="qrcode"></canvas>
				<view class="code">核销码: {{detail.coupons_item_id}}</view>
			</view>
			<view class="dividerWrapper">
				<view class="divider"></view>
				<view class="leftHole"></view>
				<view class="rightHole"></view>
			</view>
			<view class="details">
				<view class="title">优惠券详情</view>
				<view class="item">
					<view class="itemTitle">兑奖期限</view>
					<view class="itemContent period">{{detail.exchange_deadline}}</view>
				</view>
				<view class="item">
					<view class="itemTitle">可用时段</view>
					<view class="itemContent">{{detail.available_time}}</view>
				</view>
				<view class="item">
					<view class="itemTitle">门店地址</view>
					<view class="itemContent">{{detail.place_of_use}}</view>
				</view>
				<view class="item">
					<view class="itemTitle">使用须知</view>
					<view class="notice">{{detail.notice}}</view>
				</view>
			</view>
			<view class="dividerWrapper">
				<view class="divider"></view>
			</view>
			<view class="bottom">
				<view class="telTitle">客服电话</view>
				<view class="tel" id="tel">{{detail.service_tel}}</view>
				<view class="dividerVertical"></view>
				<view class="telButton" @click="onTelButtonClicked"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import getToken from '../../publicAPI/getToken.js'
	import uQRCode from "@/uni_modules/Sansnn-uQRCode/js_sdk/u-qrcode/module.js"
	import {baseURL} from '../../publicAPI/baseData.js'
	export default {
		data() {
			return {
				detail: {},
				ticketDetails: {
					code: "YBGQ5251251",
					name: "100元通用消费券",
					brandImg: "",
					period: "2022-02-01 00:00 至 2022-02-15 23:59",
					periodInWeek: "周一至周日",
					address: "宜宾市叙州区万达广场一楼",
					notice: `*兑券注意事项：

1.疫情防控期间，兑券的市民朋友，请正确佩戴口罩、检测体温、出示健康码并扫描场所码，方可进入。兑券过程中请保持1米间距，有序兑换。

2.线下兑券时，请持本人中券手机进行兑换。

3.抽中奖券后15天内到指定地点兑换纸质消费券，逾期作废。

4.请大家不要把中券码随意截图转发别人，如有冒领，自行承担。

5.此次活动最终解释权归中国共产主义青年团宜宾市委员会所有。`,
					tel: "0831-12345678"
				},
			}
		},
		computed: {
			qrCode() {

			}
		},
		methods: {
			onTelButtonClicked(e) {
				console.log(this.ticketDetails.tel);
				uni.makePhoneCall({
					phoneNumber: this.ticketDetails.tel,
				})
			}
		},
		onReady() {

		},
		onLoad(item) {
			this.detail = JSON.parse(decodeURIComponent(item.details))
			console.log(this.detail)
			let app = getApp()
			uni.request({
				url: baseURL + '/coupons_stock/page?item_id=' + this.detail.coupons_item_id,
				method: "GET",
				header: {
					'Authorization':"Bearer "+app.globalData.Authorization,
				},//请求头
				dataType: "json",
				sslVerify: false,
				success: res => {
					console.log(res)
					// 根据核销码生成二维码
					const ctx = uni.createCanvasContext("qrcode");
					const uqrcode = new uQRCode({
						text: res.data.rows[0].qr_code,
						size: 120,
					}, ctx);
					uqrcode.make();
					uqrcode.draw();
				},
				fail: err => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '鲜豆更新错误'
					});
				}
			})

		},
	}
</script>

<style lang="scss">
	page {
		background-color: #b30600;
		padding: 12px 16px;

		.ticketWrapper {
			background-color: #ffffff;
			border-radius: 18px;
			// padding: 12px 20px;
		}
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 0;
		font-size: 14px;

		// &::after {
		// 	content: "";
		// 	width: 100%;
		// 	height: 8px;
		// 	background-color: blue;
		// }
		.ticketName {
			font-size: 18px;
			font-weight: bold;
		}

		#qrcode {
			width: 120px;
			height: 120px;
			margin: 16px;
		}

		.code {
			padding: 6px 14px;
			border: solid 1px #f53a33;
			border-radius: 20px;
			color: #f53a33;
		}
	}

	.dividerWrapper {
		position: relative;
		height: 8px;

		.divider {
			width: 100;
			height: 1px;
			background-image: repeating-linear-gradient(to right, transparent, transparent 5px, #e9ebea 5px, #e9ebea 10px);
		}

		.leftHole,
		.rightHole {
			position: absolute;
			top: -8px;
			width: 16px;
			height: 16px;
			border-radius: 20px;
			background-color: #b30600;
		}

		.leftHole {
			left: -8px;
		}

		.rightHole {
			right: -8px;
		}
	}

	.details {
		padding: 10px 20px;

		.title {
			font-size: 16px;
			line-height: 36px;
		}

		.item {
			// display: flex;
			// white-space: nowrap;
			// padding: 6px;
		}

		.itemTitle {
			display: inline-block;
			color: #767676;
			font-size: 14px;
			// width: 90px;
			// flex-basis: 90px;
			width: 24%;
			vertical-align: top;
			padding: 3px 0;
		}

		.notice,
		.itemContent {
			display: inline-block;
			color: #414141;
			font-size: 14px;
			width: 76%;
			vertical-align: top;
			padding: 3px 0;
		}

		.period,
		.notice {
			white-space: pre-wrap;
		}
	}

	.bottom {
		padding: 0px 14px 10px 20px;
		display: flex;
		align-items: center;
		height: 36px;
		font-size: 16px;

		.telTitle {
			// display: inline-block;
			flex-grow: 1;
			// line-height: 30px;
		}

		.tel {
			// display: inline-block;
		}
		.dividerVertical {
			margin: 0 10px;
			width: 2px;
			height: 100%;
			background-image: linear-gradient(to bottom, #ffffff, #dddddd 50%, #ffffff);
		}
		.telButton {
			width: 32px;
			height: 32px;
			background-image: url("../../static/img/telephone.png");
			background-repeat: no-repeat;
			background-size: 24px;
			background-position: center;
		}
	}
</style>
