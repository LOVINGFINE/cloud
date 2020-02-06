// pages/musicList/musicList.js
const API = 'http://an-fine.cn:3001';


const animateUp = wx.createAnimation({
  duration: 1000,
  timingFunction: '"linear"',
  delay: 0,
  transformOrigin: "0 100%",
})
animateUp.height(0).step()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxAnimation:{},
    show: true,
    nowIdx: 0, //当前swiper索引
    imgList: []
  },
  // 分类框显示
  boxShow:function(){
    // if (this.data.show) {
    //   this.setData({
    //     show: false
    //   })
    // } else {
    //   this.setData({
    //     show: true
    //   })
    // }
    
    
    if(this.data.show){
      const animate = wx.createAnimation({
        duration: 1000,
        timingFunction: '"linear"',
        delay: 0,
        transformOrigin: "0 100%",
      })
      animate.height(398).step()
      this.setData({
        boxAnimation: animate.export(),
        show: false
      })
    }else{
      const animate = wx.createAnimation({
        duration: 1000,
        timingFunction: '"linear"',
        delay: 0,
        transformOrigin: "0 100%",
      })
      animate.height(0).step()
      this.setData({
        boxAnimation: animate.export(),
        show: true
      })
    }
  },
  getRecommendList() {
    wx.request({
      url: `${API}/personalized?limit=42`,
      method: 'get',
      success: (res) => {
        console.log(res.data)
        this.setData({
          imgList: res.data.result
        })
      }
    })
  },
  // swiper滑动事件
  swiperChange: function(e) {
    this.setData({
      nowIdx: e.detail.current
    })
  },
  getMusicLIstAll() {
    wx.request({
      url: `${API}/playlist/catlist`,
      method: 'GET',
      success: (res) => {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getRecommendList();
    this.getMusicLIstAll();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

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