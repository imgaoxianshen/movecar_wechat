<template>
	<view>
		<view class="background"></view>
		<view class="userInfo">
			<image class="avatar" :src="avatarUrl?avatarUrl:avatar" mode="aspectFill"></image>
			<text class="avatar-name">{{nickName}}</text>
			<block v-if="choosedCard">
				<text class="card-msg">{{choosedCard}}</text>
			</block>
			<block v-else="choosedCard">
				<text class="card-msg">暂无使用中车牌</text>
			</block>
			<!-- <button class="avatar-button" type="primary" plain="true">编辑资料</button> -->
		</view>
		<view class="tab">
			<block v-for="(item,key) in itemList" :key="key">
				<view @click="itemClick(item.navUrl)" class="item">
					<image class="itemIcon" :src="item.icon"></image>
					<text class="itemName">{{item.text}}</text>
				</view>
			</block>
		</view>
		<view class="other-tab">
			<view class="other-item">
				<text class="other-itemName">消息免打扰</text>
				<switch :checked="noticeStatus" @change="switchChange" color="#FFDA44"/>
			</view>
			<block>
				<view class="other-item">
					<button open-type="contact" class="other-itemName">联系客服</button>
					<image class="other-itemIcon" :src="arrowRight"></image>
				</view>
				<view class="other-item">
					<view class="other-itemName">关于我们</view>
					<image class="other-itemIcon" :src="arrowRight"></image>
				</view>
			</block>
		</view>
		<!-- <image class="avatar" :src="avatarUrl?avatarUrl:baseAvatar" mode="aspectFill"></image>
		<view class="list">
			<image class="white-background" :src="white" mode="aspectFill"></image>
			<view class="nickName">{{nickName}}</view>
			<view class="item-line">
				<view class="item-line-left">
					<image class="item-line-image" :src="nonotice"></image>
					<text>免打扰</text>
				</view>
				<switch checked @change="switchChange" color="#FFDA44"/>
			</view>
			<view class="item-box">
				<block v-for="(item,key) in itemList" :key="key">
					<view @click="itemClick(item.navUrl)" class="item">
						<image class="itemIcon" :src="item.icon"></image>
						<text class="itemName">{{item.text}}</text>
					</view>
				</block>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {changeNoticeStatus, getUserInfo} from 'common/js/requestUrl'
	import {request, showToast} from 'common/js/common'
	import avatar from 'static/img/icon/avatar.png'
	import arrowRight from 'static/img/icon/arrow-right.png'
	import white from 'static/img/white.jpg'
	import qrcode from 'static/img/icon/qrcode.png'
	import bankcard from 'static/img/icon/card.png'
	import order from 'static/img/icon/order.png'
	import nonotice from 'static/img/icon/nonotice.png'

	export default {
		data() {
			return {
				avatar,
				arrowRight,
				white,
				nonotice,
				nickName: 'x先生',
				avatarUrl: null,
				noticeStatus: false,
				choosedCard: '',
				itemList: [{
					text: "我的车牌",
					url: 'chepai',
					icon: bankcard,
					navUrl: '../cardList/cardList'
				},{
					text: "我的二维码",
					navUrl: '../getCode/getCode',
					icon: qrcode
				},{
					text: "我的订单",
					navUrl: '../orderList/orderList',
					icon: order
				}],
				otherList: [{
					text: "联系客服",
					url: 'chepai',
					navUrl: './car_card/car_card'
				},{
					text: "关于我们",
					url: 'chepai',
					navUrl: './car_card/car_card'
				}]
			}
		},
		onShow(){
			this.getUserInfo()
		},
		methods: {
			...mapMutations(['getUserMessage','loginOrLoginOut']),
			getUserInfo(){
				request(getUserInfo, {},(res)=> {
					if(res.code == 200){
						this.nickName = res.result.nickname
						this.avatarUrl = res.result.avatar
						this.noticeStatus = res.result.notice_status == 1 ? true : false
						if(res.result.choosedCard != null){
							this.choosedCard = res.result.choosedCard.prefix
								+ res.result.choosedCard.address_code + '·' + res.result.choosedCard.card
						}
					}
				})
			},
			itemClick(navUrl){
				uni.navigateTo({
					url: navUrl
				});
			},
			switchChange(res){
				let status = res.detail.value == true ? 1:0
				request(changeNoticeStatus,{
					status
					},(res) => {
						if(res.code == 200){
							showToast('修改成功')
						}
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.background
		position: relative
		align-items: center
		height: 600rpx
		overflow: hidden
		background-color: white
		&:before, &:after 
			content: ""
			position: absolute
			left: 50%
			min-width: 1500rpx
			min-height: 1500rpx
			background: linear-gradient($deep-color, $base-color)
			animation-iteration-count: infinite
			animation-timing-function: linear
		&:before 
			top: -1030rpx
			animation-name: rotate2
			border-radius: 44%
			opacity: .7
			animation-duration: 10s 
		&:after 
			top: -1030rpx
			border-radius: 44%
			opacity: .8
			animation-name: rotate1
			animation-duration: 10s
	.userInfo
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		position: absolute
		top: 100rpx
		width: 750rpx
		z-index: 999
		.avatar
			border: 1px solid #fff
			border-radius: 25rpx
			background-color: $user-back
			width: 150rpx
			height: 150rpx
		.avatar-name
			font-size: 35rpx
			letter-spacing: 20rpx
			text-indent: 20rpx
			text-align:center
			font-weight: 600
			margin-top: 20rpx
			color: black
		.card-msg
			margin-top: 10rpx
			letter-spacing: 5rpx
			text-indent: 5rpx
			font-size: 25rpx
			font-weight: 500
			color: black
		.avatar-button
			color: black
			margin-top: 20rpx
			border: 1px solid black
			width: 160rpx
			height: 40rpx
			line-height: 40rpx
			font-size: 22rpx
	.tab
		display: flex
		width: 750rpx
		justify-content: space-around
		background-color: white
		padding-bottom: 20rpx
		.item
			display: flex
			flex-direction: column
			align-items: center
			.itemIcon
				width: 80rpx
				height: 80rpx
			.itemName
				letter-spacing: 5rpx
				font-size: 20rpx
				color: black
	.other-tab
		display:flex
		flex-direction: column
		margin-top: 10rpx
		background-color: white
		.other-item
			width: 750rpx
			height: 90rpx
			display: flex
			justify-content: space-between
			align-items: center
			.other-itemName
				letter-spacing: 5rpx
				font-size: 25rpx
				color: black
				margin-left: 20rpx
				background-color:white
				width: 100%
				text-align: left
				padding: 0
			button::after 
				border: none
			.other-itemIcon
				width: 30rpx
				height: 30rpx
				margin-right: 20rpx
// 			.other-switch
// 				width: 30rpx
// 				height: 30rpx
// 				margin-right: 80rpx
			
	@keyframes rotate1 
		0%
			transform: translate(-50%, 1%) rotateZ(0deg)
		50%
			transform: translate(-50%, -2%) rotateZ(180deg)
		100%
			transform: translate(-50%, 1%) rotateZ(360deg)
	@keyframes rotate2
		0%
			transform: translate(-50%, 1%) rotateZ(0deg)
		25%
			transform: translate(-50%, 2%) rotateZ(0deg)
		50%
			transform: translate(-50%, -2%) rotateZ(180deg)
		75%
			transform: translate(-50%, 2%) rotateZ(360deg)
		100%
			transform: translate(-50%, 1%) rotateZ(360deg)
</style>
