<template>
	<view class="content">
        <image src="../../static/index_4.jpg" />
		<view class="img-skip">
			<view @tap="handleSkip">登录</view>
		</view>
	</view>
</template>

<script>

	export default {
        onLoad() {
            if(uni.getStorageSync('access_token')) {
				uni.switchTab({
					url:"../index/index"
				})
			}else{
                uni.switchTab({
                    url:'../login/index'
                })
            }
        },
        methods: {
            handleSkip(){
				uni.navigateTo({
					url:"../login/index"
				})
			}
        }
	}
</script>

<style lang="scss" scoped>
	.img-skip{
        position: absolute;
        width: 100vw;
		z-index: 100;
        bottom: 0;
        left: 0;
		/* background-color: rgba(#fff, .05); */
        box-sizing: border-box;
        padding: 50upx 100upx;
	}
	.img-skip view {
		color: #FFFFFF;
        background-color: $uni-color-primary;
        line-height: 88upx;
        text-align: center;
        border-radius: 16upx;
	}

    .content,
    image {
        overflow: hidden;
        width: 100vw;
        height: 100vh;
    }
</style>
