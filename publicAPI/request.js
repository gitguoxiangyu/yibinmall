import { jsonParseBigint } from "../utils/common"
import { baseURL, rootURL } from "./baseData"
import { getAuthorization, getNewAuthorization } from "./newToken"

/**
 * 网络请求函数，包含对响应的一些错误处理
 * @param {UniApp.RequestOptions} options 请求参数
 * @param { number } count 函数调用次数，仅在递归调用时使用，避免递归次数太多。默认值：1
 * @returns {Promise | UniApp.RequestTask} 如果传入success、fail或complete，则返回一个UniApp.RequestTask，否则返回一个Promise
 */
export const request = (options, count = 1) => {
	let _options = {...options}
	if (!_options.dataType) _options.dataType = "json"
	if (_options.timeout == null) _options.timeout = 10000 // 超时时间

	// 放在success函数之前的的预处理函数
	// 为兼容现有代码，返回res而不是data
	function preprocessSuccess(res) {
		return new Promise((resolve, reject) => {
			const data = res.data
			if (!data) reject(res)
			// 注意每一个分支都要resolve或reject
			if (data.code === 200) {
				// 请求成功
				resolve(res)
			} else if (data.code === 401) {
				// 登录状态过期，尝试刷新Authorization后重新请求
				if (count === 1) {
					// 如果刷新Authorization失败或重新发送request失败，都算preprocessSuccess失败
					getNewAuthorization().then(auth => {
						// console.log("自动刷新Authorization成功", auth)
						const _options2 = {..._options}
						if (_options2.success) {
							_options2.success = res => {
								resolve(res)
							}
						}
						if (_options2.fail) {
							_options2.fail = res => {
								reject(res) //
							}
						}
						// console.log("2rd request, url:", _options2.url)
						// console.log("2rd request, options:", _options2)
						const req = request(_options2, count + 1)
						if (req instanceof Promise) {
							req.then(res => {
								resolve(res)
							}).catch(res => {
								reject(res)
							})
						}
					}).catch(err => {
						console.error("自动刷新Authorization失败", err)
						// 自动刷新失败，提示用户跳转登录页面手动重新登录
						// 如果用户在登录页面登录时仍然返回401，则又会重新执行上面的流程
						const pages = getCurrentPages()
						if (pages[pages.length - 1].route === "pages/login/login") {
							// 如果当前页面就是登录页面，则不弹窗提示跳转登录页面
							reject(res)
							return
						}
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
								reject(res)
							}
						})
					})
				}
			} else {
				// 其他错误
				reject(res)
			}
		})
	}

	// url白名单，只对指定的url执行下面的判断登录状态是否过期等流程
	const urlList = [
		rootURL,
	]
	let found = false
	for (const u of urlList) {
		if (_options.url.startsWith(u) || _options.url.startsWith("/" + u)) {
			found = true
			break
		}
	}

	if (found) {
		// 重写success函数
		const successOld = _options.success
		if (successOld) {
			_options.success = res => {
				if (_options.dataType === "jsonbigint") {
					res.data = jsonParseBigint(res.data)
				}
				if (typeof res.data === "object") {
					preprocessSuccess(res).then(res2 => {
						// console.log("preprocessSuccess then, res2:", res2)
						// 正常请求
						if (successOld) {
							successOld(res2)
						}
					}).catch(res2 => {
						// console.error("preprocessSuccess catch, res2:", res2)
						// 请求响应成功，但是返回的code不是200
						// fail应该只有一个错误提示，其他情况可能需要修改
						// 为了兼容现有代码，这里调用success而不是fail
						// if (_options.fail) {
						// 	_options.fail(res2)
						// }
						if (successOld) {
							successOld(res2)
						}
					})
				} else {
					console.error("preprocessSuccess not object, res:", res)
					// 后端没有返回一个object，无法读取code
					if (successOld) {
						successOld(res)
					}
				}
			}
		}

		// 自动添加Authorization
		if (!_options.header) _options.header = {}
		const authorization = getAuthorization()
		if (!authorization) {
			delete _options.header.Authorization
		} else if (_options.header.Authorization !== `Bearer ${authorization}`) {
			_options.header.Authorization = `Bearer ${authorization}`
		}
	}

	if (_options.success || _options.fail || _options.complete) {
		// console.log("this is a RequestTask")
		return uni.request(_options)
	} else {
		// console.log("this is a Promise")
		// Promise式调用uni.request的情况
		return uni.request(_options).then(res => {
			// 注意：对于Vue2，res[0]和res[1]分别是fail和success函数的参数
			// 参见 https://uniapp.dcloud.net.cn/api/#promise-封装

			// 为方便使用，这里将返回res[1]或res[0]
			if (res[1]) {
				if (found) {
					return preprocessSuccess(res[1])
				} else {
					return res[1]
				}
			} else {
				// 网络请求失败时，res[0] = { errMsg: string }
				return Promise.reject(res[0])
			}
		})
	}
}
