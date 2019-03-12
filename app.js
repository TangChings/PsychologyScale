//app.js
App({
  onLaunch: function () {
    const value = wx.getStorageSync('openid')
    if (value) {
      this.globalData.OPENID = value
      console.log(this.globalData.OPENID)
      }else {
      wx.showLoading({
        title: '获取数据中',
      })
      var that = this
      wx.login({
        success(res){
          var code = res.code
          console.log(res.code)
          wx.request({
            url: 'http://localhost:8000/psychology/openid',
            data:{ 'type':'get_openid','code': res.code},
            method:'GET',
            header: { 'content-type': 'application/json' },
            success(res){
              wx.setStorageSync('openid', res.data.openid)
              that.globalData.OPENID = res.data.openid
              console.log(res.data.openid)
              wx.hideLoading()
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    anxietyScore:null,
    depressionScore:null,
    OPENID:'',
  }
})