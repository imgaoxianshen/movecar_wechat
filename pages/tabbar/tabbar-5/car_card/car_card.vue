<template>
	<view class="carcard-container">
		<block v-if="carcardList.length > 0">
			<view class="car-container">
				<block v-for="(item,index) in carcardList">					
					<view class="car-item" @click="changeCarChoosed(item.id, item.choosed)">
						<view class="items">{{item.prefix}}{{item.card}}</view>
						<view>手机号：{{item.phone}}</view>
						<view class="choosed">
							<block v-if="item.choosed">
								<icon type="success" size="40"></icon>
							</block>
							<block v-else>
								<icon type="success" size="40" color="#d1d1d1"></icon>
							</block>
						</view>
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
	import {getCarCardList,changeChoose} from '../../../../common/js/requestUrl'
	import {request} from '../../../../common/js/common'
	import card from '../../../../static/img/icon/card.png'
	export default {
		data() {
			return {
				card,
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
						console.log(res)
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
				transform: translate(-50%, -50%);
				position: absolute
				right: 0
				top: 50%
			
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
