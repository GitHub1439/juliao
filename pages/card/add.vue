<!-- 添加银行卡 -->
<template>
	<view class="page">
		<view class="fromBox">
			<view class="title">银行卡信息</view>
			<view class="fromInput">
				<label>卡号</label>
				<input type="text" value="" placeholder="请输入银行卡号"/>
			</view>
			<view class="fromInput">
				<label>银行名称</label>
				<input type="text" value="" placeholder="请输入银行名称"/>
			</view>
		</view>
		<view class="fromBox">
			<view class="title">银行信息</view>
			<view class="fromInput">
				<label>省份</label>
				<input type="text" value="" placeholder="请输入省份"/>
			</view>
			<view class="fromInput">
				<label>市名</label>
				<input type="text" value="" placeholder="请输入市名"/>
			</view>
			<view class="fromInput">
				<label>开户行</label>
				<input type="text" value="" placeholder="请输入开户行"/>
			</view>
		</view>
		<view class="fromBox">
			<view class="title">开户信息</view>
			<view class="fromInput">
				<label>开户名</label>
				<input type="text" value="" placeholder="请输入开户名"/>
			</view>
			<view class="fromInput">
				<label>身份证号</label>
				<input type="text" value="" placeholder="请输入开户人身份证号"/>
			</view>
			<view class="fromInput">
				<label>预留手机号</label>
				<input type="text" value="" placeholder="请输入预留手机号"/>
			</view>
		</view>
		<button class="btn-primary" style="background: rgb(108,186,241);">确认添加</button>
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
				
			}
		},
		onShow() {

		},
	}
</script>

<style lang="scss">
	.page {
		background: #fafafa;
		padding: 25upx;
	}
	.fromBox{
		.title{
			font-weight: bold;
			font-size: 32upx;
			color: #333;
		}
		.fromInput{
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			border: 1px solid #e6e6e6;
			border-radius: 10upx;
			font-size: 26upx;
			padding: 10upx 20upx;
			margin: 20upx 0;
			label{
				color: #666;
			}
			input{
				text-align: right;
			}
		}
	}
</style>
