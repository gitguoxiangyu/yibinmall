(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ticketHistory-ticketHistory"],{"0ecd":function(e,t,i){"use strict";i.r(t);var a=i("76f0"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},"2bfd":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.baseURL=void 0;var a="http://yibinmall.chenglee.top:81/prod-api/mall";t.baseURL=a},"377d":function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"page"},[i("v-uni-view",{staticClass:"nav"},e._l(e.navArr,(function(t,a){return i("v-uni-view",{key:a,staticClass:"navItem",class:{navItemActive:e.navActiveIndex===a},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onNavItemClicked(a)}}},[e._v(e._s(t.name))])})),1),i("v-uni-view",{staticClass:"content"},[e._l(e.displayTicket,(function(t,a){return i("v-uni-view",{key:a,staticClass:"item"},[i("img",{staticClass:"itemPic",attrs:{height:"100",src:t.coupons.main_picture,alt:""}}),i("v-uni-view",{staticClass:"itemInfo"},[i("v-uni-view",{staticClass:"itemDescription"},[t.star>0?i("v-uni-view",{staticClass:"itemStar"},[e._v(e._s(t.coupons.star)+"星")]):e._e(),i("v-uni-view",{staticClass:"itemTitle"},[e._v(e._s(t.coupons.coupon_name))])],1),i("v-uni-view",{staticClass:"itemPriceWrapper"},[i("v-uni-view",{staticClass:"itemPriceText1"},[e._v("鲜豆")]),i("v-uni-view",{staticClass:"itemBean itemPriceText2"},[e._v(e._s(t.coupons.coupon_price))])],1),i("v-uni-view",{staticClass:"itemDateWrapper"},[i("v-uni-view",{staticClass:"itemDate"},[e._v("截止日期: "+e._s(t.coupons.exchange_deadline.split(" ")[0]))]),i("v-uni-button",{staticClass:"exchangeButton",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.onExchangeClicked(t.coupons,t.exchange.coupons_item_id)}}},[e._v("兑换纸质券")])],1)],1)],1)})),e._l(e.displayItems,(function(t,a){return i("v-uni-view",{key:t.id,staticClass:"item"},[i("img",{staticClass:"itemPic",attrs:{height:"100",src:t.goods.goods_main_picture,alt:""}}),i("v-uni-view",{staticClass:"itemInfo"},[i("v-uni-view",{staticClass:"itemDescription"},[t.star>0?i("v-uni-view",{staticClass:"itemStar"},[e._v(e._s(t.goods.star)+"星")]):e._e(),i("v-uni-view",{staticClass:"itemTitle"},[e._v(e._s(t.goods.goods_name))])],1),i("v-uni-view",{staticClass:"itemPriceWrapper"},[i("v-uni-view",{staticClass:"itemPriceText1"},[e._v("鲜豆")]),i("v-uni-view",{staticClass:"itemBean itemPriceText2"},[e._v(e._s(t.goods.goods_price))])],1),i("v-uni-view",{staticClass:"itemDateWrapper"},[i("v-uni-view",{staticClass:"buyingDate"},[e._v("下单时间:"),i("br"),e._v(e._s(t.goods.update_time))]),i("v-uni-view",{staticClass:"buttonContainer"},[i("v-uni-button",{staticClass:"goodsButton",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.toEvaluate(t)}}},[e._v("我要评价")]),i("v-uni-button",{staticClass:"goodsButton",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.toShowingOrder(t)}}},[e._v("查看订单")])],1)],1)],1)],1)}))],2),e.showPop?i("v-uni-view",{staticClass:"modal"},[i("v-uni-view",{staticClass:"uni-textarea"},[i("v-uni-textarea",{attrs:{"placeholder-style":"color:#999999",placeholder:"请输入详细描述,不超过50字",maxlength:"50",name:"advice"}})],1),i("v-uni-button",{staticClass:"login",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.closeModal()}}},[e._v("确定")])],1):e._e()],1)},o=[]},"76f0":function(e,t,i){"use strict";(function(e){i("a4d3"),i("e01a"),i("4160"),i("d3b7"),i("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i("2bfd"),n={data:function(){return{navArr:[{name:"全部",count:0},{name:"已过期",count:0},{name:"未使用",count:0},{name:"已使用",count:0}],navActiveIndex:0,goods:[],ticket:[],displayTicket:[],displayItems:[],showPop:!1}},created:function(){var t=this,i=getApp();uni.request({url:a.baseURL+"/exchange/page?exchange_user_id="+i.globalData.UserInfo.id,method:"GET",header:{Authorization:"Bearer "+i.globalData.Authorization},dataType:"json",sslVerify:!1,success:function(i){e("log",i," at pages/ticketHistory/ticketHistory.vue:101");var a=i.data.object;a.forEach((function(e,i){null!=e.coupons?(e.coupons.date_use_begin=e.coupons.date_use_begin.substring(0,10)+" "+e.coupons.date_use_begin.substring(11,19),e.coupons.date_use_end=e.coupons.date_use_end.substring(0,10)+" "+e.coupons.date_use_end.substring(11,19),e.coupons.exchange_deadline=e.coupons.exchange_deadline.substring(0,10)+" "+e.coupons.exchange_deadline.substring(11,19),t.id=Symbol(),t.ticket.push(e),t.displayTicket.push(e)):null!=e.goods&&(e.goods.exchange_deadline=e.goods.exchange_deadline.substring(0,10)+" "+e.goods.exchange_deadline.substring(11,19),e.goods.update_time=e.goods.update_time.substring(0,10)+" "+e.goods.update_time.substring(11,19),t.id=Symbol(),t.goods.push(e),t.displayItems.push(e))})),e("log",t.ticket," at pages/ticketHistory/ticketHistory.vue:119"),e("log",t.goods," at pages/ticketHistory/ticketHistory.vue:120")},fail:function(e){uni.showToast({icon:"none",title:"获取商品信息失败，请重试！"})}})},onLoad:function(){},methods:{onNavItemClicked:function(t){if(this.navActiveIndex=t,0===t)this.displayTicket=this.ticket,this.displayItems=this.goods;else if(1===t){var i=[];this.ticket.forEach((function(e,t){"已过期"==e.exchange.exchange_status&&i.push(e)})),this.displayTicket=i,this.displayItems=null}else if(2===t){var a=[];this.ticket.forEach((function(e,t){"未使用"==e.exchange.exchange_status&&a.push(e)})),this.displayTicket=a,this.displayItems=null}else if(3===t){e("log","0000"," at pages/ticketHistory/ticketHistory.vue:162");var n=[];this.ticket.forEach((function(e,t){"已使用"==e.exchange.exchange_status&&n.push(e)})),this.displayTicket=n,this.displayItems=this.goods}},onExchangeClicked:function(e,t){e=JSON.parse(JSON.stringify(e)),e.coupons_item_id=t;var i=encodeURIComponent(JSON.stringify(e));uni.navigateTo({url:"../ticketExchange/ticketExchange?details="+i})},toShowingOrder:function(e){var t=encodeURIComponent(JSON.stringify(e));uni.navigateTo({url:"../showingOrder/showingOrder?details="+t})},toEvaluate:function(e){var t=encodeURIComponent(JSON.stringify(e));uni.navigateTo({url:"../evaluateDetails/evaluateDetails?details="+t})},change:function(){e("log","000"," at pages/ticketHistory/ticketHistory.vue:196"),this.showPop=!0},closeModal:function(){this.showPop=!1}}};t.default=n}).call(this,i("0de9")["log"])},9318:function(e,t,i){"use strict";i.r(t);var a=i("377d"),n=i("0ecd");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("f4cc");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"e3a834be",null,!1,a["a"],s);t["default"]=c.exports},"95dc":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-e3a834be]{background-color:#f5f5f5}.nav[data-v-e3a834be]{display:flex;justify-content:space-between;padding:20px 20px 26px;background-color:#fff;box-shadow:0 0 5px 0 #ccc;font-size:14px}.nav .navItem[data-v-e3a834be]{display:inline-block;position:relative}.nav .navItemActive[data-v-e3a834be]{font-weight:700}.nav .navItemActive[data-v-e3a834be]::after{content:" ";position:absolute;box-sizing:border-box;left:20%;bottom:-10px;height:2px;width:60%;border:solid 2px #f53a33;background-color:#f53a33;border-radius:20px}.item[data-v-e3a834be]{display:flex;margin:12px;padding:8px;border-radius:6px;background-color:#fff;font-size:13px}.item .itemPic[data-v-e3a834be]{border-radius:6px}.item .itemInfo[data-v-e3a834be]{padding:0 0 0 10px;position:relative}.item .itemInfo .itemDescription[data-v-e3a834be]{position:relative;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.item .itemInfo .itemDescription .itemStar[data-v-e3a834be]{display:inline;color:#fff;background-color:#f53a33;border-radius:5px;font-size:12px;padding:0 5px;margin-right:6px}.item .itemInfo .itemDescription .itemTitle[data-v-e3a834be]{display:inline}.item .itemInfo .itemPriceWrapper[data-v-e3a834be]{display:flex;align-items:flex-end;padding:4px 0}.item .itemInfo .itemPriceWrapper .itemPriceText1[data-v-e3a834be]{font-weight:700;color:#f53a33}.item .itemInfo .itemPriceWrapper .itemPriceText2[data-v-e3a834be]{font-weight:700;font-size:18px;padding:0 2px;color:#f53a33}.item .itemInfo .itemPriceWrapper .itemPrice[data-v-e3a834be]{display:flex;align-items:flex-end}.item .itemInfo .itemDateWrapper[data-v-e3a834be]{width:60vw;display:flex;align-items:baseline;justify-content:space-between}.item .itemInfo .itemDateWrapper .itemDate[data-v-e3a834be]{flex-grow:1;font-size:12px}.item .itemInfo .itemDateWrapper .buttonContainer[data-v-e3a834be]{width:18vw}.item .itemInfo .itemDateWrapper .buttonContainer .goodsButton[data-v-e3a834be]{height:24px;font-size:12px;display:inline-block;line-height:24px;color:#f53a33;border:solid 1px #f53a33;border-radius:20px;padding:0 8px;margin:2px 0;background-color:#fff}.item .itemInfo .itemDateWrapper .buttonContainer .goodsButton[data-v-e3a834be]::after{display:none}.item .itemInfo .itemDateWrapper .buyingDate[data-v-e3a834be]{flex-grow:1;font-size:12px;font-weight:700;color:#f53a33}.item .itemInfo .itemDateWrapper .exchangeButton[data-v-e3a834be]{height:24px;font-size:12px;display:inline-block;line-height:24px;color:#f53a33;border:solid 1px #f53a33;border-radius:20px;padding:0 8px;margin:2px 0;background-color:#fff}.item .itemInfo .itemDateWrapper .exchangeButton[data-v-e3a834be]::after{display:none}.item .itemInfo .itemDateWrapper .button-hover[data-v-e3a834be]{background-color:#f5f5f5}\r\n/* 弹窗 */.modal[data-v-e3a834be]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:grey;width:70vw;height:30vh;border:1px #c3c3c3 solid;padding:1vh 3vw}body.?%PAGE?%[data-v-e3a834be]{background-color:#f5f5f5}',""]),e.exports=t},bb08:function(e,t,i){var a=i("95dc");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("45967566",a,!0,{sourceMap:!1,shadowMode:!1})},f4cc:function(e,t,i){"use strict";var a=i("bb08"),n=i.n(a);n.a}}]);