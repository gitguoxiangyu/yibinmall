<template>
	<view class="body" :style="'--swiper-height: ' + swiperHeight + 'px;'">
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000">
			<swiper-item v-for="url in swiperUrls">
				<image class="swiper-item" :src="url" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<!-- 顶栏 -->
		<view class="header" v-if="hasUserInfo">
			<view class="headerBac"><image src="../../static/img/headerBac.png"></image></view>
			<view class="usr">
				<view class="headPortait" @click="logout"><image :src="UserInfo.avatar"></image></view>
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
			<!-- 热门商品 -->
			<view class="hot" v-if="navArr[1].active == true">
				<view class="goods" v-for="(item,index) in displayGoods" :key="index" @click="toGoodsDetails(item)">
					<view class="goodsPic">
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

			<!-- 限时抢购 -->
			<view class="hot" v-if="navArr[3].active == true">
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
							<view class="flashTime" v-if="item.panicBuyingGoods" v-show="item.remainBeginSeconds > 0">
								抢购
								<text style="color: red">
									{{" " + item.panicBuyingGoods.panic_buying_start_time + " "}}
								</text>
								开始
							</view>
							<view class="flashTime" v-if="!(item.remainBeginSeconds == -1 || item.remainBeginSeconds == -2)">
								抢购还剩
								<text style="color: red">
									{{" " + toFriendlyTime(item.remainBeginSeconds) + " "}}
								</text>
								开始
							</view>
							<view class="flashTime" v-else-if="!(item.remainEndSeconds == -1 || item.remainEndSeconds == -2)">
								抢购还剩
								<text style="color: red">
									{{" " + toFriendlyTime(item.remainEndSeconds) + " "}}
								</text>
								结束
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
						<image class="flashLogo" src="../../static/img/flashSale.png"></image>
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
							<view class="flashTime" v-if="item.panicBuyingCoupons.panic_buying_start_time" v-show="item.remainBeginSeconds > 0">
								抢购
								<text style="color: red">
									{{" " + item.panicBuyingCoupons.panic_buying_start_time + " "}}
								</text>
								开始
							</view>
							<view class="flashTime" v-if="!(item.remainBeginSeconds == -1 || item.remainBeginSeconds == -2)">
								抢购还剩
								<text style="color: red">
									{{" " + toFriendlyTime(item.remainBeginSeconds) + " "}}
								</text>
								开始
							</view>
							<view class="flashTime" v-else-if="!(item.remainEndSeconds == -1 || item.remainEndSeconds == -2)">
								抢购还剩
								<text style="color: red">
									{{" " + toFriendlyTime(item.remainEndSeconds) + " "}}
								</text>
								结束
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

			<!-- 通用优惠 -->
			<view class="generalPreferential" v-if="navArr[0].active == true">
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
									{{" " + item.panic_buying_start + " "}}
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

			<!-- 商家优惠 -->
			<view class="generalPreferential" v-if="navArr[2].active == true">
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
		<!-- 底部导航栏 -->
		<view>
			<view class="bottom-tab">
				<view class="center bg"></view>
				<view class="bottom-tab">
					<view class="bottom-tab-item-sider" @click="goToBottomTab(0)">
						<view><image class="first-img" src="../../static/img/bottom-tab/icon_01_f.png"></image></view>
						<text class="text-position">首页</text>
					</view>
					<view class="bottom-tab-item-sider" @click="goToBottomTab(1)">
						<view><image class="first-img" src="../../static/img/bottom-tab/icon_02.png"></image></view>
						<text class="text-position text-on">积分商城</text>
					</view>
					<view class="bottom-tab-item-center" @click="goToBottomTab(2)">
						<image class="center" src="../../static/img/bottom-tab/center.b1d7cc6a.png"></image>
						<text class="text-position">报名活动</text>
					</view>
					<view class="bottom-tab-item-sider" @click="goToBottomTab(3)">
						<view><image class="first-img" src="../../static/img/bottom-tab/icon_03.png"></image></view>
						<text class="text-position">组织</text>
					</view>
					<view class="bottom-tab-item-sider" @click="goToBottomTab(4)">
						<view><image class="first-img" src="../../static/img/bottom-tab/icon_04.png"></image></view>
						<text class="text-position">个人</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import icons from '../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	import panicCreateSetinterval from '../../publicAPI/panicCreateSetInterval.js'
	import {baseURL, rootURL} from '../../publicAPI/baseData.js'
	import { request } from '../../publicAPI/request'
	import { getAuthorization } from '../../publicAPI/newToken'
	import { getLoginTask, getUserBeans, login } from '../../publicAPI/userInfo'
    import { correctTime } from "../../utils/common.js"

	export default {
		components:{"uni-icons":icons},
		data() {
			return {
				swiperHeight: 30,
				swiperUrls: [
					"../../static/img/swiper-img.png",
					"../../static/img/swiper-img.png",
				],
				imageUrl:'http://yibinmall.chenglee.top:81/prod-api/mall/',
				hasUserInfo: 0,
				UserInfo: {},
				starRate:20,
				navArr:[
					{
						name:'通用优惠',
						active:false
					},
					{
						name:'热门商品',
						active:false
					},
					{
						name:'商家优惠',
						active:false
					},
					{
						name:'限时抢购',
						active:false
					},
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
			/** 点击底部导航栏 */
			goToBottomTab(index) {
				let url = "https://sczyz.org.cn/fzysc/yb/?state=123"
				if (index === 0) {
					url += "#/pages/tabbar/index"
				} else if (index === 1) {
					url = "" // 不跳转
				} else if (index === 2) {
					url += "#/pages/tabbar/center"
				} else if (index === 3) {
					url += "#/pages/tabbar/organization"
				} else if (index === 4) {
					url += "#/pages/tabbar/user"
				}
				if (url) {
					location.href = url
				}
			},
			/** 修改第一导航栏的活动视图
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
			/** 修改第二导航栏的活动视图 */
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
			/** 导航到商品详情页面 */
			toGoodsDetails(item){
				// console.log("跳转")
				// 加密传递的对象数据
				let details = encodeURIComponent(JSON.stringify(item))
				// console.log(item)
				uni.navigateTo({
					url:'../goodsDetails/goodsDetails?details='+details
				})
			},
			/** 导航到抢购商品详情页面 */
			toPanicGood(item){
				// console.log("跳转")
				// 加密传递的对象数据
				let details = encodeURIComponent(JSON.stringify(item))
				// console.log(item)
				uni.navigateTo({
					url:'../panicGood/panicGood?details='+details
				})
			},
			/** 导航到优惠券详情页面 */
			toTicketDetails(item){
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../ticketDetails/ticketDetails?details='+details
				})
			},
			/** 导航到抢购优惠券详情页面 */
			toPanicTicket(item){
				let details = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'../panicTicket/panicTicket?details='+details
				})
			},
			/** 导航到兑换记录页面 */
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
			/** 导航到商城投诉页面 */
			toAdviceDetails(){
				let app = getApp()
				if (app.globalData.hasUserInfo == 1){
					uni.navigateTo({
						url:"../adviceDetails/adviceDetails"
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: "请登入"
					});
				}
			},
			/** 导航到鲜豆收支明细页面 */
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
			/** 导航到登录页面 */
			toLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			/** 获取商品信息 */
			getGoods(){
				let app = getApp()
				request({
					url: baseURL + '/goods/list',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer " + getAuthorization(),
					},//请求头
					dataType: "jsonbigint",
					sslVerify: false,
					success: res => {
						let rows = []
						if (res.data && Array.isArray(res.data.rows)) {
							rows = res.data.rows
						}
						console.log(rows)
						this.goods = rows
						this.goods.forEach((item,index)=>{
							item.exchange_deadline = correctTime(item.exchange_deadline)
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
			/** 获取抢购商品信息 */
			getPanicGoods(){
				let app = getApp()
				request({
					url: baseURL + '/pb_goods/list',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer " + getAuthorization(),
					},//请求头
					dataType: "jsonbigint",
					sslVerify: false,
					success: res => {
						let rows = []
						if (res.data && Array.isArray(res.data.object)) {
							rows = res.data.object
						}
						console.log(rows)
						let items = rows
						items.forEach((item,index)=>{
							item.panicBuyingGoods.panic_buying_start_time = correctTime(item.panicBuyingGoods.panic_buying_start_time)
							item.panicBuyingGoods.panic_buying_end_time = correctTime(item.panicBuyingGoods.panic_buying_end_time)
							item.goods.exchange_deadline = correctTime(item.goods.exchange_deadline)
							item.goods.update_time = correctTime(item.goods.update_time)
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
			/** 获取优惠券信息 */
			getCoupons(){
				let app = getApp()
				request({
					url: baseURL + '/coupons/page',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer " + getAuthorization(),
					},//请求头
					dataType: "jsonbigint",
					sslVerify: false,
					success: res => {
						let rows = []
						if (res.data && Array.isArray(res.data.rows)) {
							rows = res.data.rows
						}
						console.log(rows)
						let items = rows
						let arrTicket = []
						let merchant = []
						items.forEach((item,index)=>{
							//分割 timestamp字符串，使其成为正常显示的时间
							item.date_use_begin = correctTime(item.date_use_begin)
							item.date_use_end = correctTime(item.date_use_end)
							item.exchange_deadline = correctTime(item.exchange_deadline)
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
			/** 获取抢购优惠券信息 */
			getPanicCoupons(){
				let app = getApp()
				request({
					url: baseURL + '/pb_coupons/list',
					method: "GET",
					// data: msg,
					header: {
						'Authorization':"Bearer " + getAuthorization(),
					},//请求头
					dataType: "jsonbigint",
					sslVerify: false,
					success: res => {
						let rows = []
						if (res.data && Array.isArray(res.data.object)) {
							rows = res.data.object
						}
						console.log(rows)
						let items = rows
						items.forEach((item,index)=>{
							//校正时间 (可用correctTime方法)
							item.panicBuyingCoupons.panic_buying_start_time = correctTime(item.panicBuyingCoupons.panic_buying_start_time)
							item.panicBuyingCoupons.panic_buying_end_time = correctTime(item.panicBuyingCoupons.panic_buying_end_time)
							item.coupons.date_use_begin = correctTime(item.coupons.date_use_begin)
							item.coupons.date_use_end = correctTime(item.coupons.date_use_end)
							item.coupons.exchange_deadline = correctTime(item.coupons.exchange_deadline)
							item.coupons.update_time = correctTime(item.coupons.update_time)
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
			/** 获取商品和优惠券数据 */
			async getMallData() {
				try{
					console.log("huoqu")
					let goods = await this.getGoods()
					let coupons = await this.getCoupons()
					let panicGood = await this.getPanicGoods()
					let panicCoupon = await this.getPanicCoupons()
				}catch{
					console.log("无法正常获取商品信息")
				}
			},
			/** 将秒数转换为 hh:mm:ss 形式 */
			toFriendlyTime(seconds) {
				// let day = Math.floor( seconds / 86400)
				// let h = Math.floor(seconds / 3600) % 24

				let h = Math.floor(seconds / 3600)
				let m = Math.floor(seconds / 60) % 60
				let s = seconds % 60
				if (h < 10) h = "0" + h
				if (m < 10) m = "0" + m
				if (s < 10) s = "0" + s

				let str = `${h}:${m}:${s}`
				// if (day > 0) {
				// 	str =  `${day}天` + str
				// }
				return str
			},
			/** 退出登录 */
			logout() {
				uni.showModal({
					title: "退出登录",
					content: "确定退出登录？",
					success: res => {
						if (res.confirm) {
							uni.removeStorageSync("loginData")
							const app = getApp()
							delete app.globalData.hasUserInfo
							delete app.globalData.UserInfo
							this.hasUserInfo = app.globalData.hasUserInfo
							this.UserInfo = app.globalData.UserInfo
						}
					}
				})
			},
		},
		onLoad(){
			this.navArr[0].active = true
			// 根据图片高度计算出swiper的高度
			uni.getSystemInfo({
				success: res => {
					for (const url of this.swiperUrls) {
						const img = new Image()
						img.src = url
						img.onload = () => {
							const height = img.height * res.windowWidth / img.width
							// console.log("h w w", img.height, res.windowWidth, img.width)
							if (this.swiperHeight < height) {
								this.swiperHeight = height
							}
						}
					}
				}
			})

			const app = getApp()
			getLoginTask().then(() => {
				// this.hasUserInfo = app.globalData.hasUserInfo
				// this.UserInfo = app.globalData.UserInfo
				this.getMallData()

				setInterval(() => {
					this.getMallData()
				}, 180000)
			})

		},
		onShow(){
			getLoginTask().then(() => {
				let app = getApp()
				this.hasUserInfo = app.globalData.hasUserInfo
				this.UserInfo = app.globalData.UserInfo

				console.log(666)
				if (app.globalData.UserInfo.id != undefined){
					getUserBeans()
				}
			})
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
		image{
			// image-rendering: pixelated;
		}
		.body{
			width: 100vw;
			padding-bottom: 4.5rem; // 比底栏的高度稍大一些
			// 轮播图
			.swiper {
				height: var(--swiper-height);
				.swiper-item {
					width: 100%;
					height: 100%;
				}
			}
			.header{
				position: relative;
				height: 46vw;
				.headerBac{
					width: 100vw;
					height: 38vw;
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
					height: 10vw;
					line-height: 10vw;
					width: 40vw;
					position: absolute;
					top: 8vw;
					left: 30vw;
					text-align: center;
					// border: #FFFFFF 1px solid;
				}
				.login:hover{
					color: #e22618;
				}
				.usr{
					position: absolute;
					top: 6vw;
					z-index: 2;
					width: 100vw;
					height: 18vw;
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
							// width: 50vw;
							height: 8vw;
							display: flex;
							align-items: center;
							.name{
								// width: 15vw;
								padding: 0 8px 0 0;
								line-height: 8vw;
								color: #f53a33;
								font-weight: bold;
								font-size: 18px;
							}
							.star{
								height: 8vw;
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
									line-height: 8vw;
									color: #f53a33;
									font-style: italic;
									font-weight: bold;
								}
							}
						}
						.usrInfoCenter{
							margin-top: 2vw;
							margin-bottom: 2vw;
							width: 40vw;
							height: 2vw;
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
							height: 6vw;
							font-size: 11px;
							color: #8e8b85;
						}
					}
				}
				.wallet{
					position: absolute;
					top: 30vw;
					z-index: 2;
					width: 94vw;
					height: 16vw;
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
							height: 6vw;
							line-height: 6vw;
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
							height: 6vw;
							line-height: 6vw;
							left: 6vw;
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
							height: 6vw;
							line-height: 6vw;
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
							height: 6vw;
							line-height: 6vw;
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
				height: 6vw;
				margin-top: 4vw;
				display: flex;
				justify-content: space-around;
				view{
					font-size: 18px;
					line-height: 4vw;
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
				top: 40vw;
				width: 100vw;
				height: 10vw;
				margin-top: 4vw;
				display: flex;
				justify-content: space-around;
				view{
					background-color: #FFFFFF;
					width: 22vw;
					height: 10vw;
					line-height: 10vw;
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
				margin-top: 2vw;
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
						// height: 64vw;
						background-color: #FFFFFF;
						border-radius: 8px;
						margin-top: 2vw;
						overflow: hidden;
						.goodsPic{
							width: 46vw;
							height: 46vw; // 主图一定是正方形
							position: relative;
							.goodsImg{
								width: 100%;
								height: 100%;
							}
							.flashLogo{
								position: absolute;
								z-index: 1;
								top: 2vw;
								left: 1vw;
								width: 18vw;
								height: 4vw;
							}
						}
						.goodsInfo{
							// width: 45vw;
							// height: 20vw;
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
								margin-top: 1vw;
								.flashTime,.goodsNum{
									// display: flex;
									font-size: 12px;
									color: #999999;
								}
							}
							.goodsSale{
								margin-top: 1vw;
								height: 6vw;
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
			.bottom-tab {
				box-sizing: border-box;
				position: fixed;
				background-color: #fff;
				bottom: 0;
				left: 0;
				z-index: 10;
				width: 100%;
				height: 3rem;
				padding: 7px 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-shadow: 0 1px 6px rgba(0, 0, 0, .08);
				.center {
					// box-sizing: border-box;
					width: 54px;
					height: 54px;
					border-radius: 50%;
					margin-top: -27px;
				}
				.bg {
					// box-sizing: border-box;
					width: 60px;
					height: 30px;
					border-radius: 60px 60px 0 0;
					position: absolute;
					left: 50%;
					margin-left: -30px;
					top: 5px;
					background-color: #fff;
					box-shadow: 0 -1px 6px rgba(0, 0, 0, .16);
					z-index: 0;
				}
				.bottom-tab-item-sider {
					width: 19%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					// box-sizing: border-box;
					.first-img {
						width: 1.5rem;
						height: 1.5rem;
					}
					.text-position {
						margin-top: 4px; // 0;
						margin-top: 0;
						font-size: .6rem;
						color: #666;
					}
					.text-on {
						color: #000;
					}
				}
				.bottom-tab-item-center {
					width: 24%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					.center {
						background-color: #fff;
						border-left: 3px solid #fff;
						border-right: 3px solid #fff;
					}
					.text-position {
						// margin-top: 0;
						font-size: .6rem;
						color: #666;
					}
					.text-on {
						color: #000;
					}
				}
			}
		}
	}
</style>
