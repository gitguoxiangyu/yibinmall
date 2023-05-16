import { baseURL } from "./baseData";
import { getAuthorization } from "./newToken";
import { request } from "./request";

/** 获取用户鲜豆 */
export function getUserBeans() {
	const app = getApp()
	return request({
		url: baseURL + "/user_info/userBeans?userId=" + app.globalData.UserInfo.id,
		method: "GET",
	}).then(res => {
		app.globalData.UserInfo.beans = res.data.object
	}).catch(res => {
		console.error("刷新用户鲜豆失败", res)
	})
}

export async function login(loginData) {
	if (!loginData || !loginData.idCard || !loginData.ICBC_card_num) {
		throw new Error("loginData为空或数据不完整", loginData)
	}

	const app = getApp()
	//获取token
	let data = {
		appId: "yb001",
		secret: "123456Aa."
	}

	return request({
		url: '/province/data/getToken',//开发者服务器接口地址
		method: "POST",
		data: data,//请求的参数
		dataType: "json",
		sslVerify: false,
	}).then(res => {
		const token = res.data.data
		//将token存入全局变量中
		app.globalData.token = token

		// //正则校验社保卡号前六位是否为6217212314
		// // 6217212314999999999
		// // 51253419720212703X
		// // 510524200203160384
		// let reg = /^6217212314/

		//请求体
		let msg = {
			idCard: loginData.idCard,
			token: token,
		}
		app.globalData.idCard = loginData.idCard
		// console.log('/province/data/getToken', res)

		return request({
			// http://yibinmall.chenglee.top:81/province/
			url: '/province/user/info',//开发者服务器接口地址
			method: "POST",
			data: msg,//请求的参数
			dataType: "json",
			sslVerify: false,
		}).then(res => {

			// console.log('/province/user/info', res)
			if (res.data.code == "200"){
				//重新封装属性名，发向服务器
				const UserInfo = {
					id: res.data.data.id,
					real_name: res.data.data.realname,
					card_num: res.data.data.cardNum,
					card_type: res.data.data.cardType,
					icbc_card_num: loginData.ICBC_card_num,
					avatar: res.data.data.avatar,
					mobile: res.data.data.mobile,
					beans: res.data.data.score,
					star: res.data.data.certificate,
					hours: res.data.data.hours
				}
				// console.log(UserInfo)

				return request({
					url: baseURL + '/user_info',//开发者服务器接口地址
					method: "POST",
					data: UserInfo,//请求的参数
					header: {
						'Authorization':"Bearer " + getAuthorization(),
					},//请求头
					dataType: "json",
					sslVerify: false,
				}).then(res => {
					app.globalData.hasUserInfo = 1
					app.globalData.UserInfo = {...UserInfo}
					// app.globalData.UserInfo.beans = res.data.object
					// console.log(res)

				}).catch(res => {
					return Promise.reject(res)
				})
			} else {
				return Promise.reject(res)
			}
		}).catch(res => {
			return Promise.reject(res)
		})
	}).catch(res => {
		return Promise.reject(res)
	})
}
