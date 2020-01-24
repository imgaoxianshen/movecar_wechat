<template>
	<view class="vip-center-container">
		<block v-if="list.length<= 0">
			<view class="none">
				暂无优惠卷
			</view>
		</block>
		<block v-else v-bind:key="index" v-for="(item,index) in list">
			<view class="vip-top">
				<view class="xiche-msg">
					<block v-if="item.is_free == 1">
						<strong class="huiyuan">免费洗车券</strong>
					</block>
					<block v-else>
						<strong class="huiyuan">优惠卷</strong>
					</block>
					<text class="huiyuan-bottom-time">有效期至{{item.expire_time}}</text>
				</view>
				<block v-if="item.is_used == 1">
					<view class="huiyuan-bottom-xufei">已使用</view>
				</block>
				<block v-else>
					<view class="huiyuan-bottom-xufei" @click="useNow(index)">立即使用</view>
				</block>
			</view>
			<view class="vip-code" :animation="item.animationData">
				<!-- <view class="vip-code-img"> -->
					<tki-qrcode 
						cid="qrcode2"
						ref="qrcode2"
						:val="item.val"
						size="200" 
						onval="true" 
						loadMake="true" :usingComponents="true" @result="qrR" />
				<!-- </view> -->
				<text class="vip-code-text">使用时请出示此码</text>
			</view>
		</block>
	</view>
</template>

<script>
	import {request} from 'common/js/common'
	import {base64_encode, base64_decode} from '../../../common/js/base64'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {getWashCouponList} from 'common/js/requestUrl'

	export default{
		data(){
			return {
				list: [],
				count: 0,
				animation: {},
			}
		},
		components: {tkiQrcode},
		onLoad: function() {
			let animation = uni.createAnimation({
				duration: 200,
				timingFunction: "linear",
				delay: 0
			})
			
			this.animation = animation
			request(getWashCouponList, {},(res)=> {
				if(res.code == 200){
					let list = res.result.data
					if(list.length > 0){
						list.forEach((item, index)=> {
							list[index].isUseing = 0
							list[index].animationData = {}
							list[index].val = base64_encode(item.id.toString())
						})
					}
					this.list = list
					this.count = res.result.count
				}
			})
		},
		methods: {
			qrR(){
				
			},
			useNow(index) {
				if(this.list[index].isUseing == 0){
					this.animation.height('350rpx').step()
				}else{
					this.animation.height(0).step()
				}
			
				this.list[index].animationData = this.animation.export()
				this.list[index].isUseing = !this.list[index].isUseing
			},
		}
	}
</script>

<style lang="stylus" scoped>
.vip-center-container
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column
	.none
		font-size: 40rpx
		margin-top: 30rpx
	.vip-top
		padding: 30rpx 60rpx
		border-radius: 8rpx 8rpx 0 0
		margin-top: 40rpx
		width: 550rpx
		box-shadow: 5rpx -5rpx 30rpx #d1d1d1
		color: rgb(118, 66, 31)
		background-color: white
		display: flex
		justify-content: space-between
		align-items: center
		.xiche-msg
			display: flex
			flex-direction: column
			.huiyuan
				font-size: 40rpx
				font-weight: 900
				font-style: italic
				background: linear-gradient(to right, rgb(92, 48, 22), rgb(195, 121, 51))
				-webkit-background-clip: text
				background-clip: text
				color: transparent
			.huiyuan-bottom-time
				font-size: 25rpx
		.huiyuan-bottom-xufei
			font-size: 25rpx
			width: 160rpx
			height: 40rpx
			line-height: 40rpx
			text-align: center
			background-color: black
			color: white
			box-shadow: 5rpx -5rpx 30rpx #d1d1d1
			border-radius: 30rpx
	.vip-code
		border-radius:0 0 8rpx 8rpx
		width: 600rpx
		height: 0
		background-color: white
		box-shadow: 5rpx 5rpx 30rpx #d1d1d1
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		overflow: hidden
		.vip-code-text
			margin-top: 30rpx
</style>