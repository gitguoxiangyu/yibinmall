let panicCreateSetinterval = function(arr){
	arr.forEach((item,index) => {
		var beginTimer = setInterval(function(){
			// console.log(item)
			if (item.remainBeginSeconds <= 0 && item){
				clearInterval(beginTimer)
				// console.log("成功清除")
			}
			// console.log("成功调用")
			item.remainBeginSeconds--
		},1000)
		var endTimer = setInterval(function(){
			// console.log(item)
			if (item.remainEndSeconds <= 0 && item){
				clearInterval(endTimer)
				// console.log("成功清除")
			}
			// console.log("成功调用")
			item.remainEndSeconds--
		},1000)
	})
}
export default panicCreateSetinterval