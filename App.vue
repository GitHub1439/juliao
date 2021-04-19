<script>
	import api from "./library/index.js"

	export default {
	    
        methods: {
	        
        },
        onLaunch() {
	        
        }
	}
</script>

<style lang="scss">
    // 图标字体
    @font-face {
        font-family: fonticon;
        src: url('~@/static/iconfont.ttf');
    }
    .emoji {
        font-family: fonticon;
        font-size: 44upx;
    }

	// 所有页面都应该使用该类类初始化页面背景、大小和盒子模型
	.page {
		background-color: #EEEEEE;
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;

        &--divider::before {
            z-index: 100;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 1upx;
            background-color: #ddd;
            display: block;
            content: '';
            transform: scaleY(0.5);
        }
	}

	// 参考 https://uniapp.dcloud.io/component/navigator?id=navigator
	// 去掉 navigator 组件的默认的点击态效果
	.navigator-hover {
		position: relative;
		background-color: transparent;
		opacity: 1;
	}

	// 简单容器样式
	.widget {
		background-color: transparent;
		padding: $uni-spacing-col-base $uni-spacing-row-base;

		& + & {
			padding-top: 0;
		}

		&-inner {
			border-radius: $uni-border-radius-base;
			background-color: $uni-text-color-inverse;
		}

		&-inner + &-inner {
			margin-top: $uni-spacing-col-base;
		}
	}

	// 基本按钮样式
	.btn {
		padding: 28upx;
		border-radius: $uni-border-radius-base;
		text-align: center;
		font-size: 30upx;
		background-color: $uni-text-color-inverse;
		color: $uni-text-color;
		border: 1upx solid rgba(#000000, .1);

        &-round {
            border-radius: 100upx;
        }

		&-primary {
			background-color: $uni-color-primary;
			color: $uni-text-color-inverse;
		}

		&-success {
			background-color: $uni-color-success;
			color: $uni-text-color-inverse;
		}

		&-warning {
			background-color: $uni-color-warning;
			color: $uni-text-color-inverse;
		}

		&-error {
			background-color: $uni-color-error;
			color: $uni-text-color-inverse;
		}
	}

    .cell-wrapper {
        position: relative;
        margin-top: $uni-spacing-col-base;
        background-color: #fff;

        .cell-hd::before,
        &::before,
        &::after {
            display: block;
            content: '';
            position: absolute;
            right: 0;
            height: 1upx;
            transform: scaleY(0.5);
            background-color: #ddd;
        }

        &::before {
            left: 0;
            top: 0;
        }

        &:after {
            left: 0;
            bottom: 0;
        }
    }

    .cell {
        position: relative;
        padding: 0 $uni-spacing-row-lg;
        line-height: 106upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        box-sizing: border-box;

        &:first-child &-hd::before {
            display: none;
        }

        &-hd {
            font-size: 34upx;

            &::before {
                top: 0;
                left: $uni-spacing-row-lg;
            }
        }

        &-hb {
            font-size: 30upx;
            color: #777;
        }

        &.arrow {
            padding-right: $uni-spacing-row-lg + 25upx;
        }

        &.arrow::before,
        &.arrow::after {
            position: absolute;
            transform: rotate(45deg);
            width: 20upx;
            height: 20upx;
            content: '';
            display: block;
            top: 50%;
            margin-top: -11upx;
        }

        &.arrow::before {
            background-color: #777;
            right: $uni-spacing-row-lg;
        }

        &.arrow::after {
            background-color: #fff;
            right: $uni-spacing-row-lg + 4upx;
        }
    }
	
	
	@font-face {
		font-family: "iconfont4866";
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAWkAAsAAAAAC3gAAAVYAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDSAqJXIgRATYCJAMYCw4ABCAFhG0HZRvUCVFUT3JkPyRJEIEEinOcvjCCA6ICoAAHABxgCT3Ew9N+386dmTdfpa1K3LSIJjzRzSokjySJiVIJyTOZ4d/z/VMxnZyJDgYVSW+q1INONqfvObi9k9OJ6h3567jBAScVRzjJaAPO0////Uon2gYsr820y49+78/0RodGUtJSHs/j0UUSDbq0Yr4W4pnLpLjkd9TxBLpWNaK52mcQBswKIQWavGT8bmBOxJQKc2gHa8G2RXwBBu30SXsZ8Nl7+/irRZhJmkyc6M7j3j7Q7UeHN891UIXGZQggXSqmO5FxDCjEm8L013SBeOyhbtFv0LsG6GtLyo/T153fXH/z6M1zVSXBi+zQl//yaBQhyUQF1B9pb0jNFWQ0HeHOcFL4eT0igB8hIgE/B3bXQ5VwmU0gPgKQpkTomB717kCk0+fCQkkFlG3Z7y+ndtfCYjFpY4ed/817d+8S9+6Rd+7gt29Pu/0Su/MKv/eGvPvat5pfWwiz62yZY9xRb3RAjN9YGh7mj2qKDu4Hq+70PnevJqdM70B2IyAQIClEjIikm/ruXZ9NY8U1lXx+2M4rXK6cQ9wEN3qKe04fGGGHgrDDOjLDry9aUu7YPe5uF4nLbShz4w68PUwgpALMTX3vQEwghLXrlXuRM5vgdOfaw0APj9RGNhzTGLijU5CMCPRjpPXWteUxQjlt8gycjJ/KN/nD8AiZEaHAS5wcPOw8bPdttEDUJA4minCjm5C4cl3lTBlchKU7CTw5SSXlzFSJpfaQ5HxF9zxBwjsTRcp2mV0oQw4SoCiWGyrLEk9gUMzI5UhOkgQcE3LXKUPKMiep2aH/8EG/QxKWNHzUwlZz4TVDyZIGCNdGJPjRxvu7ulZ8r/Z9XRVAc3AKsm1iemQ/hb+dLZ01833yNXWlapZGcPzrVz0XCNISoDqGZhjXug7c4mm3CeMnKOPGC9pENo2LR1Tipzb1INKyaounB5+2qNqSXV3axUPs177eZk20ohc3ZFINCxbzlVpuz7ZoPfcftWSL7EL3Smuipf/olKN5Kd16bscNsqPnLUqnXaPIRR9r52qDtp7f759uQkPopqfe/pv90+m9cbKx3Mu+TNC+8uXqd6MmgnQT7i+XU86frUJ3kPbKoyyHSm4GFv+3Qfe4WLdOtyGfX6+Lwvr1s4vmi7/dzYnhro7fVvsZm/FPf/12VSCESe5spewivZ57El+RL1xUWZOmS9Nz5xicdwc1Gr96A3ceRPAbfZCDT+k6KjZWXJjae7zPSokqOJJ7ilfBkEMIhYDLnaISm8yYv618VcZfmqiCA1FmgEVvB2YA+C/nd5mZWH/mE+l3JSwgf/iJLOdr7vepRjr9M9v+NaO+f2jSi7PNEPicY42ZHwTTsEfZcCJey6ptTTeyV6/YShO6sh8/g+ypYip50Zj5xcmLCJKWFcjatpVFewyNnhOo2i5A15G+O/fMxOlE6eDQfAZhbBskQ98gG7uiLNo8NJY+QTUOHXTdjVL77NkNxtozTrmTlA/1TEUZLxuhVVLS6jcdQflTIXc8znkWgoonmCK0eZNm6aq+VISKU2yQSPtbJJM0SsfZMNqHnYwKhVg0GmcDlDfZpCCZjHZo2pQueqImXjYMrK6Io7glUXxQHlOhGF6sCNqOnGTNvP4IFL+UELd4RZvrQAIlLoGZOaq5Jpo1UPZFkUZtHkvrhDS/FpK8lIaip41ZYag+PJUSkuUsVLR4qQCKV1ITBR1Kozpoyvuim6Im+5fDj/Ik6BLnq5EiR4kmarT0XriZKUyk8dSUO+IMMEaIqtwYQxXEq+xTU1OZaa4xmYpW1NV7WDYMAA==') format('woff2');
}

.n-icon {
  font-family: "iconfont4866" !important;
}

.n-icon-face:before {
  content: "\e7d0";
}

.n-icon-keyboard:before {
  content: "\e7db";
}

.n-icon-voice:before {
  content: "\e7e2";
}

.n-icon-image:before {
  content: "\e63d";
}

.n-icon-thunder:before {
  content: "\e63a";
}
	
</style>