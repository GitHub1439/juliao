<template>
	<view class="page page--divider">
		<load-more status="loading" v-if="initializing" />
		<view class="inputbar">
			<input :placeholder="mode=='remove'||mode=='add'?'请选择成员':'群名称'" v-model="name" :disabled="mode=='remove'||mode=='add'" />
			<view class="btn" @tap="handleSubmit">确定</view>
		</view>
		<v-contracts :items="friendsData.friends" :selectMode="true" @click="paramClick" v-if="friendsData.count" />
		<result v-else-if="!initializing" text="还没有好友" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '../../library/index.js'

	export default {
		data() {
			return {
				initializing: true,
				name: '',
				roomId: 0,
				selected: {},
				disabledMap: {},
				checkedMap: {},
				mode: 'none',
				friendsData: {},
				nowGroup: {},
				userId:''
			}
		},
		computed: {

		},
		methods: {
			getMyFriend() {
				if (this.mode === 'add') {
					api.getGroupUsers({
						group_id: this.roomId
					}).then(res => {
						this.initializing = false
						this.nowGroup = res.data
						let a = res.data
						api.getMyFriend().then(res => {
							let b = res.data
							for (let i = b.length - 1; i >= 0; i--) {
								for (let j in a) {
									if (b[i].id == a[j].id) {
										b.splice(i, 1)
									}
								}
							}
							this.friendsData = {
								friends: b,
								count: b.length
							}
						})
					})
				} else if (this.mode === 'remove') {
					api.getGroupUsers({
						group_id: this.roomId
					}).then(res => {
						this.initializing = false
						this.nowGroup = res.data
						for(let i = res.data.length-1;i>=0;i--){
							if(res.data[i].id==this.userId)res.data.splice(i,1)
						}
						this.friendsData = {
							friends: res.data,
							count: res.data.length
						}
					})
				} else {
					api.getMyFriend().then(res => {
						this.friendsData = {
							friends: res.data,
							count: res.data.length
						}
						this.initializing = false
					})
				}
			},
			handleSubmit() {
				let arr = this.friendsData.friends
				let str = ''
				for (let i in arr) {
					if (arr[i].selected) str += arr[i].id + ','
				}
				str = str.substr(0, str.length - 1)
				if (this.mode == 'remove') {
					api.removeUserForGroup({
						user_id: str,
						group_id: this.roomId
					}).then(res => {
						uni.navigateBack()
					})
				}else if(this.mode == 'add'){
					api.inviteIntoGroup({
						user_id: str,
						group_id: this.roomId
					}).then(res => {
						uni.navigateBack()
					})
				} else {
					if (this.name == '' || str == '') return this.$toast('请完善群聊信息')
					let data = {
						name: this.name,
						user_id: str
					}
					api.createGroup(data).then(res => {
						this.$jump('group.chat', res.data)
					})
				}
			},
		},
		onNavigationBarButtonTap(e) {

		},
		onLoad(opts) {
			this.mode = opts.mode
			if (opts.room_id) this.roomId = opts.room_id
			if (opts.userId) this.userId = opts.userId
			this.getMyFriend()

			let title = null;

			if (opts.mode === 'remove') {
				title = '删除群聊成员'
			} else if (opts.mode === 'add') {
				title = '添加群聊成员';
			}

			if (title) {
				uni.setNavigationBarTitle({
					title
				})
			}
		}
	}

	function complement(a, b) {
		return a.filter(function(v) {
				return !(b.indexOf(v) > -1)
			})
			.concat(b.filter(function(v) {
				return !(a.indexOf(v) > -1)
			}))
	}
</script>

<style lang="scss">
	.inputbar {
		display: flex;
		align-items: center;
		height: 56px;
		background-color: #fff;
		box-sizing: border-box;
		padding: $uni-spacing-col-base $uni-spacing-row-base;

		input {
			background-color: #eee;
			border-radius: $uni-border-radius-base;
			height: 100%;
			padding: 0 $uni-spacing-row-base;
			flex: 1;

			&.disabled {
				background-color: #fff;
				border: 1upx solid #eee;
			}
		}

		.btn {
			padding-top: 0;
			padding-bottom: 0;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: $uni-spacing-row-base;

			&:not(.btn-primary) {
				background-color: #eee;
			}
		}
	}
</style>
