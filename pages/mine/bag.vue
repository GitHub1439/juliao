<!-- 钱包 -->
<template>
	<view class="page page--divider">
		<view class="widget">
			<div class="moneybox widget-inner">
				<div class="balance">
					<img class="moneyIcon" src="../../static/money/money.png" alt="">
				</div>
                <div style="padding: 10px 0;">
					<span>余额</span>
				</div>
                <div class="moneys">￥{{user.coin||0}}</div>
			</div>
			<view class="widget-inner">
				<view class="submitBtn btn btn-primary" @click="$jump('mine.recharge')">充值</view>
                <view class="submitBtn btn btn-error" @click="$jump('mine.cash')">提现</view>
                <view class="submitBtn btn btn-success"><navigator url="../yinhangkas/index">银行卡</navigator></view>
			</view>
		</view>
	</view>
</template>

<script>
    import {mapState} from 'vuex'
	import api from '../../library/index.js'
	export default {
		data(){
			return{
				user:''
			}
		},
        onNavigationBarButtonTap() {
        	this.$jump('mine.order');
        },
		onShow() {
			api.getUserInfo().then(res=>{
				uni.setStorageSync('userInfo',res.data)
				this.user = uni.getStorageSync('userInfo')
			})
		}
	}
</script>

<style scoped>
	.page{
		overflow: hidden;
        height: auto;
	}
	.moneyIcon{
        width: 5rem;
		height: 5rem;
        align-items: center;
		/* margin-right: 2rem; */
	}
	.widget-inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: inherit;
	}
	.moneybox {
		padding: 100upx 20upx;
		text-align: center;
		background-color: inherit;
	}
	.moneys{
		color: #333333;
		font-size: 1.875rem;
	}
	.balance{
        display: flex;
        align-items: center;
		color: #333333;
		font-size: 0.75rem;
		margin-top: 1.25rem;
		line-height: 1.25rem;
	}
	.submitBtn{
		width: 80%;
        margin-bottom: 2rem;
	}
	.withdraw{
		width: 80%;	
	}
    .tixian{position: absolute;
    top: -33px;
    right: 15px;
    z-index: 9999;}
</style>
