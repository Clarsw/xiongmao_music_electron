<template>
  <div class="container">
    <el-row style="margin:10px 0;">
      <el-col
        v-for="(item,index) in albumList"
        :key="index"
        style="padding:0 20px;width:20%;margin: 10px 0;"
      >
        <album-item :item="item" />
      </el-col>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="text-align:center;" v-if="albumList.length!=0">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      page: 1,
      total: 0,
      albumList: []
      // count: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // load () {
    //   this.count += 2
    // }
    async getData () {
      let res = await api.newestAlbum({ page: this.page })
      let { data, code } = res
      this.total = res.total
      this.albumList = data.albums
    },
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    }
  }
}
</script>
<style scoped lang="scss">
</style>