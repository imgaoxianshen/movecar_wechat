<template>
	<view>
		<view class="invite-top">
			<view class="invite-black"></view>
			<view class="invite-code">
				<view class="invite-code-top">我的邀请码</view>
				<view class="line-box">
					<view class="circle-left"></view>
					<view class="line"></view>
					<view class="circle-right"></view>
				</view>
				<view class="invite">
					<text>VIUYHB</text>
					<view>复制</view>
				</view>
			</view>
		</view>
		<view class="invite-container">
			<view class="invite-notice">
				<view>邀请方式:</view>
				<view>【方式1】复制邀请码给好友打开小程序购买VIP会员时填写;</view>
				<view>【方式2】转发邀请海报，好友扫码之后自动跳转到购买VIP会员界面，会默认填写您的邀请码;</view>
				<view>当好友购买成功后，您的佣金会在我的钱包中展示</view>
			</view>
			<image src="/static/img/icon/bycard.png"></image>
		</view>
	</view>
</template>

<script>
</script>

<style lang="stylus" scoped>
	.invite-top
		background-color: #FFDA44
		height: 300rpx
		display: flex
		align-items: center
		flex-direction: column
		justify-content: center
		.invite-black
			width: 500rpx
			height: 40rpx
			background-color: rgb(61, 61, 61)
			box-shadow: 0 0 10rpx #ccc
			border-radius: 8rpx
		.invite-code
			text-align: center
			position: relative
			top: -20rpx
			width: 480rpx
			background-color: white
			box-shadow: 0 20rpx 10rpx rgb(80, 80, 80) inset
			border-radius: 8rpx
			.invite-code-top
				margin-top: 20rpx
				font-size: 25rpx
			.line-box
				width: 100%
				display: flex
				align-items: center
				margin-top: 5rpx
				overflow: hidden
				.circle-left
					position: relative
					right: 15rpx
					border-radius: 50%
					width: 30rpx
					height: 30rpx
					background-color: #FFDA44
				.circle-right
					position: relative
					right: -15rpx
					border-radius: 50%
					width: 30rpx
					height: 30rpx
					background-color: #FFDA44
				.line
					flex: 1
					border-bottom: 1rpx dashed black
			.invite
				display: flex
				align-items: center
				justify-content: center
				padding: 10rpx 0
				text
					font-size: 60rpx
					font-weight: 900
				view
					font-size: 30rpx
					margin-left: 20rpx
					background-color: red
					color: white
					border-radius: 100rpx
					width: 130rpx
					height: 40rpx
	.invite-container
		padding: 40rpx
		.invite-notice
			font-size: 25rpx
			color: grey
			view
				margin-top: 10rpx
		image
			margin-top: 30rpx
			width: 100%
</style>
