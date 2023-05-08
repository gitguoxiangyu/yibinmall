<template>
	<view class="body">
		<!-- 顶栏 -->
		<view class="header" v-if="hasUserInfo">
			<view class="headerBac"><image src="../../static/img/headerBac.png"></image></view>
			<view class="usr">
				<view class="headPortait"><image :src="UserInfo.avatar"></image></view>
				<view class="usrInfo">
					<view class="usrInfoHeader">
						<view class="name">{{UserInfo.real_name}}</view>
						<view class="star">
							<image src="../../static/img/star.png"></image>
							<view class="starTxt">{{UserInfo.star}}星青年</view>
						</view>
					</view>
<!-- 					<view class="usrInfoCenter">
						<view class="starRate" :style="{'width' : this.starRate + '%'}"></view>
					</view> -->
<!-- 					<view class="usrInfoFooter">青年成长值300，还需要700升级为4星青年</view> -->
				</view>
			</view>
			<view class="wallet">
				<view class="bean" @click="toBeanDetails">
					<view class="beanHeader">
						<view class="beanName">鲜豆</view>
						<view class="beanNum">{{UserInfo.beans}}</view>
					</view>
					<!-- <view class="beanFooter"><uni-icons type="arrowright" size="12"></uni-icons></view> -->
				</view>
				<view class="ticket" @click="toTicketHistory()">
					<view class="ticketHeader">
						<view class="ticketIcon"><uni-icons type="shop" size="22" color="red"></uni-icons></view>
						<view class="ticketName">兑换记录</view>
					</view>
					<!-- <view class="ticketFooter">有2张3.31到期 <uni-icons type="arrowright" size="12"></uni-icons></view> -->
				</view>
				<view class="advice" @click="toAdviceDetails()">
					<view class="adviceIcon"><uni-icons type="compose" size="22" color="red"></uni-icons></view>
					<view class="adviceName">商城投诉</view>
				</view>
			</view>
		</view>
		<!-- 未登录 -->
		<view class="header" v-if="!hasUserInfo">
			<view class="headerBac">
				<image src="../../static/img/headerBac.png"></image>
				<view class="login" @click="toLogin">登录</view>
			</view>
			<view class="wallet">
				<view class="bean" @click="toBeanDetails">
					<view class="beanHeader">
						<view class="beanName">鲜豆</view>
						<view class="beanNum">0</view>
					</view>
					<!-- <view class="beanFooter"><uni-icons type="arrowright" size="12"></uni-icons></view> -->
				</view>
				<view class="ticket" @click="toTicketHistory()">
					<view class="ticketHeader">
						<view class="ticketIcon"><uni-icons type="shop" size="22" color="red"></uni-icons></view>
						<view class="ticketName">兑换记录</view>
					</view>
					<!-- <view class="ticketFooter">有0张12.31到期 <uni-icons type="arrowright" size="12"></uni-icons></view> -->
				</view>
				<view class="advice" @click="toAdviceDetails()">
					<view class="adviceIcon"><uni-icons type="compose" size="22" color="red"></uni-icons></view>
					<view class="adviceName">商城投诉</view>
				</view>
			</view>
		</view>
		<!-- 第一导航栏 -->
		<view class="nav">
			<view :class="{navActive:item.active}" v-for="(item,index) in navArr" :key="index" @click="changeNavActive(index,navArr)">
				{{item.name}}
			</view>
		</view>
		<!-- 第二导航栏 -->
		<view class="subNav">
			<view :class="{subNavActive:item.active}" v-for="(item,index) in subNavArr" :key="index" @click="changeSubNavActive(index,subNavArr)">
				{{item.name}}
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="content">
			<view class="hot" v-if="navArr[0].active == true">
				<view class="goods" v-for="(item,index) in displayGoods" :key="index" @click="toGoodsDetails(item)">
						<view class="goodsPic">
							<image class="flashLogo" src="../../static/img/flashSale.png"></image>
							<image class="goodsImg" :src="item.goods_main_picture"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsDes">
								<view v-show="item.star" class="goodsStar">{{item.star}}星</view>
								<view class="goodsTxt">
									{{item.goods_name}}
								</view>
							</view>
							<view class="goodsSaleInfo">
								<view class="goodsNum" v-if="item.stock">
									仅剩 {{item.stock}} 件
								</view>
							</view>
							<view class="goodsSale">
								鲜豆
								<view class="saleBean">
									{{item.goods_price}}
								</view>
							</view>
						</view>
				</view>
			</view>
			<view class="hot" v-if="navArr[1].active == true">
				<!-- 抢购商品 -->
				<view class="goods" v-for="(item,index) in displayPanicBuyingGoods" :key="index" @click="toPanicGood(item)">
						<view class="goodsPic">
							<image class="flashLogo" src="../../static/img/flashSale.png"></image>
							<image class="goodsImg" :src="item.goods.goods_main_picture"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsDes">
								<view v-show="item.goods.star" class="goodsStar">{{item.goods.star}}星</view>
								<view class="goodsTxt">
									{{item.goods.goods_name}}
								</view>
							</view>
							<view class="goodsSaleInfo">
								<!-- v-if="item.panicBuyingGoods.panic_buying_goods_stock" -->
								<text class="goodsNum" >
									仅剩 {{item.panicBuyingGoods.panic_buying_goods_stock}} 件
								</text>
								<view class="flashTime" v-if="item.panicBuyingGoods">
									抢购
									<text style="color: red">
										{{item.panicBuyingGoods.panic_buying_start_time}}
									</text>
									开始
								</view>
								<view class="flashTime" v-if="!(item.remainBeginSeconds == -1 || item.remainBeginSeconds == -2)">
									抢购还剩
									<text style="color: red">
										{{Math.floor( item.remainBeginSeconds / 3600)}}时{{Math.floor((item.remainBeginSeconds / 60)%60)}}分{{item.remainBeginSeconds % 60}}
									</text>
									秒开始
								</view>
								<view class="flashTime" v-else-if="!(item.remainEndSeconds == -1 || item.remainEndSeconds == -2)">
									抢购还剩
									<text style="color: red">
										{{Math.floor( item.remainEndSeconds / 3600)}}时{{Math.floor((item.remainEndSeconds / 60)%60)}}分{{item.remainEndSeconds % 60}}
									</text>
									秒结束
								</view>
							</view>
							<view class="goodsSale">
								鲜豆
								<view class="saleBean">
									{{item.panicBuyingGoods.panic_buying_price}}
								</view>
							</view>
							<view class="overTime" v-if="item.remainEndSeconds <= 0">
								抢购已结束
							</view>
						</view>
				</view>
				<!-- 抢购优惠券 -->
				<view class="goods" v-for="(item,index) in displayPanicBuyingCoupons" :key="item.coupons.coupon_id" @click="toPanicTicket(item)">
						<view class="goodsPic">
							<image class="goodsImg" :src="item.coupons.main_picture"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsDes">
								<view class="goodsStar">{{item.coupons.star}}星</view>
								<view class="goodsTxt">
									{{item.coupons.coupon_name}}
								</view>
							</view>
							<view class="goodsSaleInfo">
								<view class="goodsNum">
									仅剩 {{item.panicBuyingCoupons.panic_buying_coupons_stock}} 件
								</view>
								<view class="flashTime" v-if="item.panicBuyingCoupons.panic_buying_start_time">
									抢购
									<text style="color: red">
										{{item.panicBuyingCoupons.panic_buying_start_time}}
									</text>
									开始
								</view>
								<view class="flashTime" v-if="!(item.remainBeginSeconds == -1 || item.remainBeginSeconds == -2)">
									抢购还剩
									<text style="color: red">
										{{Math.floor( item.remainBeginSeconds / 3600)}}时{{Math.floor((item.remainBeginSeconds / 60)%60)}}分{{item.remainBeginSeconds % 60}}
									</text>
									秒开始
								</view>
								<view class="flashTime" v-else-if="!(item.remainEndSeconds == -1 || item.remainEndSeconds == -2)">
									抢购还剩
									<text style="color: red">
										{{Math.floor( item.remainEndSeconds / 3600)}}时{{Math.floor((item.remainEndSeconds / 60)%60)}}分{{item.remainEndSeconds % 60}}
									</text>
									秒结束
								</view>
							</view>
							<view class="goodsSale">
								鲜豆
								<view class="saleBean">
									{{item.coupons.coupon_price}}
								</view>
							</view>
							<view class="overTime" v-if="item.remainEndSeconds <= 0">
								抢购已结束
							</view>
						</view>
				</view>
			</view>
			<view class="generalPreferential" v-if="navArr[2].active == true">
				<view class="goods" v-for="(item,index) in displayTickets" :key="index" @click="toTicketDetails(item)">
						<view class="goodsPic">
							<image class="goodsImg" :src="item.main_picture"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsDes">
								<view class="goodsStar">{{item.star}}星</view>
								<view class="goodsTxt">
									{{item.coupon_name}}
								</view>
							</view>
							<view class="goodsSaleInfo">
								<view class="goodsNum">
									仅剩 {{item.stock}} 件
								</view>
								<view class="flashTime" v-if="item.panic_buying_start">
									抢购
									<view style="color: red">
										{{item.panic_buying_start}}
									</view>
									开始
								</view>
							</view>
							<view class="goodsSale">
								鲜豆
								<view class="saleBean">
									{{item.coupon_price}}
								</view>
							</view>
						</view>
				</view>
			</view>

			<view class="generalPreferential" v-if="navArr[3].active == true">
				<view class="goods" v-for="(item,index) in displayMerchantCoupons" :key="index" @click="toTicketDetails(item)">
						<view class="goodsPic">
							<image class="goodsImg" :src="item.main_picture"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsDes">
								<view class="goodsStar">{{item.star}}星</view>
								<view class="goodsTxt">
									{{item.coupon_name}}
								</view>
							</view>
							<view class="goodsSaleInfo">
								<view class="goodsNum">
									仅剩 {{item.stock}} 件
								</view>
								<view class="flashTime" v-if="item.panic_buying_start">
									抢购
									<view style="color: red">
										{{item.panic_buying_start}}
									</view>
									开始
								</view>
							</view>
							<view class="goodsSale">
								鲜豆
								<view class="saleBean">
									{{item.coupon_price}}
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
	import panicCreateSetinterval from '../../publicAPI/panicCreateSetInterval.js'
	import updatePersonMsg from '../../publicAPI/updataPersonMsg.js'
	import {baseURL} from '../../publicAPI/baseData.js'

	export default {
		components:{"uni-icons":icons},
		data() {
			return {
				imageUrl:'http://yibinmall.chenglee.top:81/prod-api/mall/',
				hasUserInfo:getApp().globalData.hasUserInfo,
				UserInfo:getApp().globalData.UserInfo,
				starRate:20,
				navArr:[
					{
						name:'热门商品',
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
						active:true,
						min:undefined,
						max:undefined,
					},
					{
						name:'1-50豆',
						active:false,
						min:1,
						max:50,
					},
					{
						name:'51-100豆',
						active:false,
						min:51,
						max:100,
					},
					{
						name:'101豆以上',
						active:false,
						min:101,
						max:undefined,
					}
				],
				goods:[],
				displayGoods:[],
				ticket:[],
				displayTickets:[],
				panicBuyingGoods:[],
				displayPanicBuyingGoods:[],
				panicBuyingCoupons:[],
				displayPanicBuyingCoupons:[],
				merchantCoupons:[],
				displayMerchantCoupons:[],
			}
		},
		methods: {
			/** 修改第一/第二导航栏的活动视图
			 * @param {number} index
			 * @param {Object} item
			 */
			changeNavActive(index,item){
				//改变样式
				for (var i = 0; i < item.length; i++) {
					item[i].active = false
					if(index == i) {
						item[i].active = true
					}
				}
			},
			changeSubNavActive(index,items){
				//改变样式
				for (var i = 0; i < items.length; i++) {
					items[i].active = false
					if(index == i) {
						items[i].active = true
					}
				}
				//条件筛选
				if (index == 0){
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					//~             注意！！！此处均为浅拷贝！！！				~
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					this.displayGoods = this.goods;
					this.displayTickets = this.ticket
					this.displayPanicBuyingGoods = this.panicBuyingGoods
					this.displayPanicBuyingCoupons = this.panicBuyingCoupons
					this.displayMerchantCoupons = this.merchantCoupons
				}else if (index == 1){
					let arr = []
					this.goods.forEach((item,index) => {
						if(item.goods_price > 0 && item.goods_price < 51){
							arr.push(item)
						}
					})
					this.displayGoods = arr;
					arr = []
					this.ticket.forEach((item,index) => {
						if(item.coupon_price > 0 && item.coupon_price < 51){
							arr.push(item)
						}
					})
					this.displayTickets = arr
					arr = []
					this.panicBuyingGoods.forEach((item,index) => {
						if(item.goods.goods_price > 0 && item.goods.goods_price < 51){
							arr.push(item)
						}
					})
					this.displayPanicBuyingGoods = arr
					//加了定时器会造成定时器重复，因为未关闭以前的定时器
					//由于是浅拷贝，所以定时功能不会出现问题
					// panicCreateSetinterval(this.displayPanicBuyingGoods)
					arr = []
					this.panicBuyingCoupons.forEach((item,index) => {
						if(item.coupons.coupon_price > 0 && item.coupons.coupon_price < 51){
							arr.push(item)
						}
					})
					this.displayPanicBuyingCoupons = arr
					// panicCreateSetinterval(this.displayPanicBuyingCoupons)
					arr = []
					this.merchantCoupons.forEach((item,index) => {
						if(item.coupon_price > 0 && item.coupon_price < 51){
							arr.push(item)
						}
					})
					this.displayMerchantCoupons = arr
				}else if (index == 2){
					let arr = []
					this.goods.forEach((item,index) => {
						if(item.goods_price > 50 && item.goods_price < 101){
							arr.push(item)
						}
					})
					this.displayGoods = arr;
					arr = []
					this.ticket.forEach((item,index) => {
						if(item.coupon_price > 50 && item.coupon_price < 101){
							arr.push(item)
						}
					})
					this.displayTickets = arr
					arr = []
					this.panicBuyingGoods.forEach((item,index) => {
						if(item.goods.goods_price > 50 && item.goods.goods_price < 101){
							arr.push(item)
						}
					})
					this.displayPanicBuyingGoods = arr
					arr = []
					this.panicBuyingCoupons.forEach((item,index) => {
						if(item.coupons.coupon_price > 50 && item.coupons.coupon_price < 101){
							arr.push(item)
						}
					})
					this.displayPanicBuyingCoupons = arr
					arr = []
					this.merchantCoupons.forEach((item,index) => {
						if(item.coupon_price > 50 && item.coupon_price < 101){
							arr.push(item)
						}
					})
					this.displayMerchantCoupons = arr
				}else if (index == 3){
					let arr = []
					this.goods.forEach((item,index) => {
						if(item.goods_price > 100){
							arr.push(item)
						}
					})
					this.displayGoods = arr;
					arr = []
					this.ticket.forEach((item,index) => {
						if(item.coupon_price > 100){
							arr.push(item)
						}
					})
					this.displayTickets = arr
					arr = []
					this.panicBuyingGoods.forEach((item,index) => {
						if(item.goods.goods_price > 100){
							arr.push(item)
						}
					})
					this.displayPanicBuyingGoods = arr
					arr = []
					this.panicBuyingCoupons.forEach((item,index) => {
						if(item.coupons.coupon_price > 100){
							arr.push(item)
						}
					})
					this.displayPanicBuyingCoupons = arr
					arr = []
					this.merchantCoupons.forEach((item,index) => {
						if(item.coupon_price > 100){
							arr.push(item)
						}
					})
					this.displayMerchantCoupons = arr
				}
			},
			/** 导航到商品详情页面
			 * @param {Object} item
			 */
			toGoodsDetails(item){
				// console.log("跳转")
				// 加密传递的对象数据
				let details = encodeURIComponent(JSON.stringify(item))
				// console.log(item)
				uni.navigateTo({
					url:'../goodsDetails/goodsDetails?details='+details
				})
			},
			toPanicGood(item){
				// console.log("跳转")
				// 加密传递的对象数据
				let details = encodeURIComponent(JSON.stringify(item))
				// console.log(item)
				uni.navigateTo({
					url:'../panicGood/panicGood?details='+details
				})
			},
			/** 导航到优惠券详情页面
			 * @param {Object} item
			 */
			toTicketDetails(item){
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../ticketDetails/ticketDetails?details='+details
				})
			},
			toPanicTicket(item){
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../panicTicket/panicTicket?details='+details
				})
			},
			toTicketHistory() {
				let app = getApp()
				if (app.globalData.hasUserInfo == 1){
					uni.navigateTo({
						url:"../ticketHistory/ticketHistory"
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: "请登入"
					});
				}
			},
			toAdviceDetails(){
				uni.navigateTo({
					url:"../adviceDetails/adviceDetails"
				})
				// let app = getApp()
				// if (app.globalData.hasUserInfo == 1){
				// 	uni.navigateTo({
				// 		url:"../../adviceDetails/adviceDetails"
				// 	})
				// }else{
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: "请登入"
				// 	});
				// }
			},
			toBeanDetails(item){
				let app = getApp()
				if (app.globalData.hasUserInfo == 1){
					let details = encodeURIComponent(JSON.stringify(item))
					uni.navigateTo({
						url:'../beanDetails/beanDetails?details='+details
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: "请登入"
					});
				}
			},
			toLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			//校正时间戳
			correctTime(time){
				return time.substring(0,10) + " " + time.substring(11,19)
			},
			//获取商品信息
			getGoods(){
				let app = getApp()
				const xhr = uni.request({
					url: baseURL + '/goods/list',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer "+app.globalData.Authorization,
					},//请求头
					dataType: "json",
					sslVerify: false,
					success: res => {
						let Jsonbig = require('json-bigint')({storeAsString: true})
						console.log(Jsonbig.parse(xhr._xhr.response).rows)
						this.goods = Jsonbig.parse(xhr._xhr.response).rows
						this.goods.forEach((item,index)=>{
							item.exchange_deadline = item.exchange_deadline.substring(0,10) + " " + item.exchange_deadline.substring(11,19)
						})
						this.displayGoods = JSON.parse(JSON.stringify(this.goods))
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "获取商品信息失败，请重试！"
						});
					}
				})
			},
			//获取抢购商品信息
			getPanicGoods(){
				let app = getApp()
				const xhr = uni.request({
					url: baseURL + '/pb_goods/list',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer "+app.globalData.Authorization,
					},//请求头
					dataType: "json",
					sslVerify: false,
					success: res => {
						let Jsonbig = require('json-bigint')({storeAsString: true})
						console.log(Jsonbig.parse(xhr._xhr.response))
						let items = Jsonbig.parse(xhr._xhr.response).object
						items.forEach((item,index)=>{
							item.panicBuyingGoods.panic_buying_start_time = item.panicBuyingGoods.panic_buying_start_time.substring(0,10) + " " + item.panicBuyingGoods.panic_buying_start_time.substring(11,19)
							item.panicBuyingGoods.panic_buying_end_time = item.panicBuyingGoods.panic_buying_end_time.substring(0,10) + " " + item.panicBuyingGoods.panic_buying_end_time.substring(11,19)
							item.goods.exchange_deadline = item.goods.exchange_deadline.substring(0,10) + " " + item.goods.exchange_deadline.substring(11,19)
							item.goods.update_time = item.goods.update_time.substring(0,10) + " " + item.goods.update_time.substring(11,19)
						})
						this.panicBuyingGoods = items
						panicCreateSetinterval(this.panicBuyingGoods)
						//浅拷贝
						this.displayPanicBuyingGoods = this.panicBuyingGoods
						// this.displayPanicBuyingGoods.forEach((item,index) => {
						// 	let timer = setInterval(function(){
						// 		item.remainBeginSecond--
						// 		if (item == 0){
						// 			clearInterval(timer)
						// 		}
						// 	},1000)
						// })
						// panicCreateSetinterval(this.displayPanicBuyingGoods)
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "获取商品信息失败，请重试！"
						});
					}
				})
			},
			//获取优惠券信息
			getCoupons(){
				let app = getApp()
				const xhr = uni.request({
					url: baseURL + '/coupons/page',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer "+app.globalData.Authorization,
					},//请求头
					dataType: "json",
					sslVerify: false,
					success: res => {
						console.log(res.data.rows)
						let Jsonbig = require('json-bigint')({storeAsString: true})
						console.log(Jsonbig.parse(xhr._xhr.response))
						let items = Jsonbig.parse(xhr._xhr.response).rows
						let arrTicket = []
						let merchant = []
						items.forEach((item,index)=>{
							//分割 timestamp字符串，使其成为正常显示的时间
							item.date_use_begin = item.date_use_begin.substring(0,10) + " " + item.date_use_begin.substring(11,19)
							item.date_use_end = item.date_use_end.substring(0,10) + " " + item.date_use_end.substring(11,19)
							item.exchange_deadline = item.exchange_deadline.substring(0,10) + " " + item.exchange_deadline.substring(11,19)
							if (item.place_of_use == "全部商家"){
								arrTicket.push(item)
							}else {
								merchant.push(item)
							}
						})
						this.ticket = arrTicket
						this.merchantCoupons = merchant
						this.displayTickets = this.ticket
						this.displayMerchantCoupons = this.merchantCoupons
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "获取优惠券信息失败，请重试！"
						});
					}
				})
			},
			//获取抢购优惠券信息
			getPanicCoupons(){
				let app = getApp()
				const xhr = uni.request({
					url: baseURL + '/pb_coupons/list',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer "+app.globalData.Authorization,
					},//请求头
					dataType: "json",
					sslVerify: false,
					success: res => {
						console.log(res.data.object)
						let Jsonbig = require('json-bigint')({storeAsString: true})
						console.log(Jsonbig.parse(xhr._xhr.response).object)
						let items = Jsonbig.parse(xhr._xhr.response).object
						items.forEach((item,index)=>{
							//校正时间 (可用correctTime方法)
							item.panicBuyingCoupons.panic_buying_start_time = item.panicBuyingCoupons.panic_buying_start_time.substring(0,10) + " " + item.panicBuyingCoupons.panic_buying_start_time.substring(11,19)
							item.panicBuyingCoupons.panic_buying_end_time = item.panicBuyingCoupons.panic_buying_end_time.substring(0,10) + " " + item.panicBuyingCoupons.panic_buying_end_time.substring(11,19)
							item.coupons.date_use_begin = item.coupons.date_use_begin.substring(0,10) + " " + item.coupons.date_use_begin.substring(11,19)
							item.coupons.date_use_end = item.coupons.date_use_end.substring(0,10) + " " + item.coupons.date_use_end.substring(11,19)
							item.coupons.exchange_deadline = item.coupons.exchange_deadline.substring(0,10) + " " + item.coupons.exchange_deadline.substring(11,19)
							item.coupons.update_time = item.coupons.update_time.substring(0,10) + " " + item.coupons.update_time.substring(11,19)
						})
						this.panicBuyingCoupons = items
						panicCreateSetinterval(this.panicBuyingCoupons)
						//浅拷贝
						this.displayPanicBuyingCoupons = this.panicBuyingCoupons
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "获取商品信息失败，请重试！"
						});
					}
				})
			},
		},
		onLoad(){
			this.hasUserInfo = getApp().globalData.hasUserInfo
			this.UserInfo = getApp().globalData.UserInfo
			let app = getApp()
			let msg = {
				username: "token",
				password: "123456Aa."
			}
			uni.request({
				url: '/prod-api/auth/get_token',//开发者服务器接口地址
				method: "POST",
				data: msg,//请求的参数
				dataType: "json",
				sslVerify: false,
				success: res => {
					//将token存入全局变量中
					let app = getApp();
					console.log(res)
					app.globalData.Authorization = res.data.object.access_token;//此次不加分号会导致报错
					(async() => {
						try{
							console.log("huoqu")
							let goods = await this.getGoods()
							let coupons = await this.getCoupons()
							let panicGood = await this.getPanicGoods()
							let panicCoupon = await this.getPanicCoupons()
						}catch{
							console.log("无法正常获取商品信息")
						}
					})()//即刻调取箭头函数
				},
				fail: err => {
					uni.showToast({
						icon: 'none',
						title: "获取token失败，请重试！"
					});
				}
			})

			setInterval(() => {
				(async() => {
					try{
						console.log("huoqu")
						let goods = await this.getGoods()
						let coupons = await this.getCoupons()
						let panicGood = await this.getPanicGoods()
						let panicCoupon = await this.getPanicCoupons()
					}catch{
						console.log("无法正常获取商品信息")
					}
				})()//即刻调取箭头函数
			},180000)
		},
		onShow(){
			this.hasUserInfo = getApp().globalData.hasUserInfo
			this.UserInfo = getApp().globalData.UserInfo
			
			console.log(666)
			let app =getApp()
			if (app.globalData.UserInfo.id != undefined){
				uni.request({
					url: baseURL + '/user_info/userBeans?userId=' + app.globalData.UserInfo.id,
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer "+app.globalData.Authorization,
					},//请求头
					dataType: "json",
					sslVerify: false,
					success: res => {
						console.log(res)
						getApp().globalData.UserInfo.beans = res.data.object
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "更新鲜豆失败！"
						});
					}
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
				.login{
					font-size: 18px;
					color: #f57b6f;
					height: 5vh;
					line-height: 5vh;
					width: 40vw;
					position: absolute;
					top: 4vh;
					left: 30vw;
					text-align: center;
					// border: #FFFFFF 1px solid;
				}
				.login:hover{
					color: #e22618;
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
						// width: 60vw;
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
							font-size: 11px;
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
						width: 24vw;
						padding:0 3vw;
						border-right: #95928c 1px solid;
						.beanHeader{
							width: 24vw;
							height: 3vh;
							line-height: 3vh;
							display: flex;
							justify-content: space-between;
							.beanName{
								width: 10vw;
								font-weight: bold;
							}
							.beanNum{
								width: 14vw;
								font-size: 18px;
								color: #f53a33;
								font-weight: bold;
								text-align: center;
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
						width: 26vw;
						padding:0 3vw;
						border-right: #95928c 1px solid;
						.ticketHeader{
							width: 26vw;
							height: 3vh;
							line-height: 3vh;
							display: flex;
							.ticketIcon{

							}
							.ticketName{
								margin-left: 1vw;
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
					.advice{
						width: 26vw;
						padding: 0 3vw;
						display: flex;
						.adviceIcon{

						}
						.adviceName{
							margin-left: 1vw;
							font-weight: bold;
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
					position: relative;
					// border-bottom: 2px solid red;
				}
				.navActive::after{
					content: "";
					display: block;
					position: absolute;
					left: 30%;
					top: 60%;
					width: 40%;
					height: 4px;
					background-color: red;
					transform: translateY(8px);
					border-radius: 50px;
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
					border-radius: 10px;
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
					justify-content: flex-start; // 左对齐
					flex-wrap: wrap;/*换行*/
					padding: 2.5vw;
					.goods:nth-child(even){
						margin-left: 3vw;
					}
					.goods{
						width: 46vw;
						// height: 32vh;
						background-color: #FFFFFF;
						border-radius: 8px;
						margin-top: 1vh;
						overflow: hidden;
						.goodsPic{
							// width: 45vw;
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
							// width: 45vw;
							// height: 10vh;
							padding: 6px;
							.goodsDes{
								position: relative;
								text-overflow: ellipsis;  //多余的部分用省略号来代替
								overflow: hidden;      // 隐藏多余的部分
								display: -webkit-box;       //浮动布局
								-webkit-line-clamp: 2;      //显示的行数
								-webkit-box-orient: vertical;   //垂直排列
								.goodsStar{
									display: inline-block; // 适配无星级要求的商品
									padding: 1px 4px;
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
									font-size: 14px;
									white-space: normal;   //使文本多行显示
									font-weight: bold;
									display: inline; // 适配无星级要求的商品
								}
							}
							.goodsSaleInfo{
								font-size: 12px;
								margin-top: 0.5vh;
								.flashTime,.goodsNum{
									// display: flex;
									font-size: 12px;
									color: #999999;
								}
							}
							.goodsSale{
								margin-top: 0.5vh;
								height: 3vh;
								display: flex;
								align-items:flex-end;
								color: red;
								font-size: 12px;
								font-weight: bold;
								.saleBean,.salePrice{
									margin-left: 3px;
									font-size: 16px;
								}
							}
							.overTime{
								font-size: 10px;
								color: grey;
								font-weight: 600;
							}
						}
					}
				}
			}
		}
	}
</style>
<!-- 	{
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
	star:0,
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
	} -->

<!-- {
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
} -->
