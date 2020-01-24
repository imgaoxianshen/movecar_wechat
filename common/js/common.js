import {loginUrl} from './requestUrl'
import {Storages} from './storages'
import uniFly from 'unifly';

const storage = new Storages()

// uniFly.baseUrl = 'https://www.imgaoxianshen.cn';
uniFly.baseUrl = 'http://192.168.0.101:9501'
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
  if(request.data.code != 200 && request.data.code != 450 && request.data.code != 900){
	showToast(request.data.msg)
	return Promise.resolve(request.data)
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

		await requestGet(loginUrl, {code}).then(res => {
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

function rad(d){
  return d * Math.PI / 180.0;
}
/**
 *
 * @param lat1  纬度1
 * @param lng1  经度1
 * @param lat2  纬度2
 * @param lng2  经度2
 */
function geoDistance(lat1, lng1, lat2, lng2) {
	if(lat2 == '' || lng2 == ''){
		return 0;
	}
	let radLat1 = rad(lat1);
	let radLat2 = rad(lat2);
	let a = radLat1 - radLat2;
	let b = rad(lng1) - rad(lng2);
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137;// EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	return s.toFixed(1);
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
					if(requestRes.code == 101){
						getLoginAndRequest(url,data,cb, method)
					}else{
						cb(requestRes)
					}
				})
			}else{
				requestGet(url, data).then(requestRes => {
					if(requestRes.code == 101){
						getLoginAndRequest(url,data,cb, method)
					}else{
						cb(requestRes)
					}
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
	showToast,
	geoDistance,
	getQueryString: (url,name) => {
	  let reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
	  let r = url.substr(1).match(reg) 
	  if (r != null) {
		return r[2]
	  }
	  return null
	}

}