<template>
	<view class="content">
		<map
			id="map" 
			class="map" 
			show-location
			:markers="covers"
			:include-points="covers"
			>
			<cover-view @click="changePosition" class="position">
				<cover-image src="../../../static/img/icon/position.png" class="position-icon"></cover-image>
			</cover-view>
			<cover-view class="view">
				<cover-view class="show-border">
					<block v-if="mainItem != null">
						<cover-view class="top-main">
							<cover-view class="top-title">临时停车 请多关照</cover-view>
							<cover-view class="top-card">
								<cover-view class="top-card-left">
									{{mainItem.prefix}}{{mainItem.address_code}}
								</cover-view>
								<cover-view class="top-card-point">·</cover-view>
								<block :key="index" v-for="(item,index) in mainItem.card">
									<cover-view class="top-card-right">{{item}}</cover-view>
								</block>
							</cover-view>
							<cover-view class="top-card-notice">
								<cover-view class="top-card-notice-button" @click="bindPhone">
									<cover-image class="top-card-notice-phone-icon" src="../../../static/img/icon/call.png"></cover-image>
									<cover-view>电话通知</cover-view>
								</cover-view>
								<cover-view class="top-card-notice-button" @click="sendMoveCarMsg">
									<cover-image class="top-card-notice-phone-icon" src="../../../static/img/icon/messageWhite.png"></cover-image>
									<cover-view>短信通知</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</block>
					<block :key="index" v-for="(item,index) in list">
						<cover-view class="top-other">
							<cover-image class="top-other-img" :src="item.img"></cover-image>
							<cover-view class="top-other-center">
								<cover-view class="top-other-title">{{item.title}}</cover-view>
								<!-- <cover-view class="top-other-desc">{{item.desc}}</cover-view> -->
							</cover-view>
							<cover-image class="top-other-call" src="../../../static/img/icon/plane.png" @click="chooseLocation(item.latitude, item.longitude)"></cover-image>
							<cover-image class="top-other-call" src="../../../static/img/icon/callblack.png" @click="callAdvPhone(item.phone)"></cover-image>
						</cover-view>
					</block>
				</cover-view>
				<cover-view @click="openScan" class="deep-button">
					<cover-image class="saoma" src="/static/img/icon/saoma.png"></cover-image>
					<cover-view>扫码挪车</cover-view>
				</cover-view>
			</cover-view>
        </map>
	</view>
</template>

