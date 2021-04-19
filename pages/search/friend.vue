<template>
	<view class="page page--divider">
        <view class="widget">
            <view class="widget-inner search-container">
                <input v-model="keywords" placeholder="手机号/ID" :disabled="loading" />
                <view hover-class="commonly-hover" :hover-start-time="20" :hover-stay-time="70" @click="handleSearch">
                    <icon type="search" size="18"/>
                </view>
            </view>
        </view>

        <load-more status="loading" v-if="loading" />

        <view class="result-item"
            hover-class="commonly-hover"
            :hover-start-time="20"
            :hover-stay-time="70"
            :key="item.id"
            v-for="item in result"
            @tap="handleClick(item)">
            <image :src="item.avatar"/>
            <text :class="item.nickname ? '' : 'non-nickname'">{{ item.nickname || '未设置' }}</text>
        </view>
	</view>
</template>

<script>
	import api from '../../library/index.js'

	export default {
		data() {
			return {
				keywords: '',
                result: [],
                loading: false,
			}
		},
        methods: {
            handleSearch(){
				api.searchFriend({keywords:this.keywords}).then(res=>{
					this.result = res.data
				})
			},
			handleClick(info) {
                return this.$jump('friend.detail', {...info});
            },
			
        },
    }
</script>

<style lang="scss">
    .page {
        padding-bottom: $uni-spacing-col-base;
    }

    .search-container {
        overflow: hidden;

        &, view {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        input {
            flex: 1;
            padding: 0 $uni-spacing-col-lg;
            line-height: 88upx;
        }
        
        view {
            width: 88upx;
            height: 88upx;

            &.commonly-hover {
                background-color: aliceblue;
            }
        }
    }

    .result-item {
        background-color: #fff;
        padding: $uni-spacing-col-lg;
        position: relative;
        display: flex;
        align-items: center;
        
        image {
            width: 76upx;
            height: 76upx;
            margin-right: $uni-spacing-col-base;
            border-radius: $uni-border-radius-base;
        }
        
        & + &::before {
            position: absolute;
            display: block;
            content: '\20';
            top: 0;
            left: $uni-spacing-col-lg + 76upx + $uni-spacing-col-base;
            right: $uni-spacing-col-lg;
            height: 1upx;
            transform: scaleY(0.5);
            background-color: #e6e6e6;
        }
        
        &.commonly-hover {
            background-color: #f1f1f1;
        }
    }
    
    .non-nickname {
        color: gray;
    }
</style>
