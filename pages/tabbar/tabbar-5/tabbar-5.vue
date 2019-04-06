<template>
	<view>
		<view class="background"></view>
		<image class="avatar" :src="userInfo.avatarUrl?userInfo.avatarUrl:baseAvatar" mode="aspectFill"></image>
		<view class="list">
			<image class="white-background" :src="white" mode="aspectFill"></image>
			<view class="nickName">{{userInfo.nickName}}</view>
			<view class="item-line">
				<view class="item-line-left">
					<image class="item-line-image" :src="nonotice"></image>
					<text>免打扰</text>
				</view>
				<switch checked @change="switchChange" color="#FFDA44"/>
			</view>
			<view class="item-box">
				<block v-for="(item,key) in itemList" :key="key">
					<view @click="itemClick(item.navUrl)" class="item">
						<image class="itemIcon" :src="item.icon"></image>
						<text class="itemName">{{item.text}}</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {changeNoticeStatus} from 'common/js/requestUrl'
	import {request} from 'common/js/common'
	import baseAvatar from 'static/img/car.png'
	import white from 'static/img/white.jpg'
	import qrcode from 'static/img/icon/qrcode.png'
	import bankcard from 'static/img/icon/card.png'
	import order from 'static/img/icon/order.png'
	import nonotice from 'static/img/icon/nonotice.png'

	export default {
		data() {
			return {
				baseAvatar,
				white,
				nonotice,
				itemList: [{
					text: "我的车牌",
					url: 'chepai',
					icon: bankcard,
					navUrl: './car_card/car_card'
				},{
					text: "我的二维码",
					navUrl: '../getCode/getCode',
					icon: qrcode
				},{
					text: "我的订单",
					navUrl: '../orderList/orderList',
					icon: order
				}]
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['getUserMessage','loginOrLoginOut']),
			getUserInfo: function(res){
				let userInfo = res.detail.userInfo
				this.getUserMessage(userInfo)
			},
			itemClick(navUrl){
				uni.navigateTo({
					url: navUrl
				});
			},
			switchChange(res){
				let status = res.detail.value == true ? 1:0
				request(changeNoticeStatus,{
					status
					},(res) => {
						console.log(res)
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.background
		background: linear-gradient($base-color, white)
		height: 600upx
		width: 750upx
	button
		width: 600upx
		height: 100upx
		position: relative
		top: -120upx
		z-index: 999
		color: black
	.avatar
		width: 200upx
		height: 200upx
		border-radius: 50%
		background-color: #fff
		border: 30upx solid $base-color
		position: absolute
		left: 375upx
		top: 20upx
		transform: translateX(-50%)
		z-index: 888
	.list
		display: flex
		flex-direction: column
		align-items: center
		width: 700upx
		background-color: $background
		box-shadow: 0 0 10upx #d1d1d1
		margin: 0 auto
		border-radius: 20upx
		min-height: 800upx
		margin-top: -450upx
		overflow: hidden
		.white-background
			width: 100%
			height: 300upx
			opacity: .3
		.nickName
			position: relative
			top: -120upx
			z-index: 999
			font-size: 40upx
			height: 100upx
		.item-line
			height:60upx
			line-height: 60upx
			width: 100%
			padding:10upx
			margin-top: -100upx
			margin-bottom: 100upx
			display: flex
			justify-content: space-between
			align-items: center
			border: 1px solid #f1f1f1
			.item-line-left
				display:flex
				align-items: center
				.item-line-image
					width: 50upx
					height: 50upx
		.item-box
			display: flex
			flex-direction: row
			flex-wrap: wrap
			justify-content: space-around
			width: 100%
			margin-top: -50upx
			.item
				display: flex
				flex-direction: column
				align-items: center
				width: 200upx
				height: 200upx
				border-radius: 10upx
				background-color: $background
				box-shadow: 0 0 5upx #d1d1d1
				margin-bottom: 25upx
				.itemIcon
					margin-top: 30upx
					width: 80upx
					height:80upx
				.itemName
					font-size: 30upx
					margin-top: 30upx
			
</style>
