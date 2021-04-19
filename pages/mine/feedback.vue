<template>
	<view class="page page--divider">
        <label>问题描述</label>
        <input placeholder="标题" v-model="title" />
        <label>问题描述</label>
        <textarea placeholder="内容" v-model="description" />
        <view class="widget">
            <view class="btn btn-primary" @tap="submit">提交</view>
        </view>
    </view>
</template>

<script>
	import api from "../../library/index.js"
    export default {
        data() {
            return {
                title: '',
                description: '',
            }
        },
        methods: {
			submit(){
				api.feedback(this.$data).then(res=>{
					return this.$toast(res.message).then(()=>{
						uni.navigateBack()
					});
				})
				
			}
			
        },
    }
</script>

<style lang="scss" scoped>
    .page {
        padding-bottom: 60upx;
    }
    label {
        padding: $uni-spacing-row-base;
        line-height: 88upx;
        font-size: 32upx;
    }
    textarea,
    input {
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        font-size: 30upx;
    }
    
    input {
        padding: 0 $uni-spacing-row-base;
        line-height: 88upx;
        height: 88upx;
    }
    
    textarea {
        padding: $uni-spacing-row-base;
    }

    .btn {
        margin: 60upx $uni-spacing-row-base $uni-spacing-col-base;
    }
</style>
