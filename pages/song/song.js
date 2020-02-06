// pages/song/song.js
const API = 'http://howlcn.cn:3000'
const audio = wx.createInnerAudioContext()

Page({
  data: {
    hide: true,
    show: false,
    play: true,
    songUrl: '',
    current: '',
    songTime: '',
    currentText: '',
    len: '',
    songLrc: [],
    songList: [],
    songDetail: {
      imgUrl: '',
      songName: 'LF MUSIC',
      songer: '',
      songId: ''
    }
  },
  playEvent: function() {
    if (this.data.play) {
      this.setData({
        play: false
      });
      audio.pause();
    } else {
      this.setData({
        play: true
      })
      audio.play()
    }
  },


  // 控制界面的显示与隐藏
  boxChange: function() {
    this.setData({
      show: true,
      hide: false
    })
  },
  lyrBoxChange: function() {
    this.setData({
      hide: true,
      show: false
    })
  },
  getSongData(id) {
    wx.request({
      url: `${API}/song/url?id=${id}`,
      method: 'GET',
      success: (res) => {
        // console.log(res)
        this.setData({
          songUrl: res.data.data[0].url
        })
        audio.src = this.data.songUrl
        this.setData({
          play: false
        })
      }
    })
    wx.request({
      url: `${API}/song/detail?ids=${id}`,
      method: 'GET',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          songDetail: {
            imgUrl: res.data.songs[0].al.picUrl,
            songName: res.data.songs[0].name,
            songer: res.data.songs[0].ar[0].name
          }
        })
      }
    })
    wx.request({
      url: `${API}/lyric?id=${id}`,
      method: 'GET',
      success: (res) => {
        let str = res.data.lrc.lyric
        let patt = /\[(.+?)\]/g
        let all = str.split('\n')
        // console.log(all)
        let newtime = []
        all.forEach((ele, i) => {
          var o = {}
          var e = ele.split(patt)
          if (e[2] != undefined && e[2] != '') {
            o.time = parseFloat(e[1].split(':')[0]) * 60 + parseFloat(e[1].split(':')[1])
            o.content = e[2]
            newtime.push(o)
          }
        })
        this.setData({
          songLrc: newtime
        })
      }
    })
  },

  // 生命周期函数 页面加载前
  onLoad: function(options) {
    this.getSongData(options.id)


    // 监听音频播放事件
    audio.onTimeUpdate(() => {
      audio.currentTime
      let s = audio.duration
      let t = audio.currentTime
      let l = audio.currentTime / audio.duration * 500
      this.setData({
        len: l,
        current: t,
        songTime: `${parseInt(s / 60) > 9 ? parseInt(s / 60) : '0' + parseInt(s / 60)}:${parseInt(s % 60) > 9 ? parseInt(s % 60) : '0' + parseInt(s % 60)}`,
        currentText: `${parseInt(t / 60) > 9 ? parseInt(t / 60) : '0' + parseInt(t / 60)}:${parseInt(t % 60) > 9 ? parseInt(t % 60) : '0' + parseInt(t % 60)}`
      })
    })
  },
  onReady: function() {

  },
  onShow: function() {

  }
})
// function move() {
//   setInterval(() => {
//     let all = this.data.songDetail.songName
//     let p = ''
//     let timer = setInterval(() => {
//       let start = this.data.songDetail.songName.substring(0, 1)
//       let end = this.data.songDetail.songName.substring(1)
//       if (p === all) {
//         clearInterval(timer)
//         this.setData({
//           songDetail: {
//             songName: end + start
//           }
//         })
//         p = end + start
//       } else {
//         this.setData({
//           songDetail: {
//             songName: end
//           }
//         })
//         p = end + start
//       }
//     }, 500)
//   }, 5000)
// }