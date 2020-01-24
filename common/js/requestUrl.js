let baseUrl = 'api/'

module.exports = {
	// main
	loginUrl: baseUrl + 'user/login',
	isLoginUrl: baseUrl + 'user/isLogin',
	getCalllMsg: baseUrl + 'user/getCalllMsg',
	bindPhone: baseUrl + 'user/bindPhone',
	getYanZhengCode: baseUrl + 'user/getYanZhengCode',
	sendMoveCarCode: baseUrl + 'user/sendMoveCarCode',
	getCarList: baseUrl + 'user/getCarList', //获取车型
	getCarListSecond: baseUrl + 'user/getCarListSecond',
	isNeedPay: baseUrl + 'user/isNeedPay',
	
	// carcard
	getCarCardList: baseUrl + 'card/getCarCardList',
	addCarCard: baseUrl + 'card/addCarCard',
	changeChoose: baseUrl + 'card/changeChoose',
	deleteCard: baseUrl + 'card/deleteCard',
	addCarCardAndBindUser: baseUrl + 'card/addCarCardAndBindUser',
	bindCardAndPay: baseUrl + 'card/bindCardAndPay',
	
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
	unBindCard: baseUrl + 'loginUser/unBindCard',
	getIndexAdv: baseUrl + 'loginUser/getIndexAdv', //获取首屏加载
	
	// 获取小程序码
	getWechatCode: baseUrl + 'code/getWechatCode',
	
	// adv
	getAdvList: baseUrl + 'adv/getAdvList',
	getAdvOfOne: baseUrl + 'adv/getAdvOfOne',
	getAdvOfIndex: baseUrl + 'adv/getAdvOfIndex',
	
	// joinUs
	addJoin: baseUrl + 'joinUs/addJoin',
	
	// 洗车
	washCarList: baseUrl + 'washCar/getWashCarList',
	getWashCarShop: baseUrl + 'washCar/getWashCarShop', //洗车店界面
	getWashItemByIds: baseUrl + 'washCar/getWashItemByIds',
	
	// 优惠卷
	getWashCouponList: baseUrl + 'coupon/getWashCouponList'
	
}