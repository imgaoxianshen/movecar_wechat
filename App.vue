<script>
import {loginUrl} from './common/js/requestUrl'
import {request} from './common/js/common'


export default {
	onLaunch: function(e) {
		if(e.path != 'pages/tabbar/callPhone/callPhone'){
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				let code = loginRes.code
				request(loginUrl,{
					code: code
				},function(res){
					uni.setStorageSync('token',res.result);
				})
			  }
			});
			// 获取授权信息
			uni.authorize({
				scope: 'scope.userInfo',
				success(res) {
					console.log(res)
					// 授权了
					wx.switchTab({
						url: '/pages/tabbar/tabbar-1/tabbar-1'
					})
				},
				fail(res){
					console.log(res)
					//没授权
					wx.redirectTo({
						url: '/pages/tabbar/authorize/authorize'
					})
				}
			})
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
</style>
