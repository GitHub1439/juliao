import api from './index.js'
export default {
	getScode(data){
		try{
			let res = JSON.parse(data.result)
			if(res.action == 'user'){
				api.searchFriend({keywords:res.id}).then(res=>{
					let info = res.data[0]
					let params = `?id=${info.id}&nickname=${info.nickname}&avatar=${info.avatar}`
					uni.navigateTo({
						url:'../friend/detail'+params
					})
				})
			}else if(res.action == "group"){
				api.joinGroup({group_id:res.id}).then(()=>{
					let params = `?id=${res.id}`
					uni.navigateTo({
						url:'../group/chat'+params
					})
				}).catch((e)=>{
					if(!e.message){
						let params = `?id=${res.id}`
						uni.navigateTo({
							url:'../group/chat'+params
						})
					}
				})
			}
		}catch(e){
			uni.showToast({
				icon:'none',
				title:'请扫描正确的二维码'
			})
		}
		
	}
}