<template>
	<view class="content">
		<map
			id="map" 
			class="map" 
			:latitude="latitude"
			:longitude="longitude"
			show-location
			:markers="covers"
			:include-points="covers"
			@click="cancleCall"
			>
			<cover-view @click="changePosition" class="position">
				<cover-image src="../../../static/img/icon/position.png" class="position-icon"></cover-image>
			</cover-view>
        </map>
		<block v-if="mainItem">
			<view class="car-msg">
				<view class="car-msg-top">
					<text class="car-msg-top-text">临时停车</text>
					<img class="car-msg-top-img" src="/static/img/icon/stop_car.png" alt="">
					<text class="car-msg-top-text">请多关照</text>
				</view>
				<view class="card">
					<view class="card-left">{{mainItem.prefix}}{{mainItem.address_code}}</view>
					<view class="card-point">•</view>
					<block v-bind:key="index" v-for="(item, index) in mainItem.card">
						<view class="card-single">{{item}}</view>
					</block>
				</view>
				<view class="tongzhi">
					<view class="tongzhi-phone"  @click="bindPhone">电话通知</view>
					<view class="tongzhi-msg"  @click="sendMoveCarMsg">短信通知</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="car-msg">
				<view class="adv-top">
					<img :src="adv.img">
					<view class="adv-top-right">
						<view class="adv-title">
							{{adv.title}}
							<!-- <text class="adv-title-left">{{adv.title}}</text>
							<text class="adv-title-right">{{adv.far}}km</text> -->
						</view>
						<view class="adv-desc">
							{{adv.desc}}
						</view>
						<view class="adv-tag">
							{{adv.tag}}
						</view>
						<view class="far">
							{{adv.far}}KM
						</view>
					</view>
				</view>
				<view class="tongzhi">
					<view class="tongzhi-phone"  @click="chooseLocation(adv.latitude, adv.longitude)">到这里去</view>
					<view class="tongzhi-msg"  @click="callAdvPhone(adv.phone)">联系电话</view>
				</view>
			</view>
		</block>
		<!-- active -->
		<view class="active">
			<!-- <view class="active-item">
				<img mode="aspectFit" class="active-item-img" src="/static/img/icon/ETC.png" alt="">
				<text class="active-item-text">ETC活动</text>
			</view>
			<view class="active-item">
				<img mode="aspectFit" class="active-item-img" src="/static/img/icon/chexian.png" alt="">
				<text class="active-item-text">车险</text>
			</view> -->
			<view class="active-item" @click="navToSendCard">
				<img mode="aspectFit" class="active-item-img" src="/static/img/icon/buy.png" alt="">
				<text class="active-item-text">购买挪车码</text>
			</view>
			<view class="active-item" @click="openScan">
				<img mode="aspectFit" class="active-item-img" src="/static/img/icon/saoma.png" alt="">
				<text class="active-item-text">扫码挪车</text>
			</view>
		</view>
		
		<!-- swiper -->
		<swiper 
			class="swiper" 
			indicator-dots="true" 
			autoplay="true"
			circular="true"
			>
			<block v-bind:key="index" v-for="(item, index) in adv_bottom">
				<swiper-item>
					<view class="swiper-item">
						<img mode="widthFix" :src="item.img" alt="">
					</view>
				</swiper-item>
			</block>
		</swiper>
		
		<!-- 展示您已获得优惠卷 -->
		<view class="showCoupon" v-if="showCoupon">
			<view class="center">
				<img src="/static/img/welcome_use.png" alt="">
				<view class="text-one">恭喜你</view>
				<view class="text-one">获得一张免费洗车券</view>
				<view @click="unShowCoupon" class="confirm">确认</view>
			</view>
		</view>
	</view>
</template>welcome_use.pngwelcome_use.png

