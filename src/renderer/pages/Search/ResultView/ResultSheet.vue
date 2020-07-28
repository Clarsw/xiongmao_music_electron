<template>
  <div class="container" v-loading="loading">
    <template v-if="sheets && !loading">
      <div class="sheet">
        <div class="list">
          <el-table size="small" :data="sheets" stripe :show-header="false">
            <el-table-column>
              <template slot-scope="scope">
                <div class="sheet-row">
                  <div class="left">
                    <img
                      :src="scope.row.cover_url ? scope.row.cover_url:require('../../../assets/sheetcover.jpg')"
                      @click="sheetClick(scope.row.sheet_id)"
                    />
                    <div
                      class="name click__item"
                      @click="sheetClick(scope.row.sheet_id)"
                    >{{scope.row.name}}</div>
                  </div>
                  <div
                    class="singer click__item"
                    @click="userClick(scope.row.creator.cid)"
                  >by &nbsp;&nbsp;{{scope.row.creator.name}}</div>
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
      sheets: [],
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
      let res = await api.getSearchSheets({ key: this.key })
      let { code, data } = res
      this.sheets = data.sheets
      this.$emit('childFn', res.total)
      this.show = true
      this.loading = false
    },
    sheetClick (sheetid) {
      this.$router.push({ name: 'sheet', params: { id: sheetid } })
    },
    userClick (id) {
      this.$router.push({ name: 'Home', params: { cid: id } })
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
.sheet-row {
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