<template>
	<view class="container">
		<block v-if="type == 2 && needBindUser">
			<view class="background">
				<view class="title">绑定信息</view>
			</view>
			<view class="center">
				<text class="tips">请输入车牌号</text>
				<view class="input-msg">
					<view class="input" @click="showModel">
						{{bindPrefix}}
						<image class="input-arrow" :src="arrowDown"></image>
					</view>
					<input class="card-msg" @input="setCard" :value="bindCard">
				</view>
				<text class="card-notice">请输入车牌后六位，如果是新能源牌照，请输入后七位</text>
				<!-- <view class="card-name">
					<text class="name">车主称呼</text>
					<text class="card-name-choose">先生</text>
					<view class="name-choose-container">
						<view class="name-choose-left">先生</view>
						<view class="name-choose-right">女士</view>
					</view>
				</view> -->
				<view class="card-name">
					<text class="name">手机号码</text>
					<input class="card-name-choose" @input="inputPhone" placeholder="请输入手机号码"></input>
					<!-- <button class="getPhone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键获取</button> -->
				</view>
				<view class="input-msg">
					<input class="yanzheng-input" @input="inputYanzhengCode" placeholder="请输入验证码"></input>
					<view class="yanzheng-code" @click="getCode">获取验证码{{yanzhengStart ? '(' + yanzhengTime + ')' : ''}}</view>
				</view>
				<view class="bind-card" @click="bindCardConfirm">绑定挪车码</view>
				<view class="bottom-tips">
					<view class="tips-item">
						<image class="notice-img" :src="protect"></image>
						<text class="notice-msg">保护隐私，匿名拨打电话信息无泄漏</text>
					</view>
					<view class="tips-item">
						<image class="notice-img" :src="list"></image>
						<text class="notice-msg">多管齐下，电话短信推送多通道送达</text>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="padding">
				<view class="top">
					<text class="top-font">临时停车</text>
					<text class="top-font">请多关照</text>
				</view>
				<view class="card">
					<view class="card-base">
						<view class="base-name">{{prefix}}</view>
						<view class="base-code">{{address_code}}</view>
					</view>
					<view class="dot">·</view>
					<block :key="key" v-for="(card,key) in cards">
						<view class="base-card">{{card}}</view>
					</block>
				</view>
				<view class="desc">我的爱车如果阻碍了您的车辆通过，您可以点击下方按钮通知我，给您带来的不便请谅解</view>
				<view class="message-container">
					<view class="message-top" @click="showMessage()">
						<image class="message-icon" :src="message"></image>
						<text>短信通知</text>
					</view>
					<view class="message-content" :animation="messageAnimationData">
						<text class="desc">请选择以下内容发送短信</text>
						<view class="message-bottom" @click="sendMoveCarMsg(1)">请帮忙挪下车</view>
						<view class="message-two">
							<view class="message-two-botton" @click="sendMoveCarMsg(2)">玻璃或车门没关好</view>
							<view class="message-two-botton" @click="sendMoveCarMsg(3)">轮胎漏气</view>
						</view>
						<view class="message-two">
							<view class="message-two-botton" @click="sendMoveCarMsg(4)">大灯或室内灯还亮着</view>
							<view class="message-two-botton" @click="sendMoveCarMsg(5)">被警察蜀黍贴罚单了</view>
						</view>
						<!-- <view class="message-bottom">其他状况（请自己填写）</view> -->
					</view>
				</view>
				<view class="phone-container"  @click="bindPhone()" :animation="buttonAnimationData">
					<image class="phone-icon" :src="call"></image>
					<text class="phone-text">电话通知</text>
				</view>
				<view class="code-container" @click="getCard" :animation="buttonAnimationData">
					我要我的挪车码
				</view>
			</view>
		</block>
	<!-- 	<block v-if="type == 2 && needBindUser">
			<image class="car-icon" :src="bind"></image>
			<view class="bind-container">
				<text class="white">tips:</text>
				<text class="white">绑定到当前微信账号后，您还需要进入"帮挪车"微信小程序中去管理您的车牌信息以及手机号信息，以便其他用户扫码通知您挪车</text>
			</view>
			<button @click="bindUser()">绑定到当前微信账号</button>
		</block>
		<block v-else>
			<block v-if="id">
				<image class="car-icon" :src="car"></image>
				<text class="car-text">扫码挪车</text>
				<view class="car-card">{{card}}</view>
				<button class="call" @click="bindPhone()">拨打电话</button>
				<text clss="notice">双方都将显示临时虚拟号码，保护隐私！</text>
				<text>安全至上，隐私挪车</text>
			</block>
			<block v-else>
				<image class="car-icon" :src="broken"></image>
				<text class="car-text">啊哦......</text>
				<text>亲，要扫码才能使用哦</text>
			</block>
		</block> -->
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
	</view>
