<template>
	<view class="container">
		<view class="center">
			<image class="code-img" :src="imgUrl"></image>
			<view class="code-text-container">
				<text class="code-text">微信扫码</text>
				<text class="code-small">车主自来</text>
			</view>
		</view>
		<view @click="saveCode" class="save-code">保存小程序码到相册</view>
	</view>
</template>

<script>
	import {request} from 'common/js/common'
	import {getWechatCode} from 'common/js/requestUrl'
	export default {
		data() {
			return {
				imgUrl: ''
			};
		},
		onLoad(){
			request(getWechatCode,{},(res)=>{
				this.imgUrl = res.result
			})
		},
		methods: {
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
	.container
		display: flex
		flex-direction: column
		height: calc(100vh)
		background-color:$base-color
		.center
			height: 800rpx
			width: 600rpx
			margin: 100rpx auto
			background-color: red
			display: flex
			flex-direction: column
			justify-content: space-around
			align-items: center
			background-color: white
			border-radius: 30rpx
		.save-code
			color: white
			font-size: 40rpx
			text-align: center
			text-decoration: underline
// 			.code-border
// 				background-color: $base-color
// 				border-radius: 20rpx
// 				width: 600rpx
// 				height: 700rpx
// 				display: flex
// 				justify-content: space-around
// 				align-items: center
// 				flex-direction: column
			.code-text-container
				display: flex
				flex-direction: column
				align-items:center
				.code-text
					font-size: 80rpx
					font-weight: 900
				.code-small
					font-size: 60rpx
					font-weight: 900
			.code-img
				width: 500rpx
				height: 500rpx
				border-radius: 15rpx
</style>
