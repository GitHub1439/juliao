import http from './http.js'
class Ht{
	//注册
	register(data){
		return http.post('api/v1.user/register',data)
	}
	//登录
	login(data){
		return http.post('api/v1.user/login',data)
	}
	// 搜索好友
	searchFriend(data){
		return http.get('api/v1.user/searchUser',data)
	}
	
	//添加好友
	applyAddFriend(data){
		return http.post('api/v1.user/applyAddFriend',data)
	}
	//处理好友请求
	handleFriendApply(data){
		return http.post('api/v1.user/handleFriendApply',data)
	}
	//获取新朋友
	getFriendApply(data){
		return http.post('api/v1.user/getFriendApply',data)
	}
	//获取新朋友数量
	getFriendApplyCount(data){
		return http.setWait(false).post('api/v1.user/getFriendApply',data)
	}
	
	//获取用户信息
	getUserInfo(data){
		return http.setWait(false).post('api/v1.user/getUserInfo',data)
	}
	// 重置登录密码
	resetPas(data){
		return http.post('api/v1.user/resetPassword',data)
	}
	// 获取我的好友
	getMyFriend(data){
		return http.setWait(false).get('api/v1.user/getMyFriend',data)
	}
	// 获取我的好友
	createGroup(data){
		return http.post('api/v1.group/createGroup',data)
	}
	// 获取加入的群
	getMyGroup(data){
		return http.setWait(false).get('api/v1.user/getMyGroup',data)
	}
	// 加入群聊
	joinGroup(data){
		return http.get('api/v1.group/joinGroup',data)
	}
	// 发送红包
	sendPacket(data){
		return http.post('api/v1.redpack/create',data)
	}
	// 编辑用户信息
	changeProfile(data){
		return http.post('api/v1.user/changeProfile',data)
	}
	// 意见反馈
	feedback(data){
		return http.post('api/v1.user/feedback',data)
	}
	// 抢红包
	grab(data){
		return http.autoError(false).post('/api/v1.redpack/grab',data)
	}
	// 红包详情
	packetDetail(data){
		return http.autoError(false).get('api/v1.redpack/detail',data)
	}
	//充值链接
	getRechargeUrl(){
		return http._baseUrl+'api/v1.pay/recharge'
	}
	//获取二维码链接
	getMyQrcodeCard(data){
		return http.get('api/v1.user/getMyQrcodeCard',data)
	}
	
	//获取群成员
	getGroupUsers(data){
		return http.post('api/v1.group/getGroupUsers',data)
	}
	//获取群信息
	getGroupInfo(data){
		return http.post('api/v1.group/getGroupInfo',data)
	}
	//获取群二维码
	getQrcodeCard(data){
		return http.post('api/v1.group/getQrcodeCard',data)
	}
	//修改群名
	changeGroupName(data){
		return http.post('/api/v1.group/changeGroupName',data)
	}
	//群移除用户
	removeUserForGroup(data){
		return http.post('api/v1.group/removeUserForGroup',data)
	}
	//群邀请用户
	inviteIntoGroup(data){
		return http.post('api/v1.group/inviteIntoGroup',data)
	}
	//获取验证码
	sendCode(data){
		return http.post('api/v1.common/sendCode',data)
	}
	//发送消息
	sendMessage(data){
		return http.setWait(false).post('api/v1.user/sendMessage',data)
	}
	//提现
	withdraw(data){
		return http.setWait(false).post('api/v1.user/withdraw',data)
	}
	//获取红包折扣
	getGroupDiscount(data){
		return http.setWait(false).post('api/v1.redpack/getGroupDiscount',data)
	}
	//获取系统表情
	getSystemFaces(data){
		return http.setWait(false).post('api/v1.common/getSystemFaces',data)
	}
	//资金明细
	getMyCoinRecord(data){
		return http.setWait(false).post('api/v1.user/getMyCoinRecord',data)
	}
	//获取红包记录
	getMyRedpackRecord(data){
		return http.setWait(false).post('api/v1.user/getMyCoinRecord',data)
	}
	//获取红包统计信息
	getMyRedpackCount(data){
		return http.get('api/v1.user/getMyRedpackCount',data)
	}
	//删除好友
	deleteFriend(data){
		return http.post('api/v1.user/deleteFriend',data)
	}
	//删除群
	removeGroup(data){
		return http.post('api/v1.group/removeGroup',data)
	}
	//退出群
	quitGroup(data){
		return http.post('api/v1.group/quitGroup',data)
	}
	//全体成员是否禁言
	changeSpeak(data){
		return http.post('api/v1.group/changeSpeak',data)
	}
	//获取红包信息
	getRedpackInfo(data){
		return http.get('api/v1.redpack/info',data)
	}
	//获取群红包统计信息
	getGroupRedpackCount(data){
		return http.get('api/v1.group/getGroupRedpackCount',data)
	}
	//获取群红包记录
	getGroupRedpackRecord(data){
		return http.setWait(false).post('api/v1.group/getGroupRedpackRecord',data)
	}
	//获取群红包记录
	getPayWays(data){
		return http.post('api/v1.pay/ways',data)
	}
}
export default new Ht()