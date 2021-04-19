<template>
    <view class="page">
        <view class="profile">
            <image :src="userInfo.avatar" @click="showAvatar(userInfo.avatar)"/>
            <view>
                <view class="nickname">
                    <text :class="userInfo.nickname?'':'non-nickname'">{{userInfo.nickname || '未设置'}}</text>
                    <text class="emoji" v-if="userInfo.gender===1">&#xe600;</text>
                    <text class="emoji" v-else-if="userInfo.gender===2">&#xe643;</text>
                    <text class="emoji" v-else>&#xe601;</text>
                </view>
                <view class="id">ID: {{userInfo.id}}</view>
                <view class="id">个性签名: {{userInfo.signature||'没有填写'}}</view>
                <view></view>
            </view>
        </view>
        <template v-if="isSelf"><!-- 这里什么事情都不做 --></template>
        <view class="cell" v-else-if="userInfo.is_friend" @tap="handleChat">发消息</view>
        <view class="cell" v-else @click="applyToFriend">添加到通讯录</view>
		<view class="btn-wrapper" v-if="userInfo.is_friend" style="margin-top: 20upx;">
		    <view class="btn btn-error" @tap="deleteFriend">删除好友</view>
		</view>
    </view>
</template>

<script>
	import api from '../../library/index.js'
    export default {
        data() {
            return {
                id: '',
                nickname: '',
                isFriend: false,
                avatar: null,
                isSelf: false,
                gender: 0,
                hasDeny: false,
                roomId: 0,
				isGroup:false,
                description: '',
				userInfo:{},
            }
        },
        methods: {
            applyToFriend() {
                uni.showLoading();
            	let data = {
            		friend_uid:this.id,
            	}
                api.applyAddFriend(data).then(res=>{
            		return this.$toast(res.message);
            	})
            },
			getUserInfo(id){
				api.getUserInfo({friend_uid:id}).then(res=>{
					this.userInfo = res.data
				})
			},
			handleChat(){
				uni.navigateBack()
			},
			showAvatar(e){
				uni.previewImage({
					urls:[e]
				})
			},
			deleteFriend() {
				uni.showModal({
					title: '提示',
					content: '确定要删除好友吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if(res.confirm) {
							api.deleteFriend({friend_uid:this.id}).then(res=>{
								this.$toast('删除成功').then(()=>{
									uni.switchTab({
										url:'../contacts/index'
									});
								});
							});
						}
					}
				});
			}
        },
        onLoad(opts) {
            this.id = opts.id;
			this.getUserInfo(opts.id)
			this.isSelf = this.$store.state.userinfo.id == this.id;
        },
    }
</script>

<style lang="scss" scoped>
    .profile {
        display: flex;
        align-items: center;
        padding: 80upx $uni-spacing-col-lg 100upx;
        background-color: #fff;

        image {
            width: 140upx;
            height: 140upx;
            background-color: #eee;
            border-radius: $uni-border-radius-base;
            margin-right: $uni-spacing-col-lg;
        }

        .nickname {
            font-size: 38upx;
            vertical-align: middle;
        }

        .id {
            color: #999;
            font-size: 32upx;
            margin-top: $uni-spacing-col-sm;
        }

        .emoji {
            font-size: 32upx;
        }
    }

    .cell {
        margin-top: $uni-spacing-col-lg;
        justify-content: center;
        background-color: #fff;
        color: $uni-color-primary;

        &.to-room,
        &.has-deny {
            padding: 0;
            padding-right: 0;
        }
        
        .deny,
        .agree {
            flex: 1;
            text-align: center;
        }
        
        .deny {
            color: $uni-color-error;
        }
        
        .divider {
            width: 1upx;
            height: 40upx;
            flex-shrink: 0;
            background-color: #eee;
        }
    }
	.btn-wrapper {
	    margin-top: $uni-spacing-col-base;
	    padding: $uni-spacing-col-lg $uni-spacing-row-lg;
	}
    .non-nickname {
        color: gray;
    }
</style>
