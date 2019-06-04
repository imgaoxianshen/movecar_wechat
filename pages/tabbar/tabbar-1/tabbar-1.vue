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
					<block v-if="list[0]">
						<cover-view class="top-main">
							<cover-view class="top-top">
								<cover-image class="top-img" :src="list[0].img"></cover-image>
								<cover-view class="top-neirong">
									<cover-view class="top-title">{{list[0].title}}</cover-view>
									<cover-view class="top-desc">{{list[0].desc}}</cover-view>
								</cover-view>
								<!-- <view class="">3.11km</view> -->
							</cover-view>
							<cover-view class="top-bottom">
								<cover-view></cover-view>
								<cover-view class="top-bottom-right" @click="chooseLocation">
									<cover-view class="top-bottom-redirect">▶</cover-view>
									<cover-view class="top-bottom-to">到这去</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</block>
					<block :key="index" v-for="(item,index) in list">
						<cover-view class="top-other">
							<cover-image class="top-other-img" :src="item.img"></cover-image>
							<cover-view class="top-other-center">
								<cover-view class="top-other-title">{{item.title}}</cover-view>
								<cover-view class="top-other-desc">{{item.desc}}</cover-view>
							</cover-view>
						</cover-view>
					</block>
				</cover-view>
				<cover-view @click="openScan" class="deep-button">
					<cover-image class="saoma" src="/static/img/icon/saoma.png"></cover-image>
					<cover-view>扫码挪车{{id}}{{type}}</cover-view>
				</cover-view>
			</cover-view>
        </map>
	</view>
</template>

<script>
	import {request, getQueryString} from 'common/js/common'
	import {getAdvList} from 'common/js/requestUrl'
	
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
				mainItem: {},
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
		},
		onLoad(options){
			this.getAdvList()

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
			chooseLocation(){
				uni.openLocation({
					latitude: 27.9539300000,
					longitude: 120.5989070000,
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
						background-color: white
						opacity: .8
						justify-content: space-around
						.top-other-img
							border-radius: 10rpx
							width: 60rpx
							height: 60rpx
						.top-other-center
							overflow: hidden
							padding: 0 20rpx
							flex: 1
							.top-other-title
								font-size: 30rpx
								font-weight: 500
							.top-other-desc
								margin-top: 5rpx
								font-size: 18rpx
								text-overflow: ellipsis
					.top-main
						display: flex
						flex-direction: column
						height : 200rpx
						padding: 20rpx
						background-color: $orange
						.top-bottom
							display: flex
							justify-content: space-between
							margin-top: 20rpx
							.top-bottom-right
								display: flex
								align-items: center
								.top-bottom-redirect
									font-size: 40rpx
									text-align: center
									width: 50rpx
									height: 50rpx
									line-height: 50rpx
									padding: 5rpx 0rpx 5rpx 10rpx 
									border-radius: 50%
									box-shadow: 1px 1px 1px #d1d1d1
									z-index: 999
									background-color: #fff
								.top-bottom-to
									height: 40rpx
									line-height: 40rpx
									position: relative
									box-shadow: 1px 1px 1px #d1d1d1
									left: -20rpx
									padding: 0 20rpx
									border-radius: 20rpx
									background-color: #fff
									font-size: 20rpx
						.top-top
							display: flex
							justify-content: space-around
							.top-img
								display: inline-block
								border-radius: 10rpx
								width: 100rpx
								height: 100rpx
							.top-neirong
								display: inline-block
								width: 200rpx
								overflow: hidden
								padding: 0 20rpx
								flex: 1
								.top-title
									font-size: 25rpx
									font-weight: 800
								.top-desc
									margin-top: 20rpx
									font-size: 20rpx
									white-space: normal
									text-overflow: ellipsis
									word-break: break-all
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
