// 定义城市、天气、温度、风级、图片,日期参数
var defaultcity, getweather, gettemp, getwind, getpic, getdate
Page({
  data: {
    fivedate:[],
    defaultcity:''
  },
  // 初始化加载
  onLoad: function (e) {
    this.getLocation()
  },
  // 动态获取input输入值 城市名称
  bindKeyInput: function (e) {
    this.defaultcity = e.detail.value
  },
  // 搜索城市
  search: function (e) {
    this.weather()
  },
  getLocation: function () {
    var that =this
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var lalo = latitude+','+longitude
        var url = 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lalo +'&key=AU7BZ-4B5KP-FPID4-V5LFP-P7BTJ-MVBSQ';
        wx.request({
          url: url,
          success: res => {
            console.log(res.data.result)
            var c = res.data.result.ad_info.city.replace('市', '')
            that.defaultcity=c
            that.weather()
          }
        })
      },
    })
  },
  getcity: function(){
    wx.request({
      url: url,
      success: res => {
        console.log(res.data.result)
        var c = res.data.result.ad_info.city.replace('市', '')
        this.defaultcity = c
      }
    })
  },
  weather: function () {
    wx.showLoading({
      title: '加载中',
    })
    var Cityw = encodeURIComponent(this.defaultcity);
    var url = 'http://apis.juhe.cn/simpleWeather/query?city='+Cityw+ '&key=44daba84f9e73af76bb93411e3ba22e4'
    console.log(url)
    wx.request({
      url: url,
      success: res => {
        console.log(res.data)
        if (!res.data) {
          console.log('获取天气接口失败')
          return
        }
        getweather = res.data.result.future[0].weather
        gettemp = res.data.result.future[0].temperature
        getwind = res.data.result.future[0].direct
        getdate = res.data.result.future[0].date
        this.setData({
          defaultcity: res.data.result.city,
          weather: getweather,
          temp: gettemp,
          temps: res.data.result.realtime.temperature,
          wind: getwind,
          date: getdate,
          kong: res.data.result.realtime.aqi,
          windl: res.data.result.realtime.power,
          fivedate: res.data.result.future.splice(1,5)
        })
        wx.hideLoading()
      }
    })
  }
})