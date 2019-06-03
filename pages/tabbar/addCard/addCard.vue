<template>
	<view class="addCard-container">
		<view class="background">
			<view class="title">登记车辆信息</view>
		</view>
		<view class="center">
			<text class="tips">请输入车牌号</text>
			<text class="desc">请输入车牌号后六位，如果是新能源牌照，请点击最后新能源输入框后再输入。</text>
			<input class='input_control' type="text" @blur="cardUnFocus" :focus="cardFocus" @input='inputCard' maxlength='6'/>
			<view class="input-msg" @click="changForce()">
				<view class="input">
					<view class="input-name">浙</view>
					<view class="input-char">{{card[0]}}</view>
				</view>
				<view class="dot">·</view>
				<block wx:key="key" v-for="key in [1,2,3,4,5]">
					<view class="input-one">{{card[key]}}</view>
				</block>
				<view class="input-one-list">
					<image class="input-icon" :src="avatar"></image>
					<text class="new-text">新能源</text>
				</view>
			</view>
			<view class="get-code">
				<input placeholder="请输入手机号"  @input="inputPhone" placeholder-style="text-align: center" type="number">
				<view class="get-button" @click="getCode">获取验证码{{yanzhengStart ? '(' + yanzhengTime + ')' : ''}}</view>
			</view>
			<input class="yanzheng" @input="inputYanzhengCode" placeholder-style="text-align: center" placeholder="请输入验证码" type="number">
			<botton class="confirm" @click="confirm">确定</botton>
		</view>
		<!-- <view class="add-car-title">车辆信息</view>
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
		</block> -->
	</view>
</template>

<script>
	import {addCarCard, getYanZhengCode} from 'common/js/requestUrl'
	import {request,showToast} from 'common/js/common'
	import avatar from 'static/img/icon/qrcode.png'
	export default {
		data() {
			return {
				showBack: false,
				placeChoosed: '浙',
				card: '',
				phone: '',
				avatar,
				yanzhengStart: false,
				yanzhengTime: 0,
				yanzhengCode: null,
				code: 0,
				cardFocus: false,
				Timer : null,
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
				this.card = e.detail.value.toUpperCase()
			},
			inputPhone(e){
				this.phone = e.detail.value
			},
			inputYanzhengCode(e){
				this.yanzhengCode = e.detail.value
			},
			changCardToUpper(){
				this.card = this.card.toUpperCase()
			},
			changForce(){
				this.cardFocus = true
			},
			cardUnFocus(){
				this.cardFocus = false
			},
			getCode(){
				if(!this.yanzhengStart){
					if(!this.phone){
						showToast('您还未输入手机号')
						return
					}
					request(getYanZhengCode,{
						phone: this.phone
					},(res) => {
						if(res.code == 200){
							this.yanzhengStart = true
							this.yanzhengTime = 30
							this.Timer = setInterval(this.timeGone , 1000)
							this.code = res.result
						}
					})
				}
			},
			timeGone(){
				this.yanzhengTime -= 1
				if(this.yanzhengTime == 0){
					this.yanzhengStart = false
					clearInterval(this.Timer)
				}
			},
			confirm(){
				if(!this.placeChoosed){
					showToast('您还未选择车牌前缀')
					return
				}
				if(!this.phone){
					showToast('您还未输入手机号')
					return
				}
				if(!this.card){
					showToast('您还未输入车牌号')
					return
				}
				if(!this.yanzhengCode){
					showToast('您还未输入验证码')
					return
				}
				if(this.code != this.yanzhengCode){
					showToast('验证码有误，您可以稍后重新获取验证码')
					return
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
	background-color: $base-color
	opacity: 0.8
	position:relative
	.background
		position: relative
		align-items: center
		height: 100vh
		overflow: hidden
		&:before, &:after 
			content: ""
			position: absolute
			left: 50%
			min-width: 1500rpx
			min-height: 1500rpx
			background: white
			animation-iteration-count: infinite
			animation-timing-function: linear
		&:before 
			top: 220rpx
			animation-name: rotate2
			border-radius: 44%
			opacity: 1
			animation-duration: 10s 
		&:after 
			top: 180rpx
			border-radius: 44%
			opacity: 0.8
			animation-name: rotate1
			animation-duration: 10s
		.title
			width: 750rpx
			margin-top: 50rpx
			letter-spacing: 10rpx
			font-size: 40rpx
			font-weight: 300
			text-align:center
	.center
		position: absolute
		top: 300rpx
		padding: 0 100rpx
		display: flex
		flex-direction: column
		.tips
			font-size: 30rpx
		.desc
			margin-top: 20rpx
			font-size: 25rpx
			font-weight: 300
		.input_control
			position: absolute
			left: -200rpx
		.input-msg
			display: flex
			flex-direction: row
			margin-top: 20rpx
			.input
				display: flex
				border: 1px dashed black
				border-radius: 10rpx
				.input-name
					padding:5rpx 15rpx
					font-size: 40rpx
					width: 30rpx
					border-right: 1px dashed black
				.input-char
					padding:5rpx 15rpx
					width: 30rpx
					font-size: 40rpx
			.dot
				margin: 0 10rpx
			.input-one
				margin: 0 5rpx
				padding: 5rpx 15rpx
				border: 1px dashed black
				border-radius: 10rpx
				font-size: 40rpx
				width: 30rpx
			.input-one-list
				margin: 0 5rpx
				padding: 5rpx 15rpx
				border: 1px dashed black
				border-radius: 10rpx
				display: flex
				width: 30rpx
				align-items: center
				flex-direction: column
				.input-icon
					width: 30rpx
					height: 30rpx
					margin-top: 5rpx
				.new-text
					font-size: 10rpx
		.get-code
			margin-top: 40rpx
			display: flex
			width: 100%
			height: 80rpx
			align-items: center
			border-radius: 10rpx
			border: 1px solid #d1d1d1
			text-align: center
			.get-button
				font-size: 25rpx
				width: 200rpx
				text-align: center
				border-left: 1px solid #d1d1d1
		.yanzheng
			text-align: center
			margin-top: 40rpx
			width: 100%
			height: 80rpx
			border: 1px solid #d1d1d1
			border-radius: 10rpx
		.confirm
			text-align: center
			width: 100%
			background-color: $base-color
			margin-top: 60rpx
			height: 80rpx
			line-height: 80rpx
			border-radius: 40rpx
	@keyframes rotate1 
		0%
			transform: translate(-50%, 1%) rotateZ(0deg)
		50%
			transform: translate(-50%, -2%) rotateZ(180deg)
		100%
			transform: translate(-50%, 1%) rotateZ(360deg)
	@keyframes rotate2
		0%
			transform: translate(-50%, 1%) rotateZ(0deg)
		25%
			transform: translate(-50%, 2%) rotateZ(0deg)
		50%
			transform: translate(-50%, -2%) rotateZ(180deg)
		75%
			transform: translate(-50%, 2%) rotateZ(360deg)
		100%
			transform: translate(-50%, 1%) rotateZ(360deg)
</style>
