// 定义城市、天气、温度、风级、图片,日期参数
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
Page({
  data: {
    eventdata: []
  },
  // 初始化加载
  onLoad: function (e) {
    // 默认城市名称
    this.geteventdata()
  },
  geteventdata: function () {
    wx.showLoading({
      title: '加载中',
    })
    var month = (date.getMonth() + 1 < 10 ?  (date.getMonth() + 1) : date.getMonth() + 1);
    var day = date.getDate() < 10 ?  date.getDate() : date.getDate(); 
    console.log(month+day);
    var url = 'http://api.juheapi.com/japi/toh?key=73151ff3e473ee74493421666bf22d3b&v=1.0&month='+month+'&day='+day
    console.log(url)
    wx.request({
      url: url,
      success: res => {
        console.log(res.data.result)
        if (!res.data) {
          console.log('获取接口失败')
          return
        }
        var dataone = []
        res.data.result.map(function (item,index){
          if(item.pic!=""){
            dataone.push(item)
          }
          console.log(1)
        })
        console.log(dataone)
        this.setData({
          eventdata: dataone
        })
        wx.hideLoading()
      }
    })
  },
  onstarTap: function (event) {
    var eventid = event.currentTarget.dataset.eventid;
    console.log(eventid);
    wx.navigateTo({
      url: "star/star-detail?id=" + eventid
    })
  },
})