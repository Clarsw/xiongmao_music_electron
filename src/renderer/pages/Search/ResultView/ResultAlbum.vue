<template>
  <div class="container" v-loading="loading">
    <template v-if="albums && !loading">
      <div class="album">
        <div class="list">
          <el-table size="small" :data="albums" stripe :show-header="false">
            <el-table-column>
              <template slot-scope="scope">
                <div class="album-row">
                  <div class="left">
                    <img
                      @click="albumClick(scope.row.aid)"
                      :src="scope.row.cover_url? scope.row.cover_url:require('../../../assets/sheetcover.jpg')"
                    />
                    <div
                      class="name click__item"
                      @click="albumClick(scope.row.aid)"
                    >{{scope.row.name}}</div>
                  </div>
                  <div
                    class="singer click__item"
                    @click="singerClick(scope.row.ar.sid)"
                  >{{scope.row.ar.name}}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
      loading: false,
      albums: [],
      key: ''
    }
  },
  mounted () {
    let key = this.$route.query.key
    this.key = key
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      let res = await api.getAllAlbums({ key: this.key })
      let { code, data } = res
      this.albums = data.albums
      this.$emit('childFn', res.total)
      this.show = true
      this.loading = false
    },
    albumClick (aid) {
      this.$router.push({ name: 'album', query: { id: aid } })
    },
    singerClick (sid) {
      this.$router.push({ name: 'Singer', params: { id: sid } })
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