<script>
	import {request, getQueryString, showToast} from 'common/js/common'
	import {getAdvList, getCalllMsg, bindPhone, sendMoveCarCode} from 'common/js/requestUrl'
	
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				mapContext: {},
				callout: {
					bgColor: 'red'
				},
				covers: [],
				list: [],
				mainItem: null,
				id: '',
				type: ''
			};
		},
		onShow(){
			this.mapContext = uni.createMapContext('map',this)
			uni.getLocation({
			  type: 'gcj02',
			  success: res => {
				this.latitude = res.latitude
				this.longitude = res.longitude
				this.covers.push({
					id: 0,
					latitude: this.latitude,
					longitude: this.longitude,
					iconPath: '/static/img/icon/Location.png',
					width: '60rpx',
					height: '60rpx',
					callout:{
						content: '我的位置',
						display: 'ALWAYS',
						padding: 10,
						x: -40,
						y: -40,
						bgColor: '#fff',
						borderRadius: 10
					},
				})
			  }
			})
			this.getAdvList()
		},
		onLoad(options){
			let link = decodeURIComponent(options.q)
			this.changeData(link)
		},
		methods: {
			changeData(link){
				let paramArr = link.split('=');
				if (paramArr.length == 2){
					var params = paramArr[1].split('_');
					this.id = params[0];
					this.type =params[1];
				}
				
				if(this.id && this.type){
					this.getCalllMsg()
				}
				
			},
			changePosition(){
				this.mapContext.moveToLocation()
			},
			openScan(){
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						this.changeData(res.result)
					}
				});
			},
			navicateToPath(url){
				uni.navigateTo({
					url: '/'+ url
				});
			},
			chooseLocation(latitude, longitude){
				uni.openLocation({
					latitude: parseFloat(latitude),
					longitude: parseFloat(longitude),
					success: function () {
						console.log('success');
					}
				});
			},
			getAdvList(){
				request(getAdvList, {},(res)=> {
					if(res.code == 200){
						this.list = res.result.data
						res.result.data.forEach((v) => {
							this.covers.push({
								id: v.id,
								latitude: v.latitude,
								longitude: v.longitude,
								iconPath: '/static/img/icon/Location.png',
								width: '60rpx',
								height: '60rpx',
								callout:{
									content: v.title,
									display: 'ALWAYS',
									padding: 10,
									x: -40,
									y: -40,
									bgColor: '#fff',
									borderRadius: 10
								},
							})
						})
					}
				})
			},
			getCalllMsg(){
				request(getCalllMsg,{
					id : this.id,
					type: this.type
				},(res) => {
					// 450表示未绑定
					if(res.code == 450){
						uni.navigateTo({
							url: '../callPhone/callPhone?id='+this.id+'&type='+this.type
						});
					}else if(res.code == 200){
						this.mainItem = res.result
						// this.needBindUser = false
						// this.cards = res.result.card
						// this.prefix = res.result.prefix
						// this.address_code = res.result.address_code
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
					if(res.code == 200){
						uni.makePhoneCall({
							phoneNumber: res.result //仅为示例
						});
					}
				})
			},
			sendMoveCarMsg(){
				request(sendMoveCarCode,{
					id : this.id,
					type: this.type,
					msg: '挡住了道路，请挪下车'
				},(res) => {
					if(res.code == 200){
						showToast('短信发送成功')
					}else{
						showToast(res.msg)
					}
				})
			},
			callAdvPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
page
	overflow: hidden
	.content
		width: 750upx
		.map
			position: fixed
			top:0
			width: 100%
			height: 100%
			display: flex
			justify-content: center
			.position
				position:absolute
				bottom: 100upx
				border-radius: 50%
				background-color:white
				width:100upx
				height: 100upx
				display:flex
				align-items: center
				justify-content: center
				box-shadow: 0 10upx 10upx #d1d1d1
				.position-icon
					width: 60upx
					height: 60upx
			.view
				position: fixed
				bottom: 20rpx
				left: 125rpx
				width: 500rpx
				display: flex
				justify-content: center
				flex-direction: column
				align-items: center
				.show-border
					border: 1px solid #d1d1d1
					box-shadow: 1px 1px 1px #d1d1d1
					border-radius: 10rpx
					width: 500rpx
					.top-other
						display: flex
						padding: 20rpx
						align-items: center
						background-color: white
						opacity: .8
						justify-content: space-around
						.top-other-img
							border-radius: 10rpx
							width: 60rpx
							height: 60rpx
						.top-other-call
							margin-right: 15rpx
							width: 40rpx
							height: 40rpx
						.top-other-center
							overflow: hidden
							padding: 0 20rpx
							flex: 1
							.top-other-title
								height: 60rpx
								line-height: 60rpx
								font-size: 30rpx
								font-weight: 500
								text-overflow: ellipsis
							.top-other-desc
								margin-top: 5rpx
								font-size: 18rpx
								text-overflow: ellipsis
					.top-main
						display: flex
						flex-direction: column
						align-items: center
						height : 200rpx
						padding: 20rpx
						background-color: $orange
						.top-title
							font-size: 40rpx
							font-weight: 300
						.top-card
							display: flex
							margin-top: 20rpx
							.top-card-left
								display: flex
								align-items: center
								justify-content: center
								font-size: 30rpx
								background-color: $little-color
								padding: 5rpx 10rpx
								border: 1px solid $border-color 
								border-radius: 10rpx
							.top-card-point
								padding: 5rpx 10rpx
							.top-card-right
								font-size: 30rpx
								background-color: $little-color
								padding: 5rpx 10rpx
								border: 1px solid $border-color 
								border-radius: 10rpx
								margin: 5rpx
						.top-card-notice
							display: flex
							margin-top: 20rpx
							width: 100%
							justify-content: space-around
							font-size: 25rpx
							.top-card-notice-button
								display: flex
								align-items: center
								background-color: black
								color: white
								padding: 10rpx 25rpx
								border-radius: 50rpx
								font-weight: 200
								.top-card-notice-phone-icon
									width: 35rpx
									height: 35rpx
									margin-right: 10rpx
				.deep-button
					display: flex
					align-items: center
					justify-content: center
					background-color: $orange
					width: 500rpx
					height: 50rpx
					padding: 10rpx 0
					margin-top: 20upx
					border-radius: 60upx
					.saoma
						width: 40rpx
						height: 40rpx
						margin-right: 10rpx
</style>
