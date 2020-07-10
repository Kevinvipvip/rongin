//获取应用实例
const app = getApp();
const utils = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    no_second_click: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    wx.getUserInfo({
      success(res) {
        console.log(res.userInfo);
        that.setData({
          user: res.userInfo
        })
      }
    });
  },

  // 点击提交按钮处理事件
  getFormData(e) {
    if (this.data.no_second_click) {
      this.data.no_second_click = false;

      let value = e.detail.value;
      let author = value.author;
      let content = value.content;
      if (!content.trim()) {
        utils.toast('内容不能为空')
      } else if (!author.trim()) {
        utils.toast('请填入作者姓名')
      } else if (!this.data.user.nickName) {
        utils.modal('请授权后再提交', () => {
          wx.navigateBack();
        })
      } else {
        console.log(value);
        let query = app.bmob_data();
        query.set("author", author);
        query.set("content", content);
        query.set("uploader", this.data.user.nickName);
        query.set("is_show", 1);
        query.save().then(res => {
          console.log(res);
          if (res.objectId) {
            utils.modal('提交成功', () => {
              wx.navigateBack();
              this.data.no_second_click = true;
            });
          } else {
            utils.toast('提交失败，请重新提交')
            this.data.no_second_click = true;
          }
        }).catch(err => {
          console.log(err)
          this.data.no_second_click = true;
        });
      }
    }
  }
});