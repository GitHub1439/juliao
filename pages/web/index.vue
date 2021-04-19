<template>
	<view class="page page--divider">
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
	export default {
		data() {
            return {
				url: 'https://uniapp.dcloud.io/static/web-view.html',
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
        onLoad(opts) {
            
        }
	}
</script>
