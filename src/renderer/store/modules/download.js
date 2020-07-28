import downloadFile from '@/utils/StreamDownload'
import {
  mapActions
} from 'vuex'

export default {
  state: {
    download: [],
    downloading: false
  },
  mutations: {
    SET_DOWNLOADONE: (state, dispatch) => {
      state.download.shift()
      if (state.download.length !== 0) {
        this.$store.dispatch('toDownload', state.download[0])
      } else {
        state.downloading = false
        console.log('全部下载完成')
      }
    },
    SET_DOWNLOADADD: (state, songs) => {
      console.log(songs, '2')
      let newsong = state.download.concat(songs)
      console.log(newsong, '3')
      state.download = newsong
      console.log(state.download, '4')
      if (!state.downloading && state.download.length !== 0) {
        state.downloading = true
        // this.$store.dispatch('toDownload', state.download[0])
      } else {
        console.log('未开始下载')
      }
    }

  },
  actions: {
    addDownload({
      commit,
      state,
      dispatch
    }, songs) {
      // console.log(songs, '2')
      let newsong = state.download.concat(songs)
      // console.log(newsong, '3')
      state.download = newsong
      // console.log(state.download, '4')
      if (!state.downloading && state.download.length !== 0) {
        state.downloading = true
        dispatch('toDownload', state.download[0])
      } else {
        console.log('未开始下载')
      }
      // commit('SET_DOWNLOADADD', songs)
      // let res = await api.checkLogin()
      // let {
      //   code,
      //   data,
      //   msg
      // } = res
      // if (code === 200) {
      //   commit('SET_LOGIN', data.account)
      //   dispatch('getMySheet')
      // } else {
      //   commit('SET_NULL')
      // }
    },
    toDownload({
      commit,
      state,
      dispatch
    }, song) {
      var downloadsFolder = 'C:\\Users\\clarsw\\projectmusic'
      let artists = ''
      for (let i = 0; i < song.ar.length; i++) {
        artists = artists + ' ' + song.ar[i].name
      }
      var finalPath = downloadsFolder + '\\' + artists + '-' + song.name + '.mp3'
      downloadFile({
        remoteFile: song.song_url,
        localFile: finalPath,
        onProgress: function (received, total) {
          var percentage = (received * 100) / total
          // console.log(percentage + '% | ' + received + ' bytes out of ' + total + ' bytes.')
        }
      }).then(function () {
        // alert('File succesfully downloaded')
        // commit('SET_DOWNLOADONE')
        state.download.shift()
        if (state.download.length !== 0) {
          dispatch('toDownload', state.download[0])
        } else {
          state.downloading = false
          console.log('全部下载完成')
        }
      })
    }
  }
}