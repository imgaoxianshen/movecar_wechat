<template>
	<view class="content">
		<view class="top-box">
			<view class="top-box-item">
				<view>全城</view>
				<image src="/static/img/icon/down.png"></image>
			</view>
			<view class="top-box-item">
				<view>全部服务</view>
				<image src="/static/img/icon/down.png"></image>
			</view>
			<view class="top-box-item">
				<view>距离</view>
				<image src="/static/img/icon/down.png"></image>
			</view>
		</view>
		
		<view class="other-container">
			<!-- vip模块 -->
			<vip></vip>
			<!-- 洗车店 -->
			<carList :list="washCarList"></carList>
			
		</view>
	</view>
</template>

<script>
	import {request, getQueryString, showToast, geoDistance} from 'common/js/common'
	import {washCarList} from 'common/js/requestUrl'
	import carList from '../../carlist-template/carlist-template.vue'
	import vip from '../../vip-template/vip-template.vue'
	
	export default {
		data() {
			return {
				washCarList: [],
				latitude: '',
				longitude: '',
			}
		},
		components:{
			carList,
			vip
		},
		onLoad() {
			// 获取当前经纬度
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.latitude = res.latitude
					this.longitude = res.longitude
				},
				complete: res => {
					// 获取列表
					request(washCarList, {},(res)=> {
						if(res.code == 200){
							this.washCarList = res.result.data
							if(this.washCarList.length > 0){
								this.washCarList.forEach((item, index) => {
									//获取距离
									this.washCarList[index].far = geoDistance(item.latitude, item.longitude, this.latitude, this.longitude)
								});
							}
						}
					})	
				}
			});
		},
		methods: {
			callPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone
				})
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
			onShareAppMessage(res) {
				return {
				  title: '多少堵车事，历历不能忘',
				  imageUrl: '/static/img/icon/share.jpg'
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~common/stylus/variable"
	.top-box
		position: fixed
		top: 0
		width: 100%
		height: 80rpx
		background-color: white
		display: flex
		align-items: center
		justify-content: space-around
		.top-box-item
			display: flex
			align-items: center
			view
				font-size: 25rpx
			image
				margin-left: 10rpx
				width: 10rpx
				height: 10rpx
	.other-container
		padding: 30rpx
		margin-top: 80rpx
</style>
