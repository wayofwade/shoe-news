
/**
 * 
 * @param {that}  当前上下文
 */
module.exports = (that) => {
	wx.createSelectorQuery()
		.select('#myCanvas') // 在 WXML 中填入的 id
		.fields({
			node: true,
			size: true
		})
		.exec((res) => {
			// Canvas 对象
			const canvas = res[0].node
            // 渲染上下文
            
			const ctx = canvas.getContext('2d')
            console.log('==canvas==,canvas',canvas,ctx)


			// Canvas 画布的实际绘制宽高
			const width = res[0].width
			const height = res[0].height

			// 初始化画布大小
			const dpr = wx.getWindowInfo().pixelRatio
			// console.log("dpr",dpr)
			canvas.width = width * dpr
			canvas.height = height * dpr
			ctx.scale(dpr, dpr)
			ctx.clearRect(0, 0, width, height)

			// 绘制白色底
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillRect(0, 0, width, height);
			// 绘制绿色长方形
			ctx.fillStyle = 'rgb(7 , 193 , 96)';
			ctx.fillRect(0, 300, 250, 50);

			// 图片对象 logo
			const image0 = canvas.createImage()
			// 图片加载完成回调
			image0.onload = () => {
				// 将图片绘制到 canvas 上
				ctx.drawImage(image0, 100, 15, 50, 50)
			}
			// 设置图片src
			image0.src = '/images/wifi.png'

			// 图片对象 太阳码
			const image1 = canvas.createImage()
			// 图片加载完成回调
			image1.onload = () => {
				// 将图片绘制到 canvas 上
				ctx.drawImage(image1, 40, 115, 170, 170)
			}
			// 设置太阳码 src
			image1.src = that.data.qrcode
			//文字
			ctx.font = 'bold 20px serif';
			ctx.fillStyle = '#414141';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('扫码连WiFi', 125, 90);

			ctx.font = 'bold 13px serif';
			ctx.fillStyle = '#ffffff';
			ctx.fillText('安全·快捷·省心', 125, 325);

			// 生成图片
			setTimeout(() => {
				wx.canvasToTempFilePath({
					canvas,
					success: res => {
						// 生成的图片临时文件路径
						const tempFilePath = res.tempFilePath
						that.setData({
							canvasImg: tempFilePath
						})
					},
				})
			}, 300)
		})
}