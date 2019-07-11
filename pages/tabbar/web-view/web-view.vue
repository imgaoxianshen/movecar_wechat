<template>
	<view class="view-container">
		<rich-text :nodes="article"></rich-text>
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
		methods: {
			getAdvMsg(){
				const regex = new RegExp('<img', 'gi');
				request(getAdvOfOne,{
					id : this.id
				},(res) => {
					if(res.code == 200){
						let result = res.result.content.replace(regex, `<img style="max-width: 100%;"`).replace(/<section/g, '<div').replace(/\/section>/g, '/div>');
						this.article = parseHtml(result)
					}else{
						showToast(res.msg)
					}
				})
			},
		}
	}
</script>

<style lang="stylus">
	.view-container
		width: 710rpx
		padding: 20rpx
		display: flex
		overflow: hidden
		align-items: center
		background-color: white
		image
			width: 0
</style>
