<template>
	<view class="page page--divider">
        <view class="card">
            <image class="qrcode" :src="img" />
        </view>
    </view>
</template>

<script>

    import api from "../../library/index.js"
    export default {
        data() {
        	return {
                img: '',
        	}
        },
        methods: {
            
        },
        onLoad(opts) {
			api.getQrcodeCard({group_id:opts.id}).then(res=>{
				this.img = res.data
			})
        }
    }
</script>

<style lang="scss" scoped>
    $pageRowSpace: $uni-spacing-col-lg * 2;
    $cardRowSpace: $uni-spacing-col-lg * 4;
    $qrcodeWidth: 750upx - ($pageRowSpace + $cardRowSpace) * 2;
    $avatarWidth: 40upx;
    $list-avatar-width: 89upx;

    .page {
        display: flex;
        overflow: hidden;
        box-sizing: border-box;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        padding: $pageRowSpace $pageRowSpace 54upx + $pageRowSpace;
    }
    
    .card {
        padding: $uni-spacing-col-lg;
        box-sizing: border-box;
        background-color: #fff;
        
        &-info {
            display: flex;
            align-items: center;
        }

        &-avatar {
            width: ($avatarWidth + 4upx) * 3 + 6upx;
            height: ($avatarWidth + 4upx) * 3 + 6upx;
            padding: 2upx;
            margin-right: $uni-spacing-col-lg;
            box-sizing: border-box;
            display: flex;
            flex-flow: wrap;
            justify-content: center;
            align-items: center;
            background-color: #eee;

            view {
                width: $avatarWidth + 4upx;
                height: $avatarWidth + 4upx;
                // background-color: red;
                box-sizing: border-box;
                padding: 2upx;

                image {
                    width: $avatarWidth;
                    height: $avatarWidth;
                }
            }
        }
        
        &-tip {
            text-align: center;
            font-size: 24upx;
            color: #999;
        }
    }

    .qrcode {
        width: $qrcodeWidth;
        height: $qrcodeWidth;
        margin: $cardRowSpace - $uni-spacing-col-lg;
    }
</style>
