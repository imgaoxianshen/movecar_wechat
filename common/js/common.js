import {loginUrl} from './requestUrl'
module.exports = {
	request: function(url,data,cb){
		let token = uni.getStorageSync('token');
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			data: data,
			header: {
				'token': token //自定义请求头信息
			},
			success: (res) => {
				// 登陆过期的情况
				if(res.data.code == 101){
					uni.login({
						provider: 'weixin',
						success: (loginRes) => {
							let code = loginRes.code
							uni.request({
								url: loginUrl,
								data: {code},
								success: (res) => {
									uni.setStorageSync('token',res.data.result);
									uni.showToast({
										title: '请求失败，请重试',
										icon: 'none',
										duration: 2000
									});
									return
								}
							})
						}
					})
				}else if(res.data.code != 200){
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					})
					return
				}
				return typeof cb == "function" && cb(res.data)
			},
			fail: (res) => {
				uni.showToast({
					title: '请求失败，请重试',
					icon: 'none',
					duration: 2000
				});
			}
	});
	},
	showToast: (title,icon='none') => {
		uni.showToast({
			title: title,
			icon: icon,
			duration: 2000
		});
	}
}