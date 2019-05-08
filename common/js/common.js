import {loginUrl} from './requestUrl'
import {Storages} from './storages'
import uniFly from 'unifly';

const storage = new Storages()

uniFly.baseUrl = 'https://www.imgaoxianshen.cn';
uniFly.timeOut = 20000

function showToast(title, icon='none'){
	uni.showToast({
		title: title,
		icon: icon,
		duration: 2000
	});
}

uniFly.requestInterceptors.success = function(request) {
  let token = storage.gets('token', null);
  //配置基本信息
  request.headers['token'] = token
  uni.showLoading()
  return request
}
uniFly.responseInterceptors.success = function(request) {
  uni.hideLoading()
  if(request.data.code != 200 && request.data.code != 450){
	showToast(request.data.msg)
	return
  }
  return Promise.resolve(request.data)
}

function requestGet(url, params) {
    return uniFly.get({
      url,
      params
    })
}

function requestPost(url, params) {
    return uniFly.post({
      url,
      params
    })
}

async function getLoginAndRequest(url,data,cb, method){

	let [error,res] = await uni.login({provider: 'weixin'});

	if(error){
		showToast('登陆失败')
	}else{
		let code = res.code
		
		requestGet(loginUrl, {code}).then(res => {

			if(res.code == 200){
				storage.put('token', res.result, 24*60*60)
				// 然后请求接口
				if(method == 'post'){
					requestPost(url, data).then(requestRes => {
						cb(requestRes)
					})
				}else{
					requestGet(url, data).then(requestRes => {
						cb(requestRes)
					})
				}
			}else{
				showToast('登陆接口获取失败')
			}
		})
	}

}

module.exports = {
	request: async (url,data,cb,method='get') => {
		// const storage = new Storages()
		let token = storage.gets('token', false);
		if(!token){
			await getLoginAndRequest(url,data,cb, method)
		}else{
			if(method == 'post'){
				requestPost(url, data).then(requestRes => {
					cb(requestRes)
				})
			}else{
				requestGet(url, data).then(requestRes => {
					cb(requestRes)
				})
			}
		}
		// let loginRes = await getLogin()
		// if(loginRes){
		// 	const storage = new Storages()
		// 	let token = storage.gets('token', null);
		// 	console.log(token)
		// 	// await baseRequest(url, data, 'post', cb, token)
		// }
	},
	showToast
}