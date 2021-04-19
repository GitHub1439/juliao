<template>
	<view>
		<scroll-view class="chat-panel" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-into-view="scrollToView"
		 @scrolltoupper="loadHistory" upper-threshold="50">
			<!-- 加载历史数据waitingUI -->
			<view class="loading" v-if="showLoading">
				<view class="spinner">
					<view class="rect1"></view>
					<view class="rect2"></view>
					<view class="rect3"></view>
					<view class="rect4"></view>
					<view class="rect5"></view>
				</view>
			</view>
       
			<block v-for="(m,index) in messages" :key="index">
				<view v-if="m.message.type=='tips'" class="chat-tips">
					<view v-if="m.message.content.type=='time'" class="chat-tips-time">{{m.message.content.text}}</view>
					<view v-if="m.message.content.type=='redpack_tip'" class="chat-tips-time">
						<text class="redpack-icon"></text>
						{{m.message.content.text}}
					</view>
				</view>
				<!-- 消息类型 开始 -->
				<view v-else :class="{'chat-item':true,'chat-item-reverse': m.self}" :id="m._mid">
					<view class="avatar" @click="clickAvatar(index)">
						<image :src="m.avatar"></image>
					</view>
					<!-- 文本 -->
					<view v-if="m.message.type=='text'" class="text">
						{{m.message.content}}
					</view>
					<!-- 图片 -->
					<view v-if="m.message.type=='image' || m.message.type=='face'" class="image">
						<image @click="onPreview(m.message.content,m.message.type!='face')" :src="m.message.content" mode="aspectFit"
						 @load="onSetImageSize($event,m.message.content)" :style="{width: (isizes[m.message.content] && isizes[m.message.content].width || 0) + 'px', 'height': (isizes[m.message.content] && isizes[m.message.content].height || 200) + 'px'}">
						</image>
					</view>
					<!-- 红包-->
					<view v-if="m.message.type=='redpack'" :class="{'redpack': true,'redpack-open': m.message.content.hasget || m.message.content.empty}" @click="grabRedpack(index)">
						<view class="redpack-body">
							<view class="redpack-body-image"></view>
							<view class="redpack-body-content">
								<view>￥{{m.message.content.money}}{{m.message.content.thunder ? '/'+m.message.content.thunder : ''}}</view>
								<view v-if="m.message.content.hasget" class="description">已领取</view>
								<view v-else-if="m.message.content.empty" class="description">已被领完</view>
								<view v-else class="description">{{m.message.content.note||'恭喜发财，大吉大利'}}</view>
							</view>
						</view>
						<view class="redpack-footer">
							红包
						</view>
					</view>
					<!-- 语音 -->
					<view v-if="m.message.type=='voice'" :class="{'voice': true,'voice-play': playVoiceId == m._mid}" @click="playVoice(index)">
						<view class="box">
							<view class="wifi-symbol">
								<view class="wifi-circle first"></view>
								<view class="wifi-circle second"></view>
								<view class="wifi-circle third"></view>
							</view>
						</view>
						<view :class="{'voice-text': true,'voice-text-right': m.self}">
							{{m.message.content.time}}''
						</view>
					</view>
				</view>
				<!-- 消息类型 结束 -->
			</block>
			<!-- 消息类型 开始 -->
			<view v-if="sending" class="chat-item chat-item-reverse">
				<view class="avatar" @click="clickAvatar(index)">
					<image :src="$store.state.userinfo.avatar"></image>
				</view>
				<!-- 文本 -->
				<view class="text" style="padding-left: 40upx;padding-right: 40upx;">
					<view class="cssload-container">
						<view class="cssload-zenith"></view>
					</view>
				</view>
			</view>
			<!-- 消息类型 结束 -->
			<view id="bottom-view"></view>
		</scroll-view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	let loadStatus = false;
	let lastMid = '';
	export default {
		props: {
			storeKey: {
				type: [Number, String],
				require: true
			},
			sending: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scrollToView: '',
				scrollAnimation: true,
				showLoading: true,
				playVoiceId: '',
				isizes: {}
			};
		},
		computed: {
			messages() {
				return this.$store.getters['chat/messages'](this.storeKey);
               
			}
		},
		created() {
			this.$store.commit('chat/init', this.storeKey);
			this.$store.commit('chat/pull', this.storeKey);
			this.showLoading = this.$store.getters['chat/checkmore'](this.storeKey);
			if(this.showLoading){
				this.scrollAnimation = false;
				this.gotoBottom(()=>{
					this.scrollAnimation = true;
				});
			}
		},
		methods: {
			gotoBottom(callback) {
				setTimeout(()=>{
					this.$nextTick(() => {
						this.scrollToView = 'bottom-view';
						this.$nextTick(function(){
							this.scrollToView = '';
							callback && callback();
						})
					})
				}, 0);
			},
			loadHistory() {
				if (!this.showLoading || !this.scrollAnimation) return;
				let msgLen = this.messages.length;
				for(let i=0;i<msgLen;i++) {
					if(this.messages[i]._mid) {
						lastMid = this.messages[i]._mid;
						break;
					}
				}
				this.scrollAnimation = false;
				setTimeout(() => {
					this.$store.commit('chat/pull', this.storeKey);
					this.showLoading = this.$store.getters['chat/checkmore'](this.storeKey);
					this.$nextTick(function(){
						this.scrollToView = lastMid;
						this.$nextTick(function(){
							this.scrollToView = '';
							this.scrollAnimation = true;
						});
					});
				}, 500);
			},
			playVoice(index) {
				let message = this.messages[index];
				if (this.playVoiceId == '') {
					innerAudioContext.src = message.message.content.url;
					innerAudioContext.play();
					innerAudioContext.onEnded(() => {
						this.playVoiceId = "";
					});
					this.playVoiceId = this.messages[index]._mid;
				} else {
					this.playVoiceId = '';
					innerAudioContext.stop()
				}
			},
			grabRedpack(index) {
				this.$emit('redpack', this.messages[index].message.content);
			},
			clickAvatar(index) {
				this.$emit('click-avatar', this.messages[index]);
			},
			onSetImageSize(e, index) {
				let {width,height} = e.detail;
				let size = 150;
				if(height>size) {
					let p = size/height;
					height = size;
					width = width * p;
				}
				this.$set(this.isizes, index, {
					width,
					height
				});
			},
			onPreview(url, show) {
				if (show) {
					uni.previewImage({
						current: url,
						urls: [url]
					});
				}
			}
		},
		watch: {
			sending(val) {
				this.scrollAnimation = false;
				val && this.gotoBottom();
				setTimeout(()=>{
					this.scrollAnimation = true;
				}, 1000);
			},
			messages(val) {
				this.scrollAnimation && this.gotoBottom();
				this.$store.commit('chat/clearunread', this.storeKey);
			}
		},
	}
    
