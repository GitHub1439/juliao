<!-- 充值 -->
<template>
	<view class="main">
        <view class="recharge">
            <view class="content">
                <view class="title">金额</view>
                <input type="number" class="input" placeholder="请输入100的倍数充值" v-model="money"/>
            </view>
            <view class="uni-form-item uni-column">
                <view class="payment">支付方式</view>
                <radio-group name="radio" class="pays">
                    <view v-for="(way,index) in ways" :key="index" @click="onWayClick(index)">
                        <label class="leftPay">
                            <text class="textName">{{way}}</text>
                            <radio value="radio1" :checked="wayValue==index"/>
                        </label>                        
                    </view>
                </radio-group>
            </view>
        </view>
        <view class="submitBtn btn btn-error" @click="onJumpWeb">确定</view>
	</view>
</template>

<script>
	import api from "../../library/index.js"
	export default {
		data () {
			return {
				money:'',
				userId:uni.getStorageSync('userInfo').id,
				ways: {},
				wayValue: '',
			}
		},
        methods:{
			onWayClick(way) {
				this.wayValue = way;
			},
			onJumpWeb(){
                let that = this;
                if(that.money=='') {
                    
                    return that.$toast('充值金额不能为空！');
                    
                 }else if(!(that.money%100===0)){
               
                     return that.$toast('请输入整百充值金额');
                     
                 }else if(that.wayValue==3&&that.money>5000){
                     
                     return that.$toast('支付宝每次最多充值5000');
                 }
                that.$jump('mine.webView',{money:that.money,user_id:that.userId,way:that.wayValue});
			}
        },
		onLoad() {
            
			api.getPayWays().then(res=>{
				this.ways = res.data;
				this.$nextTick(function(){
					for(let i in res.data) {
						this.wayValue = i;
						break;
					}
				});
			});
		}
		
	}
</script>

<style scoped>
  /* 充值 */
  page{
      width: 100%;
      height: 100%;
      position: relative;
  }
  .main{
      width: 100%;
      height: 100%;
      padding-top: 230upx;
       
  }
  
  
  
  
  .content{
      height: 100upx;
      width: 90%;
      margin: 0 auto;
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
  
  .payment{
      color: #333;
      font-size: 40upx;
      margin-left: 40upx;
      margin-top: 70upx;
      margin-bottom: 50upx;
  }
  
  .pays{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-around;
      align-items: center;
  }
  
  .textName{
      color: #666;
      display: inline-block;
      margin-right: 20upx;
  }  
    
    
  .submitBtn{
  	width: 80%;
    margin: 200upx auto 0 auto;
  }  
</style>
