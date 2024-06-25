//logs.js
const util = require('../../utils/util.js')
const draw = require("./draw")


// 1-图片原图展示，使用组件比如vant等
// 2-点击放大的时候，全屏展示图片
// 3-点击的时候去做水印处理


Page({
  data: {
    logs: [],
    years: 20,
    principal: 100,
    annualInterestRate: 3.0,
    resultInfo: {},
    huoguoUrl: '../../images/火锅.png',
    width: 200, 
    height:200
  },
  onLoad: function () {
      this.initCanvas()
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
        
        path: '/pages/houseRate/houseRate',
        
        imageUrl: this.data.huoguoUrl
    
    }
    },

 jsFileToBase64 (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },
  //画布添加水印
drawWaterMark  (ctx, imgWidth, imgHeight, wmConfig, canvas) {


    let fontSize;
    if (imgWidth >= 3456) {
      fontSize = 50;
    } else if (imgWidth >= 2700) {
      fontSize = 30;
    } else if (imgWidth >= 2000) {
      fontSize = 26;
    } else if (imgWidth >= 1436) {
      fontSize = 20;
    } else if (imgWidth >= 800) {
      fontSize = 12;
    } else if (imgWidth >= 500) {
      fontSize = 10;
    } else {
      fontSize = 8;
    }
    console.log(imgWidth, imgHeight, fontSize);
   
    


    ctx.fillStyle = wmConfig.fillStyle || "white";
  
    ctx.font = `${fontSize}px ${wmConfig.font}`;
    ctx.lineWidth = 1;
    ctx.fillStyle = wmConfig.fillStyle || "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
  
  
    //文字坐标
  
    const maxPx = Math.max(imgWidth, imgHeight);
  
    const stepPx = Math.floor(maxPx / wmConfig.density);
  
  
    let arrayX = [0];//初始水印位置 canvas坐标 0 0 点
    while (arrayX[arrayX.length - 1] < maxPx / 2) {
      arrayX.push(arrayX[arrayX.length - 1] + stepPx);
  
    }
    arrayX.push(...arrayX.slice(1, arrayX.length).map((el) => {
      return -el;
    }));
  
    console.log(arrayX);
  
    for (let i = 0; i < arrayX.length; i++) {
      for (let j = 0; j < arrayX.length; j++) {
        ctx.save();
        ctx.translate(imgWidth / 2, imgHeight / 2); ///画布旋转原点 移到 图片中心
        ctx.rotate(-Math.PI / 5);
        if (wmConfig.textArray.length > 3) {
          wmConfig.textArray = wmConfig.textArray.slice(0, 3);
        }
        wmConfig.textArray.forEach((el, index) => {
          let offsetY = fontSize * index + 2;
          ctx.fillText(el, arrayX[i], arrayX[j] + offsetY);
        });
        ctx.restore();
        console.log('======677777777', ctx)
        let newDataUrl = canvas.toDataURL('image/png');
        console.log('==8888newDataUrl88', newDataUrl)
      }
    }
  
  },  

  initCanvas() {
   //  draw(this)

  },
         //将base64图片转网络图片
         send_code(code) {
            /*code是指图片base64格式数据*/
            //声明文件系统
            const fs = wx.getFileSystemManager();
            //随机定义路径名称
            var times = new Date().getTime();
            var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
            //将base64图片写入
            fs.writeFile({
              filePath: codeimg,
              data: code.slice(22),
              encoding: 'base64',
              success: () => {
                this.codeImg = codeimg
    
              }
            });
          },
    
 addWatermark (base64Image, ppppth, p) {
    // 创建一个新的Image对象
    let that = this
    let codeImg = ''

            /*code是指图片base64格式数据*/
            //声明文件系统
            const fs = wx.getFileSystemManager();
            //随机定义路径名称
            var times = new Date().getTime();
            var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
            //将base64图片写入
            fs.writeFile({
              filePath: codeimg,
              data: base64Image.slice(22),
              encoding: 'base64',
              success: () => {
                that.codeImg = codeimg
                codeImg = codeimg
                console.log('===codeimg==',codeimg)
              }
            });
            let { pixelRatio } = wx.getSystemInfoSync()
            pixelRatio = 0.2
            setTimeout(() => {
                wx.getImageInfo({
                    src: p,
                    success: function (img) {
              
                          wx.createSelectorQuery().select("#cards1").fields({id:true,size:true,node:true,  
                                  context: true},(res) => {
                                      // console.log('=======img',img)
                              // 实例对象
                              const canvas = res.node;
                              const context = canvas.getContext('2d');

                              that.setData({
                                  width: img.width,
                                  height: img.height
                              })
                              let image = canvas.createImage();
                              image.src = codeImg;
                              image.onload = () => {                             
                                context.drawImage(image, 0, 0, img.width * pixelRatio, img.height*pixelRatio); // 设置图片
                                console.log('===img==',img,pixelRatio)
                                that.drawWaterMark(context, img.width, img.height, {
                                    fillStyle: "#ec7412", // 'rgba(255, 255, 255, 0.8)', 
                                    font: '20px Arial', // "microsoft yahei", //字体
                                    textArray: ['仅供参考'],//水印文本内容，允许数组最大长度3 即：3行水印
                                    // textArray: ['健大', '贷款起飞'],//水印文本内容，允许数组最大长度3 即：3行水印
                                    density: 4  //密度 建议取值范围1-5   值越大，水印越多，可能会导致水印重叠等问题，慎重！！
                                  }, canvas)
                              };
                          }).exec()
                    }
                  })
            }, 2 *1000);
  },  
  ImgToBase64Func(filePath) {
    return new Promise((resolve, reject) => {
      let baseFormat = 'data:image/png;base64,'
      let base64 = wx.getFileSystemManager().readFileSync(filePath, 'base64')
      resolve(baseFormat + base64)
    })
  },
    onSelectPic () {
       let that = this
      console.log('====选择图片按钮===')
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
            const path1= res.tempFiles[0]
          console.log(res.tempFiles[0].tempFilePath)
          console.log(path1)
      
          const file = res.tempFiles[0].tempFilePath
           that.ImgToBase64Func(file).then((res) => {
           console.log(res, '==2==2=2=2=')
            that.addWatermark(res, path1, file)
           })
        }
      })
  }
  
})
