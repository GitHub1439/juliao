import Vue from 'vue';
const prefix = (id) => '_chat_' + id;
const prefixIndex = (id) => prefix(id) + '_index';
const MSG_LIST_KEY = prefix('msglist');
const UNREAD_LIST_KEY = prefix('unread');
const GETS_NUM = 30;
const cache = function(key, value) {
	try {
		if (arguments.length == 1) return uni.getStorageSync(key);
		if (arguments.length > 1) {
			if (value === null) {
				uni.removeStorageSync(key);
			} else {
				uni.setStorageSync(key, value);
			}
		}
	} catch (e) {
		uni.showToast({
			icon: 'none',
			title: '程序发生错误'
		});
	}
};
const parseDate = (str) => new Date(str.replace(/(-|年|月)/g, '/').replace('日', ''));
const dateToTime = (date) => date.getTime() / 1000;
const cutTimeStr = (str) => str.substr(0,11);

function getUserInfoById(id) {
	let list = uni.getStorageSync('friends');
	let result = {
		id,
		avatar: 'http://iph.href.lu/100x100?text=%E5%A4%B4%E5%83%8F',
		nickname: '未知'
	};
	if (list) {
		let info = list.find((v) => v.id == id);
		if (info) result = info;
	}
	result.avatar = `http://www.fupbup.top/api/v1.common/avatar?&user_id=${id}`;
	return result;
}

