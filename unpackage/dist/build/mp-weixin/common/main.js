(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0ff3":function(e,n,t){"use strict";t("f823");var o=i(t("f3d3")),u=i(t("3df9"));t("b895");var r=i(t("637c"));function i(e){return e&&e.__esModule?e:{default:e}}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){c(e,n,t[n])})}return e}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}o.default.config.productionTip=!1,o.default.prototype.$store=r.default,u.default.mpType="app";var f=new o.default(a({store:r.default},u.default));f.$mount()},3230:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;t("d7ac"),t("c243"),t("ccaa");var o={onLaunch:function(n){"pages/tabbar/callPhone/callPhone"!=n.path&&e.getSetting({success:function(e){e.authSetting["scope.userInfo"]||wx.redirectTo({url:"/pages/tabbar/authorize/authorize"})}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};n.default=o}).call(this,t("543d")["default"])},"3df9":function(e,n,t){"use strict";t.r(n);var o=t("bdce");for(var u in o)"default"!==u&&function(e){t.d(n,e,function(){return o[e]})}(u);t("b079");var r,i,a=t("2877"),c=Object(a["a"])(o["default"],r,i,!1,null,null,null);n["default"]=c.exports},"637c":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(t("a34a")),u=i(t("f3d3")),r=i(t("2f62"));function i(e){return e&&e.__esModule?e:{default:e}}function a(e,n,t,o,u,r,i){try{var a=e[r](i),c=a.value}catch(f){return void t(f)}a.done?n(c):Promise.resolve(c).then(o,u)}function c(e){return function(){var n=this,t=arguments;return new Promise(function(o,u){var r=e.apply(n,t);function i(e){a(r,o,u,i,c,"next",e)}function c(e){a(r,o,u,i,c,"throw",e)}i(void 0)})}}u.default.use(r.default);var f=new r.default.Store({state:{hasLogin:!1,userInfo:{},loginProvider:"",openid:null},mutations:{getUserMessage:function(e,n){e.userInfo=n},loginOrLoginOut:function(e,n){e.hasLogin=n}},actions:{getUserOpenId:function(){var n=c(o.default.mark(function n(t){var u,r;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return u=t.commit,r=t.state,n.next=3,new Promise(function(n,t){r.openid?n(r.openid):e.login({success:function(e){u("login"),setTimeout(function(){var e="123456789";console.log("uni.request mock openid["+e+"]"),u("setOpenid",e),n(e)},1e3)},fail:function(e){console.log("uni.login 接口调用失败，将无法正常使用开放接口等服务",e),t(e)}})});case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}},n,this)}));function t(e){return n.apply(this,arguments)}return t}()}}),l=f;n.default=l}).call(this,t("543d")["default"])},8625:function(e,n,t){},b079:function(e,n,t){"use strict";var o=t("8625"),u=t.n(o);u.a},b895:function(e,n,t){},bdce:function(e,n,t){"use strict";t.r(n);var o=t("3230"),u=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);n["default"]=u.a}},[["0ff3","common/runtime","common/vendor"]]]);