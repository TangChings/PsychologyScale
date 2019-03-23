// pages/info/info.js
var app = getApp();
import WxValidate from '../../utils/WxValidate.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    stuNum:'',
    sex: '男',
    phone:'',
    code:'',
    trueCode:null,
    trueTel:null,
  },

  //wx.validate初始化
  initValidate() {
    const rules = {
      name: {
        required: true,
        rangelength: [2, 4],
      },
      stu: {
        required: true,
        minlength: 12,
      },
      sexInput: {
        required: false,
      },
      tel: {
        required: true,
        tel: true,
      },
      mescode: {
        required: true,
        minlength: 6,
      }
    }
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '请输入2~4个汉字',
      },
      stu: {
        required: "请输入学号",
        minlength: '请输入正确的学号',
      },
      sexInput: {
        required: '请选择性别',
        sex: '请选择性别',
      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      mescode: {
        required: '请输入验证码',
        minlength: '请输入正确的验证码',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit(e) {
    //验证码和手机号比对
    var that = this
    if(this.data.code != this.data.trueCode){
      wx.showToast({
        title: '验证码错误',
        icon:'none',
        duration:2000
      })
    }else if(this.data.phone != this.data.trueTel){
      wx.showToast({
        title: '手机号码不一致',
        icon:'none'
      })
    }
    else{
      var subData = e.detail.value
      //加入性别和openid数据
      subData["sex"] = this.data.sex
      subData["openid"] = app.globalData.OPENID
      const params = subData
      if (!that.WxValidate.checkForm(params)) {
        const error = that.WxValidate.errorList[0]
        that.showModal(error)
        return false
      } else {
        console.log(params)
        app.globalData.NAME = params.name
        app.globalData.SEX = params.sex
        app.globalData.STUNUM = params.stu
        app.globalData.TEL = params.tel
        wx.setStorageSync('name', app.globalData.NAME)
        wx.setStorageSync('sex', app.globalData.SEX)
        wx.setStorageSync('stuNum', app.globalData.STUNUM)
        wx.setStorageSync('tel', app.globalData.TEL)
        //数据上传后端
        wx.showLoading({
          title: '发送中',
        })
        wx.request({
          url: 'https://tang.newif.cn/psychology/subinfo',
          data: { 'type': 'subinfo', 'info': params },
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success(res){
            console.log(res.data)
          }
        })
        wx.hideLoading()
        wx.showToast({
          title: '提交成功',
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  sexChange(e) {
    console.log(e.detail.value)
    if (e.detail.value == true) {
      this.setData({
        'sex': '男'
      })
    } else {
      this.setData({
        'sex': '女'
      })
    }
  },

  sendVeriCode(){
    if(this.data.phone){
      wx.showLoading({
        title: '验证码发送中',
      })
      var that = this
      wx.request({
        url: 'https://tang.newif.cn/psychology/vericode',
        data: { 'type': 'get_vericode', 'phone': this.data.phone },
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success(res) {
          that.setData({ 
            'trueCode': res.data.vericode,
            'trueTel':res.data.phoneNum
           })
          console.log(that.data.trueCode)
          wx.hideLoading()
        }
      })
    }else{
      wx.showToast({
        title: '请输入手机号',
        icon:'none',
      })
    }
  },

  inputName(e){
    this.setData({'name':e.detail.value})
  },

  inputStu(e){
    this.setData({'stuNum':e.detail.value})
  },

  getTel(e) {
    this.setData({'phone':e.detail.value})
  },

  inputCode(e){
    this.setData({'code':e.detail.value})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
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