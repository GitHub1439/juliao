<template>
	<view class="page page--divider">
		<view style="display: none;">{{$store.state.hackUpdate}}</view>
		<load-more status="loading" v-if="initializing" />
		<chat-panel :store-key="storeKey" :sending="sending" @redpack="changeGet" @click-avatar="openProfile" />
		<view class="placeholder"></view>
		<v-sender v-if="!initializing" v-model="message" @send="sendTextMessage" @packet="$jump('packet.create', {group_id: group.id, member_count: group.people_count})"
		 @face="sendVoice" @sendImage="sendImg" @emoji="sendEmoji" :no-speaking="group.no_speaking && !group.owner?true:false" :forbid-redpack="group.forbid_redpack && !group.owner?true:false" />
		 <get-redpick v-if="getPick" :sender="pickSender" :error-text="pickErrorText" :title="pickTitle" @closePick="changeGet" :money="showPickMoney" @jump="jumpDetail"></get-redpick>
	</view>
</template>

<script>
	import VMessage from '../../components/message';
	import VPacket from '../../components/packet';
	import GetRedpick from '../../components/get-redpick.vue'
	import ChatPanel from '../../components/chat-panel.vue'
	import {
		mapState,
		mapGetters
	} from 'vuex';
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
				group: {},
				message: '',
				initializing: false,
				showPickMoney:'',
				getPick:'',
				pickErrorText: '',
				redpackInfo: {},
				sending: false
			};
		},
		onLoad(opts) {
			this.group = opts
			this.storeKey = 'G'+this.group.id
			uni.setNavigationBarTitle({
				title: opts.nickname || opts.name
			})
			api.getGroupInfo({
				group_id: this.group.id,
				_showWait: false
			}).then(res => {
				this.group = res.data;
			})
		},
		onShow() {
			api.getGroupInfo({
				group_id: this.group.id,
				_showWait: false
			}).then(res => {
				this.group = res.data;
			})
		},
		methods: {
			jumpDetail() {
				if(this.redpackInfo.is_receive) {
					this.getPick = false
					this.$jump('packet.detail', {
						pickId: this.pickId
					})
					this.$store.commit('chat/receiveredpack',{
						id: this.storeKey,
						redpack_id: this.pickId
					})
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
			changeGet(e) {
				if(!e) {
					this.getPick = !this.getPick
					return;
				}
				this.pickId = e.id
				api.getRedpackInfo({id:e.id}).then(res=>{
					this.redpackInfo = res.data;
					let directJump = false;
					if(!res.data.is_receive && res.data.remain_size==0) {
						directJump = true;
						this.$store.commit('chat/setredpackempty',{
							id: this.storeKey,
							redpack_id: this.pickId
						});
					}
					if(res.data.is_receive || directJump) {
						this.jumpDetail()
					} else {
						this.showPickMoney = +res.data.money
						this.pickId = res.data.id
						this.pickSender = res.data.user
						this.pickTitle = res.data.note
						this.getPick = !this.getPick
					}
				});
			},
			getInfo() {
				api.getGroupInfo({
					group_id: this.group.id
				}).then(res => {
					uni.setNavigationBarTitle({
						title: `${res.data.name}`
					})
				})
			},
			sendImg(e){
				this.commitMessage('image',e);
			},
			// 发送文本消息
			sendTextMessage() {
                console.log(this.message)
				this.commitMessage('text',this.message);
			},
			commitMessage(type,sendData) {
				let data = {
					group_id: this.group.id,
					type: type,
					content: sendData
				}
				this.message = '';
				this.sending = true;
				api.sendMessage(data).then(res => {
					this.sending = false;
				}).catch(res=>{
					this.sending = false;
				});

			},
			sendVoice(e) {
				let data = {
					group_id: this.group.id,
					type: 'voice',
					content: e
				};
				this.sending = true;
				api.sendMessage(data).then(res => {
                   
					this.sending = false;
				});
			},
			sendEmoji(e){
				this.commitMessage('face',e)
			},
			openProfile(e) {
				let params = {id: e.id,status:'friend'};
				return this.$jump('friend.detail',params)
			}
		},
		onNavigationBarButtonTap() {
			this.$jump('group.detail', this.group);
		}
	}
</script>

<style lang="scss">
	$avatar-width: 80upx;
	$control-height: 100upx;
	$control-input-height: $control-height - $uni-spacing-col-base*2;

	.page {
		padding: $uni-spacing-col-base 0 100upx + $uni-spacing-col-lg;
	}
</style>
