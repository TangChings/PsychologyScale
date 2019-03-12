// pages/info/info.js
var app = getApp();
import WxValidate from '../../utils/WxValidate.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:'男',
  },

  initValidate() {
    const rules = {
      name:{
        required:true,
        rangelength:[2,4],
      },
      sex:{
        required:false,
      },
      tel:{
        required:true,
        tel:true,
      }
    }
    const messages = {
      name:{
        required:'请输入姓名',
        rangelength:'请输入2~4个汉字',
      },
      sex:{
        required:'请选择性别',
        sex:'请选择性别',
      },
      tel:{
        required:'请输入11位手机号码',
        tel:'请输入正确的手机号码',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit(e){
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)){
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }else{
      console.log(params)
      wx.showToast({
        title: '提交成功',
      })
    }
  },

  showModal(error){
    wx.showModal({
      content: error.msg,
      showCancel:false,
    })
  },

  sexChange (e){
    console.log(e.detail.value)
    if(e.detail.value == true){
      this.setData({
        'sex':'男'
      })
    }else{
      this.setData({
        'sex': '女'
      })
    }
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