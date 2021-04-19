import Vue from 'vue';
import Vuex from 'vuex';
import cache from '../library/cache'
import helper from '../library/helper'
import chat from './chat'
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		chat
	},
	state: {
		userinfo: {
			id: '00000',
			nickname: '请先登录',
			signature: ''
		}
	},
	mutations: {
		update_userinfo(state, userinfo) {
			state.userinfo = userinfo
		}
	}
});
