//引用数据路径
var postsData = require('../../../data/posts-data.js');

Page({
    data: {

    },
    onLoad: function (option) {
        var postId = option.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData,
        })

        var postsCollected = wx.getStorageSync("postsCollected");

        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected,
            })
        } else {
            var postsCollected = {}
            postsCollected[postId] = false;
            wx.setStorageSync('postsCollected', postsCollected);
        }
    },

    onColletionTap: function (event) {
        this.getPostsCollectedSyc();
        //this.getPostsCollectedAsy();
    },
    //异步获取缓存方法
    getPostsCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: 'postsCollected',
            success: function (res) {
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                //收藏变成未收藏，未收藏变成收藏
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                that.showToast(postsCollected, postCollected);
            },
        })
    },
    //同步获取缓存方法
    getPostsCollectedSyc: function () {
        var postsCollected = wx.getStorageSync('postsCollected');
        var postCollected = postsCollected[this.data.currentPostId];
        //收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        this.showToast(postsCollected, postCollected);
    },
    // showModal: function (postsCollected, postCollected) {
    //     var that = this;
    //     wx.showModal({
    //         title: "收藏",
    //         content: postCollected ? "收藏该文章?" : "取消收藏该文章？",
    //         showCancel: "true",
    //         cancelText: "取消",
    //         cancelColor: "#333",
    //         confirmText: "确认",
    //         confirmColor: "#405f80",
    //         success: function (res) {
    //             if (res.confirm) {
    //                 //更新文章是否的缓存值
    //                 wx.setStorageSync('postsCollected', postsCollected);
    //                 //更新数据帮定的变量，从而实现切换图片
    //                 that.setData({
    //                     collected: postCollected
    //                 })
    //             }
    //         }
    //     })
    // },
    showToast: function (postsCollected, postCollected) {
        var that = this;
        //更新文章是否的缓存值
        wx.setStorageSync('postsCollected', postsCollected);
        //更新数据帮定的变量，从而实现切换图片
        that.setData({
            collected: postCollected
        });
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            icon: "success",
            duration: 1000,
        })

    },
    onShareTap: function (event) {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到到QQ",
            "分享到微博"
        ]
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                //res.cancel 用户是不是点击了取消按钮按钮
                //res.tapIndex 数组元素的序号，从0开始，从上到下
                wx.showModal({
                    title: "用户分享到了" + itemList[res.tapIndex],
                    content: "用户是否取消" + res.cancel + "现在无法实现分享功能"
                })
            }
        })
    }
})