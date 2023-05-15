<template>
	<view class="main">
		<view class="blockItem">
			<view class="head ticketHead">
				<view class="container">
					<img :src="details.coupons.main_picture" alt="商品图片" class="goodImg">
					<view class="goodText">
						<view class="goodDetail">{{details.coupons.coupon_name}}</view>
						<view class="goodPrice">共青价：<span style="color: red; font-weight: bold;" >鲜豆 {{details.panicBuyingCoupons.panic_buying_price}}</span></view>
					</view>
				</view>
			</view>
			<view class="body" @click="change">
				<view class="option">
					<view>收货人</view>
					<view>
						<text v-if="person.real_name">{{person.real_name}}</text>
						<text v-else class="optionPlaceholder">请输入</text>
					</view>
				</view>
				<view class="option">
					<view>收货电话</view>
					<view>
						<text v-if="person.tel">{{person.tel}}</text>
						<text v-else class="optionPlaceholder">请输入</text>
					</view>
				</view>
				<view class="option">
					<view>货物数量</view>
					<view>
						<text v-if="person.number">{{person.number}}</text>
						<text v-else class="optionPlaceholder">请输入</text>
					</view>
				</view>
			</view>
			<view class="foot">
				<!-- 选择团支部分区 -->
				<view class="uni-list">
					<view class="option">
						<view class="uni-list-cell-left" style="width: 20vw;">
							团支部分区
						</view>
						<view class="uni-list-cell-db" style="width: 60vw;">
							<picker @change="bindPickerChange" :value="post.volunteer_area" :range="range">
								<view class="uni-input" style="text-align: right;">
									<text v-if="post.volunteer_area != -1">{{range[post.volunteer_area]}}</text>
									<text v-else class="optionPlaceholder">请选择</text>
								</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="option">
					<view>商品鲜豆</view>
					<view>{{details.panicBuyingCoupons.panic_buying_price}}</view>
				</view>
				<view class="option">
					<view>会员星级</view>
					<view>{{details.coupons.star}} 星</view>
				</view>
				<view class="option">
					<view>市场价</view>
					<view>{{details.coupons.market_price}} 元</view>
				</view>
				<view class="option option--rightAligned"><span style="color: red; font-weight: bold;" >鲜豆 {{person.number * details.panicBuyingCoupons.panic_buying_price}}</span>合计： </view>
			</view>
		</view>
		<view class="pay">
			<view style="color: red; font-weight: bold;">
				鲜豆 {{person.number * details.panicBuyingCoupons.panic_buying_price}}
			</view>
			<view><button class="btn" @click="buy">立即支付</button></view>
		</view>

		<!-- 弹窗 -->
		<view v-if="showPop" class="modalWrapper">
			<view class="modal">
				<!-- <form @submit="formSubmit"> -->
					<view class="inputItem">
						<text class="inputLabel">收货人</text>
						<input v-model="person.real_name" class="input" placeholder-class="inputPlaceholder" type="text" name="name" placeholder="请输入收货人姓名">
					</view>
					<view class="inputItem">
						<text class="inputLabel">收货电话</text>
						<input v-model="person.tel" class="input" placeholder-class="inputPlaceholder" type="tel" name="phone" placeholder="请输入收货电话"
							@input="(e) => person.tel = e.detail.value.replace(/[^\d+-]/g, '')">
					</view>
					<button @click="closeModal()" class="login" >确定</button>
				<!-- </form> -->
			</view>
		</view>

	</view>
</template>

