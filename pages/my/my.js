// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    sex:'',
    stuNum:'',
  },

  removeBind(){
    wx.showModal({
      title: '警告',
      content: '解除绑定将会清除所有数据，小程序将无法正常使用！',
      confirmText: '解除',
      cancelText: '取消',
      confirmColor:'red',
      success(res){
        if(res.confirm){
          wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/info/info',
          })
        }else if(res.cancel){}
      }
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
    this.setData({
      'name': app.globalData.NAME,
      'sex': app.globalData.SEX,
      'stuNum': app.globalData.STUNUM,
    })
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