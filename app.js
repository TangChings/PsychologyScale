//app.js
App({
  onLaunch: function () {
    //从缓存中调取数据
    this.globalData.NAME = wx.getStorageSync('name')
    this.globalData.SEX = wx.getStorageSync('sex')
    this.globalData.STUNUM = wx.getStorageSync('stuNum')
    this.globalData.TEL = wx.getStorageSync('tel')
    console.log('姓名：',this.globalData.NAME)
    console.log('性别：',this.globalData.SEX)
    console.log('学号：',this.globalData.STUNUM)
    console.log('电话：',this.globalData.TEL)
    const value = wx.getStorageSync('openid')
    //检测数据是否存在，若存在则进入主页，不存在则进入认证界面
    if (value && this.globalData.NAME && this.globalData.SEX && this.globalData.STUNUM && this.globalData.TEL) {
      this.globalData.OPENID = value
      console.log('OPENID:',this.globalData.OPENID)
      wx.switchTab({
        url: '/pages/home/home',
      })
      }else{
      this.getopenid()
      wx.reLaunch({
        url: '/pages/info/info',
      })
    }
  },

  getopenid(){
    wx.showLoading({
      title: '获取数据中',
    })
    var that = this
    wx.login({
      success(res) {
        var code = res.code
        console.log(res.code)
        wx.request({
          url: 'https://tang.newif.cn/psychology/openid',
          data: { 'type': 'get_openid', 'code': res.code },
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success(res) {
            wx.setStorageSync('openid', res.data.openid)
            that.globalData.OPENID = res.data.openid
            console.log(res.data.openid)
            wx.hideLoading()
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    depressionScore:null,
    upiScore:null,
    SCLScore:null,
    time:null,
    OPENID:'',
    NAME:'',
    SEX:'',
    STUNUM:'',
    TEL:'',
  }
})