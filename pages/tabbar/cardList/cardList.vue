<template>
	<view class="carcard-container">
		<view class="card-choosed">
			<view class="useing">正在使用车辆</view>
			<view class="useing-item">
				<text class="item-card">{{usingCard}}</text>
				<text class="item-useing">正在使用</text>
			</view>
			<view class="card-notice">一个账号可以选择使用的车牌号，请在您出行的时候选择对应的车牌，可以自由切换</view>
			<view class="card-notice">其他车牌</view>
		</view>
		<view class="card-list">
			<block wx:key="item" v-for="(item, key) in carcardList">
				<view class="card-item" @click="changeCarChoosed(item.id, item.choosed)">
					<view class="card-item-card">{{item.prefix}}{{item.address_code}}·{{item.card}}</view>
					<view class="card-unchoosed">点击使用</view>
				</view>
			</block>
			<view class="add-item"  @click="navAddCard">
				<image class="add-item-icon" :src="card"></image>
				<text class="add-item-text">添加其他车辆</text>
			</view>
		</view>
		<!-- <block v-if="carcardList.length > 0">
			<view class="car-container">
				<block v-for="(item,index) in carcardList">					
					<view class="car-item">
						<view class="items">{{item.prefix}}{{item.card}}</view>
						<view>手机号：{{item.phone}}</view>
						<view class="choosed">
							<block v-if="item.choosed">
								<icon type="success" size="40"></icon>
							</block>
							<block v-else>
								<icon type="success" size="40" color="#d1d1d1" @click="changeCarChoosed(item.id, item.choosed)"></icon>
							</block>
						</view>
						<image class="deleteIcon" :src="deleteIcon" @click.stop="deleteCard(item.id)"></image>
					</view>
				</block>
			</view>
		</block>
		<block v-else>
			<view class="withoutList">
				<image class="card-image" :src="card"></image>
				<text>暂无车牌信息</text>
			</view>
		</block> -->
		<!-- <button class="addCard" @click="navAddCard">+新增车牌信息</button> -->
	</view>
</template>

<script>
	import {getCarCardList,changeChoose,deleteCard} from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	import card from 'static/img/icon/card.png'
	import deleteIcon from 'static/img/icon/delete.png'
	export default {
		data() {
			return {
				card,
				deleteIcon,
				usingCard: '暂无车牌',
				carcardList: [],
				choosedCard: {}
			};
		},
		onShow(){
			this.getCardList()
		},
		methods:{
			navAddCard(){
				uni.navigateTo({
					url: '../addCard/addCard'
				});
			},
			getCardList(){
				this.carcardList = []
				this.choosedCard = {}
				request(getCarCardList,{},(res) => {
						if(res.result.data != null){
							res.result.data.forEach( v => {
								if(v.choosed == 1){
									this.usingCard = v.prefix + v.address_code+'·'+v.card
								}else{
									this.carcardList.push(v)
								}
							})
						}
						// this.carcardList = res.result.data
					}
				)
			},
			changeCarChoosed(id, choosed){
				if(choosed != 1){
					request(changeChoose,{
						id: id
					},(res) => {
						this.getCardList()
					})
				}
			},
			deleteCard(id){
				uni.showModal({
					title: '提示',
					content: '是否删除该车牌',
				success: (res) => {
					if (res.confirm) {
						request(deleteCard,
								{id},
								(res) => {
								if(res.code == 200){
									showToast('删除成功')
									this.getCardList()
								}
							}
						)}
					}
				});
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
.carcard-container
	width: 750upx
	.useing
		font-size: 20rpx
		font-weight: 300
		margin: 40rpx 0 10rpx 30rpx
	.useing-item
		background-color: $base-color
		display: flex
		justify-content: space-between
		align-items: center
		padding: 10rpx 0
		.item-card
			margin-left: 30rpx
			font-weight: 300
			letter-spacing: 10rpx
		.item-useing
			font-weight: 300
			font-size: 25rpx
			margin-right: 30rpx
	.card-notice
		font-weight: 300
		letter-spacing: 5rpx
		margin-top: 20rpx
		font-size: 18rpx
		margin: 20rpx 30rpx 20rpx 30rpx
	.card-list
		display: flex
		flex-direction: column
		background-color: white
		margin-top: 30rpx
		border-top: 1px solid #f1f1f1
		border-bottom: 1px solid #f1f1f1
		.card-item
			display: flex
			justify-content: space-between
			align-items: center
			padding: 10rpx 0
			border-bottom: 1px solid #f1f1f1
			.card-item-card
				font-weight: 200
				letter-spacing: 10rpx
				margin-left: 30rpx
				font-size: 35rpx
			.card-unchoosed
				margin-right: 30rpx
				font-weight: 200
				font-size: 25rpx
		.add-item
			padding: 20rpx 0
			display: flex
			align-items: center
			justify-content: center
			.add-item-icon
				width: 30rpx
				height: 30rpx
				margin-right: 10rpx
			.add-item-text
				font-weight: 300
				font-size: 30rpx
</style>
