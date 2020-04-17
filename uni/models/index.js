import Config from '@/config/index'

class IndexModel {
	
	/** 表单提交
	 * @param {any} params
	 */
	_submitForm(params) {
		
		return new Promise((resolve, reject) => {
			
			uni.request({
				url: `${Config.url}/Cn/Api/save_form`,
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' 
				},
				data: params,
				success(res) {
					// 这里处理一些数据
					if (res.data.code === -1) {
						uni.showToast({
						    title: res.data.msg,
							icon: 'none',
						    duration: 2000
						})
						return
					}
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
			
			
		})
		
		
	}
	
	/** 授权信息提交
	 * @param {any} params
	 */
	_submitUserInfo(params) {
		
		return new Promise((resolve, reject) => {
			
			uni.request({
				url: `${Config.url}/Cn/Api/save_user`,
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' 
				},
				data: params,
				success(res) {
					// 这里处理一些数据
					if (res.data.code === -1) {
						uni.showToast({
						    title: res.data.msg,
							icon: 'none',
						    duration: 2000
						})
						return
					}
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
			
			
		})
		
		
	}
	
	/** 获取数据
	 * @param {any} params
	 */
	_getData(params) {
		
		return new Promise((resolve, reject) => {
			
			uni.request({
				url: `${Config.url}/api/v1/topics`,
				method: 'GET',
				data: params,
				success(res) {
					// 这里处理一些数据
					resolve(res.data.data)
				},
				fail(err) {
					reject(err)
				}
			})
			
			
		})
		
		
	}
	
}

export default new IndexModel