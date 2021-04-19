<template>
	<view class="page page--divider">
        <view class="field-wrapper">
            <view class="field" v-if="mode === 'set-login-pwd'">
                <label for="old">旧的密码</label>
                <input id="old" v-model="old" placeholder="输入旧的密码"/>
            </view>
            <view class="field">
                <label for="pwd">新的密码</label>
                <input id="pwd" v-model="pwd" placeholder="输入新的密码"/>
            </view>
            <view class="field">
                <label for="pwd2">确认密码</label>
                <input id="pwd2" v-model="pwd2" placeholder="确认新的密码"/>
            </view>
        </view>

        <view class="btn-wrapper">
            <view class="btn btn-error" @tap="handleSubmit">确定</view>
        </view>
    </view>
</template>

<script>
    import api from "../../library/index.js"
    const modeTitles = {
        'set-pay-pwd': '设置支付密码',
        'set-login-pwd': '设置登录密码',
    };

    export default {
        data() {
            return {
                mode: 'none',
                pwd: '',
                pwd2: '',
                old: '',
                status:'text'
            }
        },
        methods: {
            handleSubmit(){
				let that = this
				if(this.pwd!=this.pwd2){
					return this.$toast('两次输入密码不一样')
				}
				if(this.mode=='set-login-pwd'){
					
					let data = {
						old_password:this.old,
						new_password:this.pwd,
					}
					api.resetPas(data).then(res=>{
						uni.showToast({
							icon:'none',
							title:res.message
						})
						setTimeout(function(){
							uni.switchTab({
								url:'index'
							})
						},1500)
					})
				}else{
					api.changeProfile({
						pay_password:this.pwd
					}).then(res=>{
						api.getUserInfo().then(res=>{
							uni.setStorageSync('userInfo',res.data)
							uni.showToast({
								icon:'none',
								title:res.message
							}).then(()=>{
								uni.switchTab({
									url:'../mine/index'
								})
							})
						})
						
					})
				}
			}
        },
        onLoad(opts) {
            const title = modeTitles[opts.mode];
            if (!title) {
                uni.navigateBack();
                this.$toast('参数错误');
            } else {
                uni.setNavigationBarTitle({ title });
            }
            
            this.mode = opts.mode;
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        padding: $uni-spacing-col-lg $uni-spacing-row-lg;
    }

    .field {
        position: relative;
        display: flex;
        align-items: center;
        line-height: 100upx;
        background-color: #fff;

        label {
            display: block;
            width: 200upx;
            font-size: 36upx;
            padding-left: $uni-spacing-row-base * 2;
        }

        input {
            flex: 1;
            height: 100upx;
            padding: 0 $uni-spacing-row-base;
            font-size: 32upx;
        }

        &:not(:first-child)::before {
            display: block;
            content: '\20';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #ddd;
            height: 1upx;
            transform: scaleY(0.5);
        }
    }

    .field-wrapper {

        .field:first-child {
            border-top-left-radius: $uni-border-radius-base;
            border-top-right-radius: $uni-border-radius-base;
        }

        .field:last-child {
            border-bottom-left-radius: $uni-border-radius-base;
            border-bottom-right-radius: $uni-border-radius-base;
        }

        margin-bottom: 100upx;
    }

    .btn-wrapper {
        padding: $uni-spacing-row-lg 0;
    }
</style>
