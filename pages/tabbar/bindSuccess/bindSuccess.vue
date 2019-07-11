<template>
	<view class="image-container">
		<image class="image-bindSuccess" :src="bindSuccess"></image>
		<view @click="ToIndex" class="into-index"></view>
	</view>
</template>

<script>
	import bindSuccess from 'static/img/bindSuccess.jpg'
	export default {
		data() {
			return {
				bindSuccess
			};
		},
		methods:{
			ToIndex(){
				uni.switchTab({
					url: '../tabbar-1/tabbar-1'
				});	
			}
		}
	}
</script>

<style lang="stylus">
.image-container
	width: 100%
	height: 100%
	.image-bindSuccess
		width: 750rpx
		height: 100vh
	.into-index
		z-index: 999
		position: fixed
		bottom: 0
		width: 100%
		height: 80rpx
</style>
