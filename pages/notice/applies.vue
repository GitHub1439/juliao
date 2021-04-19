<template>
    <view class="page">
        <view class="cell-wrapper">
            <block v-for="(item, i) in applies" :key="i">
                <view class="cell arrow" @tap="handleClick(item)">
                    <view class="cell-hd">
                        <image class="avatar" :src="item.avatar"></image>
                        <view>
                            <view class="title">{{item.name}}</view>
                            <view class="subtitle" v-if="item.type === 'apply-to-friend'">申请加好友</view>
                            <view class="subtitle" v-if="item.type === 'apply-to-room'">申请入群</view>
                        </view>
                    </view>
                    <view class="cell-hb">
                        <view class="badge">{{item.count > 99 ? '+99' : item.count}}</view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    // import {getToApplyFriends, addFriend, denyFriend} from '../../utility/api'
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                info: null
            }
        },
        computed: mapState({
            
        }),
        methods: {
            
        },
        onShow() {
        	
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        padding: $uni-spacing-col-base 0;
    }

    .cell-wrapper {
        margin-top: 0;

        .avatar {
            width: 88upx;
            height: 88upx;
            margin-right: $uni-spacing-row-base;
            border-radius: $uni-border-radius-base;
        }
    }

    .cell-hd {
        padding: $uni-spacing-col-base 0;
        display: flex;
        align-items: center;
    }
    .cell-hb {
        flex-shrink: 0;
    }

    .title,
    .subtitle {
        line-height: 1.2;
    }

    .subtitle {
        font-size: 28upx;
        color: #999;
    }

    .badge {
        background-color: red;
        color: #fff;
        border-radius: 16upx;
        line-height: 32upx;
        width: 32upx;
        height: 32upx;
        text-align: center;
        margin-right: 10upx;
    }
</style>
