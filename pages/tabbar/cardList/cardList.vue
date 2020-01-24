<template>
	<view class="carcard-container">
		<view class="background"></view>
		<view class="card-choosed">
			<view class="useing">使用车辆</view>
			<view class="useing-container">
				<view class="useing-item">
					<image class="useing-logo" :src="usingLogo"></image>
					<view class="useing-item-left">
						<text class="item-card">{{usingCard}}</text>
						<text class="item-phone">{{usingPhone}}</text>
					</view>
					<text class="item-useing">{{usingCarName}}</text>
				</view>
				<!-- <view class="useing-line"></view> -->
				<!-- <view class="botton-container">
					<view class="botton-left"></view>
					<view class="botton-right">
						<view class="botton-right-left"></view>
						<view class="botton-right-right">
							<icon type="clear" size="20" color="red"></icon>
							<text>删除</text>
						</view>
					</view>
				</view> -->
			</view>
			<!-- <view class="card-notice">请在您用车时选择对应的车牌号及电话号码</view> -->
			<view class="useing">其他车辆</view>
		</view>
		<view class="card-list">
			<block v-bind:key="item" v-for="(item, key) in carcardList">
				<view class="useing-container">
					<view class="useing-item">
						<image class="useing-logo" :src="item.logo ? item.logo : '/static/img/icon/avatar.jpg'"></image>
						<view class="useing-item-left">
							<text class="item-card">{{item.prefix}}{{item.address_code}}·{{item.card}}</text>
							<text class="item-phone">{{item.phone}}</text>
						</view>
						<text class="item-useing">{{item.name}}</text>
					</view>
					<view class="useing-line"></view>
					<view class="botton-container">
						<view class="botton-left"></view>
						<view class="botton-right">
							<view class="botton-right-left" @click="changeCarChoosed(item.id, item.choosed)">
								<icon type="success" size="20"></icon>
								<text>使用</text>
							</view>
							<view class="botton-right-right" @click="deleteCard(item.id)">
								<icon type="clear" size="20" color="red"></icon>
								<text>删除</text>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="card-item" @click="changeCarChoosed(item.id, item.choosed)">
					<view class="card-item-left">
						<view class="card-item-card">{{item.prefix}}{{item.address_code}}·{{item.card}}</view>
						<view class="card-item-phone">{{item.phone}}</view>
					</view>
					<view class="card-unchoosed">点击使用</view>
				</view> -->
			</block>
			<view class="add-item"  @click="navAddCard">
				<image class="add-item-icon" :src="addCard"></image>
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
	import addCard from 'static/img/icon/add_card.png'
	import deleteIcon from 'static/img/icon/delete.png'
	export default {
		data() {
			return {
				addCard,
				deleteIcon,
				usingCard: '暂无车牌',
				usingPhone: '暂无手机',
				usingLogo: '/static/img/icon/avatar.jpg',
				usingCarName: '',
				carcardList: [],
				choosedCard: {}
			};
		},
		onShow(){
			this.getCardList()
		},
		methods:{
			navAddCard(){
				if(this.carcardList.length < 9){
					uni.navigateTo({
						url: '../callPhone/callPhone'
					});	
				}else{
					showToast('您最多只能创建十个车牌信息')
				}
			},
			getCardList(){
				// this.carcardList = []
				this.choosedCard = {}
				request(getCarCardList,{},(res) => {
						if(res.result.data != null){
							let cardLists = []
							res.result.data.forEach( v => {
								if(v.choosed == 1){
									this.usingCard = v.prefix + v.address_code+'·'+v.card
									this.usingPhone = v.phone
									if(v.logo){
										this.usingLogo = v.logo
									}else{
										this.usingLogo = '/static/img/icon/avatar.jpg'
									}
									if(v.name){
										this.usingCarName = v.name
									}else{
										this.usingCarName = ''
									}
									
								}else{
									cardLists.push(v)
								}
							})
							this.carcardList = cardLists
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
.useing-container
	display: flex
	flex-direction: column
	width: 600rpx
	margin: 20rpx auto
	background-color: white
	padding: 20rpx 30rpx
	border-radius: 10rpx
	box-shadow: -3rpx -3rpx 2rpx #d1d1d1
	.useing-line
		border-top: 1px solid #d1d1d1
		margin-top: 30rpx
	.botton-container
		display: flex
		align-items: center
		margin-top: 20rpx
		justify-content: space-between
		.botton-right
			display: flex
			align-items: center
			justify-content: space-between
			.botton-right-right
				display: flex
				align-items: center
				text
					margin: 0 20rpx 0 10rpx
					font-size: 25rpx
					font-weight: 300
			.botton-right-left
				display: flex
				align-items: center
				text
					margin: 0 20rpx 0 10rpx
					font-size: 25rpx
					font-weight: 300
.carcard-container
	width: 750rpx
	.background
		position: fixed
		height: 300rpx
		top: 0
		width: 750rpx
		background: linear-gradient(to right, rgb(255,214, 23) , rgb(250, 255, 136))
	.card-choosed
		position: relative
		.useing
			position: relative
			font-size: 30rpx
			font-weight: 300
			margin: 40rpx 0 10rpx 100rpx
	.useing-item
		display: flex
		align-items: center
		justify-content: space-around
		.useing-logo
			width: 100rpx
			height: 100rpx
			border-radius: 10rpx
		.useing-item-left
			display: flex
			flex-direction: column
			.item-card
				margin-left: 30rpx
				font-weight: 300
				letter-spacing: 10rpx
			.item-phone
				font-weight: 300
				letter-spacing: 3rpx
				margin-left: 30rpx
				font-size: 28rpx
		.item-useing
			font-weight: 300
			font-size: 25rpx
			margin-left: 30rpx
			width: 100rpx
		.card-notice
			font-weight: 300
			letter-spacing: 5rpx
			margin-top: 20rpx
			font-size: 25rpx
			margin: 20rpx 30rpx 20rpx 30rpx
		.card-notice-other
			font-weight: 300
			letter-spacing: 5rpx
			margin-top: 20rpx
			font-size: 30rpx
			margin: 20rpx 30rpx 20rpx 30rpx
	.card-list
		display: flex
		z-index: 999
		position: relative
		flex-direction: column
		// background-color: white
		margin-top: 10rpx
		margin-bottom: 10rpx
		padding-bottom: 30rpx
		.add-item
			background-color: rgb(252, 231, 61)
			padding: 20rpx
			width: 400rpx
			border-radius: 10rpx
			margin: 0 auto
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
