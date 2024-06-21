// wxml中用不到的变量，没有放到data里面
let prize = '';         // 速度开始变化（变缓）的位置
let prizeId = '';       // 中奖位置
const cycle = 50;       // 基本转动次数
let speed = 30;         // 转动速度
let times = 0;          // 转动次数
let timer = null;       // 定时器ID
let click = false;      // 是否正在抽奖

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyMenuList: []
  },

  onLoad: function () {
    const historyMenuList = wx.getStorageSync('historyMenuList') || []
    this.setData({
        historyMenuList
    })

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(timer);
  }
})