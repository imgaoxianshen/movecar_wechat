let baseUrl = 'api/'

module.exports = {
	// main
	loginUrl: baseUrl + 'user/login',
	isLoginUrl: baseUrl + 'user/isLogin',
	getCalllMsg: baseUrl + 'user/getCalllMsg',
	bindPhone: baseUrl + 'user/bindPhone',
	getYanZhengCode: baseUrl + 'user/getYanZhengCode',
	sendMoveCarCode: baseUrl + 'user/sendMoveCarCode',
	
	// carcard
	getCarCardList: baseUrl + 'card/getCarCardList',
	addCarCard: baseUrl + 'card/addCarCard',
	changeChoose: baseUrl + 'card/changeChoose',
	deleteCard: baseUrl + 'card/deleteCard',
	addCarCardAndBindUser: baseUrl + 'card/addCarCardAndBindUser',
	
	// pay
	placeOrderAndPay: baseUrl+'order/placeOrderAndPay',
	payOrder: baseUrl+'order/payOrder',
	
	// order
	getOrderList: baseUrl +'order/getOrderList',
	
	// status
	changeNoticeStatus: baseUrl +'loginUser/changeNoticeStatus',
	updateUserInfo: baseUrl +'loginUser/updateUserInfo',
	getUserInfo: baseUrl +'loginUser/getUserInfo',
	bindUser: baseUrl +'loginUser/bindUser',//绑定挪车码
	
	// 获取小程序码
	getWechatCode: baseUrl + 'code/getWechatCode',
	
	// adv
	getAdvList: baseUrl + 'adv/getAdvList',
	getAdvOfOne: baseUrl + 'adv/getAdvOfOne',
	
	// joinUs
	addJoin: baseUrl + 'joinUs/addJoin',
}