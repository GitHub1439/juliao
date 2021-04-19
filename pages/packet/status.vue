<template>
	<view class="page">
        <view class="info">
            <icon :type="info.over_time ? 'success' : 'waiting'" size="100" :color="info.over_time?'green':'gray'"></icon>
            <text class="nickname" v-if="info.over_time">{{info.friend.name}} 已收款</text>
            <text class="nickname" v-else>待 {{info.friend.name}} 确认收款</text>
            <view class="money">
                <text class="unit">￥</text>
                <text class="value">{{info.money}}</text>
            </view>
        </view>
        <view class="operations"></view>
        <view class="tip">
            <view>转账时间：{{info.create_time}}</view>
            <view v-if="info.over_time">转账时间：{{info.over_time}}</view>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                key: null,
                info: {}
            }
        },
        computed: {
            
        },
        methods: {
            
        },
        onLoad(opts) {
            
        },
        onUnload() {
            
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        height: 100vh;
        background-color: #fff;
    }

    .page,
    .info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .info {
        flex: 1;
        padding-top: 140upx;
    }
    
    .nickname {
        margin: 40upx 100upx;
        inline-size: 1.25;
    }

    .money {
        display: flex;
        align-items: flex-start;
        line-height: 1;
        font-weight: bold;
    }
    
    .unit {
        position: relative;
        font-size: 42upx;
        top: 10upx;
    }

    .value {
        font-size: 100upx;
    }

    .tip {
        padding: 80upx;
        font-size: 32upx;
        color: #999;
    }
</style>
