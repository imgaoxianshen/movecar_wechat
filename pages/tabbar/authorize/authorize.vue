<template>
	<view class="container">
		<icon class="item-top-icon" type="warn" size="50"/>
		<view class="item">
			<view class="item-top">
				授权申请
			</view>
			<view class="item-bottom">
				<view class="item-bottom-msg">
					<text class="item-bottom-text">帮挪车小程序需要获得你的公开信息（昵称、头像）</text>
					<button class="item-bottom-botton" type="primary" hover-class="none" open-type="getUserInfo" @getuserinfo="getUserInfo" withCredential="true">
						获取头像昵称
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		onLoad(res){
			console.log(res)
		},
		methods:{
			...mapMutations(['getUserMessage']),
			getUserInfo: function(res){
				let userInfo = res.detail.userInfo
				if(userInfo){
					this.getUserMessage(userInfo)
					this.switchIndex()
				}
			},
			switchIndex: () => {
				wx.switchTab({
					url: '/pages/tabbar/tabbar-5/tabbar-5'
				})
			}
		}
	}
</script>

<style lang="stylus"scoped>
	@import "~common/stylus/variable"
.container
	position: relative
	display: flex
	align-items: center
	justify-content: center
	width: 750upx
	.item-top-icon
		position: absolute
		top: 150upx
		border: 30upx solid $base-color
		border-radius: 50%
	.item
		margin-top: 200upx
		width: 500upx
		height:500upx
		background-color:$base-color
		overflow:hidden
		.item-top
			height: 100upx
			text-align: center
			padding: 100upx 0 0 0
		.item-bottom
			display: flex
			justify-content: center
			background-color: white
			width: 1500upx
			height: 500upx
			transform: translateX(-500upx)
			border-radius: 50%
			.item-bottom-msg
				width: 450upx
				padding: 40upx 0 0 0
				.item-bottom-botton
					margin-top: 30upx
					height: 80upx
					font-size: 26upx
					line-height: 80upx
				.item-bottom-text
					font-size: 25upx
</style>
