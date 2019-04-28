<template>
	<view class="content">
		<map id="map" class="map" show-location>
			<!-- <cover-view class="top">asdasd</cover-view> -->
			<cover-view @click="changePosition" class="position">
				<cover-image src="../../../static/img/icon/position.png" class="position-icon"></cover-image>
			</cover-view>
			<cover-view class="deep">
				<cover-view class="saoma" @click="openScan">
					<cover-image src="../../../static/img/icon/saoma.png" class="saoma-icon"></cover-image>
					<cover-view class="saoma-text">扫码挪车</cover-view>
				</cover-view>
				<button @click="navicateToSendCard" class="deep-button">申请邮寄挪车码</button>
			</cover-view>
        </map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				mapContext: {}
			};
		},
		onReady(){
			this.mapContext = uni.createMapContext('map',this)
			this.changePosition()
		},
		methods: {
			changePosition(){
				this.mapContext.moveToLocation()
			},
			openScan(){
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						this.navicateToPath(res.path)
					}
				});
			},
			navicateToPath(url){
				uni.navigateTo({
					url: '/'+ url
				});
			},
			navicateToSendCard(){
				uni.navigateTo({
					url: '../sendCard/sendCard'
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
// 			.map-container
// 					position: relative
// 					height: 100%
// 					width: 100%
// 					display: flex
// 					justify-content: center
				.position
					position:absolute
					bottom: 400upx
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
				.deep
					position:absolute
					bottom: 0
					width:1500upx
					height:1500upx
					background-color: white
					transform: translate(-25%,75%)
					border-radius: 100%
					display: flex
					flex-direction: column
					align-items: center
					box-shadow: 0 10upx 10upx #d1d1d1
					.saoma
						display:flex
						flex-direction: column
						align-items: center
						justify-content: center
						background: $base-color
						width: 200upx
						height: 200upx
						border-radius: 50%
						margin-top: 50upx
						.saoma-icon
							width: 100upx
							height: 100upx
						.saoma-text
							color:black
					.deep-button
						width: 700upx
						background-color:black
						color: white
						margin-top: 20upx
						border-radius: 60upx
</style>
