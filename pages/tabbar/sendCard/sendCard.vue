<template>
	<view class="container">
		<!-- <image class="container-img"></image> -->
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
			<button @click="chooseAddress" class="choose-address" type="primary">选择收货地址</button>
		</view>
		<view class="deepIn">
			<view class="price">
				<text class="base">运费:8元</text>
				 / 
				<text class="huaxian">服务费:20元</text>
			</view>
			<view @click="submit" class="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import {showToast,request} from 'common/js/common'
	import {placeOrderAndPay} from 'common/js/requestUrl'
	export default {
		data() {
			return {
				name: '',
				phone: '',
				province: '',
				city:'',
				county:'',
				address: ''
			};
		},
		onLoad(){

		},
		methods: {
			chooseAddress(){
			  uni.chooseAddress({
				success:(res) => {
					console.log('success')
				  this.name = res.userName
				  this.province = res.cityName
				  this.city = res.cityName
				  this.county = res.countyName
				  this.address = res.detailInfo
				  this.phone = res.telNumber
				},
				fail(res){
					console.log(res,'fail')
				},
				complete(res){
					console.log(res, 'complete')
				}
			  })
			},
			placeOrderAndPay(){
				request(placeOrderAndPay,{
					name: this.name,
					phone: this.phone,
					province: this.province,
					city: this.city,
					country: this.country,
					address: this.address
					},(res) => {
						if(res.code != 200){
							showToast('生成订单错误');
						}
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.result.timeStamp,
							nonceStr: res.result.nonceStr,
							package: res.result.package,
							signType: res.result.signType,
							paySign: res.result.paySign,
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
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
	background-color: #f1f1f1
	height: 100%
	.deepIn
		position: fixed
		width: 750upx
		bottom: 0
		display: flex
		justify-content: space-between
		align-items: center
		height: 100upx
		line-height: 100upx
		.submit
			height: 100%
			width: 300upx
			background-color: $base-color
			text-align: center
		.price
			padding-left: 10upx
			background-color: white
			height: 100%
			width: 100%
			.huaxian
				text-decoration:line-through
			.base
				color: red
	.container-img
		width:100%
		height:200upx
		background-color:red
	.addressMsg
		display: flex
		flex-direction: column
		padding: 20upx 50upx
		color: #d1d1d1
		background-color: white
		.choose-address
			color:black
			background-color: #f1f1f1
			width: 600upx
		.address-item
			padding: 5upx 0
</style>