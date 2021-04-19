<template>
	<view class="page" ref="page">
		<view style="display: none;position: fixed;left: 50%;top: 50%;">{{$store.state.hackUpdate}}</view>
		<load-more status="loading" v-if="initializing" />
		<chat-panel :store-key="storeKey" :sending="sending" @redpack="changeGet" @click-avatar="openProfile" />
		<v-sender v-if="!initializing" v-model="message" @send="sendTextMessage" @packet="$jump('packet.create', {friend_uid: friend.id,friend_name:friend.nickname,friend_avatar:friend.avatar})"
		 @face="sendVoice"  @sendImage="sendImg" @emoji="sendEmoji"/>
		<get-redpick v-if="getPick" :sender="pickSender" :title="pickTitle" :error-text="pickErrorText" @closePick="changeGet" :money="showPickMoney" :msg="pickMsg" @jump="jumpDetail"></get-redpick>
	</view>
</template>

<script>
	import VMessage from '../../components/message'
	import VPacket from '../../components/packet'
	import GetRedpick from '../../components/get-redpick.vue'
	import ChatPanel from '../../components/chat-panel.vue'
	import api from "../../library/index.js"
	export default {
		components: {
			VMessage,
			VPacket,
			GetRedpick,
			ChatPanel
		},
		data() {
			return {
				friend: {},
				message: '',
				initializing: false,
				getPick: false,
				showPickMoney: '',
				pickMsg: '',
				pickId: "",
				pickSender: {},
				pickTitle: '',
				pickErrorText: '',
				storeKey: '',
				redpackInfo: {},
				sending: false,
			};
		},
		onLoad(opts) {
			this.friend = opts;
			this.storeKey = 'U' + this.friend.id;
			uni.setNavigationBarTitle({
				title: opts.nickname
			})
		},
		methods: {
			sendEmoji(e){
				this.commitMessage('face',e)
			},
			sendImg(e){
				this.commitMessage('image',e);
			},
			handleMessage(msg, long) {
				switch (msg.type) {
					case 'text':
						return this.handleTextMessage(msg, long);
					case 'packet':
						return this.handlePacketMessage(msg, long);
				}
			},
			// 发送文本消息
			sendTextMessage() {
				this.commitMessage('text',this.message);
			},
			commitMessage(type,sendData) {
				let data = {
					friend_uid: this.friend.id,
					type: type,
					content: sendData
				}
				this.message = '';
				this.sending = true;
				api.sendMessage(data).then(res => {
					this.sending = false;
				}).catch(res=>{
					this.sending = false;
				})
			},
			changeGet(e) {
				if(!e) {
					this.getPick = !this.getPick
					return;
				}
				api.getRedpackInfo({id:e.id}).then(res=>{
					this.redpackInfo = res.data;
					if(res.data.is_receive || res.data.remain_size == 0) {
						this.jumpDetail()
					} else {
						this.showPickMoney = +res.data.money
						this.pickId = res.data.id
						this.pickSender = res.data.user
						this.pickTitle = res.data.note
						this.getPick = !this.getPick
						if(this.redpackInfo.user_id==this.$store.state.userinfo.id) {
							this.getPick = false
							this.$jump('packet.detail', {
								pickId: this.pickId
							})
						}
					}
				});
			},
			jumpDetail() {
				//领取了 或者 领完了，直接跳到详情页
				if(this.redpackInfo.is_receive || this.redpackInfo.remain_size == 0) {
					this.getPick = false
					this.$jump('packet.detail', {
						pickId: this.pickId
					})
					if(this.redpackInfo.remain_size == 0) {
						this.$store.commit('chat/setredpackempty',{
							id: this.storeKey,
							redpack_id: this.pickId
						})
					} else {
						this.$store.commit('chat/receiveredpack',{
							id: this.storeKey,
							redpack_id: this.pickId
						})
					}
				} else {
					//不是自己发的或者群红包就直接抢
					if(+this.redpackInfo.group_id>0 || this.redpackInfo.user_id!=this.$store.state.userinfo.id) {
						api.grab({
							id: this.pickId
						}).then(res => {
							this.getPick = false
							this.$jump('packet.detail', {
								pickId: this.pickId
							})
							this.$store.commit('chat/receiveredpack',{
								id: this.storeKey,
								redpack_id: this.pickId
							})
						}).catch(res=>{
							if(res.code<0) {
								this.pickErrorText = res.message;
								// this.$toast(res.message);
							} else {
								this.getPick = false
								this.$jump('packet.detail', {
									pickId: this.pickId
								})
							}
						})
					}
				}
			},
			sendVoice(e) {
				let data = {
					friend_uid: this.friend.id,
					type: 'voice',
					content: e
				}
				this.sending = true;
				api.sendMessage(data).then(res => {
					this.sending = false;
				})
			},
			openProfile(e) {
				let params = {id: e.id,status:'friend'};
				return this.$jump('friend.detail',params)
			}
		},
		onNavigationBarButtonTap(e) {
			let params = {...this.friend,status:'friend'};
			return this.$jump('friend.detail',params)
		},
	}
</script>

<style lang="scss">
	$avatar-width: 80upx;
	$control-height: 100upx;
	$control-input-height: $control-height - $uni-spacing-col-base*2;

	.page {
		padding: $uni-spacing-col-base 0 $control-height + $uni-spacing-col-lg;
	}

	.placeholder {
		width: 750upx;
		height: 1upx;
	}

	.message {
		&-time {
			color: #999;
			font-size: 24upx;
			text-align: center;
		}

		&-info {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			padding: $uni-spacing-col-lg $uni-spacing-row-lg;

			.spacing {
				width: $uni-spacing-row-lg;
				height: $avatar-width;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;

				&::before {
					display: block;
					content: '';
					border: $uni-spacing-row-lg/2 solid transparent;
					border-right-color: #fff;
				}
			}
		}

		&.right &-info {
			flex-direction: row-reverse;
			padding-left: $uni-spacing-row-lg;
			padding-right: $uni-spacing-row-lg * 2 + $avatar-width;

			.spacing::before {
				border-right-color: transparent;
				border-left-color: $uni-color-primary;
			}
		}

		&.right &-info {
			padding-left: $uni-spacing-row-lg * 2 + $avatar-width;
			padding-right: $uni-spacing-row-lg;
		}

		&-avatar {
			width: $avatar-width;
			height: $avatar-width;
			vertical-align: middle;
			border-radius: $uni-border-radius-base;
			flex-shrink: 0;
		}

		&-content {
			font-size: 32upx;
			background: rgba(255, 255, 255, 1);
			border-radius: $uni-border-radius-base;
		}

		&.right &-content {
			color: white;
			background-color: $uni-color-primary;
		}

		&--text &-content {
			padding: 20upx $uni-spacing-row-base;
		}

		&-failed {
			width: 30upx;
			height: 30upx;
			background-color: $uni-color-error;
			border-radius: 50%;
			margin: ($avatar-width - 30upx)/2 $uni-spacing-row-base 0;
		}
	}
</style>
