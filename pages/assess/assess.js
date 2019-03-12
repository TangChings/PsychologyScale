// pages/assess/assess.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:[],
    assess:[],
    anxietyAssess: "50 以下为无焦虑； 50~59 为轻度焦虑； 60~69 为中度焦虑； 70 以上为严重焦虑。有轻度以上焦虑时建议就近找专业人士进行心理咨询或辅导。",
    depressionAssess: "小于53分为无抑郁； 大于等于53分且小于63分为轻度抑郁；大于等于63分且小于73分为中至重度抑郁；大于等于73分为重度抑郁。长期处于抑郁状态易导致抑郁症。当抑郁情绪不能自我疏导时，请及时找专业人士进行心理咨询或辅导。"
  },
  returnToHome (){
    wx.reLaunch({
      url: '../home/home',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.anxietyScore){
      this.setData({
        'score': app.globalData.anxietyScore,
        'assess':this.data.anxietyAssess
      })
    }
    if (app.globalData.depressionScore){
      this.setData({
        'score':app.globalData.depressionScore,
        'assess':this.data.depressionAssess
      })
    }
    
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