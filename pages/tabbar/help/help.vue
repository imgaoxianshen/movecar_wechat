<template>
	<view class="addCard-container">
		<view class="background">
			<view class="title">用户帮助</view>
		</view>
		<view class="center">
			<view class="center-item">
				<text class="center-item-title">Q1 挪车码是什么？</text>
				<view class="center-item-desc">挪车码是代替挪车电话、保护车主隐私的高新技术产品,可以贴在后档风玻璃右上角上。需要联系车主时,只需微信扫描挪车码即可自动接通双方电话,保护车主手机号码不被泄露。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q2 体验码与正式码功能上有区别吗?</text>
				<view class="center-item-desc">体验码与正式码功能上没有任何区别,体验码有使用期限,自生成之日起30日内有效,正式码没有限制。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q3 体验码可以续期吗?</text>
				<view class="center-item-desc">体验码无法续期,到期后将无法继续提供服务。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q4 下单后多久可以收到挪车码?</text>
				<view class="center-item-desc">下午4点前的订单当天发货,下午4点后的订单次日发货,2-5日可收到挪车码。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q5 不想要了能否退货?</text>
				<view class="center-item-desc">挪车码属于卡密产品,付款时已完成用户绑定,不予退货。若因产品质量问题造成挪车码无法绑定或无法识别,可联系客服申请补发。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q6 挪车码贴在什么位置最佳?</text>
				<view class="center-item-desc">挪车码一般贴在车辆后档风玻璃的右上角最佳,即不遮挡视线又易被发现。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q7 如何呼叫车主挪车?</text>
				<view class="center-item-desc">有人需要联系车主挪车时,只需扫描挪车码,点击“呼叫车主”,即刻接到一个950开头的虚拟电话。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q8 挪车码绑定信息会不会被篡改?</text>
				<view class="center-item-desc">小程序码是由微信官方授权生成。</view>
			</view>
			<view class="center-item">
				<text class="center-item-title">Q9 呼叫失败,提示“用户忙,请稍后再拨”?</text>
				<view class="center-item-desc">如果不是主动挂断,那么就是对方用户开启了防打扰模式。</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad:function(){
			
		},
		methods:{
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
			height: 130vh
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
			padding: 0 50rpx 100rpx 50rpx 
			display: flex
			flex-direction: column
			.center-item-title
				font-size: 25rpx
				background-color: black
				color: white
				padding: 2rpx 10rpx
				border-radius: 30rpx
			.center-item-desc
				margin-top: 10rpx
				font-size: 25rpx
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
