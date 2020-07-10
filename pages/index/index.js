//获取应用实例
const app = getApp();
var utils = require('../../utils/util.js');
Page({
  data: {
    // aphorisms: {},
    // prev_show: true,
    // next_show: true,
    // prev_text: '上一篇',
    // next_text: '下一篇',
    arr_aphorisms: [],
    is_auth: false
  },

   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.data.arr_aphorisms = [];
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            is_auth: true
          })
        } else {
          that.setData({
            is_auth: false
          })
        }
      }
    });
    this.getData();
  },

  getUserInfo(e) {
    // console.log(e);
    if (e.detail.userInfo) {
      app.login(e.detail.userInfo, (res) => {
        // console.log(res);
        utils.modal('授权成功，前往留下我的足迹', () => {
          this.setData({
            is_auth: true
          });
          wx.navigateTo({
            url: '/pages/release/release'
          });
        });
      })
    } else {
      utils.toast('授权失败！需授权后才留下我的足迹');
      this.setData({
        is_auth: false
      })
    }
  },
  getData(callback) {
    wx.showLoading({
      title: '加载中'
    });
    app.bmob_data().find().then(res => {
      // console.log(res);
      res.filter((item) => {
        if (item.is_show === 2) {
          item.date = new Date(item.createdAt).getTime();
          this.data.arr_aphorisms.push(item);
        }
        this.data.arr_aphorisms.sort(function(a, b) {
          return a.date - b.date;
        });
      });
      this.setData({
        arr_aphorisms: this.data.arr_aphorisms
      });
      console.log(this.data.arr_aphorisms);
      if (callback) {
        callback();
      }
      wx.hideLoading();
    });
  },
  // prev_click() {
  //   if (this.data.prev_show) {
  //     console.log('上一篇')
  //     console.log(this.data.arr_aphorisms);
  //   } else {
  //     console.log('不可点击了')
  //   }
  // },
  // next_click() {
  //   if (this.data.next_show) {
  //     console.log('下一篇')
  //   } else {
  //     console.log('不可点击了')
  //   }
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.arr_aphorisms = [];
    this.getData(() => {
      wx.stopPullDownRefresh()
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {}
});