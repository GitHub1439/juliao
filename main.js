import Vue from 'vue';
import App from './App';
import store from "./store";
import helper from "./extends/helpers";
import {
	mapMutations
} from 'vuex';

import LoadMore from './components/load-more';
import Result from './components/result-page';
import Sender from './components/sender';
import Payment from './components/payment';
import Contracts from './components/contacts';
import socket from "./library/socket"
helper(Vue);
//打包消息数据
const packMsg = function(res) {
	return {
		id: res.cache_key,
		msg: res
	};
};
//连接
socket.connect('ws://www.fupbup.top:9502');
//初始化
socket.on('init', () => { //连接初始化
	socket.send({
		type: 'login',
		token: uni.getStorageSync('access_token')
	});
}).on('no_auth', () => { //收到这条指令需要重新验证身份
	socket.send({
		type: 'login',
		token: uni.getStorageSync('access_token')
	});
}).on('userinfo', (res) => { //收到自己的用户信息
	store.commit('update_userinfo', res.data);
}).on('message', (res) => { //有用户或群发来的消息
	store.commit('chat/push', packMsg(res));
}).on('response', (res) => { //接收响应消息
	// console.log(res.message);
});
Vue.prototype.$socket = socket;
Vue.prototype.$store = store;
Vue.prototype.$packMsg = packMsg;
Vue.component('load-more', LoadMore);
Vue.component('result', Result);
Vue.component('v-sender', Sender);
Vue.component('v-payment', Payment);
Vue.component('v-contracts', Contracts);


Vue.config.productionTip = false;

App.mpType = 'app';
const app = new Vue({
	...App,
	store
});

app.$mount();



