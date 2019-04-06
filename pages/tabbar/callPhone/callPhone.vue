<template>
	<view class="container">
		<block v-if="userId">
			<image class="car-icon" :src="car"></image>
			<text class="car-text">扫码挪车</text>
			<view class="car-card">{{card}}</view>
			<button class="call" @click="bindPhone()">拨打电话</button>
			<text clss="notice">双方都将显示临时虚拟号码，保护隐私！</text>
			<text>安全至上，隐私挪车</text>
		</block>
		<block v-else>
			<image class="car-icon" :src="broken"></image>
			<text class="car-text">啊哦......</text>
			<text>亲，要扫码才能使用哦</text>
		</block>
	</view>
</template>

<script>
	import car from 'static/img/car.png'
	import broken from 'static/img/broken.png'
	import {getCalllMsg, bindPhone} from 'common/js/requestUrl'
	import {request} from 'common/js/common'
	
	export default {
		data() {
			return {
				car,
				broken,
				userId: false,
				card: '免打扰中',
			};
		},
		onLoad(query){
			const scene = decodeURIComponent(query.scene)
			
			if(scene !='undefined'){
				this.userId = scene
			}
			this.getCalllMsg()
		},
		methods: {
			getCalllMsg(res){
				request(getCalllMsg,{
					user_id : this.userId
				},(res) => {
					this.card = res.result.prefix + res.result.card
				})
			},
			bindPhone(){
				request(bindPhone,{
					user_id : this.userId
				},(res) => {
					uni.makePhoneCall({
						phoneNumber: res.result //仅为示例
					});
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.container
		height: calc(100vh - 200rpx)
		display:flex
		flex-direction: column
		align-items: center
		justify-content: space-around
		.car-icon
			margin: 100rpx 0 -70rpx 0
			width: 200rpx
			height: 150rpx
		.car-text
			font-size: 80rpx
			font-weight: 800
		.car-card
			font-size: 90rpx
			font-weight: 500
			line-height: 160rpx
			height:160rpx
			border-top: 1px solid black
			border-bottom: 1px solid black
		.call
			width: 300rpx
			height:80rpx
			border-radius: 100rpx
			box-shadow: 10rpx 10rpx 5rpx #d1d1d1
</style>
