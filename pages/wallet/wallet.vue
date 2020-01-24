<template>
	<view>
		<view class="wallet-container">
			<view class="title">
				余额(元)
			</view>
			<view class="money">124.32</view>
		</view>
		<view class="other">
			<view class="other-item">
				提现
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow(){
			
		},
		onLoad(){

		},
		methods: {
			
		}
	}
</script>

<style lang="stylus" scoped>
.wallet-container
	height: 300rpx
	background-color: #FFDA44
	display: flex
	align-items:center
	justify-content: center
	flex-direction: column
	.title
		font-size: 20rpx
	.money
		font-size: 100rpx
		margin-top: 30rpx
.other
	display: flex
	flex-direction:column
	align-items: center
	padding: 30rpx
	.other-item
		background-color: white
		width: 100%
		border-radius: 10rpx
		padding: 20rpx
</style>
