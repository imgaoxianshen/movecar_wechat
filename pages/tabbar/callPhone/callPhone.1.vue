<template>
	<view class="container">
		<block v-if="type == 2 && needBindUser">
			<image class="car-icon" :src="bind"></image>
			<view class="bind-container">
				<text class="white">tips:</text>
				<text class="white">绑定到当前微信账号后，您还需要进入"帮挪车"微信小程序中去管理您的车牌信息以及手机号信息，以便其他用户扫码通知您挪车</text>
			</view>
			<button @click="bindUser()">绑定到当前微信账号</button>
		</block>
		<block v-else>
			<block v-if="id">
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
		</block>
	</view>
</template>

<script>
	import car from 'static/img/car.png'
	import broken from 'static/img/broken.png'
	import bind from 'static/img/icon/bind.png'
	import {getCalllMsg, bindPhone, bindUser} from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	
	export default {
		data() {
			return {
				car,
				broken,
				bind,
				id: null,
				card: '免打扰中',
				type: 1,
				needBindUser: false
			};
		},
		onLoad(query){
			const scene = decodeURIComponent(query.scene)
			let e = scene.split("/")
			// [0]=>类型 [1]=>值
			// 类型1=>非实体
			// 类型2=>实体
			this.type = e.type
			if(e[0] !='undefined'){
				this.id = e[0]
				this.type = e[1]
			}
			this.getCalllMsg()
		},
		methods: {
			getCalllMsg(res){
				request(getCalllMsg,{
					id : this.id,
					type: this.type
				},(res) => {
					// 450表示未绑定
					if(res.code == 450){
						this.needBindUser = true
					}else if(res.code == 200){
						this.card = res.result.prefix + res.result.card
					}else{
						showToast(res.msg)
					}
				})
			},
			bindPhone(){
				request(bindPhone,{
					id : this.id,
					type: this.type
				},(res) => {
					uni.makePhoneCall({
						phoneNumber: res.result //仅为示例
					});
				})
			},
			bindUser(){
				request(bindUser, {
					card_id: this.id 
				},(res) => {
					if(res.code == 200){
						showToast('绑定成功')
					}else{
						showToast(res.msg)
					}
				});
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.container
		height: calc(100vh - 200rpx)
		display:flex
		flex-direction: column
		align-items: center
		justify-content: space-around
		.bind-container
			display: flex
			flex-direction: column
			// align-items: center
			// height: 200rpx
			width: 600rpx
			padding: 20rpx
			background-color: $base-color
			border-radius: 30rpx
			.white
				color: black
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
