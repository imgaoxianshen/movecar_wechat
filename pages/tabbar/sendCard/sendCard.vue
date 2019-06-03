<template>
	<view class="container">
		<view class="container-img">
			<img class="top-chetie" :src="chetie">
			<view class="top-msg">
				<text class="top-msg-name">精美挪车贴</text>
				<text class="top-msg-detail">产品尺寸:80mm*90mm</text>
				<text class="top-msg-detail">产品材质:可移不干胶</text>
				<text class="top-msg-price">￥0.00</text>
			</view>
		</view>
		<view class="num-container">
			<text class="num-text">购买数量</text>
			<view class="num-desc">
				<image class="num_icon" @click="descNum" :src="desc"></image>
				<text class="num">{{num}}</text>
				<image class="num_icon" @click="addNum" :src="add"></image>
			</view>
		</view>
		<view class="choose-address">
			<block v-if="!name">
				<block v-if="authSetting">
					<text @click="setAddress" class="choose-address-msg">添加收货地址</text>
				</block>
				<block v-else>
					<text @click="addressAgain" class="choose-address-msg"> 添加收获地址</text>
				</block>
			</block>
			<block v-else>
				<view class="addressMsg">
					<view class="address-item">
						<text>姓名：</text>
						<text>{{name}}</text>
					</view>
					<view class="address-item">
						<text>手机：</text>
						<text>{{phone}}</text>
					</view>
					<view class="address-item">
						<text>地址：</text>
						<text>{{province + city + county + address}}</text>
					</view>
				</view>
			</block>
		</view>
		<text class="notice">注:收到挪车码后请您先扫码进行绑定车牌信息和手机信息，绑定后方可使用</text>
		<view class="deepIn">
			<view class="price">
				<text class="price-msg">合计:</text>
				<text class="base">￥9.9</text>
				<text class="huaxian">含邮费: ￥9.9</text>
			</view>
			<view @click="submit" class="submit">立即支付</view>
		</view>
	</view>
</template>

<script>
	import {showToast,request} from 'common/js/common'
	import {placeOrderAndPay} from 'common/js/requestUrl'
	import chetie from 'static/img/icon/chetie.png'
	import add from 'static/img/icon/add.png'
	import desc from 'static/img/icon/desc.png'
	
	export default {
		data() {
			return {
				add,
				desc,
				chetie,
				authSetting: true, //是否授权发货地址
				name: '',
				phone: '',
				province: '',
				city:'',
				county:'',
				address: '',
				num: 1
			};
		},
		onLoad(){
			uni.getSetting({
				success: res => {
					if (res.authSetting['scope.address'] === false) {
						this.authSetting = false
					}
				},
			})
		},
		methods: {
			addNum(){
				if(this.num < 5){
					this.num += 1
				}
			},
			descNum(){
				if(this.num > 1){
					this.num -= 1
				}
			},
			addressAgain(){
				uni.openSetting({
				  success:res => {
					if(res.authSetting['scope.address']){
						this.authSetting = true
					}
				  }
				})
			},
			setAddress(){
				uni.chooseAddress({
					success:res => {
						this.name = res.userName
						this.province = res.cityName
						this.city = res.cityName
						this.county = res.countyName
						this.address = res.detailInfo
						this.phone = res.telNumber
					},
					fail:(err) =>{
						if(err.errMsg == 'chooseAddress:fail auth deny'){
							this.authSetting = false	
						}
					}
				})
			},
			placeOrderAndPay(){
				request(placeOrderAndPay,{
					name: this.name,
					phone: this.phone,
					province: this.province,
					city: this.city,
					county: this.county,
					address: this.address,
					num: this.num,
					},(res) => {
						if(res.code != 200){
							showToast('生成订单错误' + res.msg);
						}
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.result.timeStamp,
							nonceStr: res.result.nonceStr,
							package: res.result.package,
							signType: res.result.signType,
							paySign: res.result.paySign,
							success: function (res) {
								wx.navigateTo({
									url: '/pages/tabbar/orderList/orderList'
								})
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				)
			},
			submit(){
				if(!this.address){
					showToast('请先选择地址')
					return
				}
				this.placeOrderAndPay()
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
.container
	display: flex
	flex-direction: column
	align-items: center
	background-color: #f1f1f1
	height: 100%
	.notice
		width: 650rpx
		margin-top: 40rpx
		font-size: 25rpx
		font-weight: 200
	.choose-address
		width: 650rpx
		min-height: 350rpx
		padding: 20rpx
		background-color: white
		border-radius: 20rpx
		margin-top: 40rpx
		.choose-address-msg
			font-weight: 200
			width: 100%
			height: 350rpx
			display: flex
			align-items: center
			justify-content: center
	.num-container
		display: flex
		justify-content: space-between
		margin-top: 60rpx
		background-color: white
		width: 650rpx
		padding: 20rpx
		border-radius: 20rpx
		.num-text
			font-weight: 200
		.num-desc
			display: flex
			width: 150rpx
			justify-content:space-around
			align-items: center
			.num_icon
				width: 40rpx
				height: 40rpx
			.num
				font-size: 30rpx
	.deepIn
		position: fixed
		width: 750upx
		bottom: 0
		display: flex
		justify-content: space-between
		align-items: center
		height: 100upx
		line-height: 100upx
		font-weight: 200
		.submit
			height: 100%
			width: 500rpx
			background-color: $base-color
			text-align: center
			font-size: 35rpx
			font-weight: 100
		.price
			padding-left: 10upx
			background-color: white
			height: 100%
			width: 100%
			.huaxian
				margin-left: 20rpx
				font-size: 30rpx
				// text-decoration:line-through
			.base
				color: red
			.price-msg
				font-size: 35rpx
				font-weight: 200
				margin-left: 20rpx
	.container-img
		display: flex
		justify-content: space-around
		align-items: center
		width:100%
		height:400upx
		background-color:$deep-color
		.top-chetie
			height: 300rpx
			width: 200rpx
		.top-msg
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			.top-msg-name
				font-size: 45rpx
				font-weight: 200
				margin-bottom: 20rpx
			.top-msg-detail
				font-size: 30rpx
				font-weight: 200
			.top-msg-price
				font-size: 50rpx
				color: red
				font-weight: 200
				margin-top: 30rpx
	.addressMsg
		display: flex
		flex-direction: column
		background-color: white
		font-weight: 200
		.choose-address
			color:black
			background-color: #f1f1f1
			width: 600upx
		.address-item
			padding: 5upx 0
</style>