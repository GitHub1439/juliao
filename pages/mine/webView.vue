<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
	import api from "../../library/index.js"
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				url:''
            }
        },
		onLoad(opt) {
			this.url = api.getRechargeUrl()+`?user_id=${opt.user_id}&money=${opt.money}&way=${opt.way}`
			console.log(opt)
		}
    }
</script>

<style>

</style>