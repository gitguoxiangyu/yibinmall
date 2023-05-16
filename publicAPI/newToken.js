import { rootURL } from "./baseData"
import { request } from "./request"

export function getAuthorization() {
	const app = getApp()
	const authorization0 = app.globalData.Authorization
	if (authorization0) {
		return authorization0
	} else {
		const authorization1 = uni.getStorageSync("Authorization")
		if (authorization1) {
			app.globalData.Authorization = authorization1
			return authorization1
		} else {
			return ""
		}
	}
}

let currentTask = null

export function getNewAuthorization() {
	let msg = {
		username: "token",
		password: "123456Aa."
	}

	if (currentTask) {
		return currentTask
	}
	currentTask = request({
		url: rootURL + '/auth/get_token',//开发者服务器接口地址
		method: "POST",
		data: msg,//请求的参数
		dataType: "json",
		sslVerify: false,
	}).then(res => {
		const authorization = res.data.object.access_token
		uni.setStorageSync("Authorization", authorization)
		const app = getApp()
		app.globalData.Authorization = authorization
		console.log("刷新Authorization成功", authorization)
		currentTask = null
		return authorization
	}).catch(res => {
		currentTask = null
		return Promise.reject(res)
	})
	
	return currentTask
}
