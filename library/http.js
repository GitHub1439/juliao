class Http {
	constructor(base_url = '') {
		this._baseUrl = base_url;
		this._requestCount = 0;
		this._showWait = true;
		this._showError = true;
	}
	setWait(value) {
		this._showWait = value;
		return this;
	}
	autoError(value) {
		this._showError = value;
		return this;
	}
	request(url, option = {}) {
		let that = this;
		return new Promise((resolve, reject) => {
			option.url = that._baseUrl + url;
			option.method = option.method || "POST";
			option.header = option.header || {};
			option.header.token = uni.getStorageSync('access_token') || "";
			option.fail = function(res) {
				uni.showModal({
					title: '提示',
					content: '网络错误，请检查网络是否连接',
					showCancel: false
				});
			};
			option.success = function(res) {
				if(res.statusCode == 200) {
					if(res.data && res.data.code == 200) {
						resolve(res.data, res);
					} else {
						if(res.data && res.data.message && that._showError) {
							if(res.data.code == 401) {
								uni.removeStorageSync('access_token');
								uni.navigateTo({
									url: '/pages/index/launch'
								});
							}
							setTimeout(()=>{
								uni.showToast({ icon: 'none', title: res.data.message });
							},20);
						}
						reject(res.data, res);
					}
				} else {
					if(res.data && res.data.message && that._showError) {
						setTimeout(()=>{
							uni.showToast({ icon: 'none', title: res.data.message });
						},20);
					}
					reject(res.data, res);
				}
			};
			let _complete = option.complete;
			option.complete = function(res) {
				that._showWait = true;
				that._showError = true;
				if (!(--that._requestCount)) uni.hideLoading();
				_complete && _complete(res);
			};
			if (that._showWait && !that._requestCount) {
				uni.showLoading({title: '加载中', mask: true});
			}
			that._requestCount++;
			uni.request(option);
		});
	}
	get(url, data = {}) {
		if(data._showWait === false) this.setWait(false);
		return this.request(url, { method: "GET", data });
	}
	post(url, data = {}) {
		if(data._showWait === false) this.setWait(false);
		return this.request(url, { method: "POST", data });
	}
}
export default new Http('http://www.fupbup.top/');