<template>
	<view>
		<view class="background">
			<view class="code-container">
				<text class="code-my">我的挪车码</text>
				<text class="code-zhu">注:此二维码仅作为体验使用</text>
				<image class="code-img" :src="imgUrl"></image>
				<view class="line">
					<view class="left-circle"></view>
					<view class="right-circle"></view>
				</view>
				<view class="button" @click="applyCode">申请邮寄</view>
				<text class="text-desc">点击申请邮寄，您将收到一副精美的挪车码</text>
			</view>
			<view class="code-operation">
				<button class="operation-item" hover-class="none" open-type="share">
					<image class="item-img" :src="wechat"></image>
					<text class="item-text">分享到微信</text>
				</button>
				<!-- <button class="operation-item" hover-class="none">
					<image class="item-img" :src="circle"></image>
					<text class="item-text">分享到朋友圈</text>
				</button> -->
				<button @click="saveCode" class="operation-item" hover-class="none">
					<image class="item-img" :src="save"></image>
					<text class="item-text">保存到手机</text>
				</button>
			</view>
		</view>
	</view>
	<!-- <view class="container">
		<view class="center">
			<image class="code-img" :src="imgUrl"></image>
			<view class="code-text-container">
				<text class="code-text">微信扫码</text>
				<text class="code-small">车主自来</text>
			</view>
		</view>
		<view @click="saveCode" class="save-code">保存小程序码到相册</view>
	</view> -->
</template>

<script>
	import {request} from 'common/js/common'
	import {getWechatCode} from 'common/js/requestUrl'
	import qrcode from 'static/img/icon/qrcode.png'
	import save from 'static/img/icon/save.png'
	import circle from 'static/img/icon/circle.png'
	import wechat from 'static/img/icon/wechat.png'
	export default {
		data() {
			return {
				qrcode,
				save,
				circle,
				wechat,
				imgUrl: ''
			};
		},
		onLoad(){
			request(getWechatCode,{},(res)=>{
				this.imgUrl = res.result
			})
		},
		onShareAppMessage(){
			return {
				title:'免费获取挪车码，你也可以！'
			}
		},
		methods: {
			applyCode(){
				uni.navigateTo({
					url: '../sendCard/sendCard'
				});
			},
			saveCode(){	
				uni.showModal({
					title: '提示',
					content: '是否将该小程序码保存到您的手机相册',
				success: (res) => {
					if (res.confirm) {
					uni.downloadFile({
						  url: this.imgUrl,
						  success: function (res) {
							// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
							if (res.statusCode === 200) {
							  uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success(res) {
								  uni.showToast({
									title: '保存图片成功！',
								  })
								},
								fail(res) {
								  uni.showToast({
									title: '保存图片失败！',
									icon: "none"
								  })
								}
							  })
							}
						  }
						})		
					}
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.background
		display: flex
		flex-direction: column
		align-items: center
		position: relative
		align-items: center
		min-height: 100vh
		background-color: $base-color
		// overflow: hidden
		// &:before, &:after 
		// 	content: ""
		// 	position: absolute
		// 	left: 50%
		// 	min-width: 400vw
		// 	min-height: 400vw
		// 	background-color: $base-color
		// 	animation-name: rotate
		// 	animation-iteration-count: infinite
		// 	animation-timing-function: linear
		// &:before
		// 	bottom: 2vh
		// 	// opacity: .8
		// 	border-radius: 20%
		// 	animation-duration: 10s
		// &:after 
		// 	bottom: 0vh
		// 	opacity: .5
		// 	border-radius: 20%
		// 	animation-duration: 10s
		.code-container
			position:absolute
			height:800rpx
			margin-top: 50rpx
			width: 550rpx
			background-color: white
			border-radius: 10rpx
			z-index: 999
			display: flex
			flex-direction: column
			align-items: center
			.code-my
				margin-top: 50rpx
				color: rgb(178,136,123)
			.code-zhu
				margin-top: 10rpx
				font-size: 20rpx
				letter-spacing: 5rpx
			.code-img
				width: 450rpx
				height: 450rpx
				margin-top: 30rpx
			.line
				height:1rpx
				width: 100%
				border-top: 1px solid #d1d1d1
				border-bottom: 1px solid #d1d1d1
				position: relative
				.left-circle
					width: 40rpx
					height: 40rpx
					border-radius: 50%
					background-color: $base-color
					position: absolute
					top: -20rpx
					left: -20rpx
				.right-circle
					width: 40rpx
					height: 40rpx
					border-radius: 50%
					background-color: $base-color
					position: absolute
					top: -20rpx
					right: -20rpx
			.button
				text-align: center
				margin-top: 20rpx
				width: 450rpx
				height: 60rpx
				line-height: 60rpx
				font-size: 30rpx
				font-weight: 300
				background-color: rgb(60,57,76)
				color: white
				border-radius: 40rpx
				margin-top: 40rpx
			.text-desc
				font-weight: 200
				margin-top: 20rpx
				font-size: 20rpx
		.code-operation
			display: flex
			justify-content: space-around
			position: absolute
			margin-top: 900rpx
			height: 300rpx
			width: 750rpx
			button::after 
				border: none
			.operation-item
				display: flex
				flex-direction: column
				align-items: center
				.item-img
					width: 100rpx
					height: 100rpx
				.item-text
					font-size: 25rpx
	// @keyframes rotate 
	// 	0% 
	// 		transform: translate(-50%, 0) rotateZ(0deg)
	// 	50% 
	// 		transform: translate(-50%, -2%) rotateZ(180deg)
	// 	100% 
	// 		transform: translate(-50%, 0%) rotateZ(360deg)
</style>