<script>
	// import getToken from '../../publicAPI/getToken.js'
	// import updatePersonMsg from '../../publicAPI/updataPersonMsg.js'
	import {baseURL} from '../../publicAPI/baseData.js'
	import { request } from '../../publicAPI/request.js'
	export default {
		data() {
			return {
				showPop: false,
				details:{},
				person: getApp().globalData.UserInfo,
				post:{
					order_user_id: undefined,
					store_id: undefined,
					goods_id: undefined,
					coupons_id: undefined,
					number: undefined,
					order_status: undefined,
					consignee_name: undefined,
					consignee_phone: undefined,
					consignee_address: undefined,
					deliver_type: undefined,
					order_time: undefined,
					deliver_time: undefined,
					volunteer_area: -1,
				},
				range: ['翠屏区', '南溪区', '叙州区', '江安县','长宁县','高县','筠连县','珙县','兴文县','屏山县','三江新区','“两海”示范区']
			}
		},
		computed:{

		},
		onLoad(option) {
			if (option.details){
				// decodeURIComponent 解密传过来的对象字符串
				this.details = JSON.parse(decodeURIComponent(option.details));
				console.log(this.details)
			}
			this.person.number = 1
			console.log(getApp().globalData.UserInfo)
		},
		methods: {

			buy(){
				let errMsg = ""
				if (this.person.star < this.details.coupons.star) {
					errMsg = "用户星级不足"
				} else if (this.person.beans < this.person.number * this.details.panicBuyingCoupons.panic_buying_price) {
					errMsg = "用户鲜豆不足"
				} else if (!this.person.real_name) {
					errMsg = "请输入收货人"
				} else if (!this.person.tel) {
					errMsg = "请输入收货电话"
				} else if (this.post.volunteer_area == -1) {
					errMsg = "请选择团支部分区"
				}
				if (errMsg) {
					uni.showToast({
						icon: 'none',
						title: errMsg,
					})
					return
				}

				this.post.order_user_id = this.person.id
				this.post.store_id = this.details.coupons.store_id ? this.details.coupons.store_id : 1
				this.post.goods_id = this.details.coupons.goods_id
				this.post.coupons_id = this.details.coupons.coupon_id
				this.post.number = this.person.number
				this.post.order_status = "已支付"
				this.post.consignee_name = this.person.real_name
				this.post.consignee_phone = this.person.tel
				this.post.consignee_address = '0'
				this.post.deliver_type = '0'
				this.post.order_time = new Date().getTime()
				this.post.deliver_time = undefined
				this.post.volunteer_area = this.range[this.post.volunteer_area]

				console.log(this.post)
				let app = getApp()
				let msg = {
					username: "admin",
					password: "admin123"
				}
				let poll = {
					user_id: this.person.id,
					type: 2,
					thingsId: this.details.coupons.coupon_id,
				}
				request({
					url: baseURL + '/pb_orders',
					method: "POST",
					data: this.post,
					header: {
						'Authorization':"Bearer "+app.globalData.Authorization,
					},//请求头
					dataType: "json",
					sslVerify: false,
					success: res => {
						console.log(res)
						//轮询抢购结果
						if (res.data.code == 200){
							uni.showLoading({
								title: res.data.message
							});
							let timer = setInterval(()=>{
								request({
									url: baseURL + '/pb_orders/result/'+poll.user_id+'/'+poll.type+'/'+poll.thingsId,
									method: "GET",
									header: {
										'Authorization':"Bearer "+app.globalData.Authorization,
									},//请求头
									dataType: "json",
									sslVerify: false,
									success: res => {
										console.log(res)
										uni.hideLoading()
										if (res.data.code == 200){
											uni.showModal({
												title: '抢购成功',
												// content: '是否查看订单详情',
												success: function (res) {
													// updatePersonMsg()//更新鲜豆信息
													if (res.confirm) {
														setTimeout(()=>{
															uni.navigateTo({
																url: '../ticketHistory/ticketHistory'
															})
														},500)
													} else if (res.cancel) {
														setTimeout(()=>{
															uni.navigateTo({
																url: '../mall/mall'
															})
														},500)
													}
												}
											});
											clearInterval(timer)
										}else if(res.data.code == 500){
											uni.hideLoading()
											uni.showToast({
												icon: 'none',
												title: res.data.message
											});
											clearInterval(timer)
										}
									},
									fail: err => {
										uni.hideLoading()
										uni.showToast({
											icon: 'none',
											title: "订单信息获取失败，请重试！"
										});
										uni.hideLoading()
									}
								})
							},1000)
						}else{
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}

					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "订单信息发送失败，请重试！"
						});
					}
				})

			},
			change(){
				this.showPop = true
			},
			closeModal(){
				this.showPop = false
			},
			bindPickerChange(e){
				this.post.volunteer_area = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	@import "../../styles/orderPage.scss";
</style>
