// pages/test/test.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order_num: '',
		order: ''
	},
	get_input_value(e) {
		// console.log(e.detail.value)
		this.data.order_num = e.detail.value;
		this.setData({
			order_num: e.detail.value
		})
	},
	submit_data() {
		console.log(this.data.order_num);
		this.setData({
			order: this.data.order_num
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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