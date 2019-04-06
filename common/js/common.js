module.exports = {
	request: function(url,data,cb){
		// let that = this;
		// console.log(this.callback)
		let token = uni.getStorageSync('token');
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			data: data,
			header: {
				'token': token //自定义请求头信息
			},
			success: (res) => {
				if(res.data.code != 200){
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
					return
				}
				return typeof cb == "function" && cb(res.data)
			},
			fail:(res) => {
				console.log(res)
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