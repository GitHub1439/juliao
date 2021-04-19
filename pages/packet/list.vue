<template>
	<view class="page page--divider">
        <load-more status="loading" v-if="initializing" />
        <template v-else>
            <view class="profile">
                <view class="years">
                    <view></view>
                    <view @tap="showYears=true" hover-class="active" hover-stay-time="70">{{year}}</view>
                </view>
                <image class="avatar" :src="user.avatar"></image>
                <view class="username">{{user.nickname}}共{{ mode === 'in' ? '收到' : '发出'}}</view>
                <view class="money"><text>{{totalMoney}}</text>元</view>
                <view class="count" v-if="list.length"><text>{{list.length}}</text>个红包</view>
            </view>

            <template v-if="list.length">
                <template v-if="mode === 'in'">
                    <view class="log" v-for="item in list" :key="item.packet_m_packet_id">
                        <view class="info">
                            <text>{{item.packet_m_won_nickname}}</text>
                            <text>{{item.packet_m_money}}元</text>
                        </view>
                        <view class="time">{{item.packet_m_time}}</view>
                    </view>
                </template>
                <template v-else>
                    <view class="log" v-for="item in list" :key="item.packet_id">
                        <view class="info">
                            <text>{{item.packet_room_id == '0' ? '普通' : '群聊'}}红包</text>
                            <text>{{item.packet_money}}元</text>
                        </view>
                        <view class="time">{{item.packet_time}}</view>
                    </view>
                </template>
            </template>
            <view class="log" v-else>
                没有数据
            </view>

            <view class="dialog" @touchmove.stop="" @tap="showYears=false" v-if="showYears">
                <view class="dialog-inner" @tap.stop="">
                    <view class="dialog-title">选择年份</view>
                    <radio-group @change="radioChange">
                        <label class="item" v-for="item in years" :key="item">
                            <view>{{item}}</view>
                            <radio :value="item" :checked="item === year" />
                        </label>
                    </radio-group>
                </view>
            </view>
        </template>
    </view>
</template>

<script>
    import {mapState} from 'vuex';


    function timeFormat(time) {
        return dateUtils.formatDateTime(+time * 1000)
            .replace(/\//, '年')
            .replace(/\s+/, '日 ');
    }

    export default {
        data() {
            return {
                showYears: false,
                totalMoney: 0,
                year: null,
                mode: null,
                initializing: true,
                loading: false,
                list: [],
            }
        },
        computed: {

        },
        watch: {
            
        },
        methods: {
            
        },
        onNavigationBarButtonTap() {
            
        },
        onLoad(opts) {
        	
        }
    }
</script>

<style lang="scss" scoped>
    
    .active {
        background-color: #D2D2D2;
        border-radius: $uni-border-radius-base;
    }
    
    .profile {
        padding: $uni-spacing-col-lg $uni-spacing-row-lg;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 30upx;
        
        .years {
            width: 100%;
            font-size: 34upx;
            margin-right: 20upx;
            display: flex;
            justify-content: space-between;
            
            view {
                padding: 10upx 20upx;
            }
        }
        
        .avatar {
            width: 160upx;
            height: 160upx;
            background-color: #fff;
            margin-bottom: $uni-spacing-col-base;
            border-radius: $uni-border-radius-base;
        }
        
        .money,
        .count {
            vertical-align: baseline;
            color: #999;
            margin: $uni-spacing-col-base 0;
        }
        
        .money text {
            font-size: 68upx;
            font-weight: bold;
            margin-right: 14upx;
            color: #000;
        }
        
        .count text {
            font-size: 48upx;
            font-weight: bold;
            margin-right: 14upx;
        }
    }

    .log {
        position: relative;
        padding: $uni-spacing-col-base $uni-spacing-row-lg;
        background-color: #fff;
        font-size: 34upx;

        .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .time {
            color: #999;
            font-size: 28upx;
        }

        &:not(:first-child)::before {
            position: absolute;
            top: 0;
            left: $uni-spacing-row-lg;
            right: $uni-spacing-row-lg;
            display: block;
            content: "";
            height: 1upx;
            background-color: #ddd;
            transform: scaleY(0.5);
        }
    }
    
    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        // background-color: rgba(255,255,255,.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        &-inner {
            background-color: #fff;
            width: 540upx;
            border-radius: $uni-border-radius-base;
            box-shadow: 0 0 50upx 10upx rgba(0,0,0,.2);
            padding-bottom: 20upx;
        }
        
        &-title {
            text-align: center;
            padding: $uni-spacing-col-lg;
        }
        
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: $uni-spacing-col-lg $uni-spacing-row-lg * 2;
            position: relative;
            
            &:not(:first-child)::before {
                position: absolute;
                display: block;
                top: 0;
                left: $uni-spacing-row-lg * 2;
                right: $uni-spacing-row-lg * 2;
                content: "";
                height: 1upx;
                background-color: #ddd;
                transform: scaleY(0.5);
            }
        }
    }
</style>
