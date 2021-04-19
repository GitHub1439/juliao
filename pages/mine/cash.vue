<!-- 提现 -->
<template>
	<view class="index_main">
        <view class="content">
            <view class="title">金额</view>
            <input type="number" class="input" placeholder="请输入提现金额" v-model="money"/>
        </view>
        <view class="content">
            <view class="title">昵称</view>
            <input type="text" class="input" placeholder="请输入昵称" v-model="name"/>
        </view>
        <view class="content">
            <view class="title">支付宝账号</view>
            <input type="text" class="input" placeholder="请输入支付宝账户" v-model="card"/>
        </view>
        <view class="content">
            <view class="title">姓名</view>
            <input type="text" class="input" placeholder="请输入姓名" v-model="card_name"/>
        </view>
		<view class="submitBtn btn btn-error" @click="submit">确定</view>
	</view>
</template>

<script>
	import api from "../../library/index.js"
	export default {
		data() {
			return {
				 money: '',
				 name: '',
				 card: '',
				 card_name: ''
			}
		},
		methods: {
			submit() {
                let that = this;

                if(!that.money) return that.$toast('提现金额不能为空！');                 
                if(!that.name) return that.$toast('用户昵称不能为空！');
                if(!that.card) return that.$toast('支付宝账号不能为空！');
                let reg = /^[\u4e00-\u9fa5]+$/g;
                let name = that.card_name;
                if(!name){
                
                    return that.$toast('真实姓名不能为空！');
                    
                }else if(!reg.test(name)){
                    
                    return that.$toast('请输入汉字姓名');
                }
                    let data = {
                    	money:that.money,
                    	username:that.name,
                    	account:that.card,
                    	extra:that.card_name
                    };
                    api.withdraw(data).then(res => {
                    	return that.$toast('提交成功').then(()=>{
                    		that.$jump('mine.bag')
                    	})
                    })    
                
				
			}
		},
		onLoad() {}

	}
</script>

<style scoped>
	.information{
	    color: #333333;
	    font-size: 40upx;
	    margin-left: 40upx;
	    margin-top: 40upx;
	}
	
	.content{
	    height: 90upx;
	    width: 95%;
	    margin: 40upx auto 0 auto;
	    border: 1px solid #E9E9E9;
	    border-radius: 25upx;
	    background-color: #FFFFFF;
	    display: flex;
	    flex-direction: row;
	    flex-wrap: nowrap;
	    justify-content: space-between;
	    align-items: center;
	}
	
	.title{
	    color: #666666;
	    margin-left: 30upx;
	}
	
	.input{
	    font-size: 30upx;
	    color: #999999;
	    text-align: right;
	    display: inline-block;
	    margin-right: 30upx;
	}
    
    
	.submitBtn {
		width: 80%;
		margin: 5rem auto 0 auto;
	}
</style>
