<template>
	<view class="addCard-container">
		<view class="add-car-title">车辆信息</view>
		<view class="input-container">
			<view class="place-botton" @click="showsBack">
				{{placeChoosed}}
				<image class="arrow-down" src="../../../../../static/img/arrowDown.png"></image>
			</view>
			<input class="input" maxlength="6" :value="card" @blur="changCardToUpper" @input="inputCard" type="text" placeholder="车牌号后六位" >
		</view>
		<view class="input-container">
			<input class="input" @input="inputPhone" type="text" placeholder="请输入手机号码" >
		</view>
		<botton class="confirm" @click="confirm">确认</botton>
		
		<block v-if="showBack">
			<view class="back" @click="cancleBack"></view>
			<view class="display">
				<view class="add-car">添加车牌</view>
				<view class="place-container">
					<block v-for="(item,index) in placeList">
						<view class="car-place" @click="chooseItem(item)">{{item}}</view>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {addCarCard} from '../../../../../common/js/requestUrl'
	import {request,showToast} from '../../../../../common/js/common'
	export default {
		data() {
			return {
				showBack: false,
				placeChoosed: '浙',
				card: '',
				phone: '',
				placeList:[
					"京", 
					"津", 
					"沪",
					"渝",
					"冀",
					"吉",
					"辽", 
					"黑",
					"湘",
					"鄂",
					"甘",
					"晋",
					"陕",
					"豫",
					"川", 
					"云", 
					"桂",
					"蒙",
					"贵", 
					"青",
					"藏",
					"新", 
					"宁", 
					"粤",
					"琼",
					"闽", 
					"苏",
					"浙", 
					"赣",  
					"鲁",  
					"皖"]
			};
		},
		onLoad:function(){
			
		},
		methods:{
			cancleBack(){
				this.showBack = false
			},
			showsBack(){
				this.showBack = true
			},
			chooseItem(item){
				this.placeChoosed = item
				this.showBack = false
			},
			inputCard(e){
				this.card = e.detail.value
			},
			inputPhone(e){
				this.phone = e.detail.value
			},
			changCardToUpper(){
				this.card = this.card.toUpperCase()
			},
			confirm(){
				if(!this.placeChoosed){
					showToast('您还未选择车牌前缀')
				}
				if(!this.phone){
					showToast('您还未输入手机号')
				}
				if(!this.card){
					showToast('您还未输入车牌号')
				}
				request(addCarCard,{
					card: this.card,
					phone: this.phone,
					prefix: this.placeChoosed
				},function(res){
					if(res.code == 200){
						showToast('添加成功','success')
						uni.navigateBack({
							delta: 1
						});
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.addCard-container
	display:flex
	flex-direction: column
	align-items:center
	// padding-top: 100upx
	.confirm
		display: flex
		align-items: center
		justify-content: center
		border-radius: 10upx
		height: 70upx
		background-color: $base-color
		width: 400upx
		margin-top: 70upx
	.add-car-title
		margin-top: 100upx
	.input-container
		display: flex
		// background-color:$base-color
		// color:white
		width: 400upx
		margin-top: 30upx
		border-radius: 20upx
		height:100upx
		.input
			// background-color: $base-color
			width: 100%	
			height: 100%
			border-bottom: 1px solid #d1d1d1
		.place-botton
			display: flex
			width: 150upx
			height: 100%
			align-items: center
			justify-content: center
			font-size: 40upx
			background-color:$base-color
			// color: white
			// background-color:red
			.arrow-down
				width: 30upx
				height: 30upx
	.back
		background-color:black
		opacity: .3
		position: fixed
		height: 100%
		width: 100%
	.display
		// background-color: red
		width: 750upx
		// height:400upx
		background-color: white
		position:fixed
		bottom: 0
		.place-container
			display: flex
			flex-direction: row
			flex-wrap: wrap
			justify-content: flex-start 
			z-index: 999
			.car-place
				padding: 20upx 6upx
				margin: 10upx
				background-color: $base-color
				width: 90upx
				text-align: center
		.add-car
			padding: 10upx
			width: 100%
			text-align: center
			border: 1px solid #d1d1d1
</style>
