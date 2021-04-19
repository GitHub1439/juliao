<template>
	<view class="page">
		<view class="page-header">
			<!-- <view class="page-header-money">￥4</view> -->
			<view class="page-header-info">
				<image :src="info.redpack.user.avatar" mode="widthFix"></image>
				<view>{{info.redpack.user.nickname}}的红包</view>
			</view>
			<view class="page-header-title">
				<view>{{info.redpack.note||'恭喜发财，大吉大利！'}}</view>
				<block v-if="reviceMoney">
					<view style="font-size: 70upx;margin-top: 50upx;">￥{{reviceMoney}}</view>
					<view style="font-size: 28upx;">已存入零钱</view>
				</block>
			</view>
		</view>
		<view class="page-body">
			<view class="page-body-desc">
				{{info.redpack.num}}个红包，共{{info.redpack.money}}元
				<text v-if="info.redpack.remain_size>0">，剩{{info.redpack.remain_size}}个</text>
				<text v-else>，已领完</text>
				<!-- <view v-if="info.redpack.group_id>0" style="color: #333;letter-spacing: 10upx;float: right;">
					<text class="n-icon n-icon-thunder"></text>
					{{ info.redpack.thunder ? info.redpack.thunder : '无'}}
				</view> -->
			</view>
			<block v-for="(item,i) in info.record" :key="i">
				<view class="page-body-item">
					<view>
						<image :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view style="flex-grow: 1;">
						<view style="line-height: 50upx;">{{item.nickname}}</view>
						<view style="text-align: left;color: #999;line-height: 50upx;">{{item.create_at}}</view>
					</view>
					<view style="text-align: right;">
						<view style="line-height: 50upx;">￥{{item.money}}</view>
						<view style="text-align: right;color: red;line-height: 50upx;"><text v-if="item.is_thunder == 1 && info.redpack.remain_size == 0" class="n-icon n-icon-thunder"></text></view>
					</view>
				</view>
			</block>
			<view v-if="!info.record || !info.record.length" style="text-align: center;font-size: 28upx;color: #999;">暂时，无人领取</view>
		</view>
	</view>
</template>

<script>
	import api from "../../library/index.js"
	export default {

		data() {
			return {
				info: {
					redpack: {
						user: [],
						money: ''
					}
				},
				reviceMoney: ''
			};
		},
		onLoad(opts) {
			api.packetDetail({
				id: opts.pickId
			}).then(res => {
				this.info = res.data;
				res.data.record.forEach(v=>{
					if(v.user_id==this.$store.state.userinfo.id) {
						this.reviceMoney = v.money;
					}
				});
			});
		},
		onNavigationBarButtonTap() {
			if(!this.info.redpack.group_id) return this.$jump('packet.logs');
			uni.showActionSheet({
				itemList: ['我的记录', '群聊记录'],
				success:  (res) => {
					if(res.tapIndex == 0) {
						this.$jump('packet.logs');
					} else {
						this.$jump('packet.group_logs', {group_id: this.info.redpack.group_id});
					}
				}
			});
		}
	}
</script>

<style lang="scss">
	.page {
		background: #fff;
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		view{
			box-sizing: border-box;
		}

		&-header {
			padding-bottom: 50upx;
			background: #f35543;
			overflow: hidden;
			border-bottom-left-radius: 50%;
			border-bottom-right-radius: 50%;
			color: #ffe2b1;
			text-align: center;

			&-money {
				text-align: center;
				font-size: 70upx;
			}

			&-info {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				image {
					width: 80upx;
					height: 80upx !important;
					margin-right: 20upx;
					background: rgba(0, 0, 0, 0.05);
					border-radius: 12upx;
					border: 1px solid rgba(0, 0, 0, 0.05);
				}
			}
			&-title{
				padding: 20upx 0;
			}
		}
		&-body {
			font-size: 28upx;
			padding: 20upx;
			padding-top: 0;
			flex-grow: 1;
			overflow-y: scroll;
			border-top: 20upx solid #f5f5f5;
			margin-top: 40upx;
			position: relative;
			&:after{
				content: "";
				height: 1px;
				width: 100%;
				background: #ddd;
				position: absolute;
				top: 0;
				left: 0;
				transform: scaleY(.5);
			}
			&-desc {
				padding: 20upx 0;
				color: #666;
			}

			&-item {
				display: flex;
				image {
					width: 100upx;
					height: 100upx !important;
					margin-right: 20upx;
					background: rgba(0, 0, 0, 0.05);
					border-radius: 12upx;
					border: 1px solid rgba(0, 0, 0, 0.05);
				}
			}
		}
	}
</style>
