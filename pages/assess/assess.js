// pages/assess/assess.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:[],
    assess:[],
    other:'',
    depressionAssess: "总分10分：你很健康、无抑郁；总分10分—15分，你有轻度情绪不良，要注意调节；总分大于15分者，表明已有抑郁症状，要寻求外界帮助。当大于25分时，说明抑郁已经比较严重了，必须看心理医生。",
    upiAssess: "1.常规题（1~60）总分>=25分。2.第25题选择为肯定。3.附加题（61~64）肯定数量>= 2。符合上述任意一条即被归为第一类，此时您已表现出了抑郁症状，建议您尽早寻找心理医生面谈。1.25> 常规题总分 >= 20分。2.第8、16、26题中有一题为肯定者。3.附加题肯定数量 = 1。符合上述任意一条即被归为第二类，此时您已表现出了不良情绪，但还没有达到抑郁的程度，建议您适当自己的情绪。若您既不属于第一类，又不属于第二类，那么恭喜您，您很健康，无抑郁症状，请继续保持良好心态。",
    SCLAssess: '总分：90个项目单项分数相加之和。您的分数越高，那么您的病情就越严重，若您的总分超过了160分，那么您的心理可能已经出现异常，建议寻找心理医生进行进一步筛查。',
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
    if (app.globalData.depressionScore){
      this.setData({
        'score':app.globalData.depressionScore,
        'assess':this.data.depressionAssess
      })
      this.sendDepreGrade()
    }
    if (app.globalData.upiScore){
      this.setData({
        'score':app.globalData.upiScore.score,
        'assess':this.data.upiAssess,
        'other': app.globalData.upiScore.type
      })
      this.sendUpiGrade()
    } 
    if (app.globalData.SCLScore){
      this.setData({
        'score':app.globalData.SCLScore.sum,
        'assess':this.data.SCLAssess,
      })
      this.sendSCLGrade()
    }
  },

  sendDepreGrade(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://tang.newif.cn/psychology/upload',
      data: { 'type': "depression", 'openid': app.globalData.OPENID, 'score': this.data.score, 'time': app.globalData.time },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success(res) {
        console.log(res.data)
      }
    })
    wx.hideLoading()
  },

  sendUpiGrade(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://tang.newif.cn/psychology/upload',
      data:{ 'type' : "upi", 'openid': app.globalData.OPENID, 'score': this.data.score, 'other': this.data.other, 'time': app.globalData.time },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success(res) {
        console.log(res.data)
      }
    })
    wx.hideLoading()
  },

  sendSCLGrade(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://tang.newif.cn/psychology/upload',
      data: { 'type': "SCL90", 'openid': app.globalData.OPENID, 'sum': this.data.score, 'time': app.globalData.time, 'average': app.globalData.SCLScore.average, 't_score': app.globalData.SCLScore.t_score, 'factor': app.globalData.SCLScore.factor, 'yang': app.globalData.SCLScore.yang, 'yin': app.globalData.SCLScore.yin, 'yang_average': app.globalData.SCLScore.yang_average },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success(res) {
        console.log(res.data)
      }
    })
    wx.hideLoading()
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