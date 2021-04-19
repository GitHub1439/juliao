<template>
	<view>
		<view class="info">
			<view class="avatar">
				<image :src="user.avatar" mode=""></image>
			</view>
			<view class="nickname">
				{{user.nickname}} 共输赢
			</view>
			<view class="moeny">
				{{win_total_money}}
				<text style="font-size: 32upx;color: #333;padding: 0 10upx;">元</text>
			</view>
		</view>
		<view class="other">
			<view>
				<view>发{{countInfo.send_total_money}}元 返{{countInfo.send_return_money}}元</view>
				<view>赢{{countInfo.send_win_money}}元 输{{countInfo.send_lost_money}}元</view>
				<view>发红包</view>
			</view>
			<view>
				<view>抢{{countInfo.receive_total_money}}元 赔{{countInfo.receive_return_money}}元</view>
				<view>赢{{countInfo.receive_win_money}}元 输{{countInfo.receive_lost_money}}元</view>
				<view>收红包</view>
			</view>
		</view>
		<view class="cell-wrapper">
			<block v-for="(row,index) in rows" :key="index">
				<view class="cell">
				    <view class="cell-hd" style="line-height: 53upx;">
						<view>{{row.type_name}}</view>
						<view style="color: #999;font-size: 24upx;">{{row.create_at}}</view>
					</view>
				    <view class="cell-hb">{{row.money}}元</view>
				</view>
			</block>
		</view>
		<view style="padding: 20upx;text-align: center;font-size: 28upx;color: #999;" v-if="!rows.length">暂无红包记录</view>
	</view>
</template>

<script>
	import api from "../../library/index.js"

	export default {
		data() {
			return {
				countInfo: {
					send_total_money: 0,
					send_return_money: 0,
					receive_total_money: 0,
					receive_return_money: 0,
				},
				win_total_money: 0,
				group_id: 0,
				rows: [],
				pageNo: 1,
				pageNum: 10,
				isMore: true
			}
		},
		onLoad(ops) {
			this.group_id = ops.group_id;
			api.getGroupRedpackCount(ops).then(res => {
				this.countInfo = res.data;
				this.win_total_money = (res.data.send_win_money + res.data.receive_win_money).toFixed(2);
			});
			this.loadMore();
		},
		onReachBottom() {
			this.loadMore();
		},
		methods: {
			loadMore() {
				if(!this.isMore) return;
				api.getGroupRedpackRecord({group_id: this.group_id,page_no: this.pageNo++, page_num: this.pageNum}).then(res=>{
					res.data.rows.forEach(v=>{
						v.create_at = v.create_at.substr(0, 10);
					});
					this.rows = [...this.rows,...res.data.rows];
					this.isMore = res.data.next;
				});
			}
		},
		computed: {
			user() {
				return this.$store.state.userinfo;
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
	}

	.info {
		text-align: center;
		padding: 40upx 0;

		.avatar>image {
			width: 180upx;
			height: 180upx;
			background: rgba(0, 0, 0, 0.05);
			border-radius: 12upx;
		}

		.nickname {
			padding: 10upx 0;
		}

		.moeny {
			font-size: 70upx;
		}
	}

	.other {
		display: flex;
		justify-content: center;
		align-items: center;

		>view {
			width: 50%;
			text-align: center;
			color: #666;

			>view:first-child {
				font-size: 36upx;
			}

			>view:last-child {
				font-size: 24upx;
			}
		}
	}
</style>
