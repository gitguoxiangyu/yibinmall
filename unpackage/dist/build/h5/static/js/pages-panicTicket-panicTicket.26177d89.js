(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-panicTicket-panicTicket"],{"0442":function(e,i,o){"use strict";o.r(i);var a=o("a78c"),t=o("e591");for(var s in t)"default"!==s&&function(e){o.d(i,e,(function(){return t[e]}))}(s);o("39bb");var n,d=o("f0c5"),l=Object(d["a"])(t["default"],a["b"],a["c"],!1,null,"460d6e28",null,!1,a["a"],n);i["default"]=l.exports},"1aaf":function(e,i,o){"use strict";(function(e){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o={data:function(){return{details:{}}},onLoad:function(i){this.details=JSON.parse(decodeURIComponent(i.details)),e("log",this.details," at pages/panicTicket/panicTicket.vue:96")},methods:{buy:function(){if(this.details.remainBeginSeconds>0)uni.showToast({icon:"none",title:"抢购时间未到，请耐心等待"});else if(this.details.remainEndSeconds<0)uni.showToast({icon:"none",title:"抢购时间已过"});else if(0==getApp().globalData.hasUserInfo)uni.showToast({icon:"none",title:"用户未登录"}),setTimeout((function(){uni.navigateTo({url:"../login/login"})}),1e3);else{var e=encodeURIComponent(JSON.stringify(this.details));uni.navigateTo({url:"../panicTicketOrder/panicTicketOrder?details="+e})}}}};i.default=o}).call(this,o("0de9")["log"])},"39bb":function(e,i,o){"use strict";var a=o("d462"),t=o.n(a);t.a},a78c:function(e,i,o){"use strict";var a;o.d(i,"b",(function(){return t})),o.d(i,"c",(function(){return s})),o.d(i,"a",(function(){return a}));var t=function(){var e=this,i=e.$createElement,o=e._self._c||i;return o("v-uni-view",{staticClass:"body"},[o("v-uni-view",{staticClass:"goods"},[o("v-uni-view",{staticClass:"goodsPic"},[o("v-uni-image",{staticClass:"goodsImg",attrs:{src:"http://yibinmall.chenglee.top:8080"+e.details.coupons.main_picture}})],1),o("v-uni-view",{staticClass:"goodsInfo"},[o("v-uni-view",{staticClass:"goodsDes"},[o("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.details.coupons.star>0,expression:"details.coupons.star > 0"}],staticClass:"goodsStar"},[e._v(e._s(e.details.coupons.star)+"星")]),o("v-uni-view",{staticClass:"goodsTxt"},[e._v(e._s(e.details.coupons.coupon_name))])],1),o("v-uni-view",{staticClass:"goodsSale"},[o("v-uni-view",{staticStyle:{color:"#000000"}},[e._v("共青价：")]),e._v("鲜豆  "+e._s(e.details.panicBuyingCoupons.panic_buying_price))],1),o("v-uni-view",{staticClass:"goodsSaleInfo"},[e._v("市场价：￥"+e._s(e.details.coupons.market_price))]),o("v-uni-view",{staticClass:"goodsSaleInfo"},[e._v("抢购开始时间："),o("v-uni-view",{staticStyle:{color:"red"}},[e._v(e._s(e.details.panicBuyingCoupons.panic_buying_start_time))])],1),o("v-uni-view",{staticClass:"goodsSaleInfo"},[e._v("抢购截止时间："),o("v-uni-view",{staticStyle:{color:"red"}},[e._v(e._s(e.details.panicBuyingCoupons.panic_buying_end_time))])],1)],1)],1),o("v-uni-view",{staticClass:"goodsDetails"},[o("v-uni-view",{staticClass:"nav"},[e._v("—— 商品详情 ——")]),o("v-uni-view",{staticClass:"details"},[o("v-uni-view",{staticClass:"useTime"},[o("v-uni-view",{staticClass:"left"},[e._v("使用时间")]),o("v-uni-view",{staticClass:"right"},[e._v(e._s(e.details.coupons.available_time))])],1),o("v-uni-view",{staticClass:"address"},[o("v-uni-view",{staticClass:"left"},[e._v("使用地址")]),o("v-uni-view",{staticClass:"right"},[e._v(e._s(e.details.coupons.place_of_use))])],1),o("v-uni-view",{staticClass:"attention"},[o("v-uni-view",{staticClass:"left"},[e._v("注意事项")]),o("v-uni-view",{staticClass:"right"},[o("v-uni-view",{staticClass:"first"},[e._v(e._s(e.details.coupons.notice))])],1)],1)],1)],1),o("v-uni-view",{staticClass:"footer"},[o("v-uni-view",{staticClass:"goodsSale"},[o("v-uni-view",{staticStyle:{color:"#000000"}},[e._v("共青价：")]),e._v("鲜豆  "+e._s(e.details.panicBuyingCoupons.panic_buying_price))],1),o("v-uni-button",{attrs:{type:"default"},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.buy.apply(void 0,arguments)}}},[e._v("立即兑换")])],1)],1)},s=[]},d462:function(e,i,o){var a=o("e3a6");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var t=o("4f06").default;t("70ba36b5",a,!0,{sourceMap:!1,shadowMode:!1})},e3a6:function(e,i,o){var a=o("24fb");i=a(!1),i.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-460d6e28]{background-color:#f5f5f5}uni-page-body uni-image[data-v-460d6e28]{image-rendering:pixelated}uni-page-body .body[data-v-460d6e28]{width:100vw;height:100vh}uni-page-body .body .goods[data-v-460d6e28]{width:100vw;background-color:#fff}uni-page-body .body .goods .goodsPic[data-v-460d6e28]{height:46vh;position:relative}uni-page-body .body .goods .goodsPic .goodsImg[data-v-460d6e28]{width:100%;height:100%}uni-page-body .body .goods .goodsInfo[data-v-460d6e28]{padding-left:.5vw;padding-top:.5vh}uni-page-body .body .goods .goodsInfo .goodsDes[data-v-460d6e28]{position:relative;white-space:normal;text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}uni-page-body .body .goods .goodsInfo .goodsDes .goodsStar[data-v-460d6e28]{display:inline-block;padding:1px 4px;margin-left:3px;margin-right:6px;-webkit-transform:translateY(-2px);transform:translateY(-2px);vertical-align:middle;text-align:center;background-color:red;border-radius:5px;font-size:10px;color:#fff}uni-page-body .body .goods .goodsInfo .goodsDes .goodsTxt[data-v-460d6e28]{white-space:normal;font-weight:700;display:inline}uni-page-body .body .goods .goodsInfo .goodsSaleInfo[data-v-460d6e28]{margin-top:1vh;display:flex;font-size:14px;color:#999}uni-page-body .body .goods .goodsInfo .goodsSale[data-v-460d6e28]{margin-top:1vh;height:3vh;display:flex;align-items:flex-end;color:red;font-size:14px}uni-page-body .body .goods .goodsInfo .goodsSale .saleBean[data-v-460d6e28], uni-page-body .body .goods .goodsInfo .goodsSale .salePrice[data-v-460d6e28]{font-size:22px}uni-page-body .body .goodsDetails .nav[data-v-460d6e28]{height:4vh;line-height:4vh;text-align:center;font-size:10px;color:#ccc}uni-page-body .body .goodsDetails .details[data-v-460d6e28]{height:30vh;background-color:#fff;padding-top:1.5vh}uni-page-body .body .goodsDetails .details .useTime[data-v-460d6e28], uni-page-body .body .goodsDetails .details .address[data-v-460d6e28], uni-page-body .body .goodsDetails .details .attention[data-v-460d6e28]{display:flex;justify-content:space-between;margin-top:1.5vh;font-size:14px}uni-page-body .body .goodsDetails .details .useTime .left[data-v-460d6e28], uni-page-body .body .goodsDetails .details .address .left[data-v-460d6e28], uni-page-body .body .goodsDetails .details .attention .left[data-v-460d6e28]{width:20vw;margin-left:3vw}uni-page-body .body .goodsDetails .details .useTime .right[data-v-460d6e28], uni-page-body .body .goodsDetails .details .address .right[data-v-460d6e28], uni-page-body .body .goodsDetails .details .attention .right[data-v-460d6e28]{margin-right:3vw}uni-page-body .body .goodsDetails .details .attention .right uni-view[data-v-460d6e28]{margin-bottom:2vh;color:red}uni-page-body .body .footer[data-v-460d6e28]{width:100vw;height:6vh;position:fixed;bottom:0;background-color:#fff;display:flex;align-items:center;flex-direction:row}uni-page-body .body .footer .goodsSale[data-v-460d6e28]{margin-left:4vw;height:3vh;display:flex;align-items:flex-end;color:red}uni-page-body .body .footer .goodsSale .saleBean[data-v-460d6e28], uni-page-body .body .footer .goodsSale .salePrice[data-v-460d6e28]{font-size:22px}uni-page-body .body .footer uni-button[data-v-460d6e28]{margin-left:30vw;width:28vw;height:3vh;background-color:red;color:#fff;line-height:3vh;text-align:center;border-radius:12px}body.?%PAGE?%[data-v-460d6e28]{background-color:#f5f5f5}',""]),e.exports=i},e591:function(e,i,o){"use strict";o.r(i);var a=o("1aaf"),t=o.n(a);for(var s in a)"default"!==s&&function(e){o.d(i,e,(function(){return a[e]}))}(s);i["default"]=t.a}}]);