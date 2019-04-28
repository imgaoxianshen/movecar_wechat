<template>
	<view class="carcard-container">
		<block v-if="carcardList.length > 0">
			<view class="car-container">
				<block v-for="(item,index) in carcardList">					
					<view class="car-item">
						<view class="items">{{item.prefix}}{{item.card}}</view>
						<view>手机号：{{item.phone}}</view>
						<view class="choosed">
							<block v-if="item.choosed">
								<icon type="success" size="40"></icon>
							</block>
							<block v-else>
								<icon type="success" size="40" color="#d1d1d1" @click="changeCarChoosed(item.id, item.choosed)"></icon>
							</block>
						</view>
						<image class="deleteIcon" :src="deleteIcon" @click.stop="deleteCard(item.id)"></image>
					</view>
				</block>
			</view>
		</block>
		<block v-else>
			<view class="withoutList">
				<image class="card-image" :src="card"></image>
				<text>暂无车牌信息</text>
			</view>
		</block>
		<button class="addCard" @click="navAddCard">+新增车牌信息</button>
	</view>
</template>

<script>
	import {getCarCardList,changeChoose,deleteCard} from '../../../../common/js/requestUrl'
	import {request,showToast} from '../../../../common/js/common'
	import card from '../../../../static/img/icon/card.png'
	import deleteIcon from '../../../../static/img/icon/delete.png'
	export default {
		data() {
			return {
				card,
				deleteIcon,
				carcardList: []
			};
		},
		onShow(){
			this.getCardList()
		},
		methods:{
			navAddCard(){
				uni.navigateTo({
					url: './add_card/add_card'
				});
			},
			getCardList(){
				request(getCarCardList,{},(res) => {
						this.carcardList = res.result.data
					}
				)
			},
			changeCarChoosed(id, choosed){
				if(choosed != 1){
					request(changeChoose,{
						id: id
					},(res) => {
							this.getCardList()
						}
					)
				}
			},
			deleteCard(id){
				uni.showModal({
					title: '提示',
					content: '是否删除该车牌',
				success: (res) => {
					if (res.confirm) {
						request(deleteCard,
								{id},
								(res) => {
								if(res.code == 200){
									showToast('删除成功')
									this.getCardList()
								}
							}
						)}
					}
				});
			}
		}
	}
</script>

<style lang="stylus" scoped>
.carcard-container
	width: 750upx
	.car-container
		display: flex
		flex-direction: column
		align-items: center
		.car-item
			position: relative
			border-bottom: 1px solid #d1d1d1
			width: 650upx
			padding:50upx
			.items
				font-size: 60upx
			.choosed
				transform: translate(-150rpx, -50%);
				position: absolute
				right: 0
				top: 50%
			.deleteIcon
				transform: translate(-50%, -50%);
				position: absolute
				right: 0
				top: 50%
				width: 60rpx
				height: 60rpx
	.addCard
		// color: white
		margin-top: 100upx
		width: 600upx
	.withoutList
		margin-top: 100upx
		display: flex
		flex-direction: column
		align-items: center
		.card-image
			width: 300upx
			height:300upx
</style>
