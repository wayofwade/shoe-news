// pages/houseRate/houseRateDetail/houseRateDetail.js
import {calculateEqualPrincipal,calculateEqualInstallment} from './../utils'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        resultInfo: {},
        btnIndex: 0 , // 0-等额本息  1-等额本金
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const data = JSON.parse(options.data)
        const {principal, annualInterestRate, years, btnIndex} = data
        console.log('==btnIndex==',btnIndex)
       const result = btnIndex === 0 ? calculateEqualInstallment(principal, annualInterestRate, years) :
       calculateEqualPrincipal(principal, annualInterestRate, years) 
        this.setData({
            resultInfo: result,
            btnIndex: btnIndex
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})