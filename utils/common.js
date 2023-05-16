export function correctTime(time){
	return time.substring(0,10) + " " + time.substring(11,19)
}

export function jsonToBigint(xhr){
	let Jsonbig = require('json-bigint')({storeAsString: true})
	console.log(Jsonbig.parse(xhr._xhr.response))
	let items = Jsonbig.parse(xhr._xhr.response)
	return items
}

/**
 * 使用json-bigint完成JSON.parse操作，BigInt类型的数据会被转换为string
 * @param {string} str
 * @returns {object}
 */
export function jsonParseBigint(str){
	let Jsonbig = require('json-bigint')({storeAsString: true})
	// console.log("jsonParseBigint str:", str)
	// console.log("jsonParseBigint obj:", Jsonbig.parse(str))
	let data = Jsonbig.parse(str)
	return data
}
