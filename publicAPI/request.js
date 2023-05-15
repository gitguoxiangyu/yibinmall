import { baseURL, rootURL } from "./baseData"

/**
 * 网络请求函数，包含对响应的一些错误处理
 * @param {UniApp.RequestOptions} options 请求参数
 * @returns {Promise | UniApp.RequestTask} 如果传入success、fail或complete，则返回一个UniApp.RequestTask，否则返回一个Promise
 */
export const request = (options) => {
	let { url, method, data, dataType, success, fail, complete, timeout, ...params } = options
	if (!dataType) dataType = "json"
	if (timeout == null) timeout = 10000 // 超时时间


	// 放在success函数之前的的预处理函数
	// 为兼容现有代码，返回res而不是data
	function preprocessSuccess(res) {
		return new Promise((resolve, reject) => {
			const data = res.data
			if (!data) return reject(res)
			// 注意每一个分支都要resolve或reject
			if (data.code === 200) {
				// 请求成功
				return resolve(res)
			} else if (data.code === 401) {
				// 登录状态过期，提示重新登录
				uni.showModal({
					title: "登录状态过期",
					content: "登录状态过期，请重新登录",
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/login",
							})
						}
					},
					complete: () => {
						return reject(res)
					}
				})
			} else {
				// 其他错误
				return reject(res)
			}
		})
	}

	// 重写success函数
	let _success = undefined
	if (dataType = "json") {
		// url白名单，只对指定的url执行下面的判断登录状态是否过期等流程
		const urlList = [
			rootURL,
		]
		let found = false
		for (const u of urlList) {
			if (url.startsWith(u) || url.startsWith("/" + u)) {
				found = true
				break
			}
		}

		if (found) {
			_success = res => {
				if (typeof res.data === "object") {
					preprocessSuccess(res).then(res2 => {
						// 正常请求
						if (success) {
							success(res2)
						}
					}).catch(res2 => {
						// 请求响应成功，但是返回的code不是200
						// fail应该只有一个错误提示，其他情况可能需要修改
						if (fail) {
							fail(res2)
						}
					})
				} else {
					// 后端没有返回一个object，无法读取code
					if (success) {
						success(res)
					}
				}
			}
		} else {
			_success = success
		}
	}

	if (success || fail || complete) {
		return uni.request({
			url: url,
			method: method,
			data: data,
			dataType: dataType,
			success: _success,
			fail: fail,
			complete: complete,
			timeout: timeout,
			...params,
		})
	} else {
		// Promise式调用uni.request的情况
		return uni.request({
			url: url,
			method: method,
			data: data,
			dataType: dataType,
			timeout: timeout,
			...params,
		}).then(res => {
			// 注意：对于Vue2，res[0]和res[1]分别是fail和success函数的参数
			// 参见 https://uniapp.dcloud.net.cn/api/#promise-封装
			if (res[1]) {
				return preprocessSuccess(res[1])
			} else {
				// 网络请求失败时，res[0] = { errMsg: string }
				return Promise.reject(res[0])
			}
		})
	}
}
