<template>
	<view class="container">
		<view class="top">
			<text class="top-font">临时停车</text>
			<text class="top-font">请多关照</text>
		</view>
		<view class="card">
			<view class="card-base">
				<view class="base-name">浙</view>
				<view class="base-code">C</view>
			</view>
			<view class="dot">·</view>
			<block v-for="card in cards">
				<view class="base-card">{{card}}</view>
			</block>
		</view>
		<view class="desc">我的爱车如果阻碍了您的车辆通过，您可以点击下方按钮通知我，给您带来的不便请谅解</view>
		<view class="message-container">
			<view class="message-top" @click="showMessage()">
				<image class="message-icon" :src="car"></image>
				<text>短信通知</text>
			</view>
			<view class="message-content" :animation="messageAnimationData">
				<text class="desc">请选择以下内容发送短信</text>
				<view class="message-bottom">请帮忙挪下车</view>
				<view class="message-two">
					<view class="message-two-botton">玻璃或车门没关好</view>
					<view class="message-two-botton">轮胎漏气</view>
				</view>
				<view class="message-two">
					<view class="message-two-botton">大灯或室内灯还亮着</view>
					<view class="message-two-botton">被警察蜀黍贴罚单了</view>
				</view>
				<view class="message-bottom">其他状况（请自己填写）</view>
			</view>
		</view>
		<view class="phone-container" :animation="buttonAnimationData">
			<image class="phone-icon" :src="car"></image>
			<text class="phone-text">电话通知</text>
		</view>
		<view class="code-container" :animation="buttonAnimationData">
			我要我的挪车码
		</view>
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
	</view>
</template>

<script>
	import car from 'static/img/car.png'
	import broken from 'static/img/broken.png'
	import bind from 'static/img/icon/bind.png'
	import {getCalllMsg, bindPhone, bindUser} from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	
	export default {
		data() {
			return {
				car,
				broken,
				bind,
				cards: '898HB',
				id: null,
				card: '免打扰中',
				type: 1,
				needBindUser: false,
				messageIsShow: false,
				messageAnimation:{},
				messageAnimationData: {},
				buttonAnimation: {},
				buttonAnimationData: {},
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
			getCalllMsg(res){
				request(getCalllMsg,{
					id : this.id,
					type: this.type
				},(res) => {
					// 450表示未绑定
					if(res.code == 450){
						this.needBindUser = true
					}else if(res.code == 200){
						this.card = res.result.prefix + res.result.card
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
					uni.makePhoneCall({
						phoneNumber: res.result //仅为示例
					});
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
			showMessage(){
				if(this.messageIsShow){
					this.messageAnimationData = this.messageAnimation.height(0).opacity(0).step().export()
					this.buttonAnimationData = this.buttonAnimation.top(0).step().export()
				}else{
					this.messageAnimationData = this.messageAnimation.height('350rpx').opacity(1).step().export()
					this.buttonAnimationData = this.buttonAnimation.top('380rpx').step().export()
				}
				this.messageIsShow = !this.messageIsShow
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
		padding: 0 100rpx
		flex-direction: column
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
