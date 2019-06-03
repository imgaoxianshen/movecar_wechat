<template>
	<view class="carcard-container">
		<view class="top">
			<view @click="changeChoosed(10)" :class="[{topBase: true,activeColor: choosedItem == 10}]">全部</view>
			<view @click="changeChoosed(0)" :class="[{topBase: true,activeColor: choosedItem == 0}]">待付款</view>
			<view @click="changeChoosed(1)" :class="[{topBase: true,activeColor: choosedItem == 1}]">待发货</view>
			<view @click="changeChoosed(2)" :class="[{topBase: true,activeColor: choosedItem == 2}]">已发货</view>
		</view>
		<block v-if="orderList.length > 0">
			<view class="list-container">
				<block :key="index" v-for="(item,index) in orderList">
					<view class="order-item">
						<view class="order-status">
							<text class="order-status-name">
								<block v-if="item.status == 0">待付款</block>
								<block v-else-if="item.status == 1">待发货</block>
								<block v-else-if="item.status == 2">已发货</block>
							</text>
						</view>
						<image class="order-chetie" :src="chetie"></image>
						<view class="order-msg">
							<view>精美车贴  X{{item.num}}</view>
							<view class="order_no">订单编号: {{item.order_no}}</view>
							<view>物流单号：{{item.logisticNo == null ? '暂无物流信息' : item.logisticNo}}</view>
							<view class="order-price">
								<view>共{{item.num}}件商品  合计</view>
								<view class="order-money">￥{{item.price}}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</block>
		<block v-else>
			<view class="withoutList">
				<image class="card-image" :src="order"></image>
				<text>暂无订单信息</text>
			</view>
		</block>
	</view>
</template>

<script>
	import {getOrderList,payOrder} from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	import order from 'static/img/icon/order.png'
	import chetie from 'static/img/icon/chetie.png'
	export default {
		data() {
			return {
				order,
				chetie,
				orderList: [],
				choosedItem: 10,
				page: 1,
				pageSize: 5,
				total: 0
			};
		},
		onShow(){
			this.getOrderList()
		},
		onReachBottom: function() {
			if( (this.page * this.pageSize) < this.total ){
				this.page += 1
				this.getOrderList();
			}
		},
		methods:{
			changeChoosed(index){
				this.choosedItem = index
				this.page = 1
				this.pageSize = 5
				this.total = 0
				// this.orderList = []
				this.getOrderList()
			},
			getOrderList(){
				request(getOrderList,{
					page: this.page,
					pageSize: this.pageSize,
					type: this.choosedItem
				},(res) => {
						if(res.result.data.length > 0){
							if(this.page == 1){
								this.orderList = res.result.data
							}else{
								this.orderList = this.orderList.concat(res.result.data)
							}
							this.total = res.result.total
						}else{
							if(this.page == 1){
								this.orderList = []
								this.total = 0
							}
							showToast('没有更多数据了')
						}
					}
				)
			},
			payOrders(order_id){
				request(payOrder,{
					order_id: order_id
					},(res) => {
						if(res.code != 200){
							showToast('付款失败');
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
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.carcard-container
	display: flex
	flex-direction: column
	align-items: center
	.top
		display: flex
		width: 500rpx
		justify-content: space-around
		margin-top: 50rpx
		font-weight: 200
		font-size: 30rpx
		.topBase
			padding: 10rpx 20rpx
			text-align: center
			border-radius: 15rpx
		.activeColor
			background-color: $base-color
	.list-container
		display: flex
		flex-direction: column
		width: 700rpx
		margin-top: 30rpx
		.order-item
			position:relative
			background-color: white
			margin: 10rpx 0
			border-radius: 20rpx
			padding: 20rpx
			display: flex
			align-items: center
			justify-content: space-around
			overflow: hidden
			.order-status
				position: absolute
				top:-20rpx
				right:-100rpx
				background-color: $base-color
				width: 300rpx
				height: 100rpx
				transform:rotate(45deg)
				font-size: 20rpx
				display: flex
				align-items: center
				justify-content: center
				.order-status-name
					font-size: 20rpx
					transform:rotate(-45deg)
			.order-chetie
				width: 130rpx
				height: 200rpx
			.order-msg
				width: 350rpx
				font-size: 25rpx
				font-weight: 200
				.order_no
					margin-top: 20rpx
				.order-price
					margin-top: 20rpx
					display: flex
					font-size: 25rpx
					font-weight: 200
					align-items: center
					.order-money
						font-size: 35rpx
	.withoutList
		margin-top: 100upx
		display: flex
		flex-direction: column
		align-items: center
		.card-image
			width: 300upx
			height:300upx
</style>
