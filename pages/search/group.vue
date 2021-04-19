<template>
	<view class="page page--divider">
        <view class="widget">
            <view class="widget-inner search-container">
                <input v-model="keywords" placeholder="关键字" :disabled="loading" />
                <view hover-class="commonly-hover" :hover-start-time="20" :hover-stay-time="70" @click="handleSearch">
					<view class="join">加入</view>
                </view>
            </view>
        </view>
        
        <load-more status="loading" v-if="loading" />

        <view class="result-item"
            hover-class="commonly-hover"
            :hover-start-time="20"
            :hover-stay-time="70"
            :key="key"
            v-for="(item, key) in result"
            @tap="handleAdd(item.room_id)">
            <view class="avatar">
                <block v-for="(x, i) in 9" :key="x">
                    <image :src="item.members[i].avatar" v-if="item.members[i]" />
                    <view v-else></view>
                </block>
            </view>
            <text>{{ item.room_name }}</text>
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
				if(!/^[+]{0,1}(\d+)$/.test(this.keywords)){
					return this.$toast('请输入正确的群号')
				}
				api.joinGroup({group_id:this.keywords}).then(res=>{
					return this.$toast(res.message).then(()=>{
						this.$jump('group.chat', {
							id: res.data.id,
							nickname: res.data.name
						});
					});
				})
			}
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
        
        .avatar {
            width: 76upx;
            height: 76upx;
            border-radius: 50%;
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
	.join{
		font-size: 30upx;
	}
</style>