</template>

<script>
	import car from 'static/img/car.png'
	import broken from 'static/img/broken.png'
	import call from 'static/img/icon/call.png'
	import message from 'static/img/icon/message.png'
	import bind from 'static/img/icon/bind.png'
	import arrowDown from 'static/img/icon/arrow-down.png'
	import protect from 'static/img/icon/protect.png'
	import list from 'static/img/icon/list.png'
	import {getCalllMsg, bindPhone, bindUser, sendMoveCarCode, getYanZhengCode, addCarCardAndBindUser } from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	
	export default {
		data() {
			return {
				car,
				broken,
				bind,
				call,
				message,
				arrowDown,
				protect,
				list,
				yanzhengStart: false,
				yanzhengTime: 0,
				yanzhengCode: null,
				code: 0,
				showBack: false,//遮罩层
				cards: '',
				prefix: '',
				bindPrefix: '浙', //绑定的时候的前缀
				bindCard: '',
				phone: '',
				Timer: null,//定时器
				address_code: '',
				id: null,
				type: 1,
				needBindUser: true,
				messageIsShow: false,
				messageAnimation:{},
				messageAnimationData: {},
				buttonAnimation: {},
				buttonAnimationData: {},
				msgData: {
					1: '挡住了道路，请挪下车',
					2: '的玻璃或车门可能未关闭',
					3: '的轮胎可能漏气',
					4: '的大灯或室内灯可能开着',
					5: '可能被警察蜀黍贴罚单了'
				},
				placeList:[
					"京", 
					"津", 
					"沪",
					"渝",
					"冀",
					"吉",
					"辽", 
					"黑",
					"湘",
					"鄂",
					"甘",
					"晋",
					"陕",
					"豫",
					"川", 
					"云", 
					"桂",
					"蒙",
					"贵", 
					"青",
					"藏",
					"新", 
					"宁", 
					"粤",
					"琼",
					"闽", 
					"苏",
					"浙", 
					"赣",  
					"鲁",  
					"皖"]
			};
		},
		onLoad(query){
			const scene = decodeURIComponent(query.scene)
			let e = scene.split("/")
			// [0]=>类型 [1]=>值
			// 类型1=>非实体
			// 类型2=>实体
			this.type = e.type
			if(e[0] !='undefined'){
				this.id = e[0]
				this.type = e[1]
			}
			this.getCalllMsg()
		},
		onShow(){
			let messageAnimation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			
			let buttonAnimation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			

			this.messageAnimation = messageAnimation
			this.buttonAnimation = buttonAnimation

			this.messageAnimationData = messageAnimation.export()
			this.buttonAnimationData = buttonAnimation.export()
		},
		methods: {
			getCalllMsg(){
				request(getCalllMsg,{
					id : this.id,
					type: this.type
				},(res) => {
					// 450表示未绑定
					if(res.code == 450){
						this.needBindUser = true
					}else if(res.code == 200){
						this.needBindUser = false
						this.cards = res.result.card
						this.prefix = res.result.prefix
						this.address_code = res.result.address_code
					}else{
						showToast(res.msg)
					}
				})
			},
			sendMoveCarMsg(index){
				request(sendMoveCarCode,{
					id : this.id,
					type: this.type,
					msg: this.msgData[index]
				},(res) => {
					if(res.code == 200){
						showToast('短信发送成功')
					}else{
						showToast(res.msg)
					}
				})
			},
			bindPhone(){
				request(bindPhone,{
					id : this.id,
					type: this.type
				},(res) => {
					if(res.code == 200){
						uni.makePhoneCall({
							phoneNumber: res.result //仅为示例
						});
					}
				})
			},
			bindUser(){
				request(bindUser, {
					card_id: this.id 
				},(res) => {
					if(res.code == 200){
						showToast('绑定成功')
					}else{
						showToast(res.msg)
					}
				});
			},
			getCard(){
				uni.getSetting({
				    success: function(res){
						if (!res.authSetting['scope.userInfo']) {
							wx.redirectTo({
								url: '/pages/tabbar/authorize/authorize'
							})
						}else{
							wx.switchTab({
								url: '/pages/tabbar/tabbar-1/tabbar-1'
							})
						}
					}
				})	
			},
			showMessage(){
				if(this.messageIsShow){
					this.messageAnimationData = this.messageAnimation.height(0).opacity(0).step().export()
					this.buttonAnimationData = this.buttonAnimation.top(0).step().export()
				}else{
					this.messageAnimationData = this.messageAnimation.height('350rpx').opacity(1).step().export()
					this.buttonAnimationData = this.buttonAnimation.top('380rpx').step().export()
				}
				this.messageIsShow = !this.messageIsShow
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
				this.bindCard = e.detail.value.toUpperCase()
			},
			getPhoneNumber(e) {  
                
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
						}
					})
				}
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
			inputYanzhengCode(e){
				this.yanzhengCode = e.detail.value
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
				if(!this.phone){
					showToast('您还未输入手机号')
					return
				}
				if(!this.yanzhengCode){
					showToast('您还未填写验证码')
					return
				}
				if(this.yanzhengCode != this.code){
					showToast('验证码错误！')
					return
				}
				request(addCarCardAndBindUser,{
					card: this.bindCard,
					phone: this.phone,
					prefix: this.bindPrefix,
					card_id: this.id
				},(res) =>{
					if(res.code == 200){
						showToast('绑定成功','success')
						this.getCalllMsg()
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.container
		background-color: $base-color
		height: 100vh
		opacity: 0.8
		display: flex
		// padding: 0 100rpx
		flex-direction: column
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
			position: absolute
			top: 300rpx
			padding: 0 100rpx
			width: 550rpx
			display: flex
			flex-direction: column
			.tips
				font-size: 30rpx
			.input-msg
				display: flex
				margin-top: 60rpx
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
			.bind-card
				padding: 20rpx 20rpx
				font-size: 35rpx
				text-align: center
				margin-top: 60rpx
				border-radius: 60rpx
				background-color: $base-color
			.bottom-tips
				display: flex
				flex-direction: column
				justify-content: space-around
				align-items: center
				margin-top: 100rpx
				.tips-item
					display: flex
					margin: 10rpx 0
					align-items: center
					.notice-img
						width: 50rpx
						height: 50rpx
					.notice-msg
						font-size: 28rpx
			.card-notice
				font-size: 20rpx
				margin: 20rpx 0 10rpx 0
			.card-name
				position: relative
				display: flex
				border: 1px solid black
				margin-top: 20rpx
				height: 40rpx
				line-height: 40rpx
				border-radius: 10rpx
				padding: 15rpx
				.name
					font-size: 30rpx
				.card-name-choose
					color: #d1d1d1
					font-size: 30rpx
					margin-left: 20rpx
				.name-choose-container
					display: flex
					position: absolute
					right: 10rpx
					font-size: 30rpx
					border-radius: 30rpx
					border: 1px solid black
					overflow: hidden
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
			position: relative
			align-items: center
			height: 100vh
			overflow: hidden
			background-color: linear-gradient($deep-color, $base-color)
			&:before, &:after 
				content: ""
				position: absolute
				left: 50%
				min-width: 1500rpx
				min-height: 1500rpx
				background: white
				animation-iteration-count: infinite
				animation-timing-function: linear
			&:before 
				top: 220rpx
				animation-name: rotate2
				border-radius: 44%
				// opacity: .5
				animation-duration: 10s 
			&:after 
				top: 180rpx
				border-radius: 44%
				opacity: .8
				animation-name: rotate1
				animation-duration: 10s
			.title
				width: 750rpx
				margin-top: 50rpx
				letter-spacing: 10rpx
				font-size: 40rpx
				font-weight: 300
				text-align:center
		@keyframes rotate1 
			0%
				transform: translate(-50%, 1%) rotateZ(0deg)
			50%
				transform: translate(-50%, -2%) rotateZ(180deg)
			100%
				transform: translate(-50%, 1%) rotateZ(360deg)
		@keyframes rotate2
			0%
				transform: translate(-50%, 1%) rotateZ(0deg)
			25%
				transform: translate(-50%, 2%) rotateZ(0deg)
			50%
				transform: translate(-50%, -2%) rotateZ(180deg)
			75%
				transform: translate(-50%, 2%) rotateZ(360deg)
			100%
				transform: translate(-50%, 1%) rotateZ(360deg)
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
