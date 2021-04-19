<!-- 我的 -->
<template>
	<view class="page">
		<view class="header cell-wrapper">
			<view class="cell arrow" @tap="$jump('mine.profile')">
				<view class="cell-hd">
					<image class="avatar" :src="user.avatar" @tap.stop="previewAvatar" />
					<view class="info">
						<view class="nickname">
							<text>{{user.nickname}}</text>
							<text class="gender emoji" v-if="user.gender===1">&#xe600;</text>
							<text class="gender emoji" v-else-if="user.gender===2">&#xe643;</text>
							<text class="gender emoji" v-else>&#xe601;</text>
						</view>
						<view class="id">ID: {{user.id}}</view>
						<view class="description">{{user.signature||'没有填写'}}</view>
					</view>
				</view>
				<view class="cell-hb emoji">&#xe64f;</view>
			</view>
		</view>

		<view class="widget">
			<view class="cell-wrapper">
				<view class="cell arrow" @click="$jump('mine.bag')">
                    <view class="cell-hd" style="display: flex;align-items: center;">
						<view style="background: url(../../static/my/qianbao.png);width: 15px;height: 15px; background-size: 100%; margin: 0 8px 0 4px;background-size: 100% 100%;"></view>
						<text>钱包</text>
					</view>
					<view class="cell-hb"></view>
				</view>
			</view>

			<view class="cell-wrapper">
				<!-- <view class="cell arrow" @tap="$jump('web.index', {url: 'http://app.222s0.com/index.php/Index/about/'})">
                    <view class="cell-hd">
						<text class="emoji">&#xe63a;</text>
						<text>关于我们</text>
					</view>
					<view class="cell-hb"></view>
				</view> -->
				<view class="cell arrow" @tap="$jump('mine.feedback')">
					<view class="cell-hd" style="display: flex;align-items: center;">
						<view style="background: url(../../static/my/sao.png);width: 15px;height: 15px; background-size: 100%; margin: 0 8px 0 4px;background-size: 100% 100%;"></view>
						<text>扫一扫</text>
					</view>
					<view class="cell-hb"></view>
				</view>
			</view>
            
            <view class="cell-wrapper">
				<view class="cell arrow" @tap="$jump('mine.settings')">
					<view class="cell-hd" style="display: flex;align-items: center;">
						<view style="background: url(../../static/my/shezhi.png);width: 15px;height: 15px; background-size: 100%; margin: 0 8px 0 4px;background-size: 100% 100%;"></view>
						<text>设置</text>
					</view>
					<view class="cell-hb"></view>
				</view>
            </view>
            <view class="cell-wrapper">
                <navigator url="../help/index">
            <view class="cell arrow" >
                    <view class="cell-hd" style="display: flex;align-items: center;">
            		<view style="background: url(../../static/my/lingsheng.png);width: 15px;height: 15px; background-size: 100%; margin: 0 8px 0 4px;background-size: 100% 100%;"></view>
            		<text>帮助</text> 
            	</view>
            	<view class="cell-hb"></view>
            </view>
            </navigator>
            </view>
            
            <view class="cell-wrapper">
            <view class="cell arrow">
                <view class="cell-hd" style="display: flex;align-items: center;">
            		<view style="background: url(../../static/my/guanli.png);width: 15px;height: 15px; background-size: 100%; margin: 0 8px 0 4px;background-size: 100% 100%;"></view>
            		<text>通用</text>
            	</view>
            	<view class="cell-hb"></view>
            </view>
            </view>
		</view>
	</view>
</template>

<script>
    export default {
        computed: {
            user() {
				return this.$store.state.userinfo;
			}
		},
		methods:{
			previewAvatar(){
				uni.previewImage({
					urls:[this.user.avatar]
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.cell {
		background-color: #fff;

		&-wrapper {
			background-color: transparent;

			&::before,
			&::after {
				display: none;
			}
		}

		&:first-child {
			border-top-left-radius: $uni-border-radius-base;
			border-top-right-radius: $uni-border-radius-base;
		}

		&:last-child {
			border-bottom-left-radius: $uni-border-radius-base;
			border-bottom-right-radius: $uni-border-radius-base;
		}

		&-hd {
			color: #333;
		}

		.emoji {
			margin-right: $uni-spacing-row-base;
			color: $uni-color-primary;
			font-size: 46upx;
			vertical-align: middle;
		}
	}

	.header {
		background-color: #71BFF5;
		color: white;
		box-sizing: border-box;
		margin-top: 0;
		padding: $uni-spacing-col-lg $uni-spacing-row-lg $uni-spacing-col-lg * 2 $uni-spacing-row-lg;

		.cell {
			background-color: transparent;
			align-items: flex-end;

			&::before,
			&::after {
                margin-top: 0;
                top: auto;
				bottom: 12upx;
			}

			&::before {
				background-color: #fff;
			}

			&::after {
				background-color: #71BFF5;
			}
		}

		.cell-hd,
		.cell-hb {
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
			line-height: 1;
			color: #fff;
		}

		.avatar {
			position: relative;
			width: 140upx;
			height: 140upx;
			background-color: rgba(255,255,255,0.05);
			border-radius: $uni-border-radius-base;
			margin-bottom: -14upx;
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			flex: 1;
			text-align: left;
			line-height: 1.2;
			margin-left: $uni-spacing-col-lg;
		}

		.nickname,
		.description {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.nickname {
			width: 360upx;
			font-size: 36upx;
		}

		.id {
			font-size: 28upx;
			margin-top: 12upx;
		}

		.description {
			margin-top: 12upx;
			width: 360upx;
			opacity: .7;
			font-size: 28upx;
		}

		.emoji {
			color: #fff;

		}

		.gender {
			font-size: 28upx;
			vertical-align: middle;
			margin-left: 10upx;
		}
	}

</style>
