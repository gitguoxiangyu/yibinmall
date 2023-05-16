import { baseURL } from "./baseData";
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
