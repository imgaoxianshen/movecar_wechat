<template>
	<view class="container">
		<!-- 车辆型号模块 -->
		<block v-if="showCarMsg">
			<view class="car-msg">
				<block v-bind:key="index" v-for="(item,index) in carList">
					<view class="car-title">{{index}}</view>
					<block v-bind:key="key" v-for="(val, key) in item">
						<view @click="changeSecondCar(val.id)" class="car-title-name">{{val.name}}</view>
					</block>
				</block>
			</view>
			<block v-if="showCarSecondMsg">
				<scroll-view scroll-y="true" class="car-second-msg">
					<block v-bind:key="index" v-for="(item, index) in carListSecond">
						<view class="car-second-title">{{item.name}}</view>
						<block v-if="item.list">
							<view @click="chooseCar(val.id, val.fullname)" v-bind:key="key" v-for="(val, key) in item.list">
								<view class="car-second-name">{{val.fullname}}</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</block>
		</block>
		<block v-else>
			<view class="background"></view>
			<view class="center">
				<text class="center-title">绑定信息</text>
				<text class="tips">请输入车牌号</text>
				<view class="input-msg">
					<view class="input" @click="showModel">
						{{bindPrefix}}
						<image class="input-arrow" src="/static/img/icon/arrow-down.png"></image>
					</view>
					<view class="card-msg">
						<input @input="setCard" :value="bindCard" maxlength='7'>
						<image class="card-light" :src="showLight"></image>
					</view>
				</view>
				<text class="card-notice">请输入车牌后六位，如果是新能源牌照，请输入后七位</text>
				
				<view class="card-name">
					<text class="name">车辆型号</text>
					<view class="card-xinghao" @click="changeShowCarMsg">
						<!-- <picker
						@columnchange="columnChange"
						@change="bindPickerChange"
						:range="multiArray"
						range-key="name"
						mode="multiSelector"
						>
						<view class="uni-input">{{xinghao}}</view>
						</picker> -->
						{{xinghao}}
					</view>
				</view>
				<view class="card-name">
					<text class="name">车主称呼</text>
					<input class="card-name-choose" maxlength='2' @input="inputFName" placeholder="先生"></input>
					<view class="name-choose-container">
						<view :class="leftSexStatus" @click="changeSex(1)">先生</view>
						<view :class="rightSexStatus" @click="changeSex(2)">女士</view>
					</view>
				</view>
				<view class="card-name">
					<text class="name">手机号码</text>
					<input class="card-name-choose" @input="inputPhone" type="number" placeholder="请输入手机号码"></input>
					<!-- <view class="name-choose-container">
						<button @getphonenumber="getPhoneNumber" open-type="getPhoneNumber" class="name-choose-all">一键获取</button>
					</view> -->
				</view>
				<view class="input-msg">
					<input class="yanzheng-input" @input="inputYanzhengCode" :focus="yzFocus" type="number" placeholder="请输入验证码"></input>
					<view class="yanzheng-code" @click="getCode">获取验证码{{yanzhengStart ? '(' + yanzhengTime + ')' : ''}}</view>
				</view>
				<block v-if="needPay">
					<view class="bind-card-deep" @click="bindCardAndPayMoney">5元 激活挪车服务</view>
				</block>
				<block v-else>
					<view class="bind-card" @click="bindCardConfirm">绑定挪车码</view>
				</block>
			</view>
			<view class="bottom">
				<view class="tips-item">
					<image class="notice-img" src="/static/img/icon/protect.png"></image>
					<text class="notice-msg">郑重承诺</text>
				</view>
				<view class="notice-text">
					帮忙族遵守法律法规，不将用户资料作为他用
				</view>
			</view>
			<block v-if="showBack">
				<view class="back" @click="cancleBack"></view>
				<view class="display">
					<view class="add-car">添加车牌</view>
					<view class="place-container">
						<block :key="index" v-for="(item,index) in placeList">
							<view class="car-place" @click="chooseItem(item)">{{item}}</view>
						</block>
					</view>
				</view>
			</block>
		</block>
		
	</view>
