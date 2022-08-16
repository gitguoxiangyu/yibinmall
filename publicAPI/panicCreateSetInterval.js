let panicCreateSetinterval = function(arr){
	arr.forEach((item,index) => {
		var timer = setInterval(function(){
			// console.log(item)
			item.remainBeginSeconds--
			if (item.remainBeginSeconds == -1 && item){
				clearInterval(timer)
				// console.log("成功清除")
			}
			// console.log("成功调用")
		},1000)
	})
}
export default panicCreateSetinterval