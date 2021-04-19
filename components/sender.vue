<template>
	<view class="v-sender">
		<view v-if="showPanel">
			<slot></slot>
		</view>
		<view class="v-sender__control">
			<view class="emoji" @tap="sendVoice">
				<image v-if="!voice && !noSpeaking" src="../../static/tuying.png" class="senImages" ></image>
				<text v-else class="n-icon n-icon-keyboard"></text>
			</view>
			<block v-if="noSpeaking">
				<view class="falseinput" style="text-align: center;color: #999;margin-left: 16upx;" >当前禁止发言</view>
				<!-- <block v-if="forbidRedpack">
					<view class="emoji" style="color: #999;"><text>&#xe606;</text></view>
				</block>
				<block v-else>
					<view class="emoji" @tap="$emit('packet', $event)"><text>&#xe606;</text></view>
				</block> -->
				<view class="btn" @tap="$emit('send', $event)" v-if="sendShowing">发送</view>
				<view class="emoji" style="color: #999;" v-if="!showPanel&&!sendShowing"><image src="../../static/tianjia.png" class="senImages"></image></view>
			</block>
			<block v-else>
				<input v-if="!voice" type="text" :value="value" @input="listen('input', $event.detail.value)" @focus="listen('focus', $event)"
				 @blur="listen('blur', $event)" @confirm="listen('change', $event)" :placeholder="placeholder" class="xxInput"/>
				<view v-else class="falseinput" style="text-align: center;color: #999;margin-left: 16upx;" @touchstart="setVoice"
				 @touchend="endVoice">{{setting?'正在录音，松手发送':'长按发送语音'}}</view>
				
                <view @tap="dianji()">
                	<view class="emoji"><image src="../../static/biaoqing.png" class="senImages"></image></view>
                </view>
                
				<view class="btn" @tap="$emit('send', $event)" v-if="sendShowing">发送</view>
				<view class="emoji" @tap="showPanel=true" v-if="!showPanel&&!sendShowing"><image src="../../static/tianjia.png" class="senImages"></image></view>
				<view class="emoji" @tap="showPanel=false;emoji=false" v-else-if="showPanel&&!sendShowing"><image src="../../static/tianjia.png" class="senImages"></image></view>
			</block>
		</view>
		<view v-if="showPanel" class="v-sender__panel" style="background: #E3E3E3;display: inherit;overflow: auto;padding: 40rpx 0;">
			<block v-if="!emoji">
				<view @click="sendImg" class="bjZuo">
					<view class="bj1"><image src="../../static/tupian.png" class="bjImg"></image></view>
					<view class="bjSpan">图片</view>
				</view>
                <view class="bjZuo">
                	<view class="bj1"><image src="../../static/paizhao.png" class="bjImg"></image></view>
                	<view class="bjSpan">拍摄</view>
                </view>
				<!-- <block v-if="forbidRedpack">
                    <view >
                        <view class="emoji bj1" ><image src="../../static/hongbao.png" class="bjImg"></view>
                        <view class="bjSpan">红包</view>
                    </view >
				</block>
				<block v-else> -->
                    <view class="bjZuo">
                        <view class="bj1" @tap="$emit('packet', $event)"><image src="../../static/hongbao.png" class="bjImg"></image></view>
                        <view class="bjSpan">红包</view>
                    </view >
				<!-- </block> -->
                <view class="bjZuo">
                    <view class="bj1" ><image src="../../static/caiquan.png" class="bjImg"></image></view>
                    <view class="bjSpan">猜拳</view>
                </view >
                <view class="bjZuo">
                    <view class="bj1" ><image src="../../static/zhuanzhang.png" class="bjImg"></image></view>
                    <view class="bjSpan">转账</view>
                </view >
                <view class="bjZuo">
                    <view class="bj1" ><image src="../../static/mingpian.png" class="bjImg"></image></view>
                    <view class="bjSpan">名片</view>
                </view >
			</block>
			<view v-else style="width: 100%;">
				<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
					<block v-for="(vo,i) in swipers" :key="i">
						<swiper-item>
							<block v-for="(face,faceIndex) in vo" :key="faceIndex">
								<image :src="face.url" class="faceImg" mode="widthFix" @click="sendEmoji(face.url)"></image>
							</block>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	import helper from "../library/helper.js"
	import api from "../library/index.js"
	export default {
		name: 'v-sender',
		props: {
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '说点什么吧'
			},
			noSpeaking: {
				type: Boolean,
				default: false
			},
			forbidRedpack: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showPanel: false,
				voice: false,
				text: 'uni-app',
				voicePath: '',
				setting: false,
				emoji: false,
				faceImg: {},
				swipers: []
			}
		},
        
		computed: {
			inputListeners() {
                
				const listeners = {}

				for (const name in this.$listeners) {
					if (name !== 'face' && name !== 'packet' && name !== 'send') {
						listeners[name] = this.$listeners[name]
					}
				}

				listeners.input = event => {
					console.log(event.target.value)
					this.$emit('input', event.target.value)
				}

				return listeners
			},
			sendShowing() {
                
				return this.value.length > 0
			}
		},
		methods: {
			sendImg() {
				let that = this
				uni.chooseImage({
					success(re) {
						helper.uploadFiles([re.tempFilePaths[0]], 'images', {
							type: 'images'
						}).then(res => {
							that.showPanel = false
							that.$emit('sendImage', res)
						});
					}
				})
			},
			listen(name, eventOrValue) {
               
				this.$emit(name, eventOrValue)
			},
			setVoice() {
              
				this.setting = true
				recorderManager.start({
					format: 'mp3'
				});
				console.log('start');
			},
			endVoice() {
                
				this.setting = false
				recorderManager.stop();
				console.log('stop');
			},
			sendVoice() {
             
				this.voice = !this.voice;
			},
			getEmoji() {
				api.getSystemFaces().then(res => {
					res.data.forEach((v, i) => {
						if (i % 14 == 0) this.swipers.push([]);
						this.swipers[this.swipers.length - 1].push(v);
					});
				})
			},
			sendEmoji(e) {
                
				this.showPanel = false;
				this.emoji = false
				this.$emit('emoji', e)
			},
            dianji () {
                this.showPanel = true;
                this.emoji = true,
                this.autoplay = true
            },
		},
		created() {
            
			this.getEmoji()
		},
        
		onLoad() {
            
			let that = this;

			recorderManager.onStop(res => {

				console.log("res: " + JSON.stringify(res));

				that.voicePath = res.tempFilePath;

				let innerAudioContext = uni.createInnerAudioContext();

				innerAudioContext.autoplay = true;

				innerAudioContext.src = that.voicePath;
				
				this.$nextTick(function(){
					innerAudioContext.stop();
				});

				innerAudioContext.onCanplay(() => {
					
					console.log('oncanplay');

					let duration = innerAudioContext.duration;

					console.log(innerAudioContext.duration);

					innerAudioContext = null;

					if (duration < 1) return that.$toast('时间太短了');

					helper.uploadFiles([that.voicePath], 'audio', {
						type: 'audio'
					}).then(res => {
						that.$emit('face', {
							url: res,
							time: duration.toFixed(2)
						})
					});
				})
				innerAudioContext.onError((res) => {
					return that.$toast('录音时出错，请重试')
				});
			});
		},
	}
