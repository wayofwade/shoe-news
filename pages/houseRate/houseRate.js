//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    years: 20,
    principal: 100,
    annualInterestRate: 3.0,
    resultInfo: {},
    huoguoUrl: '../../images/火锅.png',
    btnIndex: ''
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  bindReplaceInput(e) {
    var value = e.detail.value
    this.setData({
        years: value
    })
  },
  bindReplaceInput1(e) {
    var value = e.detail.value
    this.setData({
        annualInterestRate: value
    })
  },
  bindReplaceInput2(e) {
    var value = e.detail.value
    this.setData({
        principal: value
    })
  },
  onShareAppMessage() {


    let timeTitle = '房贷计算器'

    return {
    
        title: timeTitle,
        
        path: '/pages/houseRate/houseRate'
    
    }
    },
  /** 
 * 等额本息
    假设房贷本金是60万，贷款年利率为4.8%即月利率为0.4%，分20年即240期偿还，等额本金还款，那么：
    1、每月应还本金=600000/240=2500元；
    2、首月应还利息=600000*0.4%=2400元，首月还款金额=2500+2400=4900元；
    3、次月应还利息=（600000-2500）*0.4%=2390元，次月还款金额=2500+2390=4890元；
    可见，等额本金的利息、月还款额均是以10元/月依次递减。
    4、总利息=（240+1）*600000*0.4%/2=289200元。
    以上就是关于“房贷等额本金算法”的相关内容，希望能对大家有所帮助。
*/
  calculateEqualInstallment (LoanBenJin, yearRates, yearStages)  {
    let benJin = LoanBenJin * 10000                  // 总价格
    let monthStage = yearStages * 12                 // 总期数
    let monthRates = (yearRates) / 12 / 100          // 每月利率
  
    //  1.每月还款额 = 总贷款额 X 月利率 X ( 1+月利率 ) ^ 还款期数 / ( ( 1+月利率 ) ^ 还款期数 -1 )
    let currentMonthTotal = this.doDanWei2((benJin * monthRates * Math.pow((1 + monthRates), monthStage)) / (Math.pow((1 + monthRates), monthStage) - 1))
  
    let finishedBenJinTotal = 0;          // 已还本金
    let finishLiXiTotal = 0;              // 已还利息总和
    let unfinishedBenJinTotal = benJin   // 还剩下本金总和
    let lists = []                        // 定义数组用于装载列表
    for (let i = 1; i < monthStage + 1; i++) {
      // 当月需要还的利息
      let currentMonthLiXi = (benJin - finishedBenJinTotal) * monthRates;
      //  当月需要还的本金
      let currentMonthBenJin = currentMonthTotal - currentMonthLiXi;
      //  已还款本金总和
      finishedBenJinTotal += currentMonthBenJin;
      //  已还本金总和
      unfinishedBenJinTotal = benJin - finishedBenJinTotal;
      //  已还利息总和
      finishLiXiTotal += currentMonthLiXi;
  
      let k = {
        key: i,
        title: `第${i}期`,
        currentMonthTotal: this.doDanWei2(currentMonthTotal),    // 当月需要还款总金额 =  当月需要还的本金 + 当月需要还的利息
        currentMonthBenJin: this.doDanWei2(currentMonthBenJin), // 当月需要还的本金
        currentMonthLiXi: this.doDanWei2(currentMonthLiXi),     // 当月需要还的利息
        finishedBenJinTotal: this.doDanWei2(finishedBenJinTotal),        // 已还款本金总和
        unfinishedBenJinTotal: this.doDanWei2(unfinishedBenJinTotal),   // 还剩下本金总和
        finishLiXiTotal: this.doDanWei2(finishLiXiTotal),               // 已还利息总和
      }
      lists.push(k)
    }
  
    let returnInfo = {
      subKey: 'averages',
      subTitle: '等额本息',
      benJin: benJin,                     // 借款额度
      bigBenJin: LoanBenJin,               // 大写本金
      yearStages: yearStages,              // 年总期数
      monthStage: monthStage,             // 月总期数
      yearRates: yearRates,                // 年利率
      monthRates: monthRates,              // 🈷️利率
      finishedTotal: this.doDanWei2(benJin + finishLiXiTotal), // 需要还的总钱数 = 本金 + 利息
      liXi: this.doDanWei2(finishLiXiTotal),   // 总利息
      lists: lists,                       // 分期列表详情
    }
    return returnInfo
  },
  
  
  /**
   * 计算等额本金月供及总利息
   * @param {number} LoanBenJin 贷款本金
   * @param {number} yearRates 年利率（百分比形式，如5%则输入5）
   * @param {number} yearStages 贷款年限
   * @returns {{monthlyPayment: number[], totalInterest: number}} 每月还款额数组及总利息
   */
    calculateEqualPrincipal (LoanBenJin, yearRates, yearStages) {
    let benJin = LoanBenJin * 10000        // 总价格
    let monthStage = yearStages * 12       // 总期数
    let LoanYearRate = yearRates           // 总年利率
    let monthRates = (LoanYearRate) / 12 / 100   // 每月利率
  
    let moneyPrincipal = benJin / monthStage     // 1、每月应还本金=600000/240=2500元；
  
  
    let lists = []  // 定义数组用于装载列表
    let finishLiXiTotal = 0;              // 已还利息总和
    let unfinishedBenJinTotal = benJin   // 还剩下本金总和
    let finishedBenJinTotal = 0;          // 已还本金
    for (let i = 0; i < monthStage; i++) {
      // 2、首月应还利息=600000*0.4%=2400元，首月还款金额=2500+2400=4900元；
      let needLiXi = (benJin - (i * moneyPrincipal)) * monthRates
      // 已还本金总和
      finishedBenJinTotal = this.doDanWei2(moneyPrincipal * (i + 1))
      // 未还本金
      unfinishedBenJinTotal = this.doDanWei2(benJin - finishedBenJinTotal)
      // 利息总和
      finishLiXiTotal = this.doDanWei2(finishLiXiTotal + needLiXi)
      let k = {
        key: i + 1,
        title: `第${i + 1}期`,
        currentMonthTotal: this.doDanWei2(moneyPrincipal + needLiXi), // 当月需要还款总金额 =  当月需要还的本金 + 当月需要还的利息
        currentMonthBenJin: this.doDanWei2(moneyPrincipal),           // 当月需要还的本金
        currentMonthLiXi: this.doDanWei2(needLiXi),                   // 当月需要还的利息
        finishedBenJinTotal: this.doDanWei2(moneyPrincipal * (i + 1)),       // 已还款本金总和
        unfinishedBenJinTotal: this.doDanWei2(unfinishedBenJinTotal),   // 还剩下本金总和
        finishLiXiTotal: this.doDanWei2(finishLiXiTotal),               // 已还利息总和
      }
  
      lists.push(k)
    }
    // 可见，等额本金的利息、月还款额均是以10元/月依次递减。
    // 4、总利息=（240+1）*600000*0.4%/2=289200元。
    let finishLiXiTotalAll = (monthStage + 1) * benJin * monthRates / 2
    // 以上就是关于“房贷等额本金算法”的相关内容，希望能对大家有所帮助。
  
    let returnInfo = {
      subKey: 'principals',
      subTitle: '等额本金',
      benJin: benJin,                     // 借款额度
      bigBenJin: LoanBenJin,               // 大写本金
      yearStages: yearStages,              // 年总期数
      monthStage: monthStage,             // 月总期数
      yearRates: yearRates,                // 年利率
      monthRates: monthRates,              // 🈷️利率
      finishedTotal: this.doDanWei2(benJin + finishLiXiTotal), // 需要还的总钱数 = 本金 + 利息
      liXi: finishLiXiTotalAll,           // 总利息
      lists: lists,                       // 分期列表详情
    }
    return returnInfo
  },
  // 计算金额
   doDanWei (num)  {
    if (Math.floor(num) === num) return num
    let k = Number((Number(num.toFixed(2)) + 0.01).toFixed(2))
    return k
  },
  // 计算金额
   doDanWei2 (num)  {
    if (Math.floor(num) === num) return num
    let k = Number(num.toFixed(2))
    return k
  },
   doDanWei1  (num)  {
    if (Math.floor(num) === num) return num
    let k = Number(num.toFixed(2))
    return k
  },
  onClickHouseRate() {
    const {principal, annualInterestRate, years} = this.data
    let result = this.calculateEqualPrincipal(principal, annualInterestRate, years);
    console.log(`每月还款额数组（首月至末月）:`, result);

    this.setData({
        resultInfo: result,
        btnIndex: 0
    })
    const data = {
        principal:principal,
        annualInterestRate:annualInterestRate,
        years:years,
        btnIndex: 0
    }
    wx.navigateTo({
      url: `/pages/houseRate/houseRateDetail/houseRateDetail?data=${JSON.stringify(data)}`,
    })
  },
  onClickHouseRate1 () {
    const {principal, annualInterestRate, years} = this.data
    let result = this.calculateEqualInstallment(principal, annualInterestRate, years);
    console.log(`每月还款额数组（首月至末月）:`, result);

    this.setData({
        resultInfo: result,
        btnIndex: 1
    })
    const data = {
        principal:principal,
        annualInterestRate:annualInterestRate,
        years:years,
        btnIndex: 1
    }
    wx.navigateTo({
      url: `/pages/houseRate/houseRateDetail/houseRateDetail?data=${JSON.stringify(data)}`,
    })
  }
  
})
