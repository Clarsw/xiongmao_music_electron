<template>
  <div class="container" v-loading="loading">
    <template v-if="singers && !loading">
      <div class="singer">
        <div class="list">
          <el-table size="small" :data="singers" stripe :show-header="false">
            <el-table-column>
              <template slot-scope="scope">
                <div class="singer-row">
                  <div class="left">
                    <img
                      :src="scope.row.avatar_url ? scope.row.avatar_url:require('../../../assets/user.jpg') "
                      @click="singerClick(scope.row.sid)"
                    />
                  </div>
                  <div class="name click__item" @click="singerClick(scope.row.sid)">
                    {{scope.row.name}}
                    <i class="el-icon-female female" v-if="scope.row.sex==0"></i>
                    <i class="el-icon-male male" v-if="scope.row.sex==1"></i>
                  </div>
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
      singers: [],
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
      let res = await api.getAllSingers({ key: this.key })
      let { code, data } = res
      this.singers = data.singers
      this.$emit('childFn', res.total)
      this.show = true
      this.loading = false
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
.singer-row {
  display: flex;
  align-items: center;
  .left {
    margin: 0 10px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 60px;
      cursor: pointer;
    }
  }
  .name {
    cursor: pointer;
    .female {
      color: rgb(226, 142, 208);
    }
    .male {
      color: rgb(20, 170, 220);
    }
  }
}
</style>