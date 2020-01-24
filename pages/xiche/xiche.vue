<template>
	<view class="xiche-container">
		<image mode="aspectFill" class="top" :src="shop.img"></image>
		<view class="center-container">
			<view class="shop-msg">
				<view class="shop-top">
					<view class="left">
						<view class="left-top">{{shop.name}}</view>
						<view class="left-bottom">营业时间: 07:00-18:00</view>
					</view>
					<image @click="callPhone" class="right" src="/static/img/icon/phone.png"></image>
				</view>
				<view class="shop-bottom">
					<view class="left">
						<image src="/static/img/icon/position.png"></image>
						<text>{{shop.address}}</text>
					</view>
					<view class="right">
						<image src="../../static/img/icon/to.png"></image>
						<text>{{shop.far}}KM</text>
					</view>
				</view>
			</view>
			<!-- vip模块 -->
			<vip></vip>
			
			<!-- 内容 -->
			<block v-if="shop.washList">
				<view class="xiche-content">
					<view class="title">
						<view>洗车</view>
						<text>{{shop.washList.length}}项</text>
					</view>
					<block v-bind:key="index" v-for="(item, index) in shop.washList">
						<view @click="changeWashSelect(index)" class="item">
							<view class="left">
								<block v-if="item.select">
									<image class="select" src="/static/img/icon/select.png"></image>
								</block>
								<block v-else>
									<view class="select"></view> 
								</block>
								<view class="item-desc">
									<view class="item-title">{{item.name}}</view>
									<view class="sale">已售{{item.saled}}</view>
								</view>
							</view>
							<view class="right">
								<view class="price">¥{{item.price}}</view>
								<view class="shop-price">
									<view>门市价</view>
									<text>¥{{item.shop_price}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</block>
			<!-- 汽车美容 -->
			<block v-if="shop.fixList">
				<view class="xiche-content">
					<view class="title">
						<view>汽车美容</view>
						<text>{{shop.fixList.length}}项</text>
					</view>
					<block v-bind:key="index" v-for="(item, index) in shop.fixList">
						<view @click="changeFixSelect(index)" class="item">
							<view class="left">
								<block v-if="item.select">
									<image class="select" src="/static/img/icon/select.png"></image>
								</block>
								<block v-else>
									<view class="select"></view> 
								</block>
								<view class="item-desc">
									<view class="item-title">{{item.name}}</view>
									<view class="sale">已售{{item.saled}}</view>
								</view>
							</view>
							<view class="right">
								<view class="price">¥{{item.price}}</view>
								<view class="shop-price">
									<view>门市价</view>
									<text>¥{{item.shop_price}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</block>
		</view>
		
		<!-- 底部 -->
			<view class="bottom">
				<view class="left">
					<text>¥{{totalPrice}}</text>
					<view>{{choosedName}}</view>
				</view>
				<view @click="navToWashOrder" class="right">
					去结算
				</view>
			</view>
	</view>
</template>

<script>
	import vip from '../vip-template/vip-template.vue'
	import {getWashCarShop} from '../../common/js/requestUrl.js'
	import {request, showToast, geoDistance} from '../../common/js/common'
	
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				id: null,
				shop: {
					washList: [],
					fixList: []
				},
			}
		},
		components:{
			vip
		},
		computed:{
			choosedName() {
				let arr = []
				this.shop.washList.forEach((item, index) => {
					if(item.select == true){
						arr.push(item)
					}
				})
				
				this.shop.fixList.forEach((item, index) => {
					if(item.select == true){
						arr.push(item)
					}
				})
				
				if(arr.length == 0){
					return ''
				}else if(arr.length == 1){
					return arr[0].name
				}else if(arr.length > 1){
					return arr[0].name + '等' + arr.length + '项'
				}
			},
			totalPrice(){
				let sum = 0
				this.shop.washList.forEach((item, index) => {
					if(item.select == true){
						sum += parseFloat(item.price)
					}
				})
				
				this.shop.fixList.forEach((item, index) => {
					if(item.select == true){
						sum += parseFloat(item.price)
					}
				})
				
				return sum
			}
			
		},
		onLoad(q) {
			let id = q.id
			this.id = id
			
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.latitude = res.latitude
					this.longitude = res.longitude
				},
				complete: res => {
					// 获取列表
					request(getWashCarShop, {id},(res)=> {
						if(res.code == 200){
							let shop = res.result
							shop.far = geoDistance(shop.latitude, shop.longitude, this.latitude, this.longitude)
							shop.fixList.forEach((fixItem) => {
								fixItem.select = false
							});
							shop.washList.forEach((washItem) => {
								washItem.select = false
							});
							this.shop = shop
						}
					})
				}
			});
		},
		methods: {
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.shop.phone
				})
			},
			navToWashOrder(){
				let ids = []
				this.shop.washList.forEach((item, index) => {
					if(item.select == true){
						ids.push(item.id)
					}
				})
				
				this.shop.fixList.forEach((item, index) => {
					if(item.select == true){
						ids.push(item.id)
					}
				})
				uni.navigateTo({
					url: '/pages/wash-order/wash-order?ids=' +ids.join(',')
				})
			},
			changeWashSelect(index){
				this.shop.washList.forEach((item, itemIndex) => {
					if(itemIndex == index){
						item.select = !item.select
					}else{
						item.select = false	
					}
				})
			},
			changeFixSelect(index) {
				this.shop.fixList.forEach((item, itemIndex) => {
					if(itemIndex == index){
						item.select = !item.select
					}else{
						item.select = false	
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.xiche-container
		width: 750rpx
		.bottom
			position: fixed
			bottom: 0
			display: flex
			justify-content: space-between
			align-items: center
			height: 100rpx
			width: 100%
			background-color: white
			border-top: 1rpx solid #ccc
			.left
				display: flex
				flex-direction: column
				margin-left: 70rpx
				text
					font-size: 40rpx
					color: red
				view
					font-size: 25rpx
					color: grey
			.right
				width: 200rpx
				height: 70rpx
				line-height: 70rpx
				margin-right: 70rpx
				background-color: rgb(246, 179, 39)
				text-align: center
				border-radius: 100rpx
		.top
			width: 750rpx
			height: 400rpx
		.center-container
			position: relative
			top: -100rpx
			padding: 0 30rpx 50rpx 30rpx
			.shop-msg
				margin-bottom: 20rpx
				background-color: white
				border-radius: 10rpx
				.shop-top
					display: flex
					padding: 20rpx 50rpx
					justify-content: space-between
					align-items: center
					border-bottom: 1rpx solid #ccc
					.left
						display: flex
						flex-direction: column
						.left-top
							font-size: 30rpx
							font-weight: 900
						.left-bottom
							font-size: 25rpx
							color: grey
							margin-top: 5rpx
					.right
						width: 55rpx
						height: 55rpx
				.shop-bottom
					padding: 20rpx 50rpx
					display: flex
					align-items: center
					justify-content: space-between
					.left
						display: flex
						align-items: center
						image
							width: 20rpx
							height: 20rpx
						text
							font-size: 20rpx
							margin-left: 20rpx
							width: 450rpx
							overflow: hidden
							white-space: nowrap
							text-overflow:ellipsis
					.right
						display: flex
						align-items: center
						image
							width: 30rpx
							height: 30rpx
						text
							margin-left: 10rpx
							font-size: 20rpx
							color: grey
		.xiche-content
			background-color: white
			margin-top: 20rpx
			border-radius: 10rpx
			.title
				padding: 10rpx 20rpx
				display: flex
				align-items: flex-end
				border-bottom: 1rpx solid #ccc
				view
					font-size: 25rpx
				text
					color: grey
					margin-left: 10rpx
					font-size: 20rpx
			.item:not(:last-child)
				border-bottom: 1rpx solid #ccc
			.item
				display: flex
				align-items: center
				justify-content: space-between
				padding: 10rpx 20rpx
				.left
					display: flex
					align-items: center
					justify-content: center
					.select
						margin-right: 15rpx
						width: 30rpx
						height: 30rpx
						border: 1rpx solid #ccc
						border-radius: 50%
					.item-desc
						display: flex
						flex-direction: column
						.item-title
							font-size: 30rpx
						.sale
							font-size: 25rpx
							color: grey
				.right
					display: flex
					flex-direction: column
					align-items: center
					.shop-price
						display: flex
						font-size: 25rpx
						color: grey
						text
							font-size: 25rpx
							text-decoration:line-through
					.price
						color: red
						font-size: 35rpx
					
</style>
