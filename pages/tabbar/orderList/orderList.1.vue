<template>
	<view class="carcard-container">
		<block v-if="orderList.length > 0">
			<view class="car-container">
				<block v-for="(item,index) in orderList">					
					<view class="car-item">
						<view class="items">
							<view>订单编号： {{item.order_no}}</view>
							<view class="item-price">
								<block v-if="item.status == 0">
									待付款
								</block>
								<block v-if="item.status == 1">
									已付款
								</block>
								<block v-if="item.status == 2">
									已发货
								</block>
							</view>
						</view>
						<view>
							支付金额：<text class="item-price">￥{{item.price}}</text>
						</view>
						<view>
							下单时间： {{item.create_time}}
						</view>
						<view>
							地址： {{item.province + item.city + item.country + item.address +' '+ item.name +'收'}}
						</view>
						<view class="items">
							<view>运单编号： {{item.logisticNo == null ? '暂无' : item.logisticNo}}</view>
							<view class="item-price">
								<block v-if="item.status == 0">
									<button @click="payOrders(item.id)" class="item-button">付款</button>
								</block>
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
	import {request} from 'common/js/common'
	import order from 'static/img/icon/order.png'
	export default {
		data() {
			return {
				order,
				orderList: []
			};
		},
		onShow(){
			this.getOrderList()
		},
		methods:{
			getOrderList(){
				request(getOrderList,{},(res) => {
						console.log(res)
						this.orderList = res.result.data
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
.carcard-container
	width: 750upx
	.car-container
		background-color: white
		display: flex
		flex-direction: column
		align-items: center
		.car-item
			position: relative
			border-bottom: 1px solid #d1d1d1
			width: 700upx
			padding:20upx
			font-size: 30upx
			line-height: 50upx
			.items
				display: flex
				justify-content: space-between
				.item-button
					height: 50upx
					line-height: 50upx
					font-size: 20upx
			.item-price
				color: red !important
	.addCard
		// color: white
		margin-top: 100upx
		width: 600upx
	.withoutList
		margin-top: 100upx
		display: flex
		flex-direction: column
		align-items: center
		.card-image
			width: 300upx
			height:300upx
</style>
