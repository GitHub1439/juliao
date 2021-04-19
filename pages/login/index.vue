<template>
	<view class="page">
        <view class="pageTop">
            <image src="../../static/loginbj.png" class="topImg"></image>
        </view>
		<view class="header">
			<view :class="{dlLeixing: type==='login'}" @tap="type='login'" >账号登录</view>
			<view :class="{dlLeixing: type==='register'}" @tap="type='register'">手机号登录</view>
		</view>

		<view class="widget">
			<view class="widget-inner">
				<view class="loginIputBox">
					<label class="emoji" @tap="onFocus('mobile')"><image src="../../static/phone.png" class="ingimages" ></image></label>
					<input type="number" v-model="mobile" placeholder="手机号码" />
				</view>
				<view class="loginIputBox" v-if="type=='register'">
					<label class="emoji"><image src="../../static/yanzhengma.png" class="ingimages" ></image></label>
					<input type="text" v-model="code" placeholder="请输入验证码" />
					<view class="get-code" @click="getCode">{{getCodeTime==60?'获取验证码':getCodeTime}}</view>
				</view>
				<view class="loginIputBox">
					<label class="emoji" @tap="onFocus('password')"><image src="../../static/mima.png" class="ingimages" ></image></label>
					<input type="text" v-model="password" placeholder="请输入密码" v-if="showPwd">
					<input type="password" v-model="password" placeholder="请输入密码" v-else />
					<label class="emoji" @tap="showPwd=false" v-if="showPwd">&#xe6a0;</label>
					<label class="emoji" @tap="showPwd=true" v-else>&#xe6a2;</label>
				</view>
			</view>

			<view class="widget-inner">
				<view class="btn btn-primary btn-round" @click="handleSubmit">{{type==='login'?'登录':'注册'}}</view>
			</view>
		</view>

		<view class="tips">
			<text>{{type==='login'?'登录':'注册'}}即表示你同意</text>
			<text @tap="handleAgree" class="agree">《用户协议》</text>
		</view>
	</view>
</template>

<script>
	import {
		login,
		register,
		getFriends,
		article
	} from '../../utility/api'
	import cache from '../../library/cache.js'
	import api from "../../library/index.js"
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				code: '',
				url: null,
				back: 0,
				showPwd: false,
				focusField: null,
				type: 'login',
				getCodeTime: 60
			}
		},
		methods: {
			handleAgree() {
				article('用户协议').catch(this.$toast);
			},
			handleSubmit() {
				let data = {
					mobile: this.mobile,
					password: this.password
				}
				let afterAction = (res) => {
					cache.storage('access_token', res.data.access_token)
					this.$socket.emit('no_auth');
					api.getMyGroup().then(res => {
						uni.setStorageSync('groups', res.data)
					})
					api.getUserInfo().then(user=>{
						uni.setStorageSync('userInfo',user.data)
						api.getMyFriend().then(res => {
							let curuser = user.data || {id: '--', 'nickname' : '',avatar: ''};
							uni.setStorageSync('friends', [{
								id: curuser.id,
								avatar: curuser.avatar,
								nickname: curuser.nickname
							},...res.data]);
						})
					})
					uni.reLaunch({
						url: '../index/index'
					})
				}
				if (this.type == 'login') {
					api.login(data).then(res => {
						afterAction(res)
					})
				} else {
					let data1 = {
						...data,
						code: this.code
					}
					api.register(data1).then(res => {
						afterAction(res)
					})
				}

			},
			getCode() {
				if (this.getCodeTime == 60) {
					api.sendCode({
						mobile: this.mobile,
						type: 'register'
					}).then(res => {
						setInterval(() => {
							this.getCodeTime--
							if (this.getCodeTime == 0) this.getCodeTime = 60
						}, 1000)
					})

				}

			}
		},
		onLoad(opts) {

		}
	}
</script>

<style lang="scss">
    .pageTop{
        text-align:center;
        margin-top: 200rpx;

    }
    .topImg{
        width: 154rpx;
        height: 154rpx;
    }
	.page {
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}

	.widget {
		flex: 1;
	}
    
	.widget-inner {
		padding: 30upx;
	}
    .dlLeixing{
        color:#0080FF!important;
    }

	.header {
		width: 100%;
		/* background: #5871FF; */
		padding: 70rpx 100rpx 0;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		flex-shrink: 0;

		>view {
			flex: 1;
			text-align: center;
			margin: 20upx;
			padding-bottom: 20upx;
			position: relative;
			color: #888888;

			&.active::before {
				position: absolute;
				display: block;
				content: '\20';
				top: 100%;
				left: 50%;
				border: 20upx solid transparent;
				border-top-width: 0;
				border-bottom-color: #fff;
				margin-left: -20upx;
				margin-top: 1upx;
			}
            
		}
	}
    .ingimages{
        width:30rpx;
        height:36rpx;
    }
	.loginIputBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid #ddd;
		/* border-radius: 100upx; */
		height: 88upx;
		margin-bottom: $uni-spacing-col-base;
		position: relative;

		.emoji {
			width: 88upx;
			line-height: 88upx;
			text-align: center;
			color: #B6C2CE;
		}

		input {
			line-height: 44upx;
			flex: 1;
			color: inherit;
			border: none;
			background: none;
			outline: none;
		}

		&.active {
			border-color: #5871FF;

			.emoji,
			input {
				color: #000;
			}
		}

		.get-code {
			padding: 0 10upx;
			font-size: 26upx;
			color: #fff;
			background-color: #B6C2CE;
			margin: 0 20upx 0 10upx;
			line-height: 48upx;
			box-sizing: border-box;
			border-radius: 60upx;
		}
	}

	.tips {
		color: #838383;
		font-size: 28upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		padding: $uni-spacing-col-lg $uni-spacing-row-base;

		icon {
			margin-right: 10upx;
		}

		.agree {
			color: #FF8E0A;
		}
	}
</style>
