<template>
	<view class="wash-order-container">
		<view class="top">
			<block v-bind:key="index" v-for="(item, index) in list">
				<view class="name border">
					<view>{{item.name}}</view>
					<text>¥{{item.price}}</text>
				</view>
			</block>
			<view class="xiaoji">
				<view>小计</view>
				<text>¥{{totalPrice}}</text>
			</view>
		</view>
		<view class="top">
			<view class="quan border">
				<view class="left">优惠券</view>
				<view class="right">
					<text>暂无可用</text>
					<image src="/static/img/icon/arrow-right.png"></image>
				</view>
			</view>
			<view class="xiaoji border">
				<view>会员折扣</view>
				<text>¥5</text>
			</view>
			<view class="xiaoji">
				<view>订单总价</view>
				<text>¥25.0</text>
			</view>
		</view>
		
		<view style="margin-top: 30rpx"></view>
		<!-- vip -->
		<vip></vip>
		
		<view class="pay">
			去支付 20元
		</view>
	</view>
</template>

<script>
	import vip from '../vip-template/vip-template.vue'
	import {getWashItemByIds} from '../../common/js/requestUrl.js'
	import {request, showToast, geoDistance} from '../../common/js/common'
	
	export default {
		data() {
			return {
				ids: '',
				list: []
			}
		},
		components:{
			vip
		},
		computed:{
			totalPrice(){
				let sum = 0
				if(!this.list){
					return sum
				}else{
					this.list.forEach((item, index) => {
						sum += parseFloat(item.price)
					})
					return sum
				}
			}
		},
		onLoad(q) {
			this.ids = q.ids
			
			request(getWashItemByIds, {ids: this.ids},(res)=> {
				if(res.code == 200){
					this.list = res.result
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="stylus" scoped>
	.wash-order-container
		padding: 0 30rpx
		.pay
			position: fixed
			bottom: 40rpx
			width: 690rpx
			border-radius: 20rpx
			font-size: 35rpx
			height: 80rpx
			line-height: 80rpx
			background-color:rgb(246, 179, 39)
			text-align: center
		.top
			background-color: white
			margin-top: 30rpx
			display: flex
			flex-direction: column
			border-radius: 10rpx
			.name
				display: flex
				justify-content: space-between
				padding: 20rpx 40rpx
				view
					font-size: 25rpx
					color: grey
				text
					font-size: 30rpx
			.quan
				display: flex
				justify-content: space-between
				padding: 20rpx 40rpx
				.left
					font-size: 25rpx
					color: grey
				.right
					font-size: 30rpx
					display: flex
					align-items: center
					text
						color: rgb(246, 179, 39)
						font-size: 30rpx
					image
						width: 30rpx
						height: 30rpx
			.border
				border-bottom: 1rpx solid #ccc
			.xiaoji
				display: flex
				justify-content: space-between
				padding: 20rpx 40rpx
				view
					font-size: 25rpx
					color: grey
				text
					font-size: 30rpx
					color: orange
</style>
