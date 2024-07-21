Page({  
    data: {  
      // ... 其他数据  
      canvasWidth: 375, // 画布宽度  
      canvasHeight: 500, // 画布高度  
      backgroundImage: './bg.png', // 背景图片路径  
      date: '2023-04-01', // 当前日期  
      motivationText: '这是一个非常长的正能量文案，它需要在达到一定长度时自动换行，并且换行后也要保持居中。',  
      ipLocation: '北京', // IP地点  
      lineHeight: 24, // 文本行高  
      maxTextWidth: 300 // 文案最大宽度  
    },  
    onLoad: function() {  
        this.drawPoster();  
      },  
    // ... 其他函数  
    
    drawTextCentered: function(ctx, text, x, y, maxWidth, lineHeight) {  
        // 分割文本并逐行绘制  
        const words = text.split(' ');  
        let line = '';  
        let yPos = y;  
      
        words.forEach(word => {  
          const testLine = (line === '' ? word : line + ' ' + word);  
          const metrics = ctx.measureText(testLine);  
          const testWidth = metrics.width;  
      
          if (testWidth > maxWidth && line !== '') {  
            ctx.fillText(line, x + (maxWidth - ctx.measureText(line).width) / 2, yPos);  
            line = word;  
            yPos += lineHeight;  
          } else {  
            line = testLine;  
          }  
        });  
      
        if (line.trim() !== '') {  
          ctx.fillText(line, x + (maxWidth - ctx.measureText(line).width) / 2, yPos);  
        }  
      },  
    
      drawPoster: function() {  
        const ctx = wx.createCanvasContext('posterCanvas', this);  
      
        // 绘制背景图  
        ctx.drawImage(this.data.backgroundImage, 0, 0, this.data.canvasWidth, this.data.canvasHeight);  
      
        // 绘制日期（左上角）  
        const dateX = 30; // 距离左边的距离  
        const dateY = 30; // 距离顶部的距离  
        ctx.setFontSize(16);  
        ctx.setFillStyle('#000');  
        ctx.fillText(this.data.date, dateX, dateY);  
      
        // 绘制正能量文案（中间居中）  
        const textX = (this.data.canvasWidth - this.data.maxTextWidth) / 2;  
        const textY = this.data.canvasHeight / 2 - (this.getTextLines(this.data.motivationText).length - 1) * this.data.lineHeight / 2;  
        this.drawTextCentered(ctx, this.data.motivationText, textX, textY, this.data.maxTextWidth, this.data.lineHeight);  
      
        // 绘制IP地点（右下角）  
        const ipX = this.data.canvasWidth - 30; // 距离右边的距离  
        const ipY = this.data.canvasHeight - 30; // 距离底部的距离  
        ctx.setFontSize(14);  
        ctx.setFillStyle('#666');  
        ctx.fillText(this.data.ipLocation, ipX, ipY);  
      
        // 绘制完成  
        ctx.draw(true);  
      },
    
    getTextLines: function (text) {  
      const words = text.split(' ');  
      let lines = [];  
      let currentLine = '';  
    
      words.forEach(word => {  
        const testLine = (currentLine === '' ? word : currentLine + ' ' + word);  
        const metrics = wx.createCanvasContext('posterCanvas', this).measureText(testLine);  
    
        if (metrics.width > this.data.maxTextWidth) {  
          lines.push(currentLine.trim());  
          currentLine = word;  
        } else {  
          currentLine = testLine;  
        }  
      });  
    
      if (currentLine.trim() !== '') {  
        lines.push(currentLine.trim());  
      }  
    
      return lines;  
    },  

    previewPoster: function () {  
        wx.canvasToTempFilePath({  
          canvasId: 'posterCanvas',  
          success: (res) => {  
            wx.previewImage({  
              current: res.tempFilePath,  
              urls: [res.tempFilePath]  
            });  
          },  
          fail: (err) => {  
            console.error('生成海报失败:', err);  
          }  
        });  
      }  
    
    // ... 其他函数，如previewPoster等  
  });