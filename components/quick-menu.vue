<!-- 下拉菜单组件 -->
<template>
    <view class="quick-menu">
        <view class="menu">
            <view class="triangle"></view>
            <view class="title">
                <view v-for="(item,index) in actions" :key="index" @click="handleClick(item, index)" :class="index === actions.length-1?'lastContent':'content'">
                    <image :src="item.img" class="img"/>
                    <text class="text">{{item.text}}</text>
                </view>
            </view>
        </view>
    </view>
</template> 
 
<script>
    export default {
        name: 'quick-menu',
        props: {
            actions: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            handleClick(data, index) {
                if (typeof data.click === 'function') {
                    data.click(data, index)
                } else {
                    this.$emit('click', data, index)
                }
            }
        }
    }
</script>

<style scoped>
        .quick-menu{
            width: 50%;
            z-index: 999;
            background-color: #393A3E;
            position: fixed;
            top: 27upx;
            right: 8upx;
            border-radius: 5px;
            animation-name: zoomin;
            animation-duration: 0.2s;
            -webkit-animation-name: zoomin;
            -webkit-animation-duration: 0.2s;
        }
        .triangle {
            width:0;
            height:0;
            z-index: 999;
            position: fixed;
            top: 0upx;
            right: 25upx;
            border-right: 10px solid transparent;
            border-left: 10px solid transparent;
            border-bottom: 12px solid #393A3E;
        }
        
            
        .content{
            display: flex;
            align-items: center;
            margin-top: 15upx;
            padding-bottom: 15upx;
            border-bottom: 1px solid #2E2F33;
        }
        
        .lastContent{
            display: flex;
            align-items: center;
            margin-top: 15upx;
            padding-bottom: 15upx;
        }
            
            
        .img {
            width: 80upx;
            height: 80upx;
            margin-left: 40upx;
            margin-right: 20upx;
        }
        
        .text {
            color: #FFFFFF;
            margin-top: 4upx;
            font-size: 36upx;
        }
        
/* 下拉列表组件动画 */        
        
@keyframes zoomin {
    from {
        transform: scale(0.5,0.5);
        opacity: 0;
        filter: alpha(opacity=0);
    }

    to {
        transform: scale(1,1);
        opacity: 1;
        filter: alpha(opacity=100);
    }
}

@-webkit-keyframes zoomin {
    from {
        -webkit-transform: scale(0.5,0.5);
        opacity: 0;
        filter: alpha(opacity=0);
    }

    to {
        -webkit-transform: scale(1,1);
        opacity: 1;
        filter: alpha(opacity=100);
    }
}
        
</style>
