<template>
  <div class="player">
    <div class="control">
      <el-button type="text" @click="playBefore" :disabled="!before_song">
        <!-- <icon class="iconfont icon-kuaitui"></icon> -->
        <icon type="pre" />
      </el-button>
      <el-button class="play-btn" type="text" @click="playClick">
        <!-- <i class="iconfont icon-zanting" v-if="!is_play"></i>
        <i class="iconfont icon-bofang" v-else></i>-->
        <icon type="pause" v-if="is_play" />
        <icon type="play" v-else />
      </el-button>
      <el-button type="text" @click="playAfter" :disabled="!after_song">
        <!-- <i class="iconfont icon-kuaijin"></i> -->
        <icon type="next" />
      </el-button>
    </div>

    <div class="cover">
      <img class="cover-image" :src="cover" />
      <!-- <audio v-show="false" ref="audio" v-if="play_url" :src="play_url.url" preload /> -->
      <audio v-show="false" ref="audio" v-if="play_url" :src="play_url" preload />
    </div>

    <!-- <div class="tone">
      <el-dropdown trigger="click" placement="top">
        <span class="tone-dropdown">
          标准
          <i class="el-icon-arrow-up el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width: 220px">
          <el-dropdown-item>
            <div class="flex-c-l">
              <div class="check" style="width: 30px">
                <i class="el-icon-check" style="color: #31c27c;"></i>
              </div>
              <span>标准品质</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="flex-c-l">
              <div class="check" style="width: 30px"></div>
              <span>HQ高品质</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="flex-c-l">
              <div class="check" style="width: 30px"></div>
              <span>SQ无损品质</span>
              <img src="../../assets/images/svip.png" style="margin-left: 5px; width: 22px" />
              <img src="../../assets/images/sui.png" style="margin-left: 5px; width: 22px" />
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="mt-10" trigger="click" placement="top" size="medium">
        <span class="tone-dropdown">
          音效
          <i class="el-icon-arrow-up el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width: 200px">
          <el-dropdown-item>关闭</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>-->
    <div class="info">
      <div class="top">
        <div class="names">
          <div>
            <span class="name">{{name}}</span>
            <span class="ar_name" v-if="ar_name">- {{ar_name}}</span>
          </div>
        </div>
        <div class="time">{{play_time*1000|formatDuring}} / {{song.dt|formatDuring}}</div>
      </div>
      <div class="progress">
        <el-slider
          :show-tooltipss="true"
          v-model="play_time"
          input-size="mini"
          :min="0"
          :max="song.dt/1000"
          @change="playTimeChange"
        ></el-slider>
      </div>
    </div>

    <div class="actions">
      <el-button type="text">
        <!-- unlike -->
        <!-- <icon type="like" /> -->
        <icon type="like" :class="[song.is_favar ? 'liked':'']" @click.native="likeMusic(song)"></icon>
      </el-button>
      <el-button type="text">
        <!-- lyric -->
        <icon type="lyric" @click.native="showLyric" :class="[isLyric ? 'active':'']" />
      </el-button>
      <el-button type="text">
        <!-- play way change -->
        <icon :type="play_type | formatType" @click.native="changePlayType" />
      </el-button>
      <!-- <el-button type="text">
        change sound
        <icon type="sound" />
      </el-button>-->
      <el-popover placement="top-start" width="300" popper-class="ls" trigger="click">
        <playlist />
        <el-button type="text" @click.native="showPlaylist" slot="reference">
          <icon type="music-list" />
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import playlist from '../Playlist'
import api from '@/utils/api'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    playlist
  },
  data () {
    return {
      isLyric: false,
      audio: null,
      play_time: 0,
      max_time: 0,
      interval: null
      // play_type: 1 //  播放次序 0单曲循环 1列表循环 2随机播放 3顺序播放
      // add 3-12
      // currentTime: 0
    }
  },
  mounted () {

  },

  watch: {
    is_play (val) {
      // console.log('in watch')
      // this.checkSong()
      try {
        this.$nextTick(() => {
          this.audio = this.$refs['audio']
          if (val) {
            this.audio.play()
            this.max_time = this.audio.duration
            this.getPlayTime()
            this.audio.addEventListener('ended', () => {
              this.playEnded()
            })
          } else {
            this.audio.pause()
            clearInterval(this.interval)
          }
        })
      } catch (e) {
        console.log('play error')
      }
    },
    currentTime (val) {
      this.play_time = val
      // console.log(val)
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    play_type () {
      return this.$store.state.player.play_type
    },
    play_list () {
      return this.$store.state.player.list
    },
    song () {
      // let song = {
      //   dt: 1341111
      // }
      return this.$store.state.player.song
      // return song
    },
    music_url () {
      return this.$store.state.player.music_url
      // return require('../../assets/demxntia - bloodshot freestyle.mp3')
    },
    cover () {
      // try {
      //   return this.song.cover_url
      // } catch (e) {
      //   return 'http://p1.music.126.net/dPn_6T9d5VUuCDvhJdZ_8A==/109951163399691488.jpg'
      // }
      if (this.song.cover_url) {
        return this.song.cover_url
      } else {
        return require('../../assets/sheetcover.jpg')
      }
    },
    name () {
      try {
        return this.song.name || '熊猫云音乐，畅听无限'
      } catch (e) {
        return '熊猫云音乐，畅听无限'
      }
    },
    ar_name () {
      try {
        let singer = ''
        for (let i = 0; i < this.song.ar; i++) {
          singer = singer + this.song.ar[i] + '/'
        }
        return this.song.ar[0]
      } catch (e) {
        return false
      }
    },
    play_url () {
      return this.music_url || false
    },
    is_play () {
      return this.$store.state.player.is_play
    },
    currentTime () {
      return this.$store.state.player.currentTime
    },
    before_song () { // 判断是否还有上一曲
      let s_index = -1
      this.play_list.map((item, index) => {
        if (this.song.song_id === item.song_id && index > 0) {
          s_index = index - 1
        }
      })
      return s_index >= 0 ? this.play_list[s_index] : false
    },
    after_song () { // 判断是否还有下一曲
      let s_index = -1
      this.play_list.map((item, index) => {
        if (this.song.song_id === item.song_id && index < this.play_list.length - 1) {
          s_index = index + 1
        }
      })
      return s_index >= 0 ? this.play_list[s_index] : false
    }
  },
  methods: {
    // 显示歌词
    showLyric () {
      if (!this.isLyric) {
        this.$electron.ipcRenderer.send('showlyric')
        // let lrc = await this.getLyric()
      } else {
        this.$electron.ipcRenderer.send('closelyric')
      }
      this.isLyric = !this.isLyric
    },
    // async getLyric () {
    //   let result = await api.getLyric()
    // },
    // 播放/暂停按钮点击
    playClick () {
      this.$store.commit('SET_PLAYER_DATA', { is_play: !this.is_play })
    },
    // 获取当前已播放时间
    getPlayTime () {
      this.interval = setInterval(() => {
        this.$store.commit('SET_PLAYER_DATA', { currentTime: this.audio.currentTime })
        this.$store.dispatch('updateCurrentLyric')
      }, 1000)
    },
    // 改变播放时间
    playTimeChange (val) {
      console.log(val)
      this.audio.currentTime = val
      // debugger
      console.log(this.audio.currentTime)
      this.$store.commit('SET_PLAYER_DATA', { currentTime: val })
    },
    // 播放结束事件
    playEnded () { // 播放次序 0单曲循环 1列表循环 2随机播放 3顺序播放
      switch (this.play_type) {
        case 0:
          this.rePlay()
          break
        case 1:
          this.playAfter()
          break
      }
    },
    // 判断是否是最后一首
    checkSong () {
      this.play_list.map((item, index) => {
        if (this.play_list.length === 1) {
          return 3
        } else if (this.song.song_id === item.song_id && index === this.play_list.length - 1) {
          console.log('final song')
          return 1
        } else if (this.song.song_id === item.song_id && index === 0) {
          console.log('first song')
          return 2
        } else {
          console.log('not final song')
          return 0
        }
      })
    },
    // 重新播放
    rePlay () {
      this.$store.commit('SET_PLAYER_DATA', { is_play: false, currentTime: 0 })
      setTimeout(() => {
        this.$store.commit('SET_PLAYER_DATA', { is_play: true })
      }, 1000)
    },
    playBefore () {
      if (this.before_song) {
        this.$store.commit('SET_PLAYER_DATA', { is_play: false })
        this.$store.dispatch('playMusic', this.before_song.song_id)
      }
    },
    playAfter () {
      if (this.after_song) {
        this.$store.commit('SET_PLAYER_DATA', { is_play: false })
        this.$store.dispatch('playMusic', this.after_song.song_id)
      } else {
        // this.$store.commit('SET_PLAYER_DATA', { is_play: false })
        this.$store.commit('SET_PLAYER_DATA', { is_play: false, currentTime: 0 })
      }
    },
    changePlayType () {
      let currentType = this.$store.state.player.play_type
      if (currentType !== 1) {
        currentType++
      } else {
        currentType = 0
      }
      this.$store.commit('SET_PLAYER_DATA', { play_type: currentType })
    },
    // 弹出播放列表
    showPlaylist () {
      this.$bus.$emit('showPlaylist')
    },
    async likeMusic (song) {
      // console.log('in like', song)
      if (song.song_id) {
        if (!this.user.isLogin) {
          this.$message({
            message: '请先登录',
            type: 'error'
          })
        } else {
          let id = song.song_id
          let state = !song.is_favar
          let res = await api.likeMusic({ song_id: id, state: state })
          let { code, msg } = res
          if (code !== 200) {
            this.$message({
              message: msg,
              type: 'error'
            })
          } else {
            this.$message({
              message: msg,
              type: 'success'
            })
            // this.getData()
            this.$store.commit('SET_SONG_FAVAR', state)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 68px;
.player {
  display: flex;
  align-items: center;
  /deep/ .control {
    width: 230px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    button {
      margin: 0 15px;
      color: #66b7ff;
      i {
        font-size: 32px;
        color: #66b7ff;
      }
    }
    button:hover {
      i {
        color: #51abf9;
      }
    }
    .play-btn {
      i {
        font-size: 38px;
      }
    }
  }

  .cover {
    width: $height;
    height: $height;
    display: flex;
    align-items: center;
    justify-content: center;
    .cover-image {
      width: $height - 20px;
      height: $height - 20px;
      border-radius: 2px;
    }
  }
  /deep/ .tone {
    width: 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    .el-dropdown {
      width: 35px;
      border: 1px solid #999;
      font-size: 10px;
      color: #333;
      padding: 1px 5px;
      border-radius: 2px;
      cursor: pointer;
      i {
        font-size: 10px;
      }
    }
    .el-dropdown:hover {
      color: #31c27c;
      border: 1px solid #31c27c;
    }
  }
  .info {
    flex: 1;
    height: $height;
    display: flex;
    flex-direction: column;
    padding: 0px;
    justify-content: center;
    .top {
      font-size: 13px;
      color: #666;
      display: flex;
      justify-content: space-between;
      .names {
        font-size: 13px;
        color: #444;
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    .progress {
      margin-top: 10px;
      /deep/ .el-progress {
        .el-progress-bar__outer {
          border-radius: 0;
        }
        .el-progress-bar__inner {
          border-radius: 0;
        }
      }
      /deep/ .el-slider {
        .el-slider__runway {
          height: 4px;
          margin: 4px 0;
        }
        .el-slider__bar {
          height: 4px;
        }
        .el-slider__button-wrapper {
          width: 6px;
          height: 6px;
          top: -10px;
        }
        .el-slider__button {
          width: 8px;
          height: 8px;
        }
      }
    }
  }
  .actions {
    width: 200px;
    padding: 0 20px;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    button {
      color: #686868;
      flex: 1;
      flex-shrink: 0;
      i {
        color: #686868;
      }
    }
    button:hover {
      color: #51abf9;
      i {
        color: #51abf9;
      }
    }
  }
}
.liked {
  color: #d15858 !important;
}
.active {
  color: #51abf9 !important;
}
</style>
<style>
.el-popper {
  padding: 0 !important;
}
</style>
