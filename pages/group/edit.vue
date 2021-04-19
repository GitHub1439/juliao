<template>
	<view class="page page--divider">
        <view class="field" v-if="field==='name'">
            <label for="title">群聊名称</label>
            <input type="text" id="title" v-model="value" placeholder="请输入群聊名称" />
            <view class="error" v-if="error">{{ error }}</view>
        </view>

        <view class="field" v-if="field==='notice'">
            <label for="notice">群聊公告</label>
            <textarea id="notice" v-model="value" placeholder="请输入群聊公告" />
            <view class="error" v-if="error">{{ error }}</view>
        </view>

        <view class="widget">
            <view class="btn btn-error" @tap="handleSubmit">确定</view>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';
    
    export default {
        data() {
            return {
                field: '',
                room: null,
                value: '',
                error: ''
            }
        },
        computed: {
            
        },
        methods: {
            
        },
        onLoad(opts) {
        	
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        padding: $uni-spacing-col-lg 0;
    }
    .btn {
        margin-top: 40upx;
    }
    .field {
        label {
            padding: $uni-spacing-col-lg $uni-spacing-row-lg;
            font-weight: bold;
        }
        
        input,
        textarea {
            background-color: #fff;
            padding: $uni-spacing-row-lg;
            width: 100%;
        }
        
        textarea {
            box-sizing: border-box;
        }
        
        .error {
            padding: 0 $uni-spacing-row-lg;
            color: $uni-color-error;
            font-size: 26upx;
        }
    }
</style>
