<template>
	<view class="page">
		<view class="cell-wrapper">
			<view class="cell arrow avatar" @tap="uploadImage">
				<view class="cell-hd">头像</view>
				<view class="cell-hb">
					<image :src="user.avatar" />
				</view>
			</view>
			<view class="cell">
				<view class="cell-hd">昵称</view>
				<input type="text" v-model="user.nickname" class="fromInput" />
			</view>
			<view class="cell">
				<view class="cell-hd">ID</view>
				<view class="cell-hb">{{user.id}}</view>
			</view>
			<view class="cell arrow" @tap="$jump('mine.qrcode')">
				<view class="cell-hd">二维码名片</view>
				<view class="cell-hb emoji">&#xe64f;</view>
			</view>
			<view class="cell">
				<view class="cell-hd">性别</view>
				<!-- <view class="cell-hb">{{user.gender==0?'保密':(gender==1?'男':'女')}}</view> -->
				<view class="cell-hb" style="width: 50%;text-align: right;">
					<picker @change="bindPickerChange" :value="user.gender" :range="sex">
                        <view class="uni-input">{{sex[user.gender]}}</view>
                    </picker>
				</view>
				
			</view>
			<view class="cell">
				<view class="cell-hd">个性签名</view>
				<input type="text" v-model="user.signature" class="fromInput" />
			</view>
		</view>
			<button class="uploadBtn" @click="submit">保存</button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from "../../library/index.js"
	import cache from "../../library/cache.js"
	import helper from "../../library/helper.js"

	export default {
		data() {
			return {
				user: '',
				sex:['保密','男','女']
			}
		},
		methods: {
			uploadImage() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						helper.uploadFiles(tempFilePaths,'image',{type:'avatar'}).then(res=>{
							this.user.avatar = res
						})
					}
				});
			},
			submit(){
				api.changeProfile({
					avatar:this.user.avatar,
					nickname:this.user.nickname,
					gender:this.user.gender,
					signature:this.user.signature,
				}).then(res=>{
					api.getUserInfo().then(res=>{
						uni.setStorageSync('userInfo',res.data)
						uni.showToast({
							icon:'none',
							title:res.message
						})
						uni.switchTab({
							url:'./index'
						})
					})
					
				})
			},
			bindPickerChange(e){
				this.user.gender = e.target.value
			}
			
		},
		onLoad() {
			this.user = cache.storage('userInfo')
			if(this.user.signature==null){
				this.user.signature = ''
			}
		}
	}
</script>
<style lang="scss" scoped>
	.cell-wrapper {
		margin-top: 0;
	}

	.avatar {
		line-height: 1;
		padding-top: $uni-spacing-col-base;
		padding-bottom: $uni-spacing-col-base;

		.cell-hb {
			display: flex;
			flex-direction: column;
		}

		image {
			width: 140upx;
			height: 140upx;
			border-radius: $uni-border-radius-base;
			background-color: #eee;
		}
	}

	.fromInput {
		text-align: right;
		font-size: 32upx;
		color: #777;
	}
	.uploadBtn{
        width: 90%;
		margin-top: 100upx;
	}
</style>
