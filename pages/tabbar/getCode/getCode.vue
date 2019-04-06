<template>
	<view class="container">
		<view class="center">
			<!-- <view class="code-border"> -->
				<image class="code-img" :src="imgUrl"></image>
				<view class="code-text-container">
					<text class="code-text">扫码联系车主</text>
					<text class="code-small">请多多关照</text>
				</view>
			<!-- </view> -->
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
				uni.getImageInfo({
					src: this.imgUrl,
					success: function (image) {
						console.log(image.width);
						console.log(image.height);
					},
					fail: (res) => {
						console.log(res)
					}
				});
				 uni.saveImageToPhotosAlbum({
					filePath: this.imgUrl,
					success: function () {
						console.log('save success');
					},
					fail: (res) => {
						console.log(res)
					}
				});
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
