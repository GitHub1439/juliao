<!-- 聊天 -->
<template>
	<view class="page page--divider">
		<view class="widget">
			<view class="widget-inner" v-if="list.length>0">
				<view class="item" v-for="(item, index) in list" :key="index" @tap="handleClick(item)">
					<image :src="item.avatar" class="leftImg" />
					<view class="rightContent">
						<view class="topCont">
							<view class="userName">{{item.nickname||item.name||'匿名'}}</view>
							<view class="time">
								<block v-if="item.status==0">
									<view @tap="handleFriendApply(item.id,1,index)">同意</view>
									<view @tap="handleFriendApply(item.id,2,index)">拒绝</view>
								</block>
								<block v-else-if="item.status==1">
									<view>已同意</view>
								</block>
								<block v-else-if="item.status==2">
									<view>已拒绝</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="nofriend">
				目前没有好友申请
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../library/index.js"

	export default {
		data() {
			return {
				list: {}
			}
		},
		onShow() {
			this.getFriend()
		},
		methods: {
			getFriend() {
				api.getFriendApply().then(res => {
					this.list = res.data
				})
			},
			handleFriendApply(id,status,index){
				api.handleFriendApply({id:id,status:status}).then(res=>{
					this.list[index].status =status
				})
			}
		},
	}
</script>

<style lang="scss">
	.item {
		border-bottom: 1px solid #F0F0F0;
		overflow: hidden;
		padding: $uni-spacing-col-lg 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.leftImg {
		width: 76upx;
		height: 76upx;
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
		font-size: 30upx;
	}

	.time {
		color: #999999;
		font-size: 22upx;
		view{
			float: left;
			padding: 4upx 10upx;
		}
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.badge {
		background-color: red;
		color: #fff;
		border-radius: 16upx;
		line-height: 32upx;
		width: 32upx;
		height: 32upx;
		text-align: center;
	}
	.nofriend{
		font-size: 28upx;
		color: #999999;
		text-align: center;
	}
</style>
