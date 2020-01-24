<template>
	<view class="xiche-container">
		<view @click="navToXiche(item.id)" v-bind:key="index" v-for="(item, index) in list" class="xiche-item">
			<view class="xiche-top">
				<image mode="aspectFill" :src="item.img"></image>
				<view class="xiche-desc">
					<view class="name">
						{{item.name}}
					</view>
					<view class="address">
						{{item.address}}
					</view>
					<view class="youhui">
						<view class="youhui-icon">优惠</view>
						<view class="youhui-desc">会员首次免费洗车</view>
					</view>
				</view>
				<view class="far">
					{{item.far}}km
				</view>
			</view>
			<!-- 循环 -->
			<block v-bind:key="goodIndex" v-for="(good, goodIndex) in item.list">
				<view class="xiche-main">
					<view class="xieche-main-left">
						<view class="name">{{good.name}}</view>
						<view class="saled">已售{{good.saled}}</view>
					</view>
					<view class="xiche-main-right">
						<view class="shop-price">¥{{good.shop_price}}</view>
						<view class="real-price">¥{{good.price}}</view>
						<view class="buy-button" @click.stop="navToOrder(good.id)">购买</view>
					</view>
				</view>
			</block>
			<view class="xiche-bottom">
				<image src="/static/img/icon/down.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array
			}
		},
		data() {
			return {
			}
		},
		methods: {
			navToOrder(id) {
				uni.navigateTo({
					url: '/pages/wash-order/wash-order?ids='+ id
				})
			},
			navToXiche(id) {
				uni.navigateTo({
					url: '/pages/xiche/xiche?id='+id
				})
			},
		}
	}
</script>

<style lang="stylus" scoped>
	.xiche-container
		display: flex
		flex-direction: column
		align-items: center
		margin-top: 20rpx
		.xiche-item
			display: flex
			flex-direction: column
			background-color: white
			width: 690rpx
			border-radius: 10rpx
			margin-bottom: 30rpx
			.xiche-top
				display: flex
				justify-content: space-between
				align-items: center
				padding: 30rpx
				border-bottom: 1rpx solid #ccc
				image
					width: 150rpx
					height: 120rpx
				.xiche-desc
					display: flex
					width: 350rpx
					flex-direction: column
					font-size: 30rpx
					.address
						color: grey
						font-size: 25rpx
						overflow: hidden
						text-overflow:ellipsis
						white-space: nowrap
					.youhui
						font-size: 20rpx
						margin-top: 10rpx
						display: flex
						.youhui-icon
							width:50rpx
							height: 30rpx
							color: white
							font-weight: 600
							text-align: center
							line-height: 30rpx
							border-radius: 10rpx
							background-color: red
						.youhui-desc
							color: red
							margin-left: 10rpx
				.far
					font-size: 30rpx
					color: grey
			.xiche-main
				display: flex
				align-items: center
				justify-content: space-between
				padding: 10rpx 30rpx
				border-bottom: 1rpx solid #ccc
				.xieche-main-left
					display: flex
					flex-direction: column
					.name
						font-size: 28rpx
					.saled
						font-size: 25rpx
						margin-top: 7rpx
						color: grey
				.xiche-main-right
					display: flex
					align-items: center
					.shop-price
						color: grey
						font-size: 25rpx
						text-decoration:line-through
					.real-price
						color: red
						font-size: 40rpx
						margin-left: 20rpx
					.buy-button
						margin-left: 20rpx
						width: 100rpx
						height: 40rpx
						line-height: 40rpx
						text-align: center
						border: 1rpx solid black
						font-size: 30rpx
						border-radius: 100rpx
			.xiche-bottom
				text-align: center
				height: 40rpx
				line-height: 40rpx
				image
					width: 15rpx
					height: 15rpx
</style>
