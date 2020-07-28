<template>
  <div class="container" v-loading="loading">
    <template v-if="albums&&!loading">
      <div class="album-box" v-for="(item,index) in albums" :key="index">
        <div class="album-box__left">
          <div class="album__cover">
            <img :src="item.cover_url ? item.cover_url: require('../../../assets/sheetcover.jpg')" />
          </div>
          <div class="album__date">{{item.create_time |formatDate}}</div>
        </div>
        <div class="album-box__right">
          <div class="right__top">
            <div class="album__name">{{item.name}}</div>
            <div class="album__play">
              <a-icon type="play-circle" />
            </div>
          </div>
          <div class="tracks">
            <div class="list">
              <el-table size="small" :data="item.tracks" :show-header="false" stripe>
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
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="歌曲" min-width="560" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <a-dropdown :trigger="['contextmenu']" overlayClassName="sider-right-menu">
                      <div
                        class="song__name"
                        :class="scope.row.is_block ? 'blocked':''"
                      >{{scope.row.name}}</div>
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
                              <icon type="download" />
                              <span>下载</span>
                            </div>
                          </a-menu-item>
                          <a-sub-menu key="1">
                            <template slot="title">
                              <a-icon type="folder-add" />
                              <span>收藏到歌单</span>
                            </template>
                            <a-menu-item v-for="playlist in createdList" :key="playlist.sheet_id">
                              <div @click="collectToPlaylist(playlist.sheet_id, scope.row.song_id)">
                                <span>{{ playlist.name }}</span>
                              </div>
                            </a-menu-item>
                          </a-sub-menu>
                        </a-menu>
                      </template>
                    </a-dropdown>
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
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      albums: [],
      loading: false
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
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      let res = await api.getSingerAlbum({ sid: this.$route.params.id })
      this.albums = res.data.albums
      this.loading = false
    },
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
    }
  }

}
</script>

<style scoped lang="scss">
.container {
  padding: 0 30px;

  /deep/ .tracks {
    background: #fafafa;
    // padding: 0 30px;
    .list {
      border: 1px solid #eeeeee;
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
.album-box {
  & {
    display: flex;
    justify-content: space-between;
  }
  &:not(:first-child) {
    margin: 60px 0 20px;
  }
  &:first-child {
    margin-top: 10px;
  }
  &__left {
    // background: green;
    margin-right: 60px;
    img {
      width: 150px;
      height: 150px;
    }
    .album__date {
      font-size: 13px;
      line-height: 30px;
    }
  }
  &__right {
    // background: red;
    flex: 1;
  }
  .right__top {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 10px 10px 10px 0;
  }
}
.liked {
  color: #d15858 !important;
}
.blocked {
  color: rgb(153, 153, 153) !important;
}
</style>