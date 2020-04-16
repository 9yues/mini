import Config from '@/config/index'

class IndexModel {
	
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