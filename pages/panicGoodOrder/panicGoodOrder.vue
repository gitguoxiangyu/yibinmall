<template>
	<view class="main">
		<view class="blockItem">
			<view class="head">
				<view class="container">
					<img :src="details.goods.goods_main_picture" alt="商品图片" class="goodImg">
					<view class="goodText">
						<view class="goodDetail">{{details.goods.goods_name}}</view>
						<view class="goodPrice">共青价：<span style="color: red; font-weight: bold;" >鲜豆 {{details.panicBuyingGoods.panic_buying_price}}</span></view>
					</view>
				</view>
				<view class="deliveryWay">
					<view class="way">配送方式：</view>
					<view class="deliver">线下商家配送（ 送货上门 ）</view>
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
					<view>收货地址</view>
					<view>
						<text v-if="person.address">{{person.address}}</text>
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
						<view class="uni-list-cell-left">
							团支部分区
						</view>
						<view class="uni-list-cell-db">
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
					<view>{{details.panicBuyingGoods.panic_buying_price}}</view>
				</view>
				<view class="option">
					<view>会员星级</view>
					<view>{{details.goods.star}} 星</view>
				</view>
				<view class="option">
					<view>市场价</view>
					<view>{{details.goods.market_price}} 元</view>
				</view>
				<view class="option option--rightAligned"><span style="color: red; font-weight: bold;" >鲜豆 {{person.number * details.panicBuyingGoods.panic_buying_price}}</span>合计： </view>
			</view>
		</view>
		<view class="pay">
			<view style="color: red; font-weight: bold;">
				鲜豆 {{person.number * details.panicBuyingGoods.panic_buying_price}}
			</view>
			<view><button :disabled="submitted" :class="submitted ? 'btn--disabled' : 'btn'" @click="buy">立即支付</button></view>
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
					<view class="inputItem">
						<text class="inputLabel">收货地址</text>
						<input v-model="person.address" class="input" placeholder-class="inputPlaceholder" type="text" name="address" placeholder="请输入收货地址">
					</view>
					<view class="inputItem">
						<text class="inputLabel">货物数量</text>
						<input v-model="person.number" class="input" placeholder-class="inputPlaceholder" type="text" name="phone" placeholder="请输入货物数量">
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
import { getAuthorization } from '../../publicAPI/newToken.js';
import { request } from '../../publicAPI/request.js'
import { getLoginTask, getUserBeans } from '../../publicAPI/userInfo.js';
export default {
	data() {
		return {
			showPop: false,
			details:{},
			person: {},
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
			range: ['翠屏区', '南溪区', '叙州区', '江安县','长宁县','高县','筠连县','珙县','兴文县','屏山县','三江新区','“两海”示范区'],
			submitted: false,
		}
	},
	onLoad(option) {
		if (option.details){
			// decodeURIComponent 解密传过来的对象字符串
			this.details = JSON.parse(decodeURIComponent(option.details));
			console.log(this.details)
		}
		getLoginTask().then(() => {
			this.person = {...getApp().globalData.UserInfo}
			this.person.number = 1
			console.log(this.person)
		})

	},
	onShow() {
		getLoginTask().then(() => {
			getUserBeans()
		})
	},
	methods: {
		buy(){
			getLoginTask().then(() => {
				let errMsg = ""
				if (this.person.star < this.details.goods.star) {
					errMsg = "用户星级不足"
				} else if (this.person.beans < this.person.number * this.details.panicBuyingGoods.panic_buying_price) {
					errMsg = "用户鲜豆不足"
				} else if (!this.person.real_name) {
					errMsg = "请输入收货人"
				} else if (!this.person.tel) {
					errMsg = "请输入收货电话"
				} else if (!this.person.address) {
					errMsg = "请输入收获地址"
				} else if (!this.person.number) {
					errMsg = "请输入货物数量"
				} else if (this.post.volunteer_area == -1) {
					errMsg = "请选择团支部分区"
				}
				if (errMsg) {
					uni.showToast({
						icon: "none",
						title: errMsg,
					})
					return
				}

				if (this.submitted) return
				this.submitted = true

				const postData = {...this.post}
				postData.order_user_id = this.person.id
				postData.store_id = this.details.goods.store_id
				postData.goods_id = this.details.goods.goods_id
				postData.coupons_id = this.details.goods.coupons_id
				postData.number = this.person.number
				postData.order_status = "已支付"
				postData.consignee_name = this.person.real_name
				postData.consignee_phone = this.person.tel
				postData.consignee_address = this.person.address
				postData.deliver_type = "线下厂商配送"
				postData.order_time = new Date().getTime()
				postData.deliver_time = undefined
				postData.volunteer_area = this.range[this.post.volunteer_area]

				console.log(postData)
				let app = getApp()
				let poll = {
					user_id: this.person.id,
					type: 1,
					thingsId: this.details.goods.goods_id,
				}
				// //getToken获取token，第一个参数是成功的回调，第二个参数是失败的回调
				// getToken(
				// res => {
				// 	//将token存入全局变量中
				// 	let app = getApp()
				// 	app.globalData.Authorization = res.data
				// 	//发送购买请求

				// },
				// err => {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: "获取token失败，请重试！"
				// 	});
				// }
				// )

				request({
					url: baseURL + '/pb_orders',
					method: "POST",
					data: postData,
					header: {
						'Authorization':"Bearer " + getAuthorization(),
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
									// data: poll,
									header: {
										'Authorization':"Bearer " + getAuthorization(),
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
												confirmText: "查看订单",
												cancelText: "返回",
												success: function (res) {
													// updatePersonMsg()//更新鲜豆信息
													if (res.confirm) {
														setTimeout(()=>{
															uni.redirectTo({
																url: '../ticketHistory/ticketHistory'
															})
														},500)
													} else if (res.cancel) {
														setTimeout(()=>{
															uni.navigateBack()
														},500)
													}
												}
											});
											clearInterval(timer)
										}else{
											console.error("下单失败", res)
											uni.hideLoading()
											this.submitted = false
											if (!res.data || !res.data.message) return
											uni.showToast({
												icon: 'none',
												title: res.data.message
											});
											clearInterval(timer)
										}
									},
									fail: err => {
										console.error("下单失败", err)
										uni.hideLoading()
										uni.showToast({
											icon: 'none',
											title: "下单失败，请稍后重试！"
										});
										this.submitted = false
									}
								})
							},1000)
						}else{
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
							this.submitted = false
						}

					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: "订单信息发送失败，请重试！"
						});
						this.submitted = false
					}
				})

				// uni.navigateTo({
				// 	url:'../mall/mall'
				// })
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