</template>

<script>
	import { bindCardAndPay ,isNeedPay, getCarListSecond, getCarList, getYanZhengCode, addCarCard, addCarCardAndBindUser } from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	
	export default {
		data() {
			return {
				yanzhengStart: false,
				yanzhengTime: 0,
				yanzhengCode: null,
				code: 0,
				showBack: false,//遮罩层
				showCarMsg: false,
				showCarSecondMsg: false, 
				cards: '',
				prefix: '',
				bindPrefix: '浙', //绑定的时候的前缀
				bindCard: '',
				phone: '',
				fName: '',
				Timer: null,//定时器
				address_code: '',
				id: null,
				type: 1,
				needBindUser: true,
				messageIsShow: false,
				choosedSex: 1,//1->男 2->女
				placeList:["京", "津", "沪","渝","冀","吉","辽", "黑","湘","鄂","甘","晋","陕","豫","川", "云", "桂","蒙","贵", "青","藏","新", "宁", "粤","琼","闽","苏","浙","赣","鲁", "皖"],
				yzFocus: false,
				carList: [],
				carListSecond: [],
				xinghao: '选填',
				car_id: 0,
				needPay: false, //是否需要支付激活费用
			};
		},
		onLoad(query){
			this.type = query.type
			this.id = query.id
			// if(this.id){
			// 	request(isNeedPay, {card_id: this.id}, (res) => {
			// 		let needPay = res.result
			// 		if(needPay == 1){
			// 			this.needPay = true
			// 		}else{
			// 			this.needPay = false
			// 		}
			// 	})
			// }
		},
		onShow(){
			this.getCarList()
		},
		computed:{
			showLight(){
				return this.bindCard.length == 7 ? '/static/img/icon/light.png' : '/static/img/icon/unlight.png'
			},
			leftSexStatus(){
				return this.choosedSex == 1 ? 'name-choose-left' : 'name-choose-right'
			},
			rightSexStatus(){
				return this.choosedSex == 2 ? 'name-choose-left' : 'name-choose-right'
			}
		},
		methods: {
			changeSex(sex){
				this.choosedSex = sex
			},
			showModel(){
				this.showBack = true
			},
			cancleBack(){
				this.showBack = false
			},
			chooseItem(item){
				this.bindPrefix = item
				this.showBack = false
			},
			setCard(e){
				var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
				if(patrn.exec(e.detail.value)){ 
					showToast('车牌号中不应该包含中文')
				}
				this.bindCard = e.detail.value.toUpperCase()
			},
			getPhoneNumber(e) {  
                console.log(e)
            },  
			getCode(){
				if(!this.yanzhengStart){
					if(!this.phone){
						showToast('您还未输入手机号')
						return
					}
					request(getYanZhengCode,{
						phone: this.phone
					},(res) => {
						if(res.code == 200){
							this.yanzhengStart = true
							this.yanzhengTime = 30
							this.Timer = setInterval(this.timeGone , 1000)
							this.code = res.result
							this.yzFocus = true
						}
					})
				}
			},
			getCarList(){
				request(getCarList,{},(res) => {
					if(res.code == 200){
						this.carList = res.result
					}
				})
			},
			changeSecondCar(parentid){
				request(getCarListSecond,{
					parentid
				},(res) => {
					if(res.code == 200){
						this.carListSecond = res.result
						this.showCarSecondMsg = true
					}
				})
			},
			timeGone(){
				this.yanzhengTime -= 1
				if(this.yanzhengTime == 0){
					this.yanzhengStart = false
					clearInterval(this.Timer)
				}
			},
			inputPhone(e){
				this.phone = e.detail.value
			},
			inputFName(e){
				this.fName = e.detail.value
			},
			inputYanzhengCode(e){
				this.yanzhengCode = e.detail.value
			},
			bindCardAndPayMoney(){
				if(!this.bindPrefix){
					showToast('您还未选择车牌前缀')
					return
				}
				if(!this.bindCard){
					showToast('您还未填写车牌')
					return
				}
				var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
				if(patrn.exec(this.bindCard)){ 
					showToast('车牌号中不应该包含中文')
					return
				}
				if(!this.phone){
					showToast('您还未输入手机号')
					return
				}
				if(!this.yanzhengCode){
					showToast('您还未填写验证码')
					return
				}
				if(!this.fName){
					showToast('您还填写车主称呼')
					return
				}
				if(this.yanzhengCode != this.code){
					showToast('验证码错误！')
					return
				}
				this.bindCardAndPay()
			},
			bindCardConfirm(){
				if(!this.bindPrefix){
					showToast('您还未选择车牌前缀')
					return
				}
				if(!this.bindCard){
					showToast('您还未填写车牌')
					return
				}
				var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
				if(patrn.exec(this.bindCard)){ 
					showToast('车牌号中不应该包含中文')
					return
				}
				if(!this.phone){
					showToast('您还未输入手机号')
					return
				}
				if(!this.yanzhengCode){
					showToast('您还未填写验证码')
					return
				}
				if(!this.fName){
					showToast('您还填写车主称呼')
					return
				}
				if(this.yanzhengCode != this.code){
					showToast('验证码错误！')
					return
				}
				if(this.type == 2){
					this.addCarCardAndBind()
				}else{
					this.addCard()
				}
			},
			bindCardAndPay(){
				request(bindCardAndPay,{
					card: this.bindCard,
					phone: this.phone,
					prefix: this.bindPrefix,
					fName: this.fName,
					sex: this.choosedSex,
					card_id: this.id,
					car_id: this.car_id
				},(res) =>{
					if(res.code == 200){
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.result.timeStamp,
							nonceStr: res.result.nonceStr,
							package: res.result.package,
							signType: res.result.signType,
							paySign: res.result.paySign,
							success: function (res) {
								showToast('支付成功！')
								setTimeout(function(){
									uni.switchTab({
										url: '../tabbar-1/tabbar-1?showCoupon=1'
									})	
								}, 1000)
							},
							fail: function (err) {
								showToast('您未支付，无法激活')
							}
						})
					}
				})
			},
			addCarCardAndBind(){
				request(addCarCardAndBindUser,{
					card: this.bindCard,
					phone: this.phone,
					prefix: this.bindPrefix,
					fName: this.fName,
					sex: this.choosedSex,
					card_id: this.id,
					car_id: this.car_id
				},(res) =>{
					if(res.code == 200){
						showToast('绑定成功','success')
						//跳转到成功界面
						uni.switchTab({
							url: '../tabbar-1/tabbar-1?showCoupon=1'
						});	
					}else if(res.code == 900){
						// 自己已经绑定，需要处理
						uni.showModal({
							title: '提示',
							content: '您已经绑定了挪车码，如果还要继续绑定此挪车码需要先去个人中心取消绑定，是否前去个人中心',
							success: function (res) {
								if (res.confirm) {
									uni.switchTab({
										url: '../tabbar-5/tabbar-5'
									});	
								} else if (res.cancel) {
									
								}
							}
						});
					}
				})
			},
			addCard(){
				request(addCarCard,{
					card: this.bindCard,
					phone: this.phone,
					prefix: this.bindPrefix,
					fName: this.fName,
					sex: this.choosedSex,
					car_id: this.car_id
				},(res) => {
					if(res.code == 200){
						showToast('添加成功','success')
						uni.navigateBack({
							delta: 1
						});
					}
				})
			},
			chooseCar(id, name){
				this.car_id = id
				this.xinghao = name
				this.showCarMsg = false
			},
			changeShowCarMsg(){
				this.showCarMsg = true
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.container
		opacity: 0.8
		display: flex
		flex-direction: column
		.car-msg
			width: 750rpx
			background-color: white
			.car-title
				font-size: 30rpx
				padding: 10rpx 25rpx
				height: 60rpx
				line-height: 60rpx
				background-color: rgb(239,239,239)
			.car-title-name
				font-size: 30rpx
				background-color: white
				padding: 10rpx 25rpx
				border-top: 1px solid #d1d1d1
		.car-second-msg
			width: 400rpx
			height: 100vh
			background-color: white
			border-left: 1px solid #d1d1d1
			position: fixed
			right: 0
			.car-second-title
				font-size: 30rpx
				padding: 10rpx 25rpx
				height: 60rpx
				line-height: 60rpx
				background-color: white
			.car-second-name
				font-size: 30rpx
				background-color: rgb(239,239,239)
				padding: 10rpx 25rpx
				border-top: 1px solid #d1d1d1
		.bottom
			display: flex
			justify-content: center
			align-items: center
			flex-direction: column
			.notice-text
				font-size: 30rpx
				font-weight: 300
			.tips-item
				display: flex
				align-items: center
				justify-content: center
				.notice-img
					width: 40rpx
					height: 40rpx
				.notice-msg
					margin-left: 10rpx
					font-weight: 900
		.back
			position: fixed
			height: 100%
			width: 100%
			background-color:black
			z-index: 999
			opacity: .7
		.display
			display: flex
			position: fixed
			bottom: 0
			flex-direction: column
			background-color: white
			z-index: 1000
			.add-car
				width: 100%
				padding: 20rpx
				text-align: center
				border-bottom: 1px solid #d1d1d1
			.place-container
				display: flex
				flex-wrap: wrap
				justify-content: left
				.car-place
					border-radius: 10rpx
					box-shadow: 1rpx 3rpx 1rpx #d1d1d1
					padding: 15rpx
					margin: 5rpx
					background-color: $base-color
		.center
			background-color: white
			z-index: 999
			padding: 80rpx
			box-shadow: -10rpx -10rpx 10rpx #f1f1f1
			margin: 80rpx auto 20rpx auto
			width: 550rpx
			border-radius: 30rpx
			display: flex
			flex-direction: column
			.center-title
				font-size: 50rpx
				font-weight: 900
				text-align: center
				margin-bottom: 30rpx
			.tips
				font-size: 30rpx
			.input-msg
				display: flex
				margin-top: 20rpx
				.yanzheng-input
					width: 90%
					border: 1px solid black
					border-radius: 10rpx
					height: 40rpx
					line-height: 40rpx
					padding: 10rpx
					font-size: 30rpx
				.yanzheng-code
					width: 400rpx
					font-size: 30rpx
					padding: 20rpx
					height: 30rpx
					line-height: 30rpx
					border-radius: 10rpx
					background-color: black
					color: white
					text-align: center
					margin-left: 20rpx
				.input
					display: flex
					align-items: center
					justify-content: center
					padding: 20rpx
					height: 30rpx
					line-height: 30rpx
					border-radius: 10rpx
					color: white
					background-color:black
					.input-arrow
						width: 40rpx
						height: 60rpx
				.card-msg
					display: flex
					align-items: center
					margin-left: 20rpx
					width: 100%
					padding: 20rpx
					font-size: 30rpx
					height: 30rpx
					min-height: 30rpx
					line-height: 30rpx
					border: 1px solid black
					border-radius: 10rpx
					.card-light
						width: 40rpx
						height: 40rpx
			.bind-card
				padding: 20rpx 20rpx
				font-size: 35rpx
				text-align: center
				margin-top: 60rpx
				border-radius: 60rpx
				background-color: $base-color
			.bind-card-deep
				padding: 20rpx 20rpx
				font-size: 40rpx
				font-weight: 800
				text-align: center
				margin-top: 60rpx
				border-radius: 60rpx
				background-color: $base-color
			.card-notice
				font-size: 20rpx
				margin: 20rpx 0 10rpx 0
			.card-name
				position: relative
				display: flex
				border: 1px solid black
				margin-top: 20rpx
				height: 40rpx
				align-items: center
				border-radius: 10rpx
				padding: 15rpx
				.name
					font-size: 30rpx
				.card-name-choose
					color: black
					font-size: 30rpx
					margin-left: 20rpx
				.card-xinghao
					width: 300rpx
					height: 40rpx
					color: grey
					margin-left: 20rpx
					font-size: 30rpx
				.name-choose-container
					display: flex
					position: absolute
					right: 10rpx
					font-size: 30rpx
					border-radius: 30rpx
					border: 1px solid black
					overflow: hidden
					z-index: 999
					button
						line-height: normal
						font-size: 30rpx
					button::after 
						border: none
					.name-choose-left
						background-color: black
						color: white
						padding: 0 10rpx
						width: 50%
					.name-choose-right
						background-color:white
						padding: 0 10rpx
						width: 50%
						color: black
					.name-choose-all
						background-color: black
						color: white
						padding: 0 10rpx
				.getPhone
					display: flex
					position: absolute
					right: 10rpx
					font-size: 30rpx
					height: 40rpx
					line-height: 40rpx
					color: white
					border-radius: 30rpx
					z-index:500
					border: 1px solid black
					padding: 0 20rpx
					background-color: black
		.background
			position: fixed
			height: 300rpx
			top: 0
			width: 750rpx
			background: linear-gradient(to right, rgb(255,214, 23) , rgb(250, 255, 136))
		.padding
			padding: 0 100rpx
			.top
				width: 100%
				display: flex
				justify-content: space-around
				margin-top: 50rpx
				.top-font
					font-size: 50rpx
					font-weight: 300
			.card
				margin-top: 60rpx
				display: flex
				align-items: center
				justify-content: center
				.card-base
					display: flex
					background-color: $little-color
					padding: 5rpx 10rpx
					border: 1px solid $border-color 
					border-radius: 10rpx
					font-size: 50rpx
					.base-name, .base-code
						text-align: center
						width: 60rpx
					.base-name
						border-right: 1px solid #d1d1d1
				.dot
					width: 40rpx
					text-align: center
					font-size: 50rpx
					font-weight: 500
				.base-card
					width: 60rpx
					padding: 5rpx
					background-color: $little-color
					text-align: center
					border: 1px solid $border-color
					border-radius: 10rpx
					margin: 5rpx
					font-size: 50rpx
			.desc
				font-size: 20rpx
				margin-top: 50rpx
				font-weight: 300
			.message-container
				position: relative
				margin-top: 50rpx
				display: flex
				flex-direction: column
				align-items: center
				.message-top
					display: flex
					align-items: center
					justify-content: center
					border: 1px solid $border-color
					border-radius: 80rpx
					padding: 10rpx 40rpx
					background-color: white
					z-index: 999
					.message-icon
						width: 35rpx
						height: 35rpx
						margin-right: 20rpx
				.message-content
					height: 0
					opacity: 0
					position: absolute
					background-color: white
					top: 35rpx
					display: flex
					flex-direction: column
					align-items: center
					width: 600rpx
					padding: 20rpx 0
					border-radius: 10rpx
					border: 1px solid $border-color
					.message-bottom
						margin-top: 15rpx
						width: 550rpx
						padding: 5rpx 0
						text-align: center
						border-radius: 10rpx
						color: $botton-red
						font-size: 30rpx
						border: 1px solid $botton-red
					.message-two
						display: flex
						align-items: center
						justify-content: space-around
						width: 600rpx
						height: 100rpx
						.message-two-botton
							font-size: 25rpx
							width: 250rpx
							text-align: center
							padding: 5rpx 0
							border-radius: 10rpx
							border: 1px solid #d1d1d1
			.phone-container
				position: relative
				height: 80rpx
				line-height: 80rpx
				background-color: $botton-red
				margin-top: 40rpx
				display: flex
				align-items: center
				justify-content: center
				border-radius: 40rpx
				.phone-icon
					width: 35rpx
					height: 35rpx
					margin-right: 20rpx
				.phone-text
					color: white
					font-weight: 300
			.code-container
				position: relative
				background-color: $botton-black
				height: 80rpx
				font-weight: 300
				line-height: 80rpx
				border-radius: 40rpx
				margin-top: 30rpx
				font-size: 35rpx
				text-align: center
				color:white
</style>
