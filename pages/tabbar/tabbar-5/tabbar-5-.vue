<template>
	<view>
		<view class="background"></view>
		<view class="index-container">
			<view class="userInfo">
				<view class="top">
					<view class="top-left">
						<image class="avatar" :src="avatarUrl?avatarUrl:avatar" mode="aspectFill"></image>
						<view class="top-left-name">
							<view class="avatar-container">
								<text class="avatar-name">{{nickName ? nickName : '帮忙族'}}</text>
								<block v-if="noticeStatus">
									<text class="darao-icon">免打扰</text>
								</block>
							</view>
							<block v-if="card_expire_time">
								<text class="to-time">到期时间：{{card_expire_time}}</text>
							</block>
							<block v-else>
								<text class="to-time">到期时间：暂无</text>
							</block>
						</view>
					</view>
					<view class="top-right-container">
						<view class="top-right" @click="navToAuth">
							<image class="refreash-icon" src="../../../static/img/icon/refreash.png"></image>
							<text class="refreash-text">更新头像</text>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="bottom-item">
						<view class="bottom-item-title">车辆型号</view>
						<view class="bottom-item-carname">{{choosedName}}</view>
					</view>
					<view class="line"></view>
					<view class="bottom-item">
						<view class="bottom-item-title">使用中车牌</view>
						<view v-if="choosedCard.length> 0" class="bottom-item-carname">{{choosedCard}}</view>
						<view v-else class="bottom-item-carname">暂无车牌</view>
					</view>
					<view class="line"></view>
					<view class="bottom-item">
						<view class="bottom-item-title">手机号码</view>
						<view v-if="phone.length> 0" class="bottom-item-carname">{{phone}}</view>
						<view v-else class="bottom-item-carname">暂无手机号</view>
					</view>
				</view>
			</view>
			<view class="tab">
				<block v-for="(item,key) in itemList" :key="key">
					<view @click="itemClick(item.navUrl)" class="item">
						<block v-if="item.text=='优惠券' && coupon_count > 0">
							<view class="dot">{{coupon_count}}</view>
						</block>
						<image class="itemIcon" :src="item.icon"></image>
						<text class="itemName">{{item.text}}</text>
					</view>
				</block>
			</view>

			<view class="other-item">
				<text class="other-itemName">消息免打扰</text>
				<switch :checked="noticeStatus" @change="switchChange" color="#FFDA44"/>
			</view>
			<!-- <view class="other-item">
				<button open-type="contact" class="other-itemName">消费记录</button>
				<image class="other-itemIcon" :src="arrowRight"></image>
			</view> -->
			<view class="other-item">
				<button open-type="contact" class="other-itemName">联系客服</button>
				<image class="other-itemIcon" :src="arrowRight"></image>
			</view>
			<view class="other-item" @click="navToHelp">
				<view class="other-itemName">用户帮助</view>
				<image class="other-itemIcon" :src="arrowRight"></image>
			</view>
			<view class="other-item" @click="navToJoinUs">
				<view class="other-itemName">加入我们</view>
				<image class="other-itemIcon" :src="arrowRight"></image>
			</view>
			<view class="other-item" @click="callPhone">
				<view class="other-itemName">服务热线</view>
				<view class="other-itemPhone">400-858-8878</view>
			</view>
			<view v-if="card_id > 0" class="other-item marginBottom" @click="unBindCard">
				<view class="other-itemName">解除绑定</view>
				<image class="other-itemIcon" :src="arrowRight"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {changeNoticeStatus, getUserInfo, unBindCard} from 'common/js/requestUrl'
	import {request, showToast} from 'common/js/common'
	import avatar from 'static/img/icon/avatar.jpg'
	import arrowRight from 'static/img/icon/arrow-right.png'
	import qrcode from 'static/img/icon/qrcode.png'
	// import bankcard from 'static/img/icon/card.png'
	// import huiyuan from 'static/img/icon/huiyuan.png'
	// import order from 'static/img/icon/order.png'
	// import nonotice from 'static/img/icon/nonotice.png'
	// import youhui from 'static/img/icon/youhui.png'

	export default {
		data() {
			return {
				avatar,
				arrowRight,
				card_id: -1,
				nickName: '帮忙族',
				avatarUrl: null,
				card_expire_time: '',
				noticeStatus: false,
				choosedCard: '',
				choosedName: '',
				phone: '',
				coupon_count: 0,//剩余可用优惠卷数量
				itemList: [{
					text: "我的车牌",
					url: 'chepai',
					icon: '/static/img/icon/card.png',
					navUrl: '../cardList/cardList'
				},
				// {
				// 	text: "我的二维码",
				// 	navUrl: '../getCode/getCode',
				// 	icon: qrcode
				// },
				// {
				// 	text: "会员中心",
				// 	navUrl: '../getCode/getCode',
				// 	icon: huiyuan
				// },
				{
					text: "购买挪车码",
					navUrl: '../sendCard/sendCard',
					icon: '/static/img/icon/bycard.png'
				},{
					text: "我的订单",
					navUrl: '../orderList/orderList',
					icon: '/static/img/icon/order.png'
				},{
					text: "优惠券",
					navUrl: '../coupon/coupon',
					icon: '/static/img/icon/youhui.png'
				}]
			}
		},
		onShow(){
			this.getUserInfo()
		},
		onLoad(){

		},
		methods: {
			...mapMutations(['getUserMessage','loginOrLoginOut']),
			getUserInfo(){
				request(getUserInfo, {},(res)=> {
					if(res.code == 200){
						this.nickName = res.result.nickname
						this.avatarUrl = res.result.avatar
						this.noticeStatus = res.result.notice_status == 1 ? true : false
						this.card_id = res.result.card_id
						this.card_expire_time = res.result.card_expire_time
						this.coupon_count = res.result.coupon_count
						if(res.result.choosedCard != null){
							this.choosedCard = res.result.choosedCard.prefix
								+ res.result.choosedCard.address_code + '·' + res.result.choosedCard.card
							this.phone = res.result.choosedCard.phone
							this.choosedName = res.result.choosedCard.name ? res.result.choosedCard.name : '暂无'
						}
					}
				})
			},
			itemClick(navUrl){
				uni.navigateTo({
					url: navUrl
				});
			},
			navToAuth(){
				uni.navigateTo({
					url: '../authorize/authorize'
				})
			},
			navToHelp(){
				uni.navigateTo({
					url: '../help/help'
				});
			},
			navToJoinUs(){
				uni.navigateTo({
					url: '../joinUs/joinUs'
				});
			},
			switchChange(res){
				let status = res.detail.value == true ? 1:0
				request(changeNoticeStatus,{
					status
					},(res) => {
						if(res.code == 200){
							if(status == 1){
								this.noticeStatus = true
								showToast('开启免打扰模式成功')
							}else{
								this.noticeStatus = false
								showToast('关闭免打扰模式成功')
							}
						}
					})
			},
			unBindCard(){
				uni.showModal({
					title: '重要操作',
					content: '请确认是否解绑您的挪车码，解绑之后您原来的挪车码将不再能通知到您',
					success:  (res) => {
						if (res.confirm) {
							request(unBindCard,{},(res) => {
								if(res.code == 200){
									this.getUserInfo()
									showToast('解绑成功，您可以绑定您原来的挪车码或者绑定一张新的挪车码')
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '400-858-8878' //仅为示例
				});
			},
			onShareAppMessage(res) {
				return {
				  title: '多少堵车事，历历不能忘',
				  imageUrl: '/static/img/icon/share.jpg'
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.background
		position: fixed
		align-items: center
		height: 300rpx
		top: 0
		width: 750rpx
		background: linear-gradient(to right, rgb(255,214, 23) , rgb(250, 255, 136))
	.index-container
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		width: 750rpx
		margin-top: 80rpx
		padding-bottom: 30rpx
		.userInfo
			box-shadow: -5rpx 5rpx 10rpx #d1d1d1
			display: flex
			flex-direction: column
			z-index: 999
			background-color: white
			width: 620rpx
			border-radius: 15rpx
			padding: 30rpx
			.bottom
				margin-top: 40rpx
				display: flex
				justify-content: space-around
				.bottom-item
					display: flex
					flex-direction: column
					.bottom-item-title
						font-size: 26rpx
						font-weight: 400
					.bottom-item-carname
						font-size: 30rpx
						font-weight: 400
				.line
					border-right: 5rpx solid #d1d1d1
			.top
				display: flex
				justify-content: space-between
				.top-right-container
					display: flex
					align-items: center
					.top-right
						position: relative
						right: -30rpx
						padding: 5rpx 20rpx
						border-radius: 30rpx 0 0 30rpx
						display: flex
						justify-content: center
						align-items: center
						height: 50rpx
						background: linear-gradient(to right, rgb(255,214, 23) , rgb(250, 255, 136))
						.refreash-icon
							width: 30rpx
							height:30rpx
						.refreash-text
							font-size: 25rpx
							margin-left: 10rpx
				.top-left
					display: flex
					justify-content: space-around
					margin-left: 20rpx
					.top-left-name
						display: flex
						flex-direction: column
						justify-content: center
						margin-left: 30rpx
						.avatar-name
							font-weight: 800
							font-size: 30rpx
						.darao-icon
							border-radius: 30rpx
							margin-left: 10rpx
							padding: 3rpx 15rpx
							color: white
							font-size: 20rpx
							background-color: rgb(0, 255, 1)
						.to-time
							font-size: 26rpx
					.avatar
						border-radius: 50%
						width: 100rpx
						height: 100rpx
		.tab
			display: flex
			width: 620rpx
			border-radius: 15rpx
			padding: 30rpx
			justify-content: space-around
			background-color: white
			padding-bottom: 20rpx
			box-shadow: -5rpx 5rpx 10rpx #d1d1d1
			margin-top: 30rpx
			z-index: 9999
			.item
				display: flex
				flex-direction: column
				align-items: center
				position: relative
				.dot
					position: absolute
					top: -10rpx
					right: -10rpx
					border-radius: 50%
					background-color: red
					color: white
					width: 30rpx
					text-align: center
					line-height: 30rpx
					height: 30rpx
					font-size: 20rpx
				.itemIcon
					width: 80rpx
					height: 80rpx
				.itemName
					letter-spacing: 5rpx
					font-size: 20rpx
					color: black
					margin-top: 20rpx
		.marginBottom
			margin-bottom: 50rpx
		.other-item
			z-index: 999
			width: 620rpx
			height: 60rpx
			display: flex
			border-radius: 15rpx
			padding: 10rpx 30rpx
			justify-content: space-around
			align-items: center
			background-color: white
			box-shadow: -5rpx 5rpx 10rpx #d1d1d1
			margin-top: 20rpx
			.other-itemPhone
				letter-spacing: 5rpx
				font-size: 25rpx
				color: black
				width: 400rpx
				background-color:white
				font-weight: 300
				padding: 0
			.other-itemName
				letter-spacing: 5rpx
				font-size: 25rpx
				color: black
				margin-left: 20rpx
				background-color:white
				font-weight: 300
				width: 100%
				text-align: left
				padding: 0
			button::after 
				border: none
			.other-itemIcon
				width: 30rpx
				height: 30rpx
				margin-right: 20rpx
</style>
