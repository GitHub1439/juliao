<template>
	<view class="page page--divider">
		<view class="packetsNumber">
			<view class="packetsNumberTitle">红包金额</view>
			<input type="digit" placeholder="请输入红包金额" v-model="money" />
		</view>

		<view class="packetsNumber" v-if="group_id">
			<view class="packetsNumberTitle">红包个数</view>
			<input type="number" placeholder="请输入红包个数" v-model="num" />
            <view class="help">当前群聊人数<text style="color:red;">{{ member_count }}</text>人</view>
		</view>

		<!-- <view class="packetsNumber" v-if="group_id">
			<view class="packetsNumberTitle">雷值</view>
			<input type="number" v-model="thunder" placeholder="请输入雷值"/>
            <view class="help">每个数字代表一个雷值，相同数字只有一个有效。</view>
		</view> -->

		<view class="packetsNumber" v-if="!group_id">
			<view class="packetsNumberTitle">备注</view>
			<textarea placeholder="恭喜发财，大吉大利" v-model="note" />
		</view>

		<view class="btn btn-primary" @tap="handlePacket">塞钱进红包</view>
	</view>
</template>

<script>
	import api from "../../library/index.js"
    export default {
		data() {
			return {
                money: '',// 金额
                num : '',// 红包数量
                thunder: '',// 雷值
                note: '',// 备注
                friend_uid: 0,
                group_id: 0,
                member_count: 0,
				friend_name:'',
				friend_avatar:'',
			}
		},
        methods: {
            handlePacket() {
				let info = this.$data
				if(this.group_id>0){
					api.getGroupDiscount({
						group_id:info.group_id,
						num:info.num,
						thunder:info.thunder,
					}).then(res=>{
						info.type = 'packet'
						info.discount = res.data.discount
						this.$jump('member.pay', info);
					})
				}else{
					this.$jump('member.pay', info);
				}
				
            },
        },
        onNavigationBarButtonTap() {
            const actions = [
                '红包记录',
                '帮助中心'
            ];
        	uni.showActionSheet({
                itemList: actions,
                success: (res) => {
                    if (res.tapIndex === 0) {
                        this.$jump('packet.list', {mode: 'in'})
                    } else {
                        this.$toast('选中了 ' + actions[res.tapIndex]);
                    }
                },
                fail: res => {
                    console.log(res.errMsg);
                }
            });
        },
        onLoad(opts) {
            const {friend_uid, group_id, member_count,friend_name,friend_avatar} = opts;
            
            if (!friend_uid && !group_id) {
                return uni.showModal({
                	content: '参数错误',
                	showCancel: false,
                	complete: uni.navigateBack
                });
            }
            
            this.friend_uid = friend_uid;
            this.friend_name = friend_name;
            this.friend_avatar = friend_avatar;
            this.group_id = group_id;
			if(!group_id){
				this.num = 1
			}
            this.member_count = member_count;
        }
	}
</script>

<style lang="scss">
    .page {
        padding: $uni-spacing-col-lg *2 $uni-spacing-row-lg * 2;
    }
	
	.packetsNumber {
		margin-bottom: $uni-spacing-col-lg * 2;
	
        .packetsNumberTitle {
            color: #333333;
            font-size: 34upx;
            font-weight: bold;
            margin-left: $uni-spacing-row-lg;
            margin-bottom: $uni-spacing-col-sm;
        }
        
        input,
        textarea {
            width: 100%;
            background:rgba(255,255,255,1);
            font-size: 30upx;
            line-height: 80upx;
            padding: 0 $uni-spacing-row-lg;
            border-radius: 10upx;
            box-sizing: border-box;
        }
        
        input {
            height: 80upx;
        }
        
        textarea {
            padding: $uni-spacing-row-lg;
            line-height: 1.2;
        }
        
        .help {
            color: #777;
            font-size: 24upx;
            padding: 2upx $uni-spacing-row-lg;
        }
	}
	
	.btn{
		width: 90%;
		margin: 0 auto;
		color: #fff;
		font-weight: bold;
		font-size: 34upx;
		background:linear-gradient(90deg,rgba(113,191,245,1) 0%,rgba(89,169,226,1) 100%);
	}
</style>