<!-- uni.request({
						url: 'http://yibinmall.chenglee.top:8080/get_token',//开发者服务器接口地址
						method: "POST",
						data: msg,//请求的参数
						dataType: "json",
						sslVerify: false,
						success: res => {
							//将token存入全局变量中
							let app = getApp()
							app.globalData.Authorization = res.data
							//发送购买请求
							uni.request({
								url: 'http://yibinmall.chenglee.top:8080/pb_orders',
								method: "POST",
								data: this.post,
								header: {
									'Authorization':"Bearer "+app.globalData.Authorization,
								},//请求头
								dataType: "json",
								sslVerify: false,
								success: res => {
									console.log(res)
									uni.showLoading({
										title: res.data.message
									});
									//轮询抢购结果
									if (res.data.code == 200){
										uni.showLoading({
											title: res.data.message
										});
										let timer = setInterval(()=>{
											uni.request({
												url: 'http://yibinmall.chenglee.top:8080/pb_orders/result/'+poll.user_id+'/'+poll.type+'/'+poll.thingsId,
												method: "GET",
												// data: poll,
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
															content: '是否查看订单详情',
															success: function (res) {
																if (res.confirm) {
																	console.log('用户点击确定');
																} else if (res.cancel) {
																	console.log('用户点击取消');
																}
															}
														});
														clearInterval(timer)
													}else if(res.data.code == 500){
														console.log("抢购失败")
														clearInterval(timer)
													}
												},
												fail: err => {
													uni.showToast({
														icon: 'none',
														title: "订单信息获取失败，请重试！"
													});
													uni.hideLoading()
												}
											})
										},1000)
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
						fail: err => {
							uni.showToast({
								icon: 'none',
								title: "获取token失败，请重试！"
							});
						}
					}) -->
