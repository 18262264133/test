var postsData = require('../../data/posts-data.js');

Page({
  data: {

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({
      posts_key: postsData.postList
    })
  },
  toTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail',
    })
  }
})