<script>
	import {request, getQueryString, showToast, geoDistance} from 'common/js/common'
	import {getAdvOfIndex, getCalllMsg, bindPhone, sendMoveCarCode} from 'common/js/requestUrl'
	
	export default {
		data() {
			return {
				address: '',
				latitude: '',
				longitude: '',
				mapContext: {},
				called: false,//是否已经打过电话了
				callout: {
					bgColor: 'red'
				},
				covers: [],
				// list: [],
				adv: {
					far: 0,
					title: '',
					desc: '',
					img: '/static/img/icon/avatar.jpg',
					tag: ''
				},
				adv_bottom: [],
				mainItem: null,
				id: '',
				type: '',
				showCoupon: false,
			};
		},
		onShow(){
		},
		onLoad(options){
			if(options.showCoupon){
				this.showCoupon = true
			}
			
			this.mapContext = uni.createMapContext('map',this)
			// 其他
			// let link = decodeURIComponent(options.q)
			// this.changeData(link)
			this.id = uni.getStorageSync('index_id')
			this.type = uni.getStorageSync('index_type')
			// uni.removeStorageSync('index_id')
			// uni.removeStorageSync('index_type')
			
			uni.getLocation({
			  type: 'gcj02',
			  success: res => {
				uni.request({
					header:{
						"Content-Type": "application/text"
					},
					url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
					success:(re) => {  
						if(re.statusCode===200){
							this.address = re.data.result.address
						}
					 }
				});

				this.latitude = res.latitude
				this.longitude = res.longitude
			  },
			  complete: res => {
				this.loadData()
			  }
			})
		},
		methods: {
			async loadData(){
				await this.getAdvOfIndex()
				if(this.id && this.type){
					await this.getCalllMsg()
				}
			},
			cancleCall(){
				if(this.called){
					this.mainItem = null
				}
			},
			changeData(link){
				let paramArr = link.split('=');
				if (paramArr.length == 2){
					var params = paramArr[1].split('_');
					this.id = params[0];
					this.type = params[1];
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
			getAdvOfIndex() {
				return new Promise(resolve => {
					request(getAdvOfIndex, {},(res)=> {
						if(res.code == 200){
							this.adv = res.result.adv
							this.adv.far = geoDistance(this.adv.latitude, this.adv.longitude, this.latitude, this.longitude)
							this.adv_bottom = res.result.adv_bottom
						}
						resolve()
					})
				})
			},
			getCalllMsg(){
				return new Promise(resolve => {
					request(getCalllMsg,{
						id : this.id,
						type: this.type
					},(res) => {
						// 450表示未绑定
						if(res.code == 450){
							uni.navigateTo({
								url: '../callPhone/callPhone?id='+this.id+'&type='+this.type
							});
						}else if(res.code == 204){
							uni.switchTab({
								url: '../tabbar-5/tabbar-5'
							});	
						}else if(res.code == 200){
							this.mainItem = res.result
						}else{
							showToast(res.msg)
						}
						resolve()
					})
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
						this.called = true
					}
				})
			},
			sendMoveCarMsg(){
				request(sendMoveCarCode,{
					id : this.id,
					type: this.type,
					address: this.address,
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
			},
			navToWebView(id, title){
				uni.navigateTo({
					url: '../web-view/web-view?id='+ id +'&title=' + title
				});
			},
			navToSendCard(){
				uni.navigateTo({
					url: '../sendCard/sendCard'
				});	
			},
			unShowCoupon(){
				this.showCoupon = false
			},
			onShareAppMessage(res) {
				return {
				  title: '多少堵车事，历历不能忘',
				  imageUrl: '/static/img/icon/share.jpg'
				}
			}
		}
	};
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
page
	overflow: hidden
	.content
		width: 750rpx
		.showCoupon
			width: 100%
			height: 100vh
			background-color: rgba(0, 0, 0, .5)
			position: fixed
			top: 0
			z-index: 999
			display: flex
			align-items: center
			justify-content: center
			flex-direction: column
			.center
				width: 500rpx
				background-color: white
				display: flex
				align-items: center
				justify-content: center
				flex-direction: column
				border-radius: 10rpx
				padding-bottom: 40rpx
				overflow: hidden
				img
					width: 100%
					height: 400rpx
				.text-one
					font-weight: 900
					font-size: 45rpx
				.confirm
					margin-top: 30rpx
					background-color: red
					color: white
					padding: 5rpx 100rpx
					border-radius: 20rpx
		.swiper
			height: 150rpx
			width: 600rpx
			margin: 0 auto
			.swiper-item
				height: 150rpx
				border-radius: 30rpx
				overflow: hidden
		.active
			display: flex
			justify-content: space-around
			width: 600rpx
			margin: -60rpx auto 0 auto
			padding: 30rpx
			.active-item
				display: flex
				flex-direction: column
				align-items: center
				justify-content: center
				.active-item-img
					width: 70rpx
					height: 70rpx
				.active-item-text
					font-size: 20rpx
		.car-msg
			width: 600rpx
			background: linear-gradient(to bottom, white , rgb(239,239,239))
			position: relative
			bottom: 70rpx
			margin: 0 auto
			padding: 30rpx
			border-radius: 20rpx
			height: 280rpx
			.adv-top
				height: 200rpx
				display: flex
				padding: 0 10rpx
				align-items: center
				img
					box-shadow: 0 0 15rpx #888888
					width: 130rpx
					height: 130rpx
					border-radius: 20rpx
					background-color: white
				.adv-top-right
					display: flex
					flex-direction: column
					flex: 1
					// height: 200rpx
					padding-left: 30rpx
					.adv-title
						font-size: 35rpx
						overflow: hidden;
						font-weight: 900
						.adv-title-right
							width: 70rpx
							font-size: 25rpx
					.far
						color: grey
						font-size: 25rpx
					.adv-desc
						color: grey
						display: -webkit-box      //定义为自适应布局    
						word-break: break-all
						text-overflow: ellipsis  //超出文字用省略号代替
						overflow: hidden            //多出不分隐藏
						padding: 10rpx 0
						font-size: 20rpx
						-webkit-box-orient: vertical    //竖直方向的超出和隐藏
						-webkit-line-clamp: 2   //设定行数为2
					.adv-tag
						color: red
						font-size: 25rpx
			.tongzhi
				display: flex
				justify-content: space-around
				margin-top: 40rpx
				.tongzhi-phone
					width: 250rpx
					height: 70rpx
					line-height: 70rpx
					text-align:center
					background: linear-gradient(to bottom, rgb(255,122, 111) , rgb(255, 59, 74))
					color: white
					border-radius: 10rpx
					box-shadow: -5rpx 5rpx 10rpx #d1d1d1
				.tongzhi-msg
					width: 250rpx
					height: 70rpx
					line-height: 70rpx
					text-align:center
					background: linear-gradient(to bottom, rgb(198,130, 106) , rgb(168, 103, 79))
					color: white
					border-radius: 10rpx
					box-shadow: -5rpx 5rpx 10rpx #d1d1d1
			.card
				display: flex
				align-items: center
				justify-content: center
				margin-top: 40rpx
				.card-left
					width: 100rpx
					text-align: center
					font-size: 40rpx
					border: 1px solid grey
					border-radius: 10rpx
					letter-spacing: 10rpx
					padding: 3rpx 10rpx
				.card-point
					letter-spacing: 10rpx
					font-size: 40rpx
					padding: 0 10rpx 0 20rpx
				.card-single
					font-size: 40rpx
					border: 1px solid grey
					border-radius: 10rpx
					margin: 0 10rpx
					width: 50rpx
					text-align: center
			.car-msg-top
				display: flex
				justify-content: center
				align-items: center
				.car-msg-top-img
					width: 40rpx
					height: 40rpx
					margin: 0 20rpx
				.car-msg-top-text
					font-size: 35rpx
					font-weight: 300
		.map
			width: 750rpx
			height: calc(100vh - 600rpx)
			display: flex
			justify-content: center
			.position
				position:absolute
				bottom: 100rpx
				right: 20rpx
				border-radius: 50%
				background-color:white
				width:60upx
				height: 60upx
				display:flex
				align-items: center
				justify-content: center
				box-shadow: 0 10upx 10upx #d1d1d1
				.position-icon
					width: 40upx
					height: 40upx
			.position-saoma
				bottom: 300rpx
				background-color: $orange
			.view
				position: fixed
				bottom: 50rpx
				left: 75rpx
				width: 580rpx
				display: flex
				justify-content: center
				flex-direction: column
				align-items: center
				.show-border
					// border: 1px solid #d1d1d1
					box-shadow: 1px 0px 1px #d1d1d1
					border-radius: 10rpx
					width: 580rpx
					.top-other
						display: flex
						padding: 20rpx
						align-items: center
						background-color: white
						opacity: .8
						justify-content: space-around
						.top-other-img
							border-radius: 10rpx
							width: 70rpx
							height: 70rpx
						.top-other-call-container
							display: flex
							align-items: center
							width: 80rpx
							height: 70rpx
							.top-other-call
								width: 50rpx
								height: 50rpx
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
								width: 50rpx
								display: flex
								align-items: center
								justify-content: center
								font-size: 30rpx
								background-color: $little-color
								padding: 5rpx 10rpx
								border: 1px solid $border-color 
								border-radius: 10rpx
								margin: 5rpx 0
								letter-spacing: 5rpx
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
