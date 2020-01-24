<template>
	<view class="container">
		<view class="top-box">
			<view class="user-msg">
				<view class="user-info">
					<image :src="avatarUrl"></image>
					<view class="name">
						<view class="name-top">
							<text>{{nickName}}</text>
							<button open-type="getUserInfo"  @getuserinfo="getUserInfoClick">
								<image src="/static/img/icon/refreash.png"></image>
							</button>
						</view>
						<view class="name-bottom">
							用户id:1233333
						</view>
					</view>
				</view>
				<view>222</view>
			</view>
			<view class="user-belongs">
				<view class="user-belongs-item" @click="navToWallet">
					<image src="/static/img/icon/card.png"></image>
					<text class="name">钱包</text>
					<text class="desc">0.00元</text>
				</view>
				<view class="user-belongs-item" @click="navToCoupon">
					<image src="/static/img/icon/youhui.png"></image>
					<text class="name">优惠卷</text>
					<text class="desc">{{coupon_count}}张</text>
				</view>
				<view class="user-belongs-item" @click="navToOrderList">
					<image src="/static/img/icon/order.png"></image>
					<text class="name">订单</text>
					<text class="desc"></text>
				</view><view class="user-belongs-item">
					<image src="/static/img/icon/youhui.png"></image>
					<text class="name">勿扰模式</text>
					<text class="desc">开</text>
				</view>
			</view>
		</view>
		<view class="car-container">
			<view class="car-top">
				<view class="car-left">
					正在使用车辆
				</view>
				<view class="car-right" @click="navToCard">
					<view class="dot">•</view>
					<view>车辆管理</view>
					<image src="/static/img/arrow.png"></image>
				</view>
			</view>
			<view class="car-bottom">
				<view class="car-bottom-item">
					<view class="car-bottom-item-val">
						{{choosedName}}
					</view>
					<view class="car-bottom-item-key">
						车辆型号
					</view>
				</view>
				<view class="car-bottom-item">
					<view v-if="choosedCard.length> 0" class="car-bottom-item-val">{{choosedCard}}</view>
					<view v-else class="car-bottom-item-val">暂无车牌</view>
					<view class="car-bottom-item-key">
						车辆牌照
					</view>
				</view>
				<view class="car-bottom-item">
					<view v-if="phone.length> 0" class="car-bottom-item-val">{{phone}}</view>
						<view v-else class="car-bottom-item-val">暂无手机号</view>
					<view class="car-bottom-item-key">
						联系电话
					</view>
				</view>
			</view>
		</view>
		<!-- 下面的模块 -->
		<view class="other-container">
			<view class="adv-container">
				广告位
			</view>
			<view class="tuiguang-container">
				<view class="tuiguang-title">推广专区</view>
				<view class="tuiguang-main">
					<view class="tuiguang-item" @click="navToInvite">
						<image src="/static/img/icon/card.png"></image>
						<text>邀请好友</text>
					</view>
					<view class="tuiguang-item">
						<image src="/static/img/icon/card.png"></image>
						<text>我的好友</text>
					</view>
					<view class="tuiguang-item">
						<image src="/static/img/icon/card.png"></image>
						<text>红袖招</text>
					</view>
					<view class="tuiguang-item">
						<image src="/static/img/icon/card.png"></image>
						<text>推广规则</text>
					</view>
				</view>
			</view>
			<view class="other-button-container">
				<button open-type="contact" class="other-button-item">
					<text>联系客服</text>
					<image src="/static/img/arrow.png"></image>
				</button>
				<view class="other-button-item" @click="navToJoinUs">
					<text>加盟代理</text>
					<image src="/static/img/arrow.png"></image>
				</view>
				<view class="other-button-item" @click="navToHelp">
					<text>用户帮助</text>
					<image src="/static/img/arrow.png"></image>
				</view>
				<view class="other-button-item" @click="callPhone">
					<text>服务热线</text>
					<text>400-858-8878</text>
				</view>
				<view v-if="card_id > 0" class="other-button-item" @click="unBindCard">
					<text>解除绑定</text>
					<image src="/static/img/arrow.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {changeNoticeStatus, getUserInfo, unBindCard, updateUserInfo} from 'common/js/requestUrl'
	import {request, showToast} from 'common/js/common'
	import arrowRight from 'static/img/icon/arrow-right.png'
	import qrcode from 'static/img/icon/qrcode.png'

	export default {
		data() {
			return {
				arrowRight,
				card_id: -1,
				nickName: '帮忙族',
				avatarUrl: '/static/img/icon/avatar.jpg',
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
			getUserInfo(){
				request(getUserInfo, {},(res)=> {
					if(res.code == 200){
						if(res.result.nickname){
							this.nickName = res.result.nickname
						}
						if(res.result.avatar){
							this.avatarUrl = res.result.avatar
						}
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
			navToCard(){
				uni.navigateTo({
					url: '../cardList/cardList'
				});
			},
			navToJoinUs(){
				uni.navigateTo({
					url: '../joinUs/joinUs'
				});
			},
			navToWallet() {
				uni.navigateTo({
					url: '/pages/wallet/wallet'
				})
			},
			navToInvite(){
				uni.navigateTo({
					url: '/pages/invite/invite'
				})
			},
			navToCoupon() {
				uni.navigateTo({
					url: '../coupon/coupon'
				})
			},
			navToOrderList() {
				uni.navigateTo({
					url: '../orderList/orderList'
				})
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
					phoneNumber: '400-858-8878'
				});
			},
			onShareAppMessage(res) {
				return {
				  title: '多少堵车事，历历不能忘',
				  imageUrl: '/static/img/icon/share.jpg'
				}
			},
			getUserInfoClick(res) {
				let userInfo = res.detail.userInfo
				if(userInfo){
					request(updateUserInfo, {
						nickname: userInfo.nickName, 
						avatar: userInfo.avatarUrl,
						province: userInfo.province
					}, (res)=>{
						this.getUserInfo()
						showToast('更新用户信息成功')
					});
				}
			},
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.container
		width: 750rpx
		.top-box
			// background: linear-gradient(to bottom ,rgb(250,208, 68) , rgb(233, 170, 51))
			background-color: #FFDA44
			.user-msg
				display: flex
				padding: 30rpx 50rpx
				height: 120rpx
				align-items: center
				justify-content: space-between
				border-bottom: 1rpx solid #ccc
				.user-info
					display: flex
					align-items: center
					image
						width: 90rpx
						height: 90rpx
						border-radius: 10rpx
					.name
						display:flex
						flex-direction: column
						height: 80rpx
						margin-left: 20rpx
						.name-top
							display: flex
							align-items: center
							text
								font-size: 35rpx
							button
								line-height: normal
								background-color: transparent
								padding: 0
								image
									margin-left: 10rpx
									width: 30rpx
									height: 30rpx
							button::after
								border: none
						.name-bottom
							margin-top: 15rpx
							font-size: 20rpx
			.user-belongs
				display: flex
				align-items:center
				justify-content: space-around
				height: 190rpx
				.user-belongs-item
					display: flex
					flex-direction: column
					align-items: center
					width: 150rpx
					image
						width: 70rpx
						height: 70rpx
					.name
						margin-top: 15rpx
						font-size: 22rpx
					.desc
						height: 10rpx
						font-size: 20rpx
		.car-container
			width: 750rpx
			background-color: white
			.car-top
				display: flex
				justify-content: space-between
				align-items: center
				padding: 10rpx 40rpx
				border: 1rpx solid #ccc
				.car-left
					font-size: 20rpx
				.car-right
					font-size: 20rpx
					display: flex
					align-items: center
					.dot
						color: red
						font-weight: 900
						font-size: 30rpx
					view
						margin: 0 5rpx
					image
						width: 25rpx
						height: 25rpx
			.car-bottom
				display: flex
				align-items: center
				justify-content: space-around
				.car-bottom-item
					width: 200rpx
					height: 100rpx
					display: flex
					flex-direction: column
					align-items: center
					justify-content: center
					.car-bottom-item-key
						font-size: 15rpx
						margin-top: 10rpx
					.car-bottom-item-val
						font-size: 27rpx
		.other-container
			width: 710rpx
			padding-bottom: 40rpx
			margin: 0 auto
			.adv-container
				width: 100%
				height: 150rpx
				line-height: 150rpx
				background-color: white
				text-align: center
				border-radius: 10rpx
				margin-top: 20rpx
				box-shadow: -5rpx 5rpx 10rpx #d1d1d1
			.tuiguang-container
				background-color: white
				margin-top: 20rpx
				border-radius: 10rpx
				box-shadow: -5rpx 5rpx 10rpx #d1d1d1
				.tuiguang-title
					font-size: 30rpx
					padding: 15rpx 30rpx
					font-weight: 900
					border-bottom: 1rpx solid #ccc
				.tuiguang-main
					margin: 30rpx 0
					display: flex
					padding-bottom: 20rpx
					align-items: center
					justify-content: space-around
					.tuiguang-item
						display: flex
						flex-direction: column
						align-items: center
						image
							width: 80rpx
							height: 80rpx
						text
							font-size: 20rpx
							margin-top: 10rpx
			.other-button-container
				background-color: white
				margin-top: 20rpx
				border-radius: 10rpx
				box-shadow: -5rpx 5rpx 10rpx #d1d1d1
				.other-button-item
					display: flex
					align-items: center
					justify-content: space-between
					padding: 20rpx
					text
						font-size: 30rpx
					image
						width: 20rpx
						height: 20rpx
				.other-button-item:not(:last-child)
					border-bottom: 1rpx solid #ccc
				button
					line-height: normal
					background-color: white
				button::after
					border: none
</style>