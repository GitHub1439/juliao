<!-- 提现 -->
<template>
	<view class="page">
		<view class="widget">
			<view class="widget-inner rechargeBox">
				<view class="setMoney">
					<text>￥</text>
                    <input type="number" placeholder="请输入充值金额" v-model="price" />
				</view>
			</view>
            <view class="widget-inner">
                <view class="btn btn-primary submitBtn" @click="pay">确定</view>
            </view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
                price: 0
			}
		},
        methods: {
            pay() {}
        }
	}
</script>

<style lang="scss">
	.rechargeBox {
        padding: $uni-spacing-col-lg $uni-spacing-row-lg;
	}
    
	.setMoney{
		display: flex;
		border-bottom: 2upx solid #F5F5F5;
		padding: 30upx 10upx;
		align-items: baseline;

        text {
            color: #999999;
            font-size: 88upx;
        }

        input{
            background: none;
            border: none;
            outline: none;
            color: #333333;
            font-size: 38upx;
            flex: 1;
        }
    }

	.setBack{
		color: #333333;
		font-size: 0.9375rem;
		margin-top: 0.9375rem;
        
        image {
            width: 0.4375rem;
            height: 0.75rem;
            float: right;
            margin-top: 0.3125rem;
        }
	}
    
	.cardBack{
		color: #666666;font-size: 0.75rem;margin-left: 1rem;
	}
    
	.submitBtn {
        margin-top: 56upx;
	}
</style>
