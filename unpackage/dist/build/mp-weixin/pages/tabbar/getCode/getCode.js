(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/getCode/getCode"],{"115c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("3d9b"),o=n("5d7f"),c=s(n("1dcd")),i=s(n("6aad")),u=s(n("c564")),r=s(n("3c16"));function s(t){return t&&t.__esModule?t:{default:t}}var l={data:function(){return{qrcode:c.default,save:i.default,circle:u.default,wechat:r.default,imgUrl:""}},onLoad:function(){var t=this;(0,a.request)(o.getWechatCode,{},function(e){t.imgUrl="data:image/png;base64,"+e.result})},onShareAppMessage:function(){return{title:"多少堵车事，历历不能忘。",path:"pages/tabbar/tabbar-1/tabbar-1",imageUrl:"../../../static/img/icon/share.jpg"}},methods:{applyCode:function(){t.navigateTo({url:"../sendCard/sendCard"})},saveCode:function(){var e=this;t.showModal({title:"提示",content:"是否将该小程序码保存到您的手机相册",success:function(t){if(t.confirm){var n=wx.getFileSystemManager();n.writeFile({filePath:wx.env.USER_DATA_PATH+"/test.png",data:e.imgUrl.slice(22),encoding:"base64",success:function(t){wx.saveImageToPhotosAlbum({filePath:wx.env.USER_DATA_PATH+"/test.png",success:function(t){wx.showToast({title:"保存成功"})},fail:function(t){wx.showModal({title:t.errMsg})}}),console.log(t)},fail:function(t){console.log(t)}})}}})}}};e.default=l}).call(this,n("543d")["default"])},"70e7":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},7123:function(t,e,n){"use strict";var a=n("ab35"),o=n.n(a);o.a},8691:function(t,e,n){"use strict";n.r(e);var a=n("115c"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=o.a},a365:function(t,e,n){"use strict";n.r(e);var a=n("70e7"),o=n("8691");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("7123");var i=n("2877"),u=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"1a6cc30d",null);e["default"]=u.exports},ab35:function(t,e,n){}},[["4237","common/runtime","common/vendor"]]]);