// pages/star/star/star-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var url = 'http://api.juheapi.com/japi/tohdet?key=73151ff3e473ee74493421666bf22d3b&v=1.0&id='+ options.id
    console.log(url)
    wx.request({
      url: url,
      success: res => {
        console.log(res.data.result)
        if (!res.data) {
          console.log('获取接口失败')
          return
        }
        this.setData({
          details: res.data.result[0]
        })
        wx.hideLoading()
      }
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