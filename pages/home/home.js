// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  scl90(){
    wx.navigateTo({
      url: '../scl90/scl90',
    })
  },

  yiyu:function(){
    wx.navigateTo({
      url: '../depression/depression',
    })
  },

  upi(){
    wx.navigateTo({
      url: '../upi/upi',
    })
  },

  contact(){
    wx.makePhoneCall({
      phoneNumber: '0931-8915625',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})