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
		<!-- 内容 -->
		<view class="index-container">
			<view class="top-box">
				<view class="top-box-item">
					<image src="/static/img/icon/bycard.png"></image>
					<text>代理加盟</text>
				</view>
				<view class="top-box-item">
					<image src="/static/img/icon/bycard.png"></image>
					<text>VIP会员</text>
				</view>
				<view class="top-box-item">
					<image src="/static/img/icon/bycard.png"></image>
					<text>购买挪车码</text>
				</view>
				<view class="top-box-item">
					<image src="/static/img/icon/bycard.png"></image>
					<text>一键挪车</text>
				</view>
			</view>
			<block v-if="mainItem">
				<view class="stop-car">
					<view class="top">
						临时停车 请多关照
					</view>
					<view class="middle">
						<view class="card-left">{{mainItem.prefix}}{{mainItem.address_code}}</view>
						<view class="card-point">•</view>
						<block v-bind:key="index" v-for="(item, index) in mainItem.card">
							<view class="card-single">{{item}}</view>
						</block>
					</view>
					<view class="bottom">
						<view class="tongzhi-phone"  @click="bindPhone">电话通知</view>
						<view class="tongzhi-msg"  @click="sendMoveCarMsg">短信通知</view>
					</view>
				</view>
			</block>
			<block v-else>
				<swiper class="swiper" indicator-dots="true" autoplay="true">
					<block v-bind:key="index" v-for="(item,index) in adv_bottom">
						<swiper-item>
							<image mode="aspectFill" :src="item.img"></image>
						</swiper-item>
					</block>
				</swiper>
			</block>
			
			<view class="fujin">
				<view class="line"></view>
				<text>附近洗车店</text>
			</view>
			
			<!-- 洗车列表 -->
			<carList :list="washCarShops"></carList>
		</view>

	</view>
</template>

<script>
	import {request, getQueryString, showToast, geoDistance} from 'common/js/common'
	import {washCarList, getAdvOfIndex, getCalllMsg, bindPhone, sendMoveCarCode} from 'common/js/requestUrl'
	import carList from '../../carlist-template/carlist-template.vue'
	
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
				adv: {
					far: 0,
					title: '',
					desc: '',
					img: '/static/img/icon/avatar.jpg',
					tag: ''
				},
				adv_bottom: [],
				mainItem: null,
				washCarShops: [],
				id: '',
				type: '',
			};
		},
		components:{carList},
		onShow(){
		},
		onLoad(options){			
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
				await this.getWashCarList()
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
			getWashCarList() {
				return new Promise(resolve => {
					request(washCarList, {},(res)=> {
						if(res.code == 200){
							let washCarShops = res.result.data
							washCarShops.forEach((item,index) =>{
								washCarShops[index].far = geoDistance(item.latitude, item.longitude, this.latitude, this.longitude)
							})
							this.washCarShops = washCarShops
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
	.content
		width: 750rpx
		.map
			width: 750rpx
			height: 400rpx
			display: flex
			justify-content: center
			.position
				position:absolute
				bottom: 150rpx
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
		.index-container
			padding: 0 30rpx
			position: relative
			top: -110rpx
			.top-box
				display: flex
				z-index: 999
				justify-content: space-around
				align-items: center
				background-color: white
				padding: 20rpx
				border-radius: 20rpx
				.top-box-item
					display: flex
					flex-direction: column
					align-items: center
					image
						width: 60rpx
						height: 60rpx
					text
						margin-top: 10rpx
						font-size: 20rpx
		.swiper
			margin-top: 20rpx
			image
				width: 100%
				height: 300rpx
				border-radius: 10rpx
		.stop-car
			margin-top: 20rpx
			width: 100%
			height: 300rpx
			border-radius: 10rpx
			background-color: white
			display: flex
			flex-direction: column
			box-shadow: 0 0 15rpx #ccc 
			.top
				height: 100rpx
				text-align: center
				line-height: 100rpx
				margin: 0 auto
			.middle
				height: 100rpx
				background-color: rgb(250, 250, 250)
				display: flex
				align-items: center
				justify-content: center
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
			.bottom
				display: flex
				justify-content: space-around
				align-items: center
				height: 100rpx
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
		.fujin
			display: flex
			margin: 30rpx 0
			.line
				border-right: 8rpx solid grey
			text
				margin-left: 10rpx
				font-size: 30rpx
</style>
