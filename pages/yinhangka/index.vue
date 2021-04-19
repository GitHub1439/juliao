<template>
    <view>
        <view style="text-align: center;font-size: 18px;padding: 10px 0;">银行卡签约</view>
    	<view class="card-item">
    	    <p>持卡人</p>
    	    <input type="text" placeholder="请输入持卡人真实姓名">
    	</view>
    	<view class="card-item">
    	    <p>银行账号</p>
    	    <!-- <select name="" id="" style="font-size: 14px;">
                <option value="" disabled selected style="color: #888888;">选择您的银行卡</option> 
                <option value="01">建设银行</option>
            </select> -->
            <input type="text" placeholder="请输入发卡银行账户">
    	</view>
        <view class="card-item">
            <p>发卡银行</p>
            <select name="" id="" style="font-size: 14px;">
                <option value="" disabled selected style="color: #888888;">选择您的银行卡</option> 
                <option value="01">建设银行</option>
            </select>
            
        </view>
    	<view class="card-item">
    	    <p>手机号</p>
    	    <input type="text" placeholder="请输入银行预留手机号">
    	</view>
    	<view class="card-item">
    	    <p>验证码</p>
    	    <input type="text" placeholder="请输入验证码">
            <span>验证码</span>
    	</view>
    </view>
</template>

<script>

	export default {
		data() {
			return {
			
			}
		}
	}
</script>

<style scoped>
    *{font-size: 16px;}
    .card-item{display: flex;padding: 10px 20px;font-size: 17px;border-bottom: 1px solid #F5F5F5;background-color: #ffffff;}
    .card-item>p{width: 25%;}
    .card-item input,.card-item select{flex: 1;box-shadow: none;outline: none;border: none;-webkit-appearance: none;-webkit-tap-highlight-color: #fff;}
    select option{color: #888888;}
    .card-item span{padding: 0 5px;background-color: #8BC5FF;color: #0080FF;border-radius: 5px;font-size: 14px;}
</style>