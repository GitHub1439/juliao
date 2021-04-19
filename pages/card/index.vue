<!-- 聊天 -->
<template>
	<view class="page">
		<view class="card_list bg1">
			<view>卡号</view>
			<view>{{'122344156156165156'|changeNum}}</view>
			<view>中国工商银行</view>
		</view>
		<view class="card_list bg2">
			<view>卡号</view>
			<view>{{'15616516516'|changeNum}}</view>
			<view>中国工商银行</view>
		</view>
		<view class="card_list bg3">
			<view>卡号</view>
			<view>15616516516</view>
			<view>中国工商银行</view>
		</view>
		<view>
			<image src="../../static/new/addition.png" style="width: 100%;" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import api from "vue"
	import Vue from "../../App.vue"

	export default {

		components: {},
		data() {
			return {}
		},
		methods: {
			changeNum(data) {
				console.log(data)
			}
		},
		onShow() {

		},
		filters: {
			changeNum(data) {
				if (!data) return ''
				if(data.length<5)return data
				data = Xreplace(data,4)
				data = data.substr(0,data.length-5).replace(/[0-9]/ig,"*")+data.substr(data.length-5,data.length);
				data = data.replace(/-/ig," ")
				return data
			}
		},
		onNavigationBarButtonTap() {

		},
	}

	function Xreplace(str, length, reversed) {
		let re = new RegExp("\\d{1," + length + "}", "g");
		let ma = str.match(re);
		if (reversed) ma.reverse();
		return ma.join("-");
	}
</script>

<style lang="scss">
	.page {
		background: #f1f1f1;
		padding: 25upx;
	}

	.card_list {
		display: flex;
		flex-direction: column;
		padding: 50upx;
		color: #fff;
		font-size: 28upx;
		line-height: 60upx;

	}

	.bg1 {
		background: url("../../static/new/cardBg1.png") no-repeat 100%;
	}

	.bg2 {
		background: url("../../static/new/cardBg2.png") no-repeat 100%;
	}

	.bg3 {
		background: url("../../static/new/cardBg3.png") no-repeat 100%;
	}
</style>
