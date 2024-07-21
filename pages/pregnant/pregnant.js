Page({  
    data: {  
      holidays: [  
        { name: '元旦', date: '2024-01-01' },  
        { name: '春节', date: '2024-02-10' }, // 假设正月初一  
        { name: '清明节', date: '2024-04-04' },  
        { name: '劳动节', date: '2024-05-01' },  
        { name: '端午节', date: '2024-06-08' },  
        { name: '中秋节', date: '2024-09-15' },  
        { name: '国庆节', date: '2024-10-01' }  
      ],  
      passedHolidaysCount: 0,  
      remainingHolidays: []  
    },  
    onLoad: function() {  
      this.calculateHolidays();  
    },  
    calculateHolidays: function() {  
      const today = new Date().toISOString().split('T')[0];  
      let passed = [], remaining = [];  
    
      this.data.holidays.forEach(holiday => {  
        const holidayDate = new Date(holiday.date).toISOString().split('T')[0];  
        if (holidayDate < today) {  
          passed.push(holiday);  
        } else {  
          const diff = (new Date(holidayDate) - new Date(today)) / (1000 * 60 * 60 * 24);  
          remaining.push({ ...holiday, remainingDays: Math.ceil(diff) });  
        }  
      });  
    
      this.setData({  
        passedHolidaysCount: passed.length,  
        remainingHolidays: remaining  
      });  
    },  
    copyHolidaysInfo: function() {  
      let holidaysInfo = '今年已过的节假日：\n';  
      holidaysInfo += `${this.data.passedHolidaysCount}个\n\n`;  
      holidaysInfo += '剩余节假日信息：\n';  
      this.data.remainingHolidays.forEach(holiday => {  
        holidaysInfo += `${holiday.name}（${holiday.date}）：距离还有${holiday.remainingDays}天\n`;  
      });  
    
      wx.setClipboardData({  
        data: holidaysInfo,  
        success: function() {  
          wx.showToast({  
            title: '复制成功',  
            icon: 'success',  
            duration: 2000  
          });  
        }  
      });  
    }  
  });