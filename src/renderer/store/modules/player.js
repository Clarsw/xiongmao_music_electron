import api from '@/utils/api'
import filters from '../../filters'
import {
  ipcRenderer
} from 'electron'
export default {
  state: {
    list: [],
    song: {},
    music_url: [],
    is_play: false,
    play_type: 0, // 播放次序 0单曲循环 1列表循环 2随机播放 3顺序播放
    currentTime: 0,
    lyric: {
      time: '[00:00.00]',
      text: '暂无歌词'
    },
    current_lyric: '暂无歌词'
  },
  mutations: {
    SET_PLAYER_LIST: (state, data) => {
      state.list = data
    },
    SET_PLAYER_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    },
    SET_SONG_FAVAR: (state, like) => {
      state.song.is_favar = like
    }
  },
  actions: {
    // setLike({
    //   commit,
    //   state
    // }, like) {
    //   commit('SET_SONG_FAVAR', like)
    // },
    playMusic({
      commit,
      state
    }, id) {
      api.getSongDetail({
        song_id: id
      }).then(res => {
        commit('SET_PLAYER_DATA', {
          song: res.data.song,
          music_url: res.data.song.song_url
        })
        // commit('SET_PLAYER_DATA', {
        //   is_play: false,
        //   currentTime: 0
        // })

        commit('SET_PLAYER_DATA', {
          is_play: true,
          currentTime: 0
        })
        api.getLyric({
          song_id: id
        }).then(res => {
          commit('SET_PLAYER_DATA', {
            lyric: res.data.lrc
          })
        })
      })
    },
    playPlaylist({
      commit,
      state,
      dispatch
    }, list) {
      // api.getPlaylistDetail(id).then(res => {
      //   console.log(res, 'playlist')
      //   commit('SET_PLAYER_LIST', res.data.playlist)
      //   dispatch('playMusic', res.data.playlist[0].id)
      // })
      commit('SET_PLAYER_LIST', list)
      dispatch('playMusic', list[0].song_id)
    },
    playAlbum({
      commit,
      state,
      dispatch
    }, id) {
      api.getPlayAlbumList({
        aid: id
      }).then(res => {
        if (res.code === 200) {
          commit('SET_PLAYER_LIST', res.data.albumlist)
          dispatch('playMusic', res.data.albumlist[0].song_id)
        }
      })
    },
    playSheet({
      commit,
      state,
      dispatch
    }, id) {
      api.getPlaySheetList({
        sheet_id: id
      }).then(res => {
        commit('SET_PLAYER_LIST', res.data.sheetlist)
        dispatch('playMusic', res.data.sheetlist[0].song_id)
      })
    },
    updateCurrentLyric({
      commit,
      state,
      dispatch
    }) {
      let text = filters.formatLyric(state.currentTime, state.lyric)
      // console.log('123123')
      commit('SET_PLAYER_DATA', {
        current_lyric: text
      })
      // console.log(text)
      ipcRenderer.send('updatestate', text)
    }
  }
}