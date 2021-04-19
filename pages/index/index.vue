<!-- 聊天 -->
<template>
	<view class="page page--divider">
		<quick-menu :actions="actions" @click="handleMenuEvent" v-if="showMenu"/>
		<!-- <view class="widget">
			<view class="widget-inner">
				<view class="item" @tap="$jump('index.newfriend')">
					<image src="../../static/new_friend.png" class="leftImg" />
					<view class="rightContent">
						<view class="topCont">
							<view class="userName">新的朋友</view>
							<view class="badge" v-if="newfriendNotify" style="width: 20upx;height: 20upx;"></view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="widget">
			<view class="widget-inner">
				<view class="item" v-for="(item, index) in chats" :key="index" @tap="handleClick(item)">
					<image :src="item.avatar" class="leftImg" />
					<view class="rightContent">
						<view class="topCont">
							<view class="userName">{{item.nickname||'匿名'}}</view>
							<view class="time">{{ item.time || '--:--' }}</view>
						</view>
						<view class="bottomCont">
							<view class="content">
								{{item.self? '[我]': ''}}
								<text style='color: #336600;font-size: 28upx' v-if="item.message.type=='voice'">[语音]</text>
								<text style='color: #336600;font-size: 28upx' v-else-if="item.message.type=='redpack'">[红包]</text>
								<text style='color: #336600;font-size: 28upx' v-else-if="item.message.type=='image'">[图片]</text>
								<text style='color: #336600;font-size: 28upx' v-else-if="item.message.type=='face'">[表情]</text>
								<text style='color: #336600;font-size: 28upx' v-else-if="item.message.type=='text'">{{item.message.content}}</text>
								<text v-else></text>
							</view>
							<view class="badge" v-if="item.unread && item.unread>99" style="width: auto;padding: 0 5px;">99+</view>
							<view class="badge" v-if="item.unread && item.unread<=99">{{item.unread}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import quickMenu from '../../components/quick-menu';
	import scode from "../../library/scode.js"
	import api from "../../library/index.js"

	export default {
		components: {
			quickMenu
		},
		data() {
			return {
				newfriendNotify: false,
				showMenu: false,
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
				]
			}
		},
		computed: {
			chats() {
                
				return this.$store.getters['chat/msglist'];
			}
		},
		onNavigationBarButtonTap() {
           
			this.quickMenuVisible(!this.showMenu);
		},
		methods: {
			isApplyChat(info) {
              
				return info.room_id === 'apply-to-friend' || info.room_id === 'apply-to-room';
			},
			handleClick(info) {
                
				if (!(+info.group_id)) {
					let friend = {
						id: info.id,
						avatar: info.avatar,
						nickname: info.nickname
					}
					return this.$jump('mine.order', friend);
				}
				this.$jump('group.chat', {
					id: info.id,
					avatar: info.avatar,
					nickname: info.nickname
				});
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
			}
		},
		onShow() {
			api.getFriendApplyCount().then(res => {
				this.newfriendNotify = res.data.length ? true : false;
			})
		},
	}
</script>

<style lang="scss">
	.item {
        height: 100upx;
		border-bottom: 1px solid #F0F0F0;
		overflow: hidden;
		padding: $uni-spacing-col-lg 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.leftImg {
		width: 100upx;
		height: 100upx;
		margin-right: $uni-spacing-row-base;
		border-radius: $uni-border-radius-base;
		display: flex;
		flex-flow: wrap;
		justify-content: center;
		background-color: #eee;
		align-items: center;

		&:not(image) {
			padding: 1upx;
		}

		view,
		image {
			width: (76upx-2upx*4)/3;
			height: (76upx-2upx*4)/3;
			margin: 1upx;
		}
	}

	.rightContent {
		flex: 1;
	}

	.rightContent,
	.topCont {
		overflow: hidden;
		line-height: 1.25;
	}

	.topCont {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.userName {
		color: $uni-text-color;
		font-size: 38upx;
	}

	.time {
		color: #999999;
		font-size: 30upx;
	}

	.bottomCont {
		width: 100%;
		font-size: 24upx;
		color: #999999;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.content {
        font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.badge {
		background-color: red;
		color: #fff;
		border-radius: 40upx;
		line-height: 40upx;
		width: 40upx;
		height: 40upx;
		font-size: 24upx;
		text-align: center;
		flex-shrink: 0;
	}
</style>