function getGroupInfoById(id) {
	let list = uni.getStorageSync('groups');
	let result = {
		id,
		avatar: 'http://iph.href.lu/100x100?text=%E5%A4%B4%E5%83%8F',
		nickname: '未知',
		none: true
	};
	if (list) {
		let info = list.find((v) => v.id == id);
		if (info) {
			result = info;
			result.nickname = info.name;
		}
	}
	result.avatar = `http://www.fupbup.top/api/v1.common/avatar?&group_id=${id}`;
	return result;
}
export default {
	namespaced: true,
	state: {
		source: {},
		msglist: []
	},
	mutations: {
		/**
		 * 从缓存里拉去消息
		 * @param {Object} state
		 * @param {Object} id
		 */
		pull(state, id) {
			let key = prefix(id);
			let data = cache(key) || [];
			let indexKey = prefixIndex(id);
			let beforeList = state.source[key] || [];
			if (data.length && beforeList.length==0) {
				/* let _index = state.source[indexKey] === undefined ? (data.length - 1) : state.source[indexKey],
					list = [];
				for (let i = 0; i < GETS_NUM && _index >= 0 && data[_index]; _index--, i++) list.push(data[_index]);
				Vue.set(state.source, key, list.reverse().concat(state.source[key] || [])); //让属性具有响应式 */
				Vue.set(state.source, key, data.concat(state.source[key] || [])); //让属性具有响应式
				// state.source[indexKey] = _index;
			} else {
				// Vue.set(state.source, key, []);
				// state.source[indexKey] = undefined;
			}
		},
		/**
		 * 推送消息到缓存
		 * @param {Object} state
		 * @param {Object} data
		 */
		push(state, data) {
			let key = prefix(data.id);
			if (!state.source[key]) Vue.set(state.source, key, []);
			data.msg['_mid'] = 'm' + Math.random().toString(36).substring(2); //生成唯一id
			state.source[key].push(data.msg);
			cache(key, state.source[key]);
			if(data.msg.message.type != 'tips') {
				//更新消息列表
				let msglist = cache(MSG_LIST_KEY) || [];
				let msgindex = msglist.findIndex(v => v.key == key);
				let unreadCount = 0;
				if (msgindex >= 0) {
					let tmp = msglist.splice(msgindex, 1);
					unreadCount = tmp[0].msg.unread || 0;
				}
				msglist.push({
					key,
					msg: {
						...data.msg,
						unread: data.msg.self ? unreadCount : unreadCount + 1
					}
				});
				state.msglist = msglist;
				cache(MSG_LIST_KEY, msglist);
			}
		},
		/**
		 * 初始化数据
		 * @param {Object} state
		 * @param {Object} id
		 */
		init(state, id) {
			let indexKey = prefixIndex(id);
			// Vue.set(state.source, prefix(id), []);
			// state.source[indexKey] = undefined;
			if (state.msglist.length) {
				//清空未读消息
				state.msglist.forEach(v => {
					if (prefix(id) == v.key) v.msg.unread = 0;
				});
				cache(MSG_LIST_KEY, state.msglist);
			}
		},
		/**
		 * 清除未读标记
		 */
		clearunread(state, id) {
			if (state.msglist.length) {
				//清空未读消息
				state.msglist.forEach(v => {
					if (prefix(id) == v.key) v.msg.unread = 0;
				});
				cache(MSG_LIST_KEY, state.msglist);
			}
		},
		/**
		 * 清除聊天记录
		 */
		clear(state) {
			state.source = [];
			state.msglist = [];
		},
		/**
		 * 领取红包
		 * @param {Object} state
		 * @param {Object} data
		 */
		receiveredpack(state, data) {
			let key = prefix(data.id);
			let list = cache(key) || [];
			list.forEach(v=>{
				if(v.message.type=='redpack' && v.message.content.id == data.redpack_id) {
					if(!v.message.content.hasget) v.message.content.hasget = true;
				}
			});
			cache(key, list);
			let list2 = state.source[key] || [];
			list2.forEach(v=>{
				if(v.message.type=='redpack' && v.message.content.id == data.redpack_id) {
					if(!v.message.content.hasget) v.message.content.hasget = true;
				}
			});
		},
		/**
		 * 设置为空红包
		 * @param {Object} state
		 * @param {Object} data
		 */
		setredpackempty(state, data) {
			let key = prefix(data.id);
			let list = cache(key) || [];
			list.forEach(v=>{
				if(v.message.type=='redpack' && v.message.content.id == data.redpack_id) {
					if(!v.message.content.empty) v.message.content.empty = true;
				}
			});
			cache(key, list);
			let list2 = state.source[key] || [];
			list2.forEach(v=>{
				if(v.message.type=='redpack' && v.message.content.id == data.redpack_id) {
					if(!v.message.content.empty) v.message.content.empty = true;
				}
			});
		}
	},
	getters: {
		/**
		 * 获取消息内容列表
		 */
		messages: (state) => (id) => {
			let list = state.source[prefix(id)] || [];
			let tmp = [];
			let lastTime = false;
			list.forEach(v => {
				let curid = v.self ? v.sender_id : v.receiver_id;
				if (v.type == 'receive') curid = v.sender_id;
				let obj = getUserInfoById(curid);
				let cutTime = cutTimeStr(v.time);
				if(lastTime != cutTime) {
					if(lastTime) {
						tmp.unshift({
							message: {
								type: 'tips',
								content: {
									type: 'time',
									text: lastTime
								}
							}
						});
					}
					lastTime = cutTime;
				}
				tmp.push({
					msgtype: 'msg',
					...obj,
					self: v.self,
					message: v.message,
					_mid: v._mid,
					time: v.time
				});
			});
			if(tmp.length) {
				tmp.unshift({
					message: {
						type: 'tips',
						content: {
							type: 'time',
							text: lastTime
						}
					}
				});
			}
			return tmp;
		},
		/**
		 * 检查消息是否还有更多
		 */
		checkmore: (state) => (id) => {
			if (state.source[prefixIndex(id)] === undefined) return false;
			return state.source[prefixIndex(id)] >= 0;
		},
		/**
		 * 获取最近的聊天列表
		 */
		msglist: (state) => {
			let tmp = [];
			if (!state.msglist.length) Vue.set(state, 'msglist', cache(MSG_LIST_KEY) || []);
			state.msglist.forEach(v => {
				v.msg = Object.assign(v.msg, (+v.msg.group_id > 0) ? getGroupInfoById(v.msg.group_id) : getUserInfoById(v.msg.id));
				if(!v.msg.none) tmp.push(v.msg);
			});
			tmp.sort((a, b) => dateToTime(parseDate(b.time)) - dateToTime(parseDate(a.time)));
			return tmp;
		}
	}
}
