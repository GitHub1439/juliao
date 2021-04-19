<template>
	<view class="page page--divider">
		<load-more status="loading" v-if="initializing" />
		<quick-menu :actions="actions" @click="handleMenuEvent" @blur='ready' v-if="showMenu"/>
        <!-- <quick-menu style="background: url(../../static/sousuo.png);"/> -->
		<view style="display: none;">{{hackUpdate}}</view>
		<view class="title" style="padding-top: 16upx;" v-if="groupData.count">群聊</view>
		<v-contracts :items="groupData.friends" @click="paramClick" @avatar="paramClick" v-if="groupData.count" />
        <view class="lianxiren"><image src="../../static/4.png" class="lianxiren-img" /><p>新的朋友</p></view>
        <view class="lianxiren"><image src="../../static/3.png" class="lianxiren-img" /><p>添加好友</p></view>
        <view class="lianxiren"><image src="../../static/2.png" class="lianxiren-img" /><p>群聊</p></view>
		<view class="title" v-if="friendsData.count">好友</view>
		<v-contracts :items="friendsData.friends" @click="paramClick" @avatar="paramClick" v-if="friendsData.count" />
		<result v-else-if="!initializing" text="还没有好友" />
        <view style="background: #ffffff;">
             <!-- <phone-search-list :phones="phones" @paramClick="paramClick"></phone-search-list> -->
             <phone-directory :phones="phones"></phone-directory>
        </view>
	</view>
</template>

<script> 
	import quickMenu from '../../components/quick-menu';
	import api from "../../library/index.js"
    import phoneDirectory from '@/components/phone-directory/phone-directory.vue'
    import phoneSearchList from '@/components/phone-directory/phone-search-list.vue'
    import p from "./people.json"
	export default {
        name:"phones",
		components: {
			phoneDirectory,
            phoneSearchList
		},
		data() {
			return {
				showMenu: false,
				initializing: true,
				hackUpdate: +new Date(),
				actions: [{
						name: 'join-group',
						text: '加入群聊',
						img: '../../static/group-chat.png'
					},
					{
						name: 'create-group',
						text: '发起群聊',
						img: '../../static/new-group-chat.png'
					},
					{
						name: 'scan',
						text: '扫一扫',
						img: '../../static/scan.png'
					},
					{
						name: 'add-friend', 
						text: '添加好友',
						img: '../../static/new-friend.png'
					},
				],
				friendsData: {},
				groupData: {},
                phones:p
			}
		},
		methods: {
            ready() {
               document.addEventListener('click', (e) => {
                   console.log(JSON.stringify(e));
                   if (!this.$el.contains(e.target)) this.showMenu = false
               })
            },
            paramClicks (e) {
            	console.log(this.phones)
            },
			paramClick(e) {
				let page, params;
				if (e.type === 'friend') {
					const {
						id,
						nickname,
						avatar
					} = e;
					params = {
						id,
						nickname,
						avatar
					};
					page = 'friend.chat';
				} else if (e.type === 'room') {
					page = 'group.chat';
					params = e
				}
				this.quickMenuVisible(false);
				this.$jump(page, params);
			},
			handleMenuEvent(data) {
				this.quickMenuVisible(false);

				switch (data.name) {
					case 'add-friend':
						return this.$jump('search.friend');
					case 'join-group':
						return this.$jump('search.group');
					case 'create-group':
						return this.$jump('group.create');
					case 'scan':
						return uni.scanCode({
						    success(res) {
								scode.getScode(res)
						    },
						    fail(e) {
						    	console.log(JSON.stringify(e));
						    	console.log('扫码失败')
						    }
						});
				}
			},
			quickMenuVisible(show) {
				const text = show ? '\ue8e7' : '\ue8e1';
				this.showMenu = show;
			},
			getMyGroup() {
				api.getMyGroup().then(re => {
					uni.setStorageSync('groups', re.data)
					for (let i in re.data) {
						re.data[i].type = 'room'
					}
                    console.log(re)
					this.groupData.friends = re.data
					this.groupData.count = re.data.length
					this.hackUpdate = +new Date()
				});
			},
			getMyFriend() {
				api.getMyFriend().then(res => {
					let curuser = uni.getStorageSync('userInfo') || {id: '--', 'nickname' : '',avatar: ''};
					uni.setStorageSync('friends', [{
						id: curuser.id,
						avatar: curuser.avatar,
						nickname: curuser.nickname
					},...res.data]);
					for (let i in res.data) {
						res.data[i].type = 'friend'
					}
                    console.log(res)
					this.friendsData.friends = res.data,
						this.friendsData.count = res.data.length,
						this.initializing = false
				})
			},
		},
		onNavigationBarButtonTap(e) {
			this.quickMenuVisible(!this.showMenu);
		},
		onShow() {
			this.getMyFriend()
			this.getMyGroup()
		},
		onLoad(opts) {
			
		}
	}
</script>

<style lang="scss" scoped>
	.title { 
		font-size: 28upx;
		padding: 5upx 30upx;
	}
    .lianxiren{
        display: flex;align-items: center;padding: 8px;margin: 0 8px;background: #ffffff;
    }
    .lianxiren uni-image{width: 44px;height: 44px;}
    .lianxiren-img{width: 52px!important;height: 44px;background-size: 100%!important;margin-right: 10px;}
    .lianxiren>p{width: 100%;height: 100%;border-bottom: 1px solid #e2e2e2;padding: 8px 0;}
</style>
