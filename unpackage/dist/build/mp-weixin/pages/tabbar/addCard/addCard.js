(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/addCard/addCard"],{"48e9":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("d7ac"),s=a("c243"),i=c(a("985f"));function c(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{showBack:!1,placeChoosed:"浙",card:"",phone:"",avatar:i.default,yanzhengStart:!1,yanzhengTime:0,yanzhengCode:null,code:0,cardFocus:!1,Timer:null,placeList:["京","津","沪","渝","冀","吉","辽","黑","湘","鄂","甘","晋","陕","豫","川","云","桂","蒙","贵","青","藏","新","宁","粤","琼","闽","苏","浙","赣","鲁","皖"]}},onLoad:function(){},methods:{cancleBack:function(){this.showBack=!1},showsBack:function(){this.showBack=!0},chooseItem:function(t){this.placeChoosed=t,this.showBack=!1},inputCard:function(t){this.card=t.detail.value.toUpperCase()},inputPhone:function(t){this.phone=t.detail.value},inputYanzhengCode:function(t){this.yanzhengCode=t.detail.value},changCardToUpper:function(){this.card=this.card.toUpperCase()},changForce:function(){this.cardFocus=!0},cardUnFocus:function(){this.cardFocus=!1},getCode:function(){var t=this;if(!this.yanzhengStart){if(!this.phone)return void(0,s.showToast)("您还未输入手机号");(0,s.request)(n.getYanZhengCode,{phone:this.phone},function(e){200==e.code&&(t.yanzhengStart=!0,t.yanzhengTime=30,t.Timer=setInterval(t.timeGone,1e3),t.code=e.result)})}},showModel:function(){this.showBack=!0},timeGone:function(){this.yanzhengTime-=1,0==this.yanzhengTime&&(this.yanzhengStart=!1,clearInterval(this.Timer))},confirm:function(){this.placeChoosed?this.phone?this.card?this.yanzhengCode?this.code==this.yanzhengCode?(0,s.request)(n.addCarCard,{card:this.card,phone:this.phone,prefix:this.placeChoosed},function(e){200==e.code&&((0,s.showToast)("添加成功","success"),t.navigateBack({delta:1}))}):(0,s.showToast)("验证码有误，您可以稍后重新获取验证码"):(0,s.showToast)("您还未输入验证码"):(0,s.showToast)("您还未输入车牌号"):(0,s.showToast)("您还未输入手机号"):(0,s.showToast)("您还未选择车牌前缀")}}};e.default=o}).call(this,a("543d")["default"])},"6e0c":function(t,e,a){"use strict";a.r(e);var n=a("48e9"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=s.a},7288:function(t,e,a){"use strict";a("f823");var n=i(a("b0ce")),s=i(a("8385"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(s.default))},8385:function(t,e,a){"use strict";a.r(e);var n=a("9b18"),s=a("6e0c");for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);a("d8c4");var c=a("2877"),o=Object(c["a"])(s["default"],n["a"],n["b"],!1,null,"caab28ea",null);e["default"]=o.exports},"9b18":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"addCard-container"},[t._m(0),a("view",{staticClass:"center"},[a("text",{staticClass:"tips"},[t._v("请输入车牌号")]),a("text",{staticClass:"desc"},[t._v("请输入车牌号后六位，如果是新能源牌照，请点击最后新能源输入框后再输入。")]),a("input",{staticClass:"input_control",attrs:{type:"text",focus:t.cardFocus,maxlength:"7",eventid:"f2d75e48-0"},on:{blur:t.cardUnFocus,input:t.inputCard}}),a("view",{staticClass:"input-msg",attrs:{eventid:"f2d75e48-2"},on:{click:function(e){t.changForce()}}},[a("view",{staticClass:"input"},[a("view",{staticClass:"input-name",attrs:{eventid:"f2d75e48-1"},on:{click:function(e){e.stopPropagation(),t.showModel(e)}}},[t._v(t._s(t.placeChoosed))]),a("view",{staticClass:"input-char"},[t._v(t._s(t.card[0]))])]),a("view",{staticClass:"dot"},[t._v("·")]),t._l([1,2,3,4,5],function(e,n){return a("block",{key:e},[a("view",{staticClass:"input-one"},[t._v(t._s(t.card[e]))])])}),t.card[6]?a("block",[a("view",{staticClass:"input-one"},[t._v(t._s(t.card[6]))])]):a("block",[a("view",{staticClass:"input-one-list"},[a("image",{staticClass:"input-icon",attrs:{src:t.avatar}}),a("text",{staticClass:"new-text"},[t._v("新能源")])])])],2),a("view",{staticClass:"get-code"},[a("input",{attrs:{placeholder:"请输入手机号","placeholder-style":"text-align: center",type:"number",eventid:"f2d75e48-3"},on:{input:t.inputPhone}}),a("view",{staticClass:"get-button",attrs:{eventid:"f2d75e48-4"},on:{click:t.getCode}},[t._v("获取验证码"+t._s(t.yanzhengStart?"("+t.yanzhengTime+")":""))])]),a("input",{staticClass:"yanzheng",attrs:{"placeholder-style":"text-align: center",placeholder:"请输入验证码",type:"number",eventid:"f2d75e48-5"},on:{input:t.inputYanzhengCode}}),a("botton",{staticClass:"confirm",attrs:{eventid:"f2d75e48-6",mpcomid:"f2d75e48-0"},on:{click:t.confirm}},[t._v("确定")])],1),t.showBack?a("block",[a("view",{staticClass:"back",attrs:{eventid:"f2d75e48-7"},on:{click:t.cancleBack}}),a("view",{staticClass:"display"},[a("view",{staticClass:"add-car"},[t._v("添加车牌")]),a("view",{staticClass:"place-container"},t._l(t.placeList,function(e,n){return a("block",{key:n},[a("view",{staticClass:"car-place",attrs:{eventid:"f2d75e48-8-"+n},on:{click:function(a){t.chooseItem(e)}}},[t._v(t._s(e))])])}))])]):t._e()],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"background"},[a("view",{staticClass:"title"},[t._v("登记车辆信息")])])}];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},b608:function(t,e,a){},d8c4:function(t,e,a){"use strict";var n=a("b608"),s=a.n(n);s.a}},[["7288","common/runtime","common/vendor"]]]);