<template>
	<view>
		<view class="view-container">
			<rich-text :nodes="article"></rich-text>
		</view>
		<view class="tab">
			<view class="tab-item" @click="chooseLocation()">
				<image src="/static/img/icon/view-to.jpg"></image>
				<text>到这去</text>
			</view>
			<view class="tab-item" @click="onPhoneClick">
				<image src="/static/img/icon/view-call.jpg"></image>
				<text>联系电话</text>
			</view>
			<button class="tab-item" hover-class="none" open-type="share">
				<image src="/static/img/icon/view-share.jpg"></image>
				<text>立刻分享</text>
			</button>
			<view class="tab-item-flex" @click="navToIndex">
				<image src="/static/img/icon/view-home.png"></image>
				<text>回到首页</text>
			</view>
		</view>
	</view>
</template>

<script>
	import parseHtml from 'common/js/html-parse'
	import {request, showToast} from 'common/js/common'
	import {getAdvOfOne} from 'common/js/requestUrl'
	export default {
		data() {
			return {
				id: null,
				title: '',
				article: '',
				latitude: '',
				longitude: '',
				phone: '',
			}
		},
		onLoad: function(e){
			this.id = e.id;
			this.title = e.title;
			uni.setNavigationBarTitle({
				title: this.title
			});
			
			this.getAdvMsg();
		},
		onShareAppMessage(){
			return {
				title: this.title,
				path: 'pages/tabbar/web-view/web-view?id='+ this.id +'&title=' + this.title
				// imageUrl: '../../../static/img/icon/share.jpg'
			}
		},
		methods: {
			getAdvMsg(){
				const regex = new RegExp('<img', 'gi');
				request(getAdvOfOne,{
					id : this.id
				},(res) => {
					if(res.code == 200){
						this.phone = res.result.phone
						this.latitude = res.result.latitude
						this.longitude = res.result.longitude
						let result = res.result.content.replace(regex, `<img style="max-width: 100%;"`).replace(/<section/g, '<div').replace(/\/section>/g, '/div>');
						this.article = parseHtml(result)
					}else{
						showToast(res.msg)
					}
				})
			},
			onPhoneClick(){
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
			},
			chooseLocation(){
				uni.openLocation({
					latitude: parseFloat(this.latitude),
					longitude: parseFloat(this.longitude),
					success: function () {
						console.log('success');
					}
				});
			},
			navToIndex(){
				uni.switchTab({
					url: '../tabbar-1/tabbar-1'
				});	
			}
		}
	}
</script>

<style lang="stylus">
	@import "~common/stylus/variable"
	.view-container
		width: 710rpx
		padding: 20rpx 20rpx 130rpx 20rpx
		display: flex
		overflow: hidden
		align-items: center
		background-color: white
		image
			width: 0
	.tab
		position: fixed
		bottom: 0
		width: 100%
		height: 120rpx
		background-color: white
		border-top: 1px solid #d1d1d1
		display: flex
		justify-content: space-around
		align-items: center
		button
			background-color: white
			line-height: normal
			box-sizing: content-box
		button::after 
			border: none
		.button-hover
			background-color: white
		.tab-item
			padding: 10rpx 0 10rpx 0 
			height: 100rpx
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			width: 160rpx
			image
				width: 50rpx
				height: 50rpx
			text
				margin-top: 10rpx
				font-size: 25rpx
				font-weight: 200
		.tab-item-flex
			width: 200rpx
			background-color: $base-color
			height: 100%
			display: flex
			align-items: center
			justify-content: space-around
			flex: 1
			image
				width: 50rpx
				height: 50rpx
				border-radius: 5rpx
				margin-left: 10rpx
			text
				font-weight: 200
				margin-right: 20rpx
</style>
