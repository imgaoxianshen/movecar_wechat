(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/addCard/addCard"],{"48e9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("d7ac"),s=n("c243"),i=c(n("985f"));function c(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{showBack:!1,placeChoosed:"浙",card:"",phone:"",avatar:i.default,yanzhengStart:!1,yanzhengTime:0,yanzhengCode:null,code:0,cardFocus:!1,Timer:null,placeList:["京","津","沪","渝","冀","吉","辽","黑","湘","鄂","甘","晋","陕","豫","川","云","桂","蒙","贵","青","藏","新","宁","粤","琼","闽","苏","浙","赣","鲁","皖"]}},onLoad:function(){},methods:{cancleBack:function(){this.showBack=!1},showsBack:function(){this.showBack=!0},chooseItem:function(t){this.placeChoosed=t,this.showBack=!1},inputCard:function(t){this.card=t.detail.value.toUpperCase()},inputPhone:function(t){this.phone=t.detail.value},inputYanzhengCode:function(t){this.yanzhengCode=t.detail.value},changCardToUpper:function(){this.card=this.card.toUpperCase()},changForce:function(){this.cardFocus=!0},cardUnFocus:function(){this.cardFocus=!1},getCode:function(){var t=this;if(!this.yanzhengStart){if(!this.phone)return void(0,s.showToast)("您还未输入手机号");(0,s.request)(a.getYanZhengCode,{phone:this.phone},function(e){200==e.code&&(t.yanzhengStart=!0,t.yanzhengTime=30,t.Timer=setInterval(t.timeGone,1e3),t.code=e.result)})}},timeGone:function(){this.yanzhengTime-=1,0==this.yanzhengTime&&(this.yanzhengStart=!1,clearInterval(this.Timer))},confirm:function(){this.placeChoosed?this.phone?this.card?this.yanzhengCode?this.code==this.yanzhengCode?(0,s.request)(a.addCarCard,{card:this.card,phone:this.phone,prefix:this.placeChoosed},function(e){200==e.code&&((0,s.showToast)("添加成功","success"),t.navigateBack({delta:1}))}):(0,s.showToast)("验证码有误，您可以稍后重新获取验证码"):(0,s.showToast)("您还未输入验证码"):(0,s.showToast)("您还未输入车牌号"):(0,s.showToast)("您还未输入手机号"):(0,s.showToast)("您还未选择车牌前缀")}}};e.default=o}).call(this,n("543d")["default"])},"6e0c":function(t,e,n){"use strict";n.r(e);var a=n("48e9"),s=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=s.a},7288:function(t,e,n){"use strict";n("f823");var a=i(n("b0ce")),s=i(n("8385"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(s.default))},8385:function(t,e,n){"use strict";n.r(e);var a=n("929b"),s=n("6e0c");for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);n("a381");var c=n("2877"),o=Object(c["a"])(s["default"],a["a"],a["b"],!1,null,"0ac82d38",null);e["default"]=o.exports},"929b":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"addCard-container"},[t._m(0),n("view",{staticClass:"center"},[n("text",{staticClass:"tips"},[t._v("请输入车牌号")]),n("text",{staticClass:"desc"},[t._v("请输入车牌号后六位，如果是新能源牌照，请点击最后新能源输入框后再输入。")]),n("input",{staticClass:"input_control",attrs:{type:"text",focus:t.cardFocus,maxlength:"6",eventid:"f2d75e48-0"},on:{blur:t.cardUnFocus,input:t.inputCard}}),n("view",{staticClass:"input-msg",attrs:{eventid:"f2d75e48-1"},on:{click:function(e){t.changForce()}}},[n("view",{staticClass:"input"},[n("view",{staticClass:"input-name"},[t._v("浙")]),n("view",{staticClass:"input-char"},[t._v(t._s(t.card[0]))])]),n("view",{staticClass:"dot"},[t._v("·")]),t._l([1,2,3,4,5],function(e,a){return n("block",{attrs:{"wx:key":"key"}},[n("view",{staticClass:"input-one"},[t._v(t._s(t.card[e]))])])}),n("view",{staticClass:"input-one-list"},[n("image",{staticClass:"input-icon",attrs:{src:t.avatar}}),n("text",{staticClass:"new-text"},[t._v("新能源")])])],2),n("view",{staticClass:"get-code"},[n("input",{attrs:{placeholder:"请输入手机号","placeholder-style":"text-align: center",type:"number",eventid:"f2d75e48-2"},on:{input:t.inputPhone}}),n("view",{staticClass:"get-button",attrs:{eventid:"f2d75e48-3"},on:{click:t.getCode}},[t._v("获取验证码"+t._s(t.yanzhengStart?"("+t.yanzhengTime+")":""))])]),n("input",{staticClass:"yanzheng",attrs:{"placeholder-style":"text-align: center",placeholder:"请输入验证码",type:"number",eventid:"f2d75e48-4"},on:{input:t.inputYanzhengCode}}),n("botton",{staticClass:"confirm",attrs:{eventid:"f2d75e48-5",mpcomid:"f2d75e48-0"},on:{click:t.confirm}},[t._v("确定")])],1)])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"background"},[n("view",{staticClass:"title"},[t._v("登记车辆信息")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return s})},a381:function(t,e,n){"use strict";var a=n("bd96"),s=n.n(a);s.a},bd96:function(t,e,n){}},[["7288","common/runtime","common/vendor"]]]);