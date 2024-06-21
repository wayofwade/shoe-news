//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), // 请求微信用户的信息
    menu: '',
    menuList: ['宫保鸡丁', '糖醋里脊', '红烧带鱼', '牛腩煲', '红烧肉', '麦当劳', 
    '蛋炒饭','炒米粉', '南昌拌粉', '螺蛳粉','火锅', '麻辣香锅','水果沙拉', '粥',
    '包子', '小馄饨','手抓饼','烧烤','杂粮煎饼','面包']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goPersonList: function () { // 转到人物列表页面
    console.log('点击跳转到人物列表页面')
    wx.navigateTo({
      url: '/pages/newsList/index'
    })
  },
  onLoad: function () {
      
  },
  selectMenu: function (e) {
    const menuList = this.data.menuList
    const index = Math.floor(Math.random()*menuList.length);
    this.setData({
        menu: menuList[index]
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
