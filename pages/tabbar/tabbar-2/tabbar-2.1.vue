<template>
	<view class="content">
		<view class="background"></view>
		<view class="index-container">
			<view class="vip-container">
				<view class="vip-container-top">
					<view class="line"></view>
					<view class="vip-container-text">会员尊享</view>
				</view>
				<view class="vip-container-bottom">
					<view class="vip-bottom-item">
						<img class="vip-bottom-item-img" src="/static/img/icon/mianfei.png" alt="">
						<text class="vip-bottom-item-text1">免费洗车</text>
						<text class="vip-bottom-item-text2">首次</text>
					</view>
					<view class="vip-bottom-item">
						<img class="vip-bottom-item-img" src="/static/img/icon/xiche.png" alt="">
						<text class="vip-bottom-item-text1">特惠洗车</text>
						<text class="vip-bottom-item-text2">低至15元</text>
					</view>
					<view class="vip-bottom-item">
						<img class="vip-bottom-item-img" src="/static/img/icon/xiuche.png" alt="">
						<text class="vip-bottom-item-text1">抢险/修车</text>
						<text class="vip-bottom-item-text2">8折起</text>
					</view>
					<view class="vip-bottom-item">
						<img class="vip-bottom-item-img" src="/static/img/icon/yinsi.png" alt="">
						<text class="vip-bottom-item-text1">挪车码</text>
						<text class="vip-bottom-item-text2">保护隐私</text>
					</view>
				</view>
			</view>
			<block v-bind:key="key" v-for="(item,key) in washCarList">
				<view class="xiche-container">
					<view class="xiche-top">
						<img mode="aspectFill" class="xiche-top-img" :src="item.img" alt="">
						<view class="xiche-top-right">
							<text class="xiche-top-right-title">{{item.name}}</text>
							<text class="xiche-top-right-address">{{item.address}}</text>
							<text class="xiche-top-right-msg">迅速抢险 首次免费洗车 修车8折</text>
							<block v-if="item.far == 0">
								<text class="xiche-top-right-km">0KM</text>
							</block>
							<block v-else>
								<text class="xiche-top-right-km">{{item.far}}KM</text>
							</block>
						</view>
					</view>
					<view class="des-line"></view>
					<view class="xiche-bottom">
						<view></view>
						<view class="xiche-bottom-right">
							<view class="xiche-bottom-right-items" @click="callPhone(item.phone)">
								<img class="call" src="/static/img/icon/phone.png" alt="">
								<text class="call-msg">联系店家</text>
							</view>
							<view class="xiche-bottom-right-items" @click="chooseLocation(item.latitude, item.longitude)">
								<img class="call" src="/static/img/icon/to.png" alt="">
								<text class="call-msg">到这里去</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {request, getQueryString, showToast, geoDistance} from 'common/js/common'
	import {washCarList} from 'common/js/requestUrl'
	
	export default {
		data() {
			return {
				washCarList: [],
				latitude: '',
				longitude: '',
			}
		},
		onLoad() {
			// 获取当前经纬度
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.latitude = res.latitude
					this.longitude = res.longitude
				},
				complete: res => {
					// 获取列表
					request(washCarList, {},(res)=> {
						if(res.code == 200){
							this.washCarList = res.result.data
							if(this.washCarList.length > 0){
								this.washCarList.forEach((item, index) => {
									//获取距离
									this.washCarList[index].far = geoDistance(item.latitude, item.longitude, this.latitude, this.longitude)
								});
							}
						}
					})	
				}
			});
		},
		methods: {
			callPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			chooseLocation(latitude, longitude){
				uni.openLocation({
					latitude: parseFloat(latitude),
					longitude: parseFloat(longitude),
					success: function () {
						console.log('success');
					}
				});
			},
			onShareAppMessage(res) {
				return {
				  title: '多少堵车事，历历不能忘',
				  imageUrl: '/static/img/icon/share.jpg'
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.background
		position: fixed
		align-items: center
		height: 300rpx
		top: 0
		width: 750rpx
		background: linear-gradient(to right, rgb(255,214, 23) , rgb(250, 255, 136))
	.index-container
		z-index: 999
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		width: 750rpx
		margin-top: 80rpx
		.xiche-container
			margin: 10rpx 0
			box-shadow: -5rpx 5rpx 10rpx #d1d1d1
			display: flex
			flex-direction: column
			z-index: 999
			background-color: white
			width: 620rpx
			border-radius: 15rpx
			padding: 30rpx
			.xiche-bottom
				margin-top: 20rpx
				display: flex
				justify-content: space-between
				.xiche-bottom-right
					display: flex
					align-items: center
					.xiche-bottom-right-items
						display: flex
						align-items: center
						margin: 0 10rpx
						.call
							width: 40rpx
							height: 40rpx
							margin:0 5rpx
						.call-msg
							font-size: 27rpx
							color: grey
			.des-line
				margin-top: 20rpx
				border-bottom: 1px solid #f1f1f1
			.xiche-top
				display: flex
				.xiche-top-img
					width: 250rpx
					height: 200rpx
					border-radius: 20rpx
				.xiche-top-right
					flex: 1
					display: flex
					padding:0 0 0 20rpx
					flex-direction: column
					.xiche-top-right-title
						font-size: 30rpx
						margin-top: 5rpx
					.xiche-top-right-address
						font-size: 24rpx
						color: grey
						margin-top: 5rpx
					.xiche-top-right-msg
						color: red
						font-size: 24rpx
						margin-top: 5rpx
					.xiche-top-right-km
						color: grey
						font-size: 24rpx
		.vip-container
			margin-bottom: 10rpx
			box-shadow: -5rpx 5rpx 10rpx #d1d1d1
			display: flex
			flex-direction: column
			z-index: 999
			background-color: white
			width: 620rpx
			border-radius: 15rpx
			padding: 30rpx
			.vip-container-bottom
				margin-top: 30rpx
				display: flex
				justify-content: space-around
				.vip-bottom-item
					display: flex
					flex-direction: column
					justify-content: center
					align-items: center
					.vip-bottom-item-img
						width: 80rpx
						height: 80rpx
					.vip-bottom-item-text1
						font-size: 25rpx
						margin-top: 10rpx
					.vip-bottom-item-text2
						font-size: 20rpx
						margin-top: 5rpx
			.vip-container-top
				display: flex
				align-items: center
				.line
					height: 20rpx
					width: 20rpx
					border-left: 7rpx solid black
				.vip-container-text
					font-size: 26rpx
</style>
