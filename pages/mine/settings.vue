<template>
	<view class="page page--divider">
        <view class="cell-wrapper">
             <view class="cell arrow" @tap="$jump('mine.profile')">
                <view class="cell-hd">修改资料</view>
                <view class="cell-hb"></view>
            </view>
        </view>
        <view class="cell-wrapper">
            <view class="cell arrow" @tap="$jump('mine.password', {mode: 'set-pay-pwd'})">
                <view class="cell-hd">设置支付密码</view>
                <view class="cell-hb"></view>
            </view>
            <view class="cell arrow" @tap="$jump('mine.password', {mode: 'set-login-pwd'})">
                <view class="cell-hd">设置登录密码</view>
                <view class="cell-hb"></view>
            </view>
        </view>
		<view class="cell-wrapper">
		     <view class="cell" @tap="clearCache">
		        <view class="cell-hd">清除所有聊天记录</view>
		        <view class="cell-hb"></view>
		    </view>
		</view>
        <view class="widget">
            <view class="submitBtn btn btn-error" @click="logout">退出登录</view>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        computed: mapState(['user']),
        methods: {
            logout(){
				uni.showModal({
					title: '提示',
					content: '确定要退出吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.confirm) {
							uni.clearStorageSync()
							this.$store.commit('chat/clear')
							this.$jump('login.index')
						}
					}
				});
			},
			clearCache(){
				uni.showModal({
					title: '提示',
					content: '确定要清除所有聊天记录吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.confirm) {
							let access_token = uni.getStorageSync('access_token')
							let userInfo = uni.getStorageSync('userInfo')
							uni.clearStorageSync()
							uni.setStorageSync('access_token', access_token)
							uni.setStorageSync('userInfo', userInfo)
							this.$store.commit('chat/clear')
							this.$toast('清除聊天记录成功')
						}
					}
				});
			}
        }
    }
</script>

<style scoped>
    .page {
        padding-top: 1upx;
    }
    
    .submitBtn{
        width: 85%;
        margin: 5rem auto 0 auto;
    }
</style>
