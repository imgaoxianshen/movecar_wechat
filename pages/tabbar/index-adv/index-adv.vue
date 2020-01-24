<template>
	<view class="container">
		<div class="last_time">{{now}}</div>
		<image mode="widthFix" class="index-adv-img" :src="imgUrl"></image>
		<image class="index-adv-img-icon" src="/static/img/icon/icon.jpg"></image>
	</view>
</template>

<script>
	import {request,showToast} from 'common/js/common'
	import {getIndexAdv} from 'common/js/requestUrl'
	export default {
		data() {
			return {
				now: 2,
				timer: null,
				imgUrl: null,
				id: null,
				type: null
			};
		},
		onShow: function() {
			this.getIndexAdv()
		},
		onLoad: function(options) {
			this.timer = setInterval(this.desTime, 1000)
			//获取导航的参数
			let link = decodeURIComponent(options.q)
			this.changeData(link)
		},
		methods: {
			desTime() {
				if(this.now > 0){
					this.now -= 1
				}else{
					wx.setStorageSync('index_id', this.id)
					wx.setStorageSync('index_type', this.type)
					uni.switchTab({
						url: '../tabbar-1/tabbar-1'
					})
				}
			},
			changeData(link){
				let paramArr = link.split('=');
				if (paramArr.length == 2){
					var params = paramArr[1].split('_');
					this.id = params[0];
					this.type = params[1];
				}
				
			},
			getIndexAdv() {
				request(getIndexAdv,{},(res) => {
					if(res.code == 200){
						this.imgUrl = res.result.url
					}else{
						showToast(res.msg)
					}
				})
			}
		},
		onUnload:function(){  
			if(this.timer) {  
				clearInterval(this.timer);  
				this.timer = null;  
			}  
		}  
	}
</script>

<style lang="stylus">
.container
	width: 750rpx
	height: 100vh
	overflow: hidden
	background-color: white
	.index-adv-img-icon
		position: fixed
		bottom: 0
		left: 0
		right: 0
		height: 180rpx
		width: 100%
		border-top: 1px solid #d1d1d1
	.index-adv-img
		height: 100%
		width: 100%
	.last_time
		position: fixed
		right: 20rpx
		top: 20rpx
		width: 80rpx
		border-radius: 40rpx
		height: 50rpx
		line-height: 50rpx
		color: white
		text-align: center
		background-color: rgba(0,0,0,.4)
</style>
