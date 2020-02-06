// pages/index/index.js
const API = 'http://howlcn.cn:3000'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    musicLists: [],
    album: [],
    rankListOne_head: {},
    rankListOne: [],
    rankListTwo_head: {},
    rankListTwo: [],
    djRadios: [],
    mvData: []
  },
  getBannersData() {
    wx.request({
      url: `${API}/banner`,
      method: 'GET',
      success: (res) => {
        this.setData({
          banners: res.data.banners
        })
      }
    })
  },
  getMusicList() {
    wx.request({
      url: `${API}/personalized?limit=6`,
      method: 'GET',
      success: (res) => {
        // console.log(res.data.result)
        this.setData({
          musicLists: res.data.result
        })
      }
    })
  },
  getNewAlbum() {
    wx.request({
      url: `${API}/album/newest`,
      method: 'GET',
      success: (res) => {
        // console.log(res.data.albums)
        this.setData({
          albums: res.data.albums
        })
      }
    })
  },
  getRankList(id) {
    wx.request({
      url: `${API}/top/list?idx=${id}`,
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        if (id === 0) {
          this.setData({
            rankListOne: res.data.playlist.tracks,
            rankListOne_head: {
              url: res.data.playlist.coverImgUrl
            }
          })
        } else if (id === 3) {
          this.setData({
            rankListTwo: res.data.playlist.tracks,
            rankListTwo_head: {
              url: res.data.playlist.coverImgUrl
            }
          })
        }

      }
    })
  },
  getDJstation() {
    wx.request({
      url: `${API}/dj/hot?limit=6`,
      method: "GET",
      success: (res) => {
        // console.log(res.data.djRadios)
        this.setData({
          djRadios: res.data.djRadios
        })
      }
    })
  },
  getMvMessage() {
    wx.request({
      url: `${API}/personalized/mv`,
      method: 'GET',
      success: (res) => {
        // console.log(res.data.result)
        this.setData({
          mvData: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBannersData();
    this.getMusicList();
    this.getNewAlbum();
    this.getRankList(0);
    this.getRankList(3);
    this.getDJstation();
    this.getMvMessage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})