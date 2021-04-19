<template>
	<view class="box">
		<view class="box__header">
			<slot></slot>
		</view>
		<view class="box__body">
			<view class="password-box">
				<view class="password-item" @tap="show">
					<view class="password-item-char" v-for="i in items" :key="i">
						<view class="password-item-char__dot" v-if="password[i] || password[i] === 0"></view>
					</view>
				</view>
			</view>
		</view>
		<view :class="'keyboard ' + pattern">
			<view class="number">
				<view class="button" @tap="input(item)" v-for="item in keys" :key="item">{{item}}</view>
				<view class="button">.</view>
				<view class="button down emoji" @tap="hide">&#xe65f;</view>
			</view>
			<view class="action">
				<view class="delete emoji" @tap="del">&#xe7fb;</view>
				<view class="ok emoji" @tap="done">&#xe7bf;</view>
			</view>
		</view>
	</view>
</template>

<script>
	const keys = () => {
		let natural = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		return natural.sort(function(){
			return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		});
	};

	export default {
		props: {
			defaultPassword: String
		},
		data() {
			return {
				items: [0, 1, 2, 3, 4, 5],
				password: [],
				keys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				pattern: 'hidden'
			};
		},
		methods: {
			show() {
				let args = {
					cancel: false
				};
				this.$emit('shown', args);
				if (!args.cancel) {
					this.pattern = 'slideup';
				}
			},
			hide() {
				let args = {
					cancel: false
				};
				this.$emit('hidden', args);
				if (!args.cancel) {
					this.pattern = 'slidedown';
				}
			},
			input(item) {
				const args = {
					target: this,
					data: item,
					cancel: false,
					callback: undefined
				};
				this.$emit('input', args);
				if (!args.cancel){
					if (this.password.length === this.items.length) {
						return;//长度达6位，自动验证
					}
					if (args.callback && typeof args.callback === 'function') {
						args.callback.call(this);
					}
					this.password.push(item);
					if(this.password.length==6) {
						this.$emit('confirm', {
							target: this,
							value: this.password.join('')
						})
					}
				}
			},
			del() {
				const args = { cancel: false }
				this.$emit('delete', args)
				if (!args.cancel) {
					if (this.password.length > 0) {
						this.password = this.password.slice(0, this.password.length - 1);
					}
				}
			},
			done(){
				if (this.password.length === this.items.length) {
                    this.$emit('confirm', {
                        target: this,
                        value: this.password.join('')
                    })
                }
			}
		},
		watch: {
			defaultPassword: {
				immediate:true,
				handler(val){
					if (val && val.length === 6) {
						this.password = val.split('').map(Number);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
    .box {
    	height: 100%;
    	width: 100%;
    	overflow: hidden;
    	box-sizing: border-box;
    	
        &__header {
    		text-align: center;
    		display: flex;
    		align-items: center;
    		width: 100%;
    		height: 170upx;
    		background: #fff;
    		border-top: 1px solid #ddd;
    		font-size: $uni-font-size-lg;
    		justify-content: center;
    	}

    	&__body {
    		padding-top: 60upx;
    		box-sizing: border-box;
    		height: 200upx;

    		.password-box {
    			height: 90upx;
    			text-align: center;
    			box-sizing: border-box;

    			.password-item {
    				height: 100%;
    				border: 1px solid $uni-color-primary;
    				width: 540upx;
    				margin: 0 auto;
    				box-shadow: 0 0 3px rgba($uni-color-primary, .6);
    				display: flex;
    				flex-direction: row;
    				align-items: center;
    				justify-content: center;

    				&-char {
    					width: 16.66666666%;
    					height: 90upx;
    					border-right: 1px solid #ddd;
    					line-height: 90upx;
    					text-align: center;

    					&:last-child {
    						border-right: none;
    					}

    					&__dot {
    						height: 90upx;

    						&:after {
    							content: '●';
    						}
    					}
    				}
    			}
    		}
    	}

    	.keyboard {
    		position: fixed;
    		bottom: 0;
    		height: 480upx;
    		width: 100%;
    		border-top: 1px solid #ddd;
    		background: #fff;
    		display: flex;
    		flex-direction: row;
            box-shadow: 0 0 10upx rgba(0, 0, 0, .1);

    		.number {
    			display: flex;
    			flex-wrap: wrap;
    			width: 75%;
    			list-style: none;
    			padding: 0 0 0 1px;
    			margin: 0;
    			border-right: 1px solid #ddd;

    			.button {
    				margin: 0;
    				padding: 0;
    				width: 33%;
    				height: 120upx;
    				text-align: center;
    				line-height: 100upx;
                    font-weight: 900;
    				border-right: 0.5px solid #ddd;
    				border-bottom: 0.5px solid #ddd;
    				
    				&:nth-child(3),
    				&:nth-child(6),
    				&:nth-child(9),
    				&:nth-child(12) {
    					border-right: none;
    				}
    				
    				&:nth-child(10),
    				&:nth-child(11),
    				&:nth-child(12) {
    					border-bottom: none;
    				}
    				&:nth-child(11) {
    					font-size: $uni-font-size-lg;
    					font-weight: bold;
    				}
    				
    				&:active {
    					background: #ddd;
    				}
    			}

//     			.down:after {
//     				content: '\f11c';
//     				font-family: 'FontAwesome';
//     				font-size: 30px;
//     			}
    		}

    		.action {
    			width: 25%;
    			display: flex;
    			flex-direction: column;
    			align-items: center;
    			justify-content: center;

    			.delete {
    				height: 50%;
    				width: 100%;
    				border-bottom: 1px solid #ddd;
    				background: #ddd;
                    line-height: 240upx;
                    text-align: center;
                    font-size: 56upx;
                    color: #777;
    				&:active {
    					background: #fff;
    				}
    			}

    			.ok {
    				flex: 1;
    				width: 100%;
                    line-height: 240upx;
                    text-align: center;
                    font-size: 54upx;
    				&:active {
    					background: #ddd;
    				}
    			}
    		}
    	}
    }
    
    /*动画*/
    @keyframes slidedown {
    	from {
    		transform: translateY(0);
    	}
    	to {
    		transform: translateY(100%);
    	}
    }
    .slidedown {
    	animation: slidedown 0.2s linear;
    	transform: translateY(100%);
    }
    .slideup {
    	animation: slideup 0.2s linear;
    	transform: translateY(0);
    }
    @keyframes slideup {
    	from {
    		transform: translateY(100%);
    	}
    	to {
    		transform: translateY(0);
    	}
    }
</style>