(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-orderDetails-orderDetails"],{"08db":function(e,t,i){"use strict";var a=i("a261"),s=i.n(a);s.a},1322:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return a}));var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-view",{staticClass:"head"},[i("v-uni-view",{staticClass:"container"},[i("img",{staticClass:"goodImg",attrs:{src:e.details.goods_main_picture,alt:"商品图片"}}),i("v-uni-view",{staticClass:"goodText"},[i("v-uni-view",{staticClass:"goodDetail"},[e._v(e._s(e.details.goods_name))]),i("v-uni-view",{staticClass:"goodPrice"},[e._v("共青价："),i("span",{staticStyle:{color:"red","font-weight":"bold"}},[e._v("鲜豆"+e._s(e.details.goods_price))])])],1)],1),i("v-uni-view",{staticClass:"deliveryWay"},[i("v-uni-view",{staticClass:"way"},[e._v("配送方式：")]),i("v-uni-view",{staticClass:"deliver"},[e._v("线下商家配送（ 送货上门 ）")])],1)],1),i("v-uni-view",{staticClass:"body",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.change.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"option"},[i("v-uni-view",[e._v("收货人")]),i("v-uni-view",[e._v(e._s(e.person.real_name))])],1),i("v-uni-view",{staticClass:"option"},[i("v-uni-view",[e._v("收货电话")]),i("v-uni-view",[e._v(e._s(e.person.tel))])],1),i("v-uni-view",{staticClass:"option"},[i("v-uni-view",[e._v("收货地址")]),i("v-uni-view",[e._v(e._s(e.person.address))])],1),i("v-uni-view",{staticClass:"option"},[i("v-uni-view",[e._v("货物数量")]),i("v-uni-view",[e._v(e._s(e.person.number))])],1)],1),i("v-uni-view",{staticClass:"foot"},[i("v-uni-view",{staticClass:"bean"},[i("v-uni-view",[e._v("商品鲜豆")]),i("v-uni-view",[e._v(e._s(e.details.goods_price))])],1),i("v-uni-view",{staticClass:"star"},[i("v-uni-view",[e._v("会员星级")]),i("v-uni-view",[e._v(e._s(e.details.star)+"星")])],1),i("v-uni-view",{staticClass:"flashTime"},[i("v-uni-view",[e._v("市场价")]),i("v-uni-view",[e._v(e._s(e.details.market_price)+"元")])],1),i("v-uni-view",{staticClass:"sum"},[i("span",{staticStyle:{color:"red","font-weight":"bold"}},[e._v("鲜豆"+e._s(e.person.number*e.details.goods_price))]),e._v("合计：")])],1)],1),i("v-uni-view",{staticClass:"pay"},[i("v-uni-view",{staticStyle:{color:"red","font-weight":"bold"}},[e._v("鲜豆"+e._s(e.person.number*e.details.goods_price))]),i("v-uni-view",{staticClass:"btn"},[i("v-uni-button",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.buy.apply(void 0,arguments)}}},[e._v("立即支付")])],1)],1),e.showPop?i("v-uni-view",{staticClass:"modal"},[i("v-uni-view",{staticClass:"inputItem"},[e._v("收货人"),i("v-uni-input",{staticClass:"input",attrs:{type:"text",name:"name",placeholder:"请输入收货人姓名","placeholder-style":"font-size:26rpx;color:grey;"},model:{value:e.person.real_name,callback:function(t){e.$set(e.person,"real_name",t)},expression:"person.real_name"}})],1),i("v-uni-view",{staticClass:"inputItem"},[e._v("收货电话"),i("v-uni-input",{staticClass:"input",attrs:{type:"text",name:"phone",placeholder:"请输入收货电话","placeholder-style":"font-size:26rpx;color:grey;"},model:{value:e.person.tel,callback:function(t){e.$set(e.person,"tel",t)},expression:"person.tel"}})],1),i("v-uni-view",{staticClass:"inputItem"},[e._v("收货地址"),i("v-uni-input",{staticClass:"input",attrs:{type:"text",name:"address",placeholder:"请输入收货地址","placeholder-style":"font-size:26rpx;color:grey;"},model:{value:e.person.address,callback:function(t){e.$set(e.person,"address",t)},expression:"person.address"}})],1),i("v-uni-view",{staticClass:"inputItem"},[e._v("货物数量"),i("v-uni-input",{staticClass:"input",attrs:{type:"text",name:"phone",placeholder:"请输入货物数量","placeholder-style":"font-size:26rpx;color:grey;"},model:{value:e.person.number,callback:function(t){e.$set(e.person,"number",t)},expression:"person.number"}})],1),i("v-uni-button",{staticClass:"login",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.closeModal()}}},[e._v("确定")])],1):e._e()],1)},o=[]},"28ac":function(e,t,i){"use strict";i.r(t);var a=i("1322"),s=i("cf1f");for(var o in s)"default"!==o&&function(e){i.d(t,e,(function(){return s[e]}))}(o);i("08db");var n,r=i("f0c5"),d=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"01147090",null,!1,a["a"],n);t["default"]=d.exports},"2bfd":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.baseURL=void 0;var a="http://yibinmall.chenglee.top:81/prod-api/mall";t.baseURL=a},"4b5a":function(e,t,i){"use strict";(function(e){var a=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;a(i("567c"));var s=i("2bfd"),o={data:function(){return{showPop:!1,details:{},person:getApp().globalData.UserInfo,post:{order_user_id:void 0,store_id:void 0,goods_id:void 0,coupons_id:void 0,number:void 0,order_status:void 0,consignee_name:void 0,consignee_phone:void 0,consignee_address:void 0,deliver_type:void 0,order_time:void 0,deliver_time:void 0}}},onLoad:function(t){t.details&&(this.details=JSON.parse(decodeURIComponent(t.details)),e("log",this.details," at pages/orderDetails/orderDetails.vue:109")),this.person.number=1,e("log",getApp().globalData.UserInfo," at pages/orderDetails/orderDetails.vue:112")},methods:{buy:function(){if(e("log",this.person.beans>=this.person.number*this.details.goods_price," at pages/orderDetails/orderDetails.vue:118"),this.person.address&&this.person.tel&&this.person.real_name&&this.person.star>=this.details.star&&this.person.beans>=this.person.number*this.details.goods_price){this.post.order_user_id=this.person.id,this.post.store_id=this.details.store_id,this.post.goods_id=this.details.goods_id,this.post.coupons_id=this.details.coupons_id,this.post.number=this.person.number*this.details.goods_price,this.post.order_status="已支付",this.post.consignee_name=this.person.real_name,this.post.consignee_phone=this.person.tel,this.post.consignee_address=this.person.address,this.post.deliver_type="线下厂商配送",this.post.order_time=(new Date).getTime(),this.post.deliver_time=void 0,e("log",this.post," at pages/orderDetails/orderDetails.vue:133");var t=getApp();uni.request({url:s.baseURL+"/orders",method:"POST",data:this.post,header:{Authorization:"Bearer "+t.globalData.Authorization},dataType:"json",sslVerify:!1,success:function(t){e("log",t," at pages/orderDetails/orderDetails.vue:146"),uni.showToast({icon:"none",title:t.data.message}),setTimeout((function(){uni.navigateTo({url:"../mall/mall"})}),1e3)},fail:function(e){uni.showToast({icon:"none",title:"订单信息发送失败，请重试！"})}})}else this.person.star<this.details.star?uni.showToast({icon:"none",title:"用户星级不足"}):this.person.beans<this.person.number*this.details.goods_price?uni.showToast({icon:"none",title:"用户鲜豆不足"}):uni.showToast({icon:"none",title:"请检查收货信息是否正确"})},change:function(){this.showPop=!0},closeModal:function(){this.showPop=!1}}};t.default=o}).call(this,i("0de9")["log"])},"567c":function(e,t,i){"use strict";(function(e){function i(){getApp();var t={username:"admin",password:"admin123"},i={appId:"ZYSC_YB",secert:"123456"};uni.request({url:"http://yibinmall.chenglee.top:8080/get_token",method:"POST",data:t,dataType:"json",sslVerify:!1,success:function(t){var a=getApp();a.globalData.Authorization=t.data;var s={idCard:a.globalData.idCard,token:a.globalData.token};uni.request({url:"http://yibinmall.chenglee.top/province/data/getToken",method:"POST",data:i,header:{Authorization:"Bearer "+a.globalData.Authorization},dataType:"json",sslVerify:!1,success:function(t){a.globalData.token=t.data.data,uni.request({url:"http://yibinmall.chenglee.top/province/user/info",method:"POST",data:s,dataType:"json",sslVerify:!1,success:function(t){e("log",t," at publicAPI/updataPersonMsg.js:45"),a.globalData.UserInfo={id:t.data.data.id,real_name:t.data.data.realname,card_num:t.data.data.cardNum,card_type:t.data.data.cardType,ICBC_card_num:a.globalData.UserInfo.ICBC_card_num,avatar:t.data.data.avatar,mobile:t.data.data.mobile,beans:t.data.data.score,star:t.data.data.certificate}},fail:function(e){uni.hideLoading(),uni.showToast({icon:"none",title:"鲜豆更新错误"})}})},fail:function(e){uni.showToast({icon:"none",title:"获取token失败，请重试！"})}})},fail:function(e){uni.showToast({icon:"none",title:"获取token失败，请重试！"})}})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i;t.default=a}).call(this,i("0de9")["log"])},a261:function(e,t,i){var a=i("f7f7");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var s=i("4f06").default;s("24675974",a,!0,{sourceMap:!1,shadowMode:!1})},cf1f:function(e,t,i){"use strict";i.r(t);var a=i("4b5a"),s=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=s.a},f7f7:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".main[data-v-01147090]{height:100vh;background-color:#f5f5f5}.item[data-v-01147090]{height:70vh;display:flex;flex-direction:column;justify-content:space-between}.head[data-v-01147090]{height:18vh;padding:5vw;background-color:#fff}.container[data-v-01147090]{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:space-between;height:30vw}.goodImg[data-v-01147090]{height:20vw;width:20vw;display:inline;border-radius:5%}.goodText[data-v-01147090]{width:60vw;display:flex;flex-direction:column;justify-content:space-between}.goodDetail[data-v-01147090]{width:60vw;height:13vw;overflow:hidden;font-weight:700;font-size:10px}.goodPrice[data-v-01147090]{width:60vw;height:12vw;font-size:10px}.deliveryWay[data-v-01147090]{font-size:10px;display:flex;flex-direction:row;justify-content:space-between}.body[data-v-01147090]{font-size:10px;padding:5vw;background-color:#fff}.option[data-v-01147090]{margin:1vh 0;display:flex;flex-direction:row;justify-content:space-between}.foot[data-v-01147090]{font-size:10px;padding:5vw;background-color:#fff}.bean[data-v-01147090]{display:flex;flex-direction:row;justify-content:space-between}.star[data-v-01147090]{margin:1vh 0;display:flex;flex-direction:row;justify-content:space-between}.flashTime[data-v-01147090]{margin:1vh 0;display:flex;flex-direction:row;justify-content:space-between}.sum[data-v-01147090]{margin:1vh 0;display:flex;flex-direction:row-reverse}.pay[data-v-01147090]{width:100vw;height:4vh;padding:5vw;position:fixed;bottom:0;background-color:#fff;display:flex;flex-direction:row;justify-content:space-between}.btn[data-v-01147090]{width:28vw;height:3vh;margin-right:10vw;background-color:red;color:#fff;line-height:3vh;text-align:center;border-radius:12px}\n\n/* 弹窗 */.modal[data-v-01147090]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;width:70vw;border:1px #c3c3c3 solid;padding:1vh 3vw}.inputItem[data-v-01147090]{display:flex;flex-direction:row;font-size:12px;margin:2vh 0;vertical-align:sub}.input[data-v-01147090]{margin-left:3vw;border-bottom:1px #c3c3c3 solid}",""]),e.exports=t}}]);