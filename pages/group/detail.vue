<template>
	<view class="page">
		<view class="members">
			<block v-for="m in members" :key="m.id">
				<view class="member">
					<image class="avatar" :src="m.avatar" @tap="lookMember(m)" />
					<text>{{ m.nickname }}</text>
				</view>
			</block>
			<view class="member" v-if="isOwner">
				<view class="avatar emoji" @tap="handleAdd('add')">&#xe8e1;</view>
			</view>
			<view class="member" v-if="isOwner">
				<view class="avatar emoji" @tap="handleAdd('remove')">&#xe8e2;</view>
			</view>
		</view>

		<view class="cell-wrapper">
			<view class="cell" :class="isOwner?'arrow':''" v-if="isOwner">
				<view class="cell-hd">群名称</view>
				<input type="text" v-model="info.name" class="fromInput" @blur="setName" />
			</view>
			<view class="cell">
			    <view class="cell-hd">群号</view>
			    <view class="cell-hb">{{info.id}}</view>
			</view>
			<!-- <view class="cell arrow" @tap="qrcode" v-show="switchs">
				<view class="cell-hd">群二维码</view>
				<view class="cell-hb emoji">&#xe613;</view>
			</view>
            <view class="cell" v-if="isOwner">
                <view class="cell-hd">群二维码控制</view>
                <switch @change="switch1Change"/>
            </view> -->
			<view class="cell" v-if="isOwner">
			    <view class="cell-hd">全成员禁言</view>
			    <switch @change="speakChange" :checked="no_speaking" />
			</view>
			<view class="cell" v-if="isOwner">
			    <view class="cell-hd">禁止发红包</view>
			    <switch @change="forbidRedpackChange" :checked="forbid_redpack" />
			</view>
		</view>
		<view class="btn-wrapper" v-if="isOwner">
			<view class="btn btn-error" @tap="deleteGroup">删除并退出</view>
		</view>
		<view class="btn-wrapper" v-else>
			<view class="btn btn-error" @tap="quitGroup">退出群聊</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from "../../library/index.js"
	export default {
		data() {
			return {
				roomId: 0,
				isOwner: false,
				info: {},
				group: {},
				members: [],
                switchs:false,
				no_speaking: false,
				forbid_redpack: false
			}
		},
		methods: {
            // 群二维码控制
            switch1Change(e){
				this.switchs = !this.switchs;
            },
            // 群禁言控制
            speakChange(e){
				this.no_speaking = !this.no_speaking;
				api.changeSpeak({
					group_id: this.group.id,
					no_speaking: this.no_speaking ? 1:0,
					_showWait: false
				}).catch(res => {
					this.no_speaking = !this.no_speaking;
				});
            },
            // 群发红包控制
            forbidRedpackChange(e){
				this.forbid_redpack = !this.forbid_redpack;
				api.changeSpeak({
					group_id: this.group.id,
					forbid_redpack: this.forbid_redpack ? 1:0,
					_showWait: false
				}).catch(res => {
					this.forbid_redpack = !this.forbid_redpack;
				});
            },
			handleAdd(mode) {
				this.$jump('group.create', {
					room_id: this.info.id,
					mode,
					userId: this.info.user_id
				});
			},
			qrcode() {
				this.$jump('group.qrcode', {
					id: this.info.id
				});
			},
			getGroupUsers() {
				api.getGroupUsers({
					group_id: this.group.id
				}).then(res => {
					this.members = res.data
				})
			},
			getGroupInfo() {
                let that = this;
				api.getGroupInfo({
					group_id: that.group.id
				}).then(res => {
					let result = res.data;
					that.isOwner = result.owner;
					that.info = result;
					that.no_speaking = result.no_speaking ? true : false;
					that.forbid_redpack = result.forbid_redpack ? true : false;
					uni.setNavigationBarTitle({
						title: `${result.name}(${result.people_count})`
					})
				})
			},
			editGroup(field) {
				if (this.isOwner) {
					this.$jump('group.edit', {
						id: this.roomId,
						field
					});
				}
			},
			setName() {
				api.changeGroupName({
					group_id: this.info.id,
					name: this.info.name,
					_showWait: false
				}).then(res => {
					this.getGroupInfo()
				})
			},
			lookMember(e) {
				e.status = "group"
				return this.$jump('friend.detail', e);
			},
			deleteGroup() {
				uni.showModal({
					title: '提示',
					content: '确定要解散该群吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							api.removeGroup({
								group_id: this.info.id
							}).then(res => {
								this.$toast('删除成功').then(() => {
									uni.switchTab({
										url: '../contacts/index'
									});
								});
							});
						}
					}
				});
			},
			quitGroup() {
				uni.showModal({
					title: '提示',
					content: '确定要退出该群吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '退出',
					success: res => {
						if (res.confirm) {
							api.quitGroup({
								group_id: this.info.id
							}).then(res => {
								this.$toast('退出成功').then(() => {
									uni.switchTab({
										url: '../contacts/index'
									});
								});
							});
						}
					}
				});
			}
		},
		onShow() {
			this.getGroupUsers()
		},
		onLoad(opts) {
            let that = this;
			that.group = opts;
			that.getGroupInfo();
        }
	}
</script>

<style lang="scss" scoped>
	$avatarWidth: (750upx - $uni-spacing-row-base * 2) / 5 - $uni-spacing-row-base * 2;

	.members {
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		display: flex;
		flex-direction: row;
		flex-flow: wrap;
		justify-content: flex-start;
		background-color: #fff;
	}

	.member {
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		text-align: center;
		.avatar {
			width: $avatarWidth;
			height: $avatarWidth;
			border-radius: $uni-border-radius-base;
			background: rgba(0,0,0,0.05);

			&.emoji {
				text-align: center;
				background-color: #eee;
				font-size: 68upx;
				line-height: $avatarWidth;
				color: #999;
			}
		}

		text {
			width: $avatarWidth;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			font-size: 28upx;
			color: #999;
		}
	}

	.notice {
		width: 500upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.btn-wrapper {
		margin-top: $uni-spacing-col-base;
		padding: $uni-spacing-col-lg $uni-spacing-row-lg;
	}

	.fromInput {
		text-align: right;
		font-size: 32upx;
		color: #777;
	}
</style>
