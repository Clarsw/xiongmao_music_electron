<template>
  <div class="new-song tracks">
    <el-button @click="playAll" size="mini" style="margin:10px 0px 10px 16px;">播放全部</el-button>

    <div class="list">
      <el-table size="small" :data="songs" stripe v-loading="listLoading">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column width="60" prop="a_name">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.cover_url ? scope.row.cover_url:require('../../../assets/sheetcover.jpg')"
              lazy
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="歌曲" show-overflow-tooltip>
          <template slot-scope="scope">
            <a-dropdown :trigger="['contextmenu']" overlayClassName="sider-right-menu">
              <div>{{scope.row.name}}</div>
              <a-menu slot="overlay" style="width:200px;">
                <a-menu-item key="0">
                  <div @click="nowPlay(scope.row)">
                    <a-icon type="play-circle" />
                    <span>播放</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="0">
                  <div @click="download(scope.row)">
                    <!-- <a-icon type="play-circle" /> -->
                    <icon type="download" />
                    <span>下载</span>
                  </div>
                </a-menu-item>
                <a-sub-menu key="1" v-if="user.isLogin">
                  <template slot="title">
                    <a-icon type="folder-add" />
                    <span>收藏到歌单</span>
                  </template>
                  <!-- <a-menu-item key="1-1">
                          <div @click="showModal(row)">
                            <a-icon type="plus-circle" />
                            <span>新建歌单</span>
                          </div>
                  </a-menu-item>-->
                  <a-menu-item v-for="playlist in createdList" :key="playlist.sheet_id">
                    <div @click="collectToPlaylist(playlist.sheet_id, scope.row.song_id)">
                      <!-- <z-icon type="yinleliebiaokuai" /> -->
                      <span>{{ playlist.name }}</span>
                    </div>
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </a-dropdown>
          </template>
        </el-table-column>
        <el-table-column width="200" label="歌手" prop="ar" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="width: 140px;" class="line-1 hover song__singer">
              <span v-for="(item,index) in scope.row.ar" :key="index">
                <!-- <span>{{item}}</span> -->
                <span class="click__item" @click="singerClick(item.sid)">{{item.name}}</span>
                <span v-if="index!=scope.row.ar.length-1">/</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="200" label="专辑" prop="a_name" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              style="width: 190px;"
              class="line-1 hover song__album click__item"
              @click="albumClick(scope.row.al.aid)"
            >{{scope.row.al.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="60" label="时长" prop="dt">
          <template slot-scope="scope">
            <span>{{scope.row.dt|formatDuring}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      listLoading: true,
      songs: []
    }
  },
  mounted () {
    this.getNewSong()
  },
  computed: {

    createdList () {
      return this.$store.state.user.sheets
    },
    play_list () {
      return this.$store.state.player.list
    },
    song () {
      return this.$store.state.player.song
    },
    user () {
      return this.$store.state.user
    }

  },
  methods: {
    singerClick (sid) {
      this.$router.push({ name: 'Singer', params: { id: sid } })
    },
    albumClick (aid) {
      this.$router.push({ name: 'album', query: { id: aid } })
    },
    download (song) {
      let songs = []
      songs.push(song)
      this.$store.dispatch('addDownload', songs)
    },
    nowPlay (song) {
      if (this.play_list.length === 0) {
        let newList = []
        newList.push(song)
        this.$store.dispatch('playPlaylist', newList)
      } else {
        let state = false
        this.play_list.map((item, index) => {
          if (song.song_id === item.song_id) {
            state = true
          }
        })
        if (state) {
          this.$store.commit('SET_PLAYER_DATA', { is_play: false })
          this.$store.dispatch('playMusic', song.song_id)
        } else {
          for (let i = 0; i < this.play_list.length; i++) {
            if (this.song.song_id === this.play_list[i].song_id) {
              let newList = this.play_list
              // newList.push(song)
              newList.splice(i + 1, 0, song)
              this.$store.dispatch('playPlaylist', newList)
              // this.$store.commit('SET_PLAYER_DATA', { is_play: false })
              this.$store.dispatch('playMusic', song.song_id)
              break
            }
          }
        }
      }
    },
    async getNewSong () {
      this.listLoading = true
      let res = await api.getHotSong()
      let { data, code } = res
      this.songs = data.songs
      this.listLoading = false
    },
    playAll () {
      this.$store.dispatch('playPlaylist', this.songs)
    }
  }
}
</script>

<style scoped lang="scss">
.click__item {
  cursor: pointer;
  &:hover {
    color: #44aaf8;
  }
}
.tracks {
  background: #fafafa;
  // padding: 0 30px;
  .list {
    .el-table {
    }
    /deep/ .el-table__body {
      width: 100%;
    }
    /deep/ .el-table_1_column_1 {
      text-align: right;
    }
    /deep/ .el-table__row:hover {
      color: #000000;
    }

    .name-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        .panda-icon {
          font-size: 15px;
          margin-right: 5px;
          cursor: pointer;
          color: $colorText2;
        }
        .panda-icon:hover {
          color: #000000;
        }
        .tag {
          height: 20px;
          margin-left: 5px;
          margin-top: -2px;
          cursor: pointer;
        }
      }
      .btns {
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 20px;
          cursor: pointer;
          margin-left: 10px;
          color: #999;
          display: none;
        }
      }
    }
  }
}
.scroll-page {
  overflow: hidden;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.song {
  &__name {
    color: #000000;
  }
  &__singer {
    cursor: pointer;
  }
  &__album {
    cursor: pointer;
  }
}
</style>
