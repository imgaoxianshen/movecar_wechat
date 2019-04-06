let baseUrl = 'https://www.imgaoxianshen.cn/car/api/'

module.exports = {
	// main
	loginUrl: baseUrl + 'user/login',
	isLoginUrl: baseUrl + 'user/isLogin',
	getCalllMsg: baseUrl + 'user/getCalllMsg',
	bindPhone: baseUrl + 'user/bindPhone',
	
	// carcard
	getCarCardList: baseUrl + 'card/getCarCardList',
	addCarCard: baseUrl + 'card/addCarCard',
	changeChoose: baseUrl + 'card/changeChoose',
	
	// pay
	placeOrderAndPay: baseUrl+'order/placeOrderAndPay',
	payOrder: baseUrl+'order/payOrder',
	
	// order
	getOrderList: baseUrl +'order/getOrderList',
	
	// status
	changeNoticeStatus: baseUrl +'loginUser/changeNoticeStatus',
	
	// 获取小程序码
	getWechatCode: baseUrl + 'code/getWechatCode',
	
}