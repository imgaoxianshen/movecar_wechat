<script>
import {loginUrl} from './common/js/requestUrl'
import {request} from './common/js/common'


export default {
	onLaunch: function(e) {
		// 判断token是否存在，不存在再登陆
		let token = uni.getStorageSync('token');
		if(!token){
			uni.login({
			  provider: 'weixin',
			  success: (loginRes) => {
				let code = loginRes.code
				request(loginUrl,{
					code: code
				},(res) => {
					uni.setStorageSync('token',res.result);
				});
			  }
			})
		}
		if(e.path != 'pages/tabbar/callPhone/callPhone'){
			// 获取授权信息
			uni.getSetting({
			    success: function(res){
					if (!res.authSetting['scope.userInfo']) {
// 						wx.switchTab({
// 							url: '/pages/tabbar/tabbar-1/tabbar-1'
// 						})
// 					}else{
						wx.redirectTo({
							url: '/pages/tabbar/authorize/authorize'
						})
					}
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