</script>

<style lang="scss" scoped>
	$control-height: 120upx;
	$input-height: $control-height - $uni-spacing-col-base * 2;

	.faceImg {
		width: 100upx;
		flex-basis: 100upx;
	}

	.n-icon {
		font-size: 60upx;
		line-height: 60upx;
		color: #333;
	}
    .senImages{
        width: 56rpx;
        height: 56rpx;
    }
    .bjZuo{
        float: left;
        margin-left: 40rpx;
        width: 19%!important;
        
    }
    .bj1{
        height: 130rpx;
        background-color: #fff;
        
    }
    .bjImg{
        width: 68rpx;
        height: 68rpx;
        margin-top: 34rpx;
    }
    .bjSpan{
        font-size: 30rpx;
        margin: 10rpx 0 20rpx 0;
        color: #515151;
    }
    .xxInput{
        margin-right: 16rpx;
    }

	.v-sender {
		z-index: 100;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;

		&__panel,
		&__control {
			position: relative;
			width: 100%;

			&::before {
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

		&__panel {
			width: 100%;
			display: flex;
			padding: 20upx 0;
			font-size: 28upx;
			background: #fff;

			>view {
				.n-icon {
					font-size: 70upx;
					color: #999;
				}

				text-align: center;
				width: 25%;
			}
		}

		&__control {
			height: $control-height;
			background-color: #fff;
			padding: $uni-spacing-col-base $uni-spacing-row-base $uni-spacing-col-base 0;

			&,
			.emoji,
			.btn {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
				box-sizing: border-box;

			}

			>.emoji,
			>.btn,
			>input {
				margin-left: $uni-spacing-row-base;
			}

			view {
				min-width: $input-height;
				height: $input-height;
				flex-shrink: 0;
			}

			.emoji {
				font-size: 64upx;
				line-height: $input-height;
			}

			input,
			.falseinput {
				flex: 1;
				height: $input-height;
				border-radius: $uni-border-radius-base;
				padding-left: 10upx;
				box-sizing: border-box;
				background-color: #eee;
				height: 68upx;
				line-height: 68upx;
			}

			.btn {
				line-height: $input-height - 10upx;
				height: $input-height - 10upx;
				color: #fff;
				text-align: center;
				background-color: $uni-color-primary;
			}
		}
	}
</style>
