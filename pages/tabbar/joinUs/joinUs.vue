<template>
		<view class="joinsus-container">
			<view class="background">
				<view class="title">一起来吧</view>
			</view>
			<view class="center">
				<view class="top">不管你是谁，什么文化，什么背景，什么地域，什么星座，一起来吧！</view>
				<view class="ps">PS:为企业定制专属功能</view>
				<input class="input" type="text" @input="inputName" :value="name" placeholder="您的称呼">
				<input class="input" type="number" @input="inputPhone" :value="phone" placeholder="联系电话">
				<input class="input" type="text" @input="inputAdd" :value="address" placeholder="所在地区">
				<input class="input" type="text" @input="inputMsg" :value="msg" placeholder="留言内容"> 
				<button class="submit" @click="submitData">提交</button>
			</view>
		</view>
</template>

<script>
	import {addJoin} from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	export default {
		data() {
			return {
				name: '',
				phone: '',
				address: '',
				msg: '',
			};
		},
		methods: {
			inputName(e){
				this.name = e.detail.value
			},
			inputPhone(e){
				this.phone = e.detail.value
			},
			inputAdd(e){
				this.address = e.detail.value
			},
			inputMsg(e){
				this.msg = e.detail.value
			},
			submitData(){
				if(!this.name){
					showToast('请先输入名称')
					return
				}
				if(!this.phone){
					showToast('请先输入手机号')
					return
				}
				if(!this.address){
					showToast('请先输入地址')
					return
				}
				if(!this.msg){
					showToast('请先输入留言内容')
					return
				}
				
				request(addJoin,{
					phone: this.phone,
					name: this.name,
					address: this.address,
					msg: this.msg
				},(res) => {
					if(res.code == 200){
						showToast('提交成功','success')
						this.name = ''
						this.address = ''
						this.msg = ''
						this.phone = ''
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import "~common/stylus/variable"
	.joinsus-container
		background-color: $base-color
		opacity: 0.8
		position:relative
		.background
			position: relative
			align-items: center
			height: 100vh
			overflow: hidden
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
				opacity: 1
				animation-duration: 10s 
			&:after 
				top: 180rpx
				border-radius: 44%
				opacity: 0.8
				animation-name: rotate1
				animation-duration: 10s
			.title
				width: 750rpx
				margin-top: 50rpx
				letter-spacing: 10rpx
				font-size: 40rpx
				font-weight: 300
				text-align:center
		.center
			position: absolute
			top: 300rpx
			padding: 0 100rpx 100rpx 100rpx 
			display: flex
			flex-direction: column
			.top
				font-size: 26rpx
				text-indent:2em
				line-height: 40rpx
			.ps
				font-size: 28rpx
				margin-top: 40rpx
				margin-bottom: 40rpx
			.input
				margin: 20rpx 0 20rpx 0 
				border-radius: 10rpx
				border: 1px solid black
				padding: 5rpx 10rpx
				height: 50rpx
			.submit
				width: 100%
				height: 70rpx
				line-height: 70rpx
				margin-top: 20rpx
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
</style>
