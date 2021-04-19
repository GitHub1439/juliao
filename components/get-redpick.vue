<template>
	<view>
		<view class="mask">
			<view :class="{'boom':true,'a-boom':true}">BOOM</view>
			<view class="bag">
				<view class="redpick-info">
					<view class="redpick-info-avatar">
						<view style="background: rgba(0,0,0,0.1);border-radius: 12upx;"><image :src="sender.avatar || ''" /></view>
						<view class="redpick-info-nickname">
							<view class="redpick-over">{{sender.nickname || sender.name || '匿名'}}</view>
							<view class="redpick-over">的红包</view>
						</view>
					</view>
					<view class="redpick-info-title">
						{{title || '恭喜发财，大吉大利'}}
					</view>
				</view>
				<view class="header">
					<!-- <view style="color: #FFDDB3;">￥{{money}}</view> -->
					<view style="margin-top: 20upx;font-size: 28upx;">{{msg}}</view>
				</view>
				<view v-if="!errorText" class="stick" @click="goDetail">
					<span class="rmb">開<!-- 開 --></span>
				</view>
				<view v-else class="error-text">
					{{errorText}}
				</view>
				<!-- <view class="detail-btn" @click="goDetail">查看详情 ></view>
				<view class="message">{{msg}}</view> -->
			</view>
			<view class="redpick-close" @click="closeMask">
				<image src="../../static/close.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
			}
		},
		props: {
			money: {
				type: Number,
				require: true
			},
			msg: {
				type: String,
				require: true
			},
			sender: {
				type: Object,
				require: true
			},
			title: {
				type: String,
				require: true
			},
			errorText: {
				type: String,
				default: ''
			}
		},
		methods: {
			closeMask() {
				this.$emit('closePick')
			},
			goDetail() {
				this.$emit('jump')
			}
		},
		created() {}
	}
</script>

<style lang="scss" scoped>
	.mask {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		z-index: 10;
		position: fixed;
		background: rgba(255,255,255,0.5);
		left: 0;
		top: 0;
	}

	.bag {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 500upx;
		height: 800upx;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;
		background-color: #F25542;
		border-radius: 12upx;
		transform: translate(-50%,-50%);
	}

	.redpick-close {
		position: absolute;
		left: 50%;
		bottom: 12%;
		width: 60upx;
		height: 60upx;
		z-index: 100;
		transform: translateX(-50%);
		image {
			width: 60upx;
			height: 60upx;
		}
	}

	.bag:before {
		content: '';
		position: absolute;
		top: -20%;
		left: 50%;
		z-index: 0;
		width: 200%;
		height: 100%;
		border-radius: 100%;
		background-color: #F45E4D;
		box-shadow: 0px 4upx 10upx 0px rgba(0,0,0,0.2);
		transform: translateX(-50%);
	}

	.bag .header {
		position: absolute;
		left: 0;
		top: 45%;
		width: 100%;
		text-align: center;
		z-index: 1;
		color: #fff;
		font-size: 80upx;
		opacity: .9;
	}

	.bag .header .subtitle {
		font-size: 32upx;
	}

	.bag .header .num {
		color: #FEED4C;
	}

	.bag .stick {
		position: relative;
		z-index: 1;
		width: 140upx;
		height: 140upx;
		margin: 0 auto;
		margin-top: 112%;
		border-radius: 9999px;
		background-color: #EBCD99;
		box-shadow: 0 0 10upx 0 rgba(0,0,0,0.4);
	}

	.bag .stick .rmb {
		font-size: 70upx;
		line-height: 150upx;
		color: #3B3A37;
	}
	
	.bag .detail-btn {
		display: block;
		font-size: 32upx;
		color: #fff;
	}

	.message {
		font-size: 28upx;
		text-align: center;
		color: #eee;
	}

	.boom {
		font-size: 130upx;
		font-weight: bold;
		position: absolute;
		left: 0;
		top: 47vh;
		z-index: 60;
		text-align: center;
		width: 100%;
		line-height: 60upx;
		display: none;
		opacity: 0;
		pointer-events: none;
	}
	
	.error-text{
		position: absolute;
		left: 50%;
		bottom: 12%;
		transform: translateX(-50%);
		color: #f4e4ae;
		font-size: 28upx;
		width: 100%;
	}

	.a-boom {
		animation: boom .8s;
	}

	@keyframes boom {

		/*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
		0% {
			transform: scale3d(1, 1, 1);
			opacity: 1;
			font-size:20upx;
		}

		30% {
			transform: scale3d(1.25, 0.75, 1);
		}

		40% {
			transform: scale3d(0.75, 1.25, 1);
		}

		50% {
			transform: scale3d(1.15, 0.85, 1);
		}

		65% {
			transform: scale3d(0.95, 1.05, 1);
		}

		75% {
			transform: scale3d(1.05, 0.95, 1);
		}

		100% {
			transform: scale3d(1, 1, 1);
			opacity: 0;
			font-size:130upx;
		}
		}
		.redpick-info{
			position: absolute;
			left:0;
			top: 0;
			width: 100%;
			height: 30%;
			color: #F4E4AE;
			&-avatar{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 30%;
				font-size: 28upx;
				image{
					width: 60upx;
					height: 60upx;
				}
			}
			&-nickname{
				margin-left: 20upx;
			}
			&-title{
				margin-top: 30upx;
				font-size: 40upx;
			}
		}
		.redpick-over{
			max-width: 100upx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			display: inline-block;
		}
</style>
