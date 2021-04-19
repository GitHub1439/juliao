## 目录结构

```text
ThinkPHP 框架系统目录（可以部署在非web目录下面）
 ├─components           核心公共函数目录
 │  ├─contracts.vue
 │  ├─load-more.vue
 │  ├─message.vue
 │  ├─packet.vue
 │  ├─payment.vue
 │  ├─quick-menu.vue
 │  ├─result-page.vue
 │  ├─sender.vue
 │  ├─ ...
 ├─extends              与Vuejs相关的扩展
 ├─pages                应用页面
 ├─static               静态资源目录
 ├─utility              工具类目录
 │  ├─api.js            封装API请求函数
 │  ├─emitter.js        事件侦听器类，事件总线用此实现
 │  ├─lang.js           常用函数库
 │  ├─qrcode.js         二维码生成工具
 │  ├─store.js          应用状态管理，使用 Vuex 实现
 ├─App.vue              应用初始化容器
 ├─config.js            配置文件，包含：API路径、WebSocket等
 ├─main.js              应用挂载、全局共享、组件声明等
 ├─manifest.json        打包相关，如权限、应用名称等
 ├─pages.json           定义页面、全局样式、tabBar
 ├─README.md            项目说明文件
 └─uni.scss             全局样式变量
```


## 用户登录需要做的事情
- 同步通讯录
- 同步申请列表
    - 好友申请
    - 加群申请
    

## todo

- 更新用户信息时（头像、名称等），同时群聊里面的。
- 搜索好友排除自己
- 房主免死，还是保留抢红包的逻辑吗