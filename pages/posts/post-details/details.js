var app = getApp();
Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    newurl:''
  },
  onLoad: function (event) {
    this.setData({
      //第一个data为固定用法，第二个data是json中的data
      newurl: app.data.newurl
    });
  },
})