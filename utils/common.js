export function correctTime(time){
	return time.substring(0,10) + " " + time.substring(11,19)
}

export function jsonToBigint(xhr){
	let Jsonbig = require('json-bigint')({storeAsString: true})
	console.log(Jsonbig.parse(xhr._xhr.response))
	let items = Jsonbig.parse(xhr._xhr.response)
	return items
}