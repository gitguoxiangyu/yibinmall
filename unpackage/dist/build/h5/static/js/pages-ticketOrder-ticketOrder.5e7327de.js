(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ticketOrder-ticketOrder"],{3612:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-view",{staticClass:"head"},[i("v-uni-view",{staticClass:"container"},[i("img",{staticClass:"goodImg",attrs:{src:"http://yibinmall.chenglee.top:8080"+t.details.main_picture,alt:"商品图片"}}),i("v-uni-view",{staticClass:"goodText"},[i("v-uni-view",{staticClass:"goodDetail"},[t._v(t._s(t.details.coupon_name))]),i("v-uni-view",{staticClass:"goodPrice"},[t._v("共青价："),i("span",{staticStyle:{color:"red","font-weight":"bold"}},[t._v("鲜豆"+t._s(t.details.coupon_price))])])],1)],1)],1),i("v-uni-view",{staticClass:"body",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"option"},[i("v-uni-view",[t._v("收货人")]),i("v-uni-view",[t._v(t._s(t.person.real_name))])],1),i("v-uni-view",{staticClass:"option"},[i("v-uni-view",[t._v("收货电话")]),i("v-uni-view",[t._v(t._s(t.person.tel))])],1),i("v-uni-view",{staticClass:"option"},[i("v-uni-view",[t._v("货物数量")]),i("v-uni-view",[t._v(t._s(t.person.number))])],1)],1),i("v-uni-view",{staticClass:"foot"},[i("v-uni-view",{staticClass:"bean"},[i("v-uni-view",[t._v("商品鲜豆")]),i("v-uni-view",[t._v(t._s(t.details.coupon_price))])],1),i("v-uni-view",{staticClass:"star"},[i("v-uni-view",[t._v("会员星级")]),i("v-uni-view",[t._v(t._s(t.details.star)+"星")])],1),i("v-uni-view",{staticClass:"flashTime"},[i("v-uni-view",[t._v("市场价")]),i("v-uni-view",[t._v(t._s(t.details.market_price)+"元")])],1),i("v-uni-view",{staticClass:"sum"},[i("span",{staticStyle:{color:"red","font-weight":"bold"}},[t._v("鲜豆"+t._s(t.person.number*t.details.coupon_price))]),t._v("合计：")])],1)],1),i("v-uni-view",{staticClass:"pay"},[i("v-uni-view",{staticStyle:{color:"red","font-weight":"bold"}},[t._v("鲜豆"+t._s(t.person.number*t.details.coupon_price))]),i("v-uni-view",{staticClass:"btn"},[i("v-uni-button",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.buy.apply(void 0,arguments)}}},[t._v("立即支付")])],1)],1),t.showPop?i("v-uni-view",{staticClass:"modal"},[i("v-uni-view",{staticClass:"inputItem"},[t._v("收货人"),i("v-uni-input",{staticClass:"input",attrs:{type:"text",name:"name",placeholder:"请输入收货人姓名","placeholder-style":"font-size:26rpx;color:grey;"},model:{value:t.person.real_name,callback:function(e){t.$set(t.person,"real_name",e)},expression:"person.real_name"}})],1),i("v-uni-view",{staticClass:"inputItem"},[t._v("收货电话"),i("v-uni-input",{staticClass:"input",attrs:{type:"text",name:"phone",placeholder:"请输入收货电话","placeholder-style":"font-size:26rpx;color:grey;"},model:{value:t.person.tel,callback:function(e){t.$set(t.person,"tel",e)},expression:"person.tel"}})],1),i("v-uni-view",{staticClass:"inputItem"},[t._v("货物数量"),i("v-uni-input",{staticClass:"input",attrs:{type:"text",name:"phone",placeholder:"请输入货物数量","placeholder-style":"font-size:26rpx;color:grey;"},model:{value:t.person.number,callback:function(e){t.$set(t.person,"number",e)},expression:"person.number"}})],1),i("v-uni-button",{staticClass:"login",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeModal()}}},[t._v("确定")])],1):t._e()],1)},o=[]},"567c":function(t,e,i){"use strict";(function(t){function i(){getApp();var e={username:"admin",password:"admin123"},i={appId:"ZYSC_YB",secert:"123456"};uni.request({url:"http://yibinmall.chenglee.top:8080/get_token",method:"POST",data:e,dataType:"json",sslVerify:!1,success:function(e){var a=getApp();a.globalData.Authorization=e.data;var n={idCard:a.globalData.idCard,token:a.globalData.token};uni.request({url:"http://yibinmall.chenglee.top/province/data/getToken",method:"POST",data:i,header:{Authorization:"Bearer "+a.globalData.Authorization},dataType:"json",sslVerify:!1,success:function(e){a.globalData.token=e.data.data,uni.request({url:"http://yibinmall.chenglee.top/province/user/info",method:"POST",data:n,dataType:"json",sslVerify:!1,success:function(e){t("log",e," at publicAPI/updataPersonMsg.js:45"),a.globalData.UserInfo={id:e.data.data.id,real_name:e.data.data.realname,card_num:e.data.data.cardNum,card_type:e.data.data.cardType,ICBC_card_num:a.globalData.UserInfo.ICBC_card_num,avatar:e.data.data.avatar,mobile:e.data.data.mobile,beans:e.data.data.score,star:e.data.data.certificate}},fail:function(t){uni.hideLoading(),uni.showToast({icon:"none",title:"鲜豆更新错误"})}})},fail:function(t){uni.showToast({icon:"none",title:"获取token失败，请重试！"})}})},fail:function(t){uni.showToast({icon:"none",title:"获取token失败，请重试！"})}})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i;e.default=a}).call(this,i("0de9")["log"])},acfa:function(t,e,i){var a=i("eac3");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("37e4378b",a,!0,{sourceMap:!1,shadowMode:!1})},b68b:function(t,e,i){"use strict";var a=i("acfa"),n=i.n(a);n.a},cca8:function(t,e,i){"use strict";i.r(e);var a=i("3612"),n=i("e083");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("b68b");var s,d=i("f0c5"),r=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,"d7667d94",null,!1,a["a"],s);e["default"]=r.exports},e083:function(t,e,i){"use strict";i.r(e);var a=i("e476"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},e476:function(t,e,i){"use strict";(function(t){var a=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("567c")),o={data:function(){return{showPop:!1,details:{},person:getApp().globalData.UserInfo,post:{order_user_id:void 0,store_id:void 0,goods_id:void 0,coupons_id:void 0,number:void 0,order_status:void 0,consignee_name:void 0,consignee_phone:void 0,consignee_address:void 0,deliver_type:void 0,order_time:void 0,deliver_time:void 0}}},computed:{},onLoad:function(e){e.details&&(this.details=JSON.parse(decodeURIComponent(e.details)),t("log",this.details," at pages/ticketOrder/ticketOrder.vue:100")),this.person.number=1,t("log",getApp().globalData.UserInfo," at pages/ticketOrder/ticketOrder.vue:103")},methods:{buy:function(){var e=this;if(this.person.real_name&&this.person.tel&&this.person.star>=this.details.star&&this.person.beans>=this.person.number*this.details.coupon_price){this.post.order_user_id=this.person.id,this.post.store_id=this.details.store_id,this.post.goods_id=this.details.goods_id,this.post.coupons_id=this.details.coupon_id,this.post.number=this.person.number,this.post.order_status="已支付",this.post.consignee_name=this.person.real_name,this.post.consignee_phone=this.person.tel,this.post.consignee_address=null,this.post.deliver_type=null,this.post.order_time=(new Date).getTime(),this.post.deliver_time=void 0,t("log",this.post," at pages/ticketOrder/ticketOrder.vue:122");getApp();var i={username:"admin",password:"admin123"};uni.request({url:"http://yibinmall.chenglee.top:8080/get_token",method:"POST",data:i,dataType:"json",sslVerify:!1,success:function(i){var a=getApp();a.globalData.Authorization=i.data,uni.request({url:"http://yibinmall.chenglee.top:8080/orders",method:"POST",data:e.post,header:{Authorization:"Bearer "+a.globalData.Authorization},dataType:"json",sslVerify:!1,success:function(e){t("log",e," at pages/ticketOrder/ticketOrder.vue:149"),uni.showToast({icon:"none",title:e.data.message}),(0,n.default)(),setTimeout((function(){uni.navigateTo({url:"../mall/mall"})}),1e3)},fail:function(t){uni.showToast({icon:"none",title:"订单信息发送失败，请重试！"})}})},fail:function(t){uni.showToast({icon:"none",title:"获取token失败，请重试！"})}})}else this.person.star<this.details.star?uni.showToast({icon:"none",title:"用户星级不足"}):this.person.beans<this.person.number*this.details.coupon_price?uni.showToast({icon:"none",title:"用户鲜豆不足"}):uni.showToast({icon:"none",title:"请检查收货信息是否正确"})},change:function(){this.showPop=!0},closeModal:function(){this.showPop=!1}}};e.default=o}).call(this,i("0de9")["log"])},eac3:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".main[data-v-d7667d94]{height:100vh;background-color:#f5f5f5}.item[data-v-d7667d94]{height:70vh;display:flex;flex-direction:column;justify-content:space-between}.head[data-v-d7667d94]{height:18vh;padding:5vw;background-color:#fff}.container[data-v-d7667d94]{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:space-between;height:30vw}.goodImg[data-v-d7667d94]{height:20vw;width:20vw;display:inline;border-radius:5%}.goodText[data-v-d7667d94]{width:60vw;display:flex;flex-direction:column;justify-content:space-between}.goodDetail[data-v-d7667d94]{width:60vw;height:13vw;overflow:hidden;font-weight:700;font-size:10px}.goodPrice[data-v-d7667d94]{width:60vw;height:12vw;font-size:10px}.deliveryWay[data-v-d7667d94]{font-size:10px;display:flex;flex-direction:row;justify-content:space-between}.body[data-v-d7667d94]{font-size:10px;padding:5vw;background-color:#fff}.option[data-v-d7667d94]{margin:1vh 0;display:flex;flex-direction:row;justify-content:space-between}\n\n/* .tel{\n\tmargin: 1vh 0;\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n}\n.address{\n\tmargin: 1vh 0;\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n} */.foot[data-v-d7667d94]{font-size:10px;padding:5vw;background-color:#fff}.bean[data-v-d7667d94]{display:flex;flex-direction:row;justify-content:space-between}.star[data-v-d7667d94]{margin:1vh 0;display:flex;flex-direction:row;justify-content:space-between}.flashTime[data-v-d7667d94]{margin:1vh 0;display:flex;flex-direction:row;justify-content:space-between}.sum[data-v-d7667d94]{margin:1vh 0;display:flex;flex-direction:row-reverse}.pay[data-v-d7667d94]{width:100vw;height:4vh;padding:5vw;position:fixed;bottom:0;background-color:#fff;display:flex;flex-direction:row;justify-content:space-between}.btn[data-v-d7667d94]{width:28vw;height:3vh;margin-right:10vw;background-color:red;color:#fff;line-height:3vh;text-align:center;border-radius:12px}\n\n/* 弹窗 */.modal[data-v-d7667d94]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;width:70vw;border:1px #c3c3c3 solid;padding:1vh 3vw}.inputItem[data-v-d7667d94]{display:flex;flex-direction:row;font-size:12px;margin:2vh 0;vertical-align:sub}.input[data-v-d7667d94]{margin-left:3vw;border-bottom:1px #c3c3c3 solid}",""]),t.exports=e}}]);