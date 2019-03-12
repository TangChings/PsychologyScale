// pages/depression/depression.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '没有或很少时间', value: '1' },
      { name: '小部分时间', value: '2' },
      { name: '相当多时间', value: '3' },
      { name: '绝大部分或全部时间', value: '4' },
    ],
    check: [],
    checked: false,
    result: [],
    ifShow: [false],
    dataReturn: [],
    question: [],
    nowQuestion: [],
    index: null,
    d1: null,
    d2: null,
    duration: null,
    time: [],
    width: null,
  },

  radioChange(e) {
    this.data.d2 = new Date()
    this.data.duration = this.data.d2 - this.data.d1
    this.data.time = this.data.time.concat(this.data.duration)
    this.data.d1 = new Date()
    console.log(this.data.time)
    if (this.data.index + 1 < this.data.question.length) {
      this.data.result = this.data.result.concat(e.detail.value)
      this.setData({
        'nowQuestion': this.data.question[this.data.index + 1],
        'index': this.data.index + 1,
        'checked': false,
      })
    } else {
      this.data.result = this.data.result.concat(e.detail.value)
      wx.request({
        url: 'https://tang.newif.cn/psychology',
        data: { 'type': "depression", 'result': this.data.result },
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success(res) {
          app.globalData.depressionScore = res.data
          app.globalData.anxietyScore = null
          wx.reLaunch({
            url: '../assess/assess',
          })
        }
      })
    }
    var that = this
    this.progress()
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    console.log(this.data.result)
  },

  progress() {
    var a = Math.ceil((this.data.index / this.data.question.length) * 100)
    this.setData({
      'width': a
    })
    console.log(this.data.index + 1, this.data.question.length)
    console.log(a)
  },

  start() {
    for (var i in this.data.dataReturn) {
      this.data.question[i] = this.data.dataReturn[i].fields
    }
    this.setData({
      'ifShow': true,
      'question': this.data.question,
      'nowQuestion': this.data.question[this.data.index],
    })
    this.data.d1 = new Date()
    console.log(this.data.question[this.data.index])
    this.progress()
  },

  /**
  formSubmit(e) {
    this.data.result = e.detail.value
    this.data.check = e.detail.value
    var obj = []
    for (var i in this.data.result) {
      if (this.data.result[i] != "") {
        obj = obj.concat(this.data.result[i])
      }
    }
    for (var a in this.data.check) {
      if (this.data.check[a] == "") {
        this.data.check[a] = false
        this.setData({ 'check': this.data.check })
      } else {
        this.data.check[a] = true
        this.setData({ 'check': this.data.check })
      }
    }
    console.log(this.data.check)
    if (obj.length < 20) {
      wx.showToast({
        title: '请填写所有题目',
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log('success')
      var that = this
      wx.request({
        url: 'https://tang.newif.cn/psychology',
        data: { 'type': "depression", 'result': obj },
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success(res) {
          app.globalData.depressionScore = res.data
          app.globalData.anxietyScore = null
          console.log(res.data)
          wx.reLaunch({
            url: '../assess/assess',
          })
        }
      })
    }
  }, */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '知情同意',
      content: '1234325345634255432342354',
      confirmText:'同意',
      cancelText:'拒绝',
      success(res) {
        if (res.confirm) {} 
        else if (res.cancel) {
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
    var that = this
    wx.showLoading({
      title: '获取题目中',
    })
    wx.request({
      url: 'https://tang.newif.cn/psychology',
      data: { 'type': "depressionScale" },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success(res) {
        that.data.dataReturn = res.data
        wx.hideLoading()
      }
    })
    this.setData({
      'ifShow': false,
      'index': 0,
      'newQuestion': [],
    })
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