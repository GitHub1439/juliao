<template>
	<view>
		<v-payment @confirm="handleConfirm">
			<view v-if="type === 'packet'">
				支付金额 <text style="color:red;font-weight:bold;">{{ pay_money }}</text> 元
				{{discount_info}}
			</view>
		</v-payment>
	</view>
</template>

<script>
	import api from "../../library/index.js"
	export default {
		data() {
			return {
				type: null,
				info: null,
				pay_pwd: null,
				sending: false,
				pay_money: '',
				discount_info: ''
			}
		},
		methods: {
			handleConfirm(e) {
				this.pay_pwd = e.value;
				this.sendPacket();
			},
			sendPacket() {
				let info = this.info
				api.sendPacket({
					group_id: info.group_id,
					friend_uid: info.friend_uid,
					num: info.num,
					note: info.note,
					money: info.money,
					pay_password: this.pay_pwd,
					thunder: info.thunder
				}).then(res => {
					// this.$store.commit('chat/push', this.$packMsg(res.data));
					uni.navigateBack({
						delta: 2
					})
				})
			}
		},
		onLoad(opts) {
			const info = { ...opts
			};
			this.info = info;
			this.type = opts.type
			this.pay_money = info.discount ? info.money * info.discount : info.money;
			if (info.discount && info.discount != 1) {
				this.discount_info = '(' + info.money + '元,' + (info.discount * 10) + '折)';
			}
		}
	}
</script>
