
// wxml中用不到的变量，没有放到data里面
import {formatTime} from './../../../utils/util'
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
    activeIndex: -1,
    allMenuList: [ '红烧肉', '麦当劳', 
    '蛋炒饭','炒米粉', '南昌拌粉', '螺蛳粉','火锅', '麻辣香锅','水果沙拉', '粥',
    '包子', '小馄饨','手抓饼','烧烤','杂粮煎饼','面包','宫保鸡丁', '糖醋里脊', '红烧带鱼', '牛腩煲',
    '披萨','饺子','杂粮煎饼','食饼筒'],
    menuList: [ '红烧肉', '麦当劳', 
    '蛋炒饭','炒米粉', '南昌拌粉', '螺蛳粉','火锅', '麻辣香锅'],
    menu: '',
    huoguoUrl: '../../../../images/火锅.png',
    refreshUrl: '../../../images/刷新.png'
  },
  onShareAppMessage() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let timeTitle = '中午吃什么'
    if (currentHour>= 13) {
        timeTitle = '晚上吃什么'
    }
    if (currentHour>= 21) {
        timeTitle = '夜宵吃什么'
    }

    console.log("当前小时：" + currentHour);
    return {
    
        title: timeTitle,
        
        path: '/pages/index/index',
        
        imageUrl: this.data.huoguoUrl
    
    }
    },
  /**
   * 随机取出几个数据
   */
    getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    },
  changeMenuList () {
      const menuList = this.getRandomArrayElements(this.data.allMenuList,8)
      this.setData({
        menuList:menuList
      })
  },
 
  // 点击开始
  start() {

    // 如果正在抽奖则直接return
    if (click) {
      return false;
    }

    click = true;
    speed = 100;

    // 中奖的位置，应该从服务端取到
    prizeId = Math.floor(Math.random() * 8);
    console.log('中奖位置：', prizeId)
    this.roll();
  },

  // 转动
  roll() {
    times += 1;
    const index = this.data.activeIndex >= 7 ? 0 : this.data.activeIndex + 1
    const menuName = this.data.menuList[index]
    this.setData({
      // 如果activeIndex是最后一个，则赋值0
      activeIndex: index,
      menu: menuName
    })

    if (times > cycle + 10 && this.data.activeIndex === prizeId) {
      // 最后滚动到中奖位置，停止滚动
      wx.showToast({
        title: '抽中：' + menuName,
        icon: 'none'
      })

      const historyMenuList = wx.getStorageSync('historyMenuList') || []
      const menuObj = {
          time: formatTime(new Date()),
          menuName
      }
      historyMenuList.push(menuObj)
      wx.setStorageSync('historyMenuList', historyMenuList)

      clearTimeout(timer);
      prize = -1;
      times = 0;
      click = false;
    } else {
      if (times < cycle) {
        // 一开始速度增加（speed越小速度越快）
        speed -= 20;
      } else if (times === cycle) {
        // 确定一个速度变化的位置，下一次滚动到此位置，速度明显变缓
        prize = Math.random() * 8 | 0;
      } else {
        // 滚动次数大于基本滚动次数并且到达上面确定的位置时，速度明显变缓
        if (times > cycle + 10 && ((prize === 0 && this.data.activeIndex === 7) || prize === this.data.activeIndex + 1)) {
          speed += 90;
        } else {
          // 滚动次数大于基本滚动次数，速度逐渐变缓
          speed += 30;
        }
      }

      // 控制速度在30
      if (speed < 30) {
        speed = 30;
      }

      timer = setTimeout(this.roll, speed);
    }
  },
  /**
    * 点击我的历史菜单
  */
  onClickMenuHistory() {
    wx.navigateTo({ url: '/pages/history/history' }) 
  },
    /**
    * 点击我的历史菜单
  */
 onClickHouseRate() {
    wx.navigateTo({ url: '/pages/houseRate/houseRate' }) 
  },


  onClickWaterLog() {
    wx.navigateTo({ url: '/pages/waterLog/waterLog' }) 
  },
  onClickBMI() {
    wx.navigateTo({ url: '/pages/life/bmi/bmi' })   //   "pages/life/bmi/bmi"
  },
  countryFlag() {
    wx.navigateTo({ url: '/pages/life/countryFlag/countryFlag' })   //   "pages/life/bmi/bmi"
  },
  ip_info() {
    wx.navigateTo({ url: '/pages/life/ip_info/index' })   //   "pages/life/bmi/bmi"
  },
  randomNum() {
    wx.navigateTo({ url: '/pages/life/randomNum/randomNum' })   //   "pages/life/bmi/bmi"
  },

  screenshotConnect() {
    wx.navigateTo({ url: '/pages/life/screenshotConnect/screenshotConnect' })   //   "pages/life/bmi/bmi"
  },
  cuttingNine() {
    wx.navigateTo({ url: '/pages/life/cuttingNine/cuttingNine' })   //   "pages/life/bmi/bmi"
  },
  randomEat() {
    wx.navigateTo({ url: '/pages/life/randomEat/randomEat' })   //   "pages/life/bmi/bmi"
  },


  //        "pages/life/screenshotConnect/screenshotConnect",



  



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(timer);
  }
})