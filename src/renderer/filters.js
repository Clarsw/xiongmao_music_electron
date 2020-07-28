const filters = {
  setCoursePrice: (course) => {
    if (course.pay_type === 2) {
      return '￥' + course.price
    } else {
      return '免费'
    }
  },
  formatMoney: (money, num = 2) => {
    return parseFloat(money).toFixed(num)
  },
  // eslint-disable-next-line space-before-function-paren
  changeCount(x) {
    if (x > 10000) {
      x = x / 10000
      var y = x.toFixed(1) + '万'
      return y
    } else {
      return x
    }
  },
  // eslint-disable-next-line space-before-function-paren
  formatDuring(mss) {
    if (mss) {
      var minutes = parseInt(mss / 1000 / 60)
      var seconds = parseInt((mss % (1000 * 60)) / 1000)

      seconds = seconds > 9 ? seconds : '0' + seconds
      return minutes >= 10 ? minutes : '0' + minutes + ':' + seconds
    } else {
      return '00:00'
    }
  },
  formatDate(time) {
    var now = new Date(parseInt(time))
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var date = now.getDate()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()
    // return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    return year + '-' + month + '-' + date
  },

  // 播放次序 0单曲循环 1列表循环 2随机播放 3顺序播放
  formatType(type) {
    if (type === 0) {
      return 'single-cycle'
    } else if (type === 1) {
      return 'order'
    } else if (type === 2) {
      return 'random'
    } else if (type === 3) {
      return 'cycle'
    }
  },
  // 更新当前歌词
  formatLyric(currentTime, lrc) {
    console.log(currentTime, lrc)
    let flag = 0
    for (let i = 0; i < lrc.length; i++) {
      if (i + 1 < lrc.length) {
        if (currentTime >= lrc[i].time && currentTime < lrc[i + 1].time) {
          flag = i
          break
        } else if (currentTime >= lrc[lrc.length - 1].time) {
          flag = lrc.length - 1
          break
        }
      }
      // else {
      //   if (flag !== 0) {
      //     flag = lrc.length - 1
      //   }
      // }
    }
    console.log(flag)
    return lrc[flag].text
  }

}

export default filters