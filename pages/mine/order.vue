<!-- 我的 -->
<template>
	<view class="page">
		<!-- <view class="time">2019-1-1 17:00</view> -->
		<view class="listBox">
			<view class="orderList" v-for="(v,i) in list" :key="i">
				<image src="../../static/new/green.png" v-if="(0+v.money)>0"></image>
				<image src="../../static/new/red.png" v-else></image>
				<view class="info">
					<view class="way">{{v.type_name}}</view>
					<view class="order_time">{{v.create_at}}</view>
				</view>
				<view class="price">{{v.money}}</view>
			</view>
		</view>
		<view class="loading" v-if="loaded">没有更多信息</view>
	</view>
</template>

<script>
	import api from '../../library/index.js'
    
    export default {
		data(){
			return {
				page:{
					pageSize:10,
					pageIndex:1,
					total:10,
				},
				list:{},
				loading:false,
				loaded:false,
			}
		},
		onShow() {
			this.getList()
		},
		methods:{
			getList(){
				api.getMyCoinRecord({
					page_no:this.page.pageIndex,
					page_num:this.page.pageSize,
				}).then(res=>{
					this.list = res.data.rows
					this.page.total = res.data.total
					let p = this.page
					if((p.pageSize*p.pageIndex)>=p.total){
						this.loaded = true
					}
				})
			}
		},
		onReachBottom() {
			let p = this.page
			if((p.pageSize*p.pageIndex)<p.total){
				this.page.pageSize = p.pageSize*(p.pageIndex+1)
				this.getList()
			}
		}
    }
</script>

<style lang="scss" scoped>
	page{
		// overflow-x: hidden;
	}
	.page{
		// padding: 0 30upx;
		background: #f1f1f1;
		padding-top: 30upx;
		box-sizing: border-box;
	}
	.time{
		text-align: center;
		font-size: 28upx;
		color: #666;
		line-height: 60upx;
	}
	.listBox{
        width: 95%;
        margin: 0 auto;
		background: #fff;
		border-radius: 10upx;
		.orderList{
			position: relative;
			padding: 20upx 120upx;
			image{
				position: absolute;
				left: 20upx;
				top: 20upx;
				width: 80upx;
				height: 80upx;
			}
			.info{
				line-height: 40upx;
				font-size: 30upx;
				color: #666;
				.order_time{
					font-size: 22upx;
					color: #999;
				}
			}
			.price{
				position: absolute;
				right: 20upx;
				top: 0;
				line-height: 120upx;
				font-size: 30upx;
			}
			&:after{
				content: '';
				width: 600upx;
				height: 1px;
				background: #f1f1f1;
				display: inline-block;
				position: relative;
				left: 50%;
				transform: translateX(-50%);
			}
			&:last-of-type:after{
				display: none;
			}
		}
	}
	.loading{
		text-align: center;
		font-size: 26upx;
		color: #999;
		padding: 30upx 0;
	}
</style>
