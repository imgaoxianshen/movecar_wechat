<template>
	<view class="vip-desc">
		<image src="/static/img/icon/card.png"></image>
		<text>VIP会员 全年免费洗车</text>
		<view>开通会员</view>
	</view>
</template>

<script>
</script>

<style lang="stylus" scoped>
	.vip-desc
		background-color: rgb(21, 18, 20)
		display: flex
		justify-content: space-around
		align-items: center
		padding: 10rpx
		border-radius: 15rpx
		image
			width: 60rpx
			height: 60rpx
		text
			font-size: 35rpx
			font-weight: 900
			background: linear-gradient(to bottom, rgb(224, 206,189), rgb(197, 165, 146))
			-webkit-background-clip: text
			background-clip: text
			color: transparent
		view
			width: 150rpx
			height: 50rpx
			line-height: 50rpx
			font-weight: 900
			background: linear-gradient(to bottom, rgb(224, 206,189), rgb(197, 165, 146))
			text-align: center
			font-size: 30rpx
			border-radius: 50rpx
			background-color: white
			color: rgb(80, 58, 43)
</style>
