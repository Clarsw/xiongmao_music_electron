<template>
  <el-container class="my-album">
    <el-scrollbar>
      <div class="my-album-box">
        <div class="top">
          <div class="top-title">我的作品</div>
          <router-link
            to="/album/edit/0"
            tag="div"
            class="top-new edit-btn"
            v-if="!user.profile.singer.is_delete"
          >上传作品</router-link>
        </div>
        <div class="row" v-loading="loading" element-loading-background="rgba(250,250,250,1)">
          <div class="empty" v-if="albums.length==0 && !loading">赶快去发布你的作品吧</div>
          <div class="album" v-else>
            <div class="list">
              <el-table size="small" :data="albums" stripe :show-header="false">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="album-row">
                      <div class="left">
                        <img
                          :src="scope.row.cover_url ? scope.row.cover_url:require('../../../assets/sheetcover.jpg')"
                          @click="albumClick(scope.row.aid)"
                        />
                        <div
                          class="name click__item"
                          @click="albumClick(scope.row.aid)"
                        >{{scope.row.name}}</div>
                      </div>
                      <div class="time">{{scope.row.create_time|formatDate}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <router-link :to="`/album/edit/${scope.row.aid}`" class="row-item">编辑</router-link>
                    <span
                      class="delete"
                      style="margin-left:10px;color:#d15858; cursor:pointer;"
                      @click="deleteConfirm(scope.row.aid)"
                    >删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
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
  activated () {
    this.getData()
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    async getData () {
      this.loading = true
      let res = await api.getSingerAlbum({ sid: this.$store.state.user.profile.sid })
      this.albums = res.data.albums
      this.loading = false
    },
    albumClick (aid) {
      this.$router.push({ name: 'album', query: { id: aid } })
    },
    deleteConfirm (id) {
      this.$confirm('确认删除该专辑吗？', '提示', {}).then(() => {
        this.deleteAlbum(id)
      })
    },
    async deleteAlbum (id) {
      console.log(id)
      let res = await api.albumDelete({ aid: id })
      let { code, msg } = res
      if (code !== 200) {
        this.$message({
          type: 'error',
          message: msg
        })
      } else {
        this.$message({
          type: 'success',
          message: msg
        })
        this.getData()
      }
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
.my-album {
  margin-bottom: -17px;

  /deep/ .el-scrollbar {
    width: 100%;
  }
  &-box {
    margin: 20px 30px;
    // display: flex;
  }
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: $break;
  width: 100%;
  .edit-btn {
    font-size: 12px;
    padding: 4px 8px;
    border: 1px solid #e1e1e2;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
    &:hover {
      background: rgb(245, 245, 247);
    }
  }
}

.row {
  min-height: 600px;
  // background: rgb(250, 250, 250);
}

.album-row {
  display: flex;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    width: 50%;

    img {
      width: 60px;
      height: 60px;
      cursor: pointer;
      margin: 0 10px;
    }
    .name {
      cursor: pointer;
    }
  }
  .singer {
    cursor: pointer;
  }
}
</style>