// pages/musicList_detail/musicList_detail.js
const API = 'http://howlcn.cn:3000';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:{},
    playlist:[]
  },
  getMusicList:function(id){
   wx.request({
     url: `${API}/playlist/detail?id=${id}`,
     method:'GET',
     success:(res)=>{
      //  console.log(res.data.playlist.tracks)
       let data = res.data.playlist
       this.setData({
         top: { name: data.name, url: data.coverImgUrl, nickname: data.creator.nickname, des: data.description,nickImg:data.creator.avatarUrl},
         playlist: data.tracks
       })
       console.log(this.data.top)
     }
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicList(options.id);
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