</script>

<style lang="scss" scoped>
	$redpackBgColor: #EF9638;

	$reverseTextBgColor: #007aff;


	$voiceBgColor: #fff;
	$voiceColor: #333;
	$reverseVoiceBgColor: #007aff;
	$reverseVoiceColor: #fff;

	.chat-tips {
		text-align: center;
		margin: 10upx 0;
		&-time {
			display: inline-block;
			padding: 10upx 20upx;
			font-size: 24upx;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			border-radius: 30upx;
		}
	}

	.chat-panel {
		width: 96%;
		padding: 0 2%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 100upx;
	}

	.chat-item {
		display: flex;
		font-size: 28upx;
		padding-bottom: 20upx;


		/*反向*/
		&-reverse {
			flex-direction: row-reverse;

			.text,
			.redpack,
			.voice,
			.image {
				&:before {
					opacity: 0;
				}

				&:after {
					display: block;
					content: "";
					position: absolute;
					right: -12upx;
					top: 36upx;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 12upx 0upx 12upx 12upx;
				}
			}

			.image:after {
				opacity: 0
			}

			.text {
				color: #fff !important;
				background-color: $reverseTextBgColor !important;

				&:after {
					border-color: transparent transparent transparent $reverseTextBgColor;
				}
			}

			.redpack {
				&:after {
					border-color: transparent transparent transparent $redpackBgColor;
				}

				&-open {
					&:after {
						border-color: transparent transparent transparent #FDE1C3;
					}
				}
			}

			.voice {
				background-color: $reverseVoiceBgColor !important;
				color: $reverseVoiceColor !important;

				&:after {
					border-color: transparent transparent transparent $reverseVoiceBgColor;
				}

				.box {
					transform: rotate(180deg) translate(15px, 50%);
					transform-origin: center;
					right: 0;

					.first {
						background: $reverseVoiceColor;
					}

					.wifi-circle {
						border-color: $reverseVoiceColor;
					}
				}
			}
		}
		
		.avatar {
			width: 90upx;
			height: 90upx;
			border-radius: 12upx;
			background: rgba(0, 0, 0, 0.05);
			overflow: hidden;

			image {
				width: 90upx;
				height: 90upx;
			}
		}

		.text,
		.redpack,
		.voice,
		.image {
			margin: 0 20upx;
			border-radius: 12upx;
			max-width: 70%;
			position: relative;

			&:before {
				display: block;
				content: "";
				position: absolute;
				left: -12upx;
				top: 36upx;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 12upx 12upx 12upx 0;
			}
		}

		.redpack {
			min-width: 65%;
		}

		.image:before {
			opacity: 0
		}

		.text {
			line-height: 35upx;
			padding: 30upx 20upx;
			background: #fff;
			color: #000;
			word-wrap: break-word;

			&:before {
				border-color: transparent #fff transparent transparent;
			}
		}

		.redpack {
			background: $redpackBgColor;
			color: #fff;

			&:before {
				border-color: transparent $redpackBgColor transparent transparent;
			}

			&-open {
				background: #FDE1C3;

				.redpack-body-image {
					background: #FB998A;
				}

				.redpack-body-image::before {
					background: #FFF3E7;
					top: -110upx;
				}

				&:before {
					border-color: transparent #FDE1C3 transparent transparent;
				}
			}

			&-body {
				padding: 20upx;
				display: flex;
				align-items: center;

				&-image {
					background: #CD3D35;
					width: 70upx;
					height: 90upx;
					overflow: hidden;
					position: relative;
					border-radius: 6upx;

					&:before {
						content: "";
						display: block;
						width: 140upx;
						height: 140upx;
						border-radius: 50%;
						position: absolute;
						top: -90upx;
						left: 50%;
						transform: translateX(-50%);
						background: #FA5151;
					}

					&:after {
						position: relative;
						display: block;
						content: '￥';
						width: 28upx;
						height: 28upx;
						background-color: #f2d252;
						color: #E08B34;
						border-radius: 28upx;
						line-height: 32upx;
						font-size: 24upx;
						transform: scale(.8);
						margin: 36upx auto;
						text-align: center;
					}
				}

				&-content {
					padding-left: 20upx;

				}
			}

			&-footer {
				font-size: 24upx;
				padding: 10upx 20upx;
				background: #fff;
				color: #999;
				border-bottom-left-radius: 12upx;
				border-bottom-right-radius: 12upx;
			}
		}

		.voice {
			width: 30%;
			position: relative;
			background: $voiceBgColor;
			color: $voiceColor;

			&:before {
				border-color: transparent $voiceBgColor transparent transparent;
			}

			&-text {
				margin-left: 60upx;
				line-height: 90upx;
				margin-right: 60upx;
			}

			&-text-right {
				text-align: right;
			}

			&-play {
				.second {
					animation: fadeInOut 1s infinite 0.2s;
				}

				.third {
					animation: fadeInOut 1s infinite 0.4s;
				}
			}

			.first {
				background: $voiceColor;
			}

			.wifi-circle {
				border-color: $voiceColor;
			}
		}
	}

	/*语音*/
	.box {
		position: absolute;
		top: 50%;
		transform:  translate(30upx, -50%);
	}

	.wifi-symbol {
		width: 25px;
		height: 25px;
		// box-sizing: border-box;
		position: relative;
		overflow: hidden;
		transform: rotate(135deg);
	}

	.wifi-circle {
		border: 2px solid #fff;
		border-radius: 50%;
		position: absolute;
	}

	.first {
		width: 2px;
		height: 2px;
		background: #fff;
		top: 22px;
		left: 22px;
	}

	.second {
		width: 12px;
		height: 12px;
		top: 17px;
		left: 17px;
	}

	.third {
		width: 20px;
		height: 20px;
		top: 12px;
		left: 12px;
	}

	@keyframes fadeInOut {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	/**/
	.loading {
		//loading动画
		display: flex;
		justify-content: center;

		@keyframes stretchdelay {

			0%,
			40%,
			100% {
				transform: scaleY(0.6);
			}

			20% {
				transform: scaleY(1.0);
			}
		}

		.spinner {
			margin: 20upx 0;
			width: 60upx;
			height: 25px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				background-color: #ff9800;
				height: 25px;
				width: 3px;
				border-radius: 3px;
				animation: stretchdelay 1.2s infinite ease-in-out;
			}

			.rect2 {
				animation-delay: -1.1s;
			}

			.rect3 {
				animation-delay: -1.0s;
			}

			.rect4 {
				animation-delay: -0.9s;
			}

			.rect5 {
				animation-delay: -0.8s;
			}
		}
	}

	image {
		will-change: transform;
	}

	.cssload-container {
		width: 100%;
		height: 17px;
		text-align: center;
	}

	.cssload-zenith {
		width: 17px;
		height: 17px;
		margin: 0 auto;
		border-radius: 50%;
		border-top-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
		box-shadow: 1px 1px 0px rgb(255, 255, 255);
		animation: cssload-spin 690ms infinite linear;
	}



	@keyframes cssload-spin {
		100% {
			transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	/*红包小图标*/
	@font-face {
		font-family: "redpackfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMcAAsAAAAABugAAALQAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBcIFeATYCJAMICwYABCAFhG0HMxsHBsgekiRQQKEUijquIAIkxMPT2v/OnZ1ns188qUZtAmSTkEikJCKpEeqHRDTvtP2zrv7NrtNrZEk0khlnKp3laf0BnYSTeFbdobqDbWl6PM0n7p3+3wAKZL7zLse1N03qAowDKdA9MIoSaIOE3jB2aQnpNIFiWjbDidbuYfCS+ZMCcdVslMGrEZBlNd0V2gMrM8Qd7rppT3oD3M6+H38UhhdIWhX4VaevtGhQ/z01yKrWmjXTCUF4nA3qOipsApk4P5g4yVWoDFcl4WYePKs8+J7aNIlJPFUv1L/OL+0Dk1BAJ2EkoipvApn+nAIub7oZVV8Fsvvcfx/XkiXV7fwRrfc9Xj8bhgx5N8NvRp3cG3I8vXz0pNfOhI4AevDkzAlJgnItv/NQCR5e3ncqPFHa93z9JEKTSLl0Wf+9d7H/8b9vP/xyu1l5D8uN++wTNuD/dvTrq4HRX5++i6PliVOv3/vVN+4mmI509oYOH87wpAxnjKF36eWbsXxfn8if3nCxfjnxz78PxF438/vx8d+vz3HqAZovldk1RXJ/Y/bnnX1z/tX/vSQ3gA//VuXM13zJsMwFulRwBlIpXNiWHbFvTNkSDmaSU1ypWFMUNIA9Iz5v1YzTOxO6xmnv6piqUOlaJDN9Ey21LbR17aPY0La+NopzFdkbWLcNEIbcRTLgLSpD3pKZ/gktE76jbShcUVyM4B1ry2FGTZzIgmhYWcFmlTloaBYoLx8kxgWbzOvijDlKuG4O44Lc/Ha6jTgIP2KOvmgsFIJiypkdt4LziM3GsJMzC1FFrkkIZ2VeHh26Uq7K7IAcxxEygdBgihWYmYpxoEl3AXU+P4gwWmAj4xMtbf5RBKczD44VyJW/gGxTOBa1fMolukVGhQSBwiiOscNagY2wBQkGcw4PsyBUQi7ThphTpTzUiS5V5F6vsotuDxS+NkVgd4UezfNzBNEFAA==') format('woff2');
	}

	.redpack-icon {
		font-family: "redpackfont" !important;
	}

	.redpack-icon:before {
		content: "\e626";
		color: red;
		display: inline-block;
		transform: scale(1.5);
		margin-right: 10upx;
	}
</style>
