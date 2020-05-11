var app = getApp();
Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    lunlist:[],
    xuan: 0
  },
  onLoad: function (event) {
    if(this.lunlist==''){
      wx.showLoading({
        title: '加载中',
      })
    }
      wx.request({
        url: app.globalData.newbase,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/json"
        },
        success: res => {
          //1:在控制台打印一下返回的res.data数据
          this.setData({
            //第一个data为固定用法，第二个data是json中的data
            newList: res.data.result.data,
            lunlist: res.data.result.data.slice(10, 15)
          });
          app.data.newlist = res.data.result.data
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
      })
    wx.hideLoading()
  },
  getnewListData: function (event,url) {
    this.setData({
      //第一个data为固定用法，第二个data是json中的data
      xuan: event.currentTarget.dataset.val
    });
    var fen = event.currentTarget.dataset.val;
    console.log(fen);
    switch (fen){
      case '0': url = "http://v.juhe.cn/toutiao/index?type=top&key=e24ce5e917278f758a3db126465ccdd0"; break;
      case '1': url = "http://v.juhe.cn/toutiao/index?type=yule&key=e24ce5e917278f758a3db126465ccdd0"; break;
      case '2': url = "http://v.juhe.cn/toutiao/index?type=tiyu&key=e24ce5e917278f758a3db126465ccdd0"; break;
      case '3': url = "http://v.juhe.cn/toutiao/index?type=shishang&key=e24ce5e917278f758a3db126465ccdd0"; break;
      case '4': url = "http://v.juhe.cn/toutiao/index?type=keji&key=e24ce5e917278f758a3db126465ccdd0"; break;
      default: url = "http://v.juhe.cn/toutiao/index?type=top&key=e24ce5e917278f758a3db126465ccdd0";
    }
    console.log(url)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        //1:在控制台打印一下返回的res.data数据
        console.log(res);
        this.setData({
          //第一个data为固定用法，第二个data是json中的data
          newList: res.data.result.data,
          lunlist: res.data.result.data.splice(1,5)
        });
        app.data.newlist = res.data.result.data
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
    wx.hideLoading()
  },
  onPostTap: function (event) {
    var newid = event.currentTarget.dataset.newid;
    console.log(newid);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + newid
    })
  },

  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var newid = event.currentTarget.dataset.newid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + newid
    })
  }
})