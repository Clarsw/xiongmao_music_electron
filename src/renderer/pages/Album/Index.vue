<template>
  <el-scrollbar class="album-detail scroll-page" v-loading="loading">
    <template v-if="album && show">
      <div class="top">
        <div class="cover">
          <img :src="album.cover_url ? album.cover_url:require('../../assets/sheetcover.jpg')" />
        </div>
        <div class="info">
          <div class="title">{{album.name}}</div>
          <div class="actions">
            <el-button
              @click="playAll"
              size="mini"
              type="primary"
              icon="iconfont icon-bofangsanjiaoxing"
              :disabled="album.is_block"
            >播放全部</el-button>
            <el-button
              size="mini"
              @click="collectAlbum(album.aid)"
              :disabled="album.is_block&&!album.is_collect"
            >
              <icon type="like" />
              <span v-if="album.is_collect">已收藏</span>
              <span v-if="!album.is_collect">收藏全部</span>
              <span>({{album.collect_total}})</span>
            </el-button>
            <el-button
              size="mini"
              @click.native="downloadAll(album.tracks)"
              :disabled="album.is_block"
            >
              <icon type="download" />下载全部
            </el-button>
          </div>

          <div class="author">
            <!-- <img :src="album.creator.avatar_url" /> -->
            歌手：
            <span>{{album.creator.name}}</span>
          </div>
          <div class="time">
            时间：
            <span class="time__create">{{album.create_time |formatDate}}</span>
          </div>
          <!-- <div class="tags">
            标签：
            <span class="tags__detail">情感/孤独/欧美</span>
          </div>
          <div class="desc line-1">简介：{{album.desc}}</div>-->
        </div>
      </div>
      <template v-if="!album.is_block">
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌曲列表" name="list"></el-tab-pane>
          <el-tab-pane label="专辑详情" name="desc"></el-tab-pane>
        </el-tabs>
        <template v-if="activeName=='list'">
          <div class="tracks">
            <!-- <div class style="background:red;">{{album.tracks}}</div> -->
            <div class="list">
              <el-table size="small" :data="album.tracks" stripe>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column width="70" label="操作">
                  <template slot-scope="scope">
                    <div class="name-row">
                      <div class="left">
                        <icon
                          type="like"
                          @click.native="likeMusic(scope.row)"
                          :class="[scope.row.is_favar ? 'liked':'',scope.row.is_block ? 'blocked':'']"
                        ></icon>
                        <!-- <icon type="download" @click.native="download(scope.row)" /> -->
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="歌曲" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <a-dropdown :trigger="['contextmenu']" overlayClassName="sider-right-menu">
                      <!-- <div class="name-row">
                  <div class="left">
                    <icon type="like" @click="likeMusic(scope.row)"></icon>
                      <icon type="download" />-->
                      <div
                        class="song__name"
                        :class="scope.row.is_block ? 'blocked':''"
                      >{{scope.row.name}}</div>
                      <!-- <img class="tag" src="../../assets/images/sq.png" /> -->
                      <!-- <img v-if="scope.row.mv>0" class="tag" src="../../assets/images/mv.png" /> -->
                      <!-- </div> -->
                      <!-- <div class="btns">
                    <i class="iconfont icon-zanting play" @click="play(scope.row)"></i>
                    <i class="iconfont icon-gengduo more"></i>
                      </div>-->
                      <!-- </div> -->
                      <template v-if="!scope.row.is_block">
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
                      </template>
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
                <el-table-column width="200" label="专辑" prop="al.name" show-overflow-tooltip>
                  <template>
                    <span style="width: 190px;" class="line-1 hover song__album">{{album.name}}</span>
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
        <template v-if="activeName=='desc'">
          <div class="desc line-1">{{album.desc}}</div>
        </template>
      </template>
      <template v-else>
        <div class="block">该专辑已被屏蔽</div>
      </template>
    </template>
  </el-scrollbar>
</template>

<script>
// import { getPlaylistDetail, like } from '../../api'
import api from '@/utils/api'

export default {
  data () {
    return {
      id: '',
      loading: true,
      show: true,
      album: false,
      activeName: 'list'
    }
  },
  computed: {
    createdList () {
      return this.$store.state.user.sheets
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
    user () {
      return this.$store.state.user
    }
  },
  mounted () {

  },
  activated () {
    let id = this.$route.query.id
    // if (id !== this.id) {
    this.id = id
    this.getData()
    // } else {
    // this.show = true
    // }
    console.log('in activated')
  },
  deactivated () {
    // this.show = false
  },
  methods: {
    async likeMusic (song) {
      // console.log('in like', song)
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
          this.getData()
        }
      }
    },
    singerClick (sid) {
      this.$router.push({ name: 'Singer', params: { id: sid } })
    },
    async collectAlbum (id) {
      let res = await api.collectAlbum({ aid: id })
      // let { data, msg, code } = res
      this.getData()
    },
    download (song) {
      let songs = []
      songs.push(song)
      this.$store.dispatch('addDownload', songs)
    },
    downloadAll (songs) {
      this.$store.dispatch('addDownload', songs)
    },
    async collectToPlaylist (sheet, index) {
      console.log(sheet, index)
      let res = await api.collectSong({ sheet_id: sheet, song_id: index })
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
      }
    },
    async getData () {
      this.loading = true
      let result = await api.getAlbumDetail({ aid: this.id })
      console.log(result, 'album')
      this.album = result.data.album
      this.show = true
      this.loading = false
    },
    play (item) {
      // console.log(item.id)
      this.$store.dispatch('playMusic', item.id)
      this.$store.commit('SET_PLAYER_LIST', this.album.tracks)
    },
    playAll () {
      this.$store.dispatch('playAlbum', this.id)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.click__item {
  cursor: pointer;
  &:hover {
    color: #44aaf8;
  }
}
.album-detail {
  background: #f0f0f0;
  flex: 1;
  /deep/ .el-tabs__nav-scroll {
    margin: 0 30px;
  }
  .desc {
    font-size: 13px;
    color: #555;
    line-height: 20px;
    padding: 0 30px;
  }
  .top {
    margin: 25px 30px;
    display: flex;
    position: relative;
    .cover {
      width: 200px;
      height: 200px;
      position: relative;
      flex-shrink: 0;
      img {
        width: 200px;
        height: 200px;
      }
    }
    .info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 22px;
        color: #000;
        font-weight: bold;
      }
      .author {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #555;
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }

      /deep/ .actions {
        button {
          min-width: 90px;
          i {
            font-size: 13px;
            margin-right: 3px;
          }
        }
      }
    }
  }
  .count-box {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    text-align: right;
    color: $colorText2;
    font-size: $fontSizeSmall;
    .count__songs {
      padding-right: 10px;
      border-right: $break;
    }
    .count__plays {
      padding-left: 10px;
    }
  }
  /deep/ .tracks {
    background: #fafafa;
    // padding: 0 30px;
    .list {
      .el-table {
        // background: none;
        // th {
        //   background: none;
        // }
        // tr {
        //   background: none;
        // }
        // tr:hover {
        //   .btns {
        //     .iconfont {
        //       display: block;
        //     }
        //     .iconfont:hover {
        //       color: #31c27c;
        //     }
        //   }
        // }
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
.blocked {
  color: rgb(153, 153, 153) !important;
}
.liked {
  color: #d15858 !important;
}
.block {
  margin-left: 30px;
}
</style>
