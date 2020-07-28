<template>
  <div class="container">
    <el-row :gutter="15" style="margin-top:7.5px;" v-if="sheetList.length!=0">
      <el-col
        :span="20"
        v-for="(item,index) in sheetList"
        :key="index"
        style="padding:0 20px;width:20%;margin: 10px 0;"
      >
        <sheet-item :item="item" />
      </el-col>
    </el-row>
    <template v-else>
      <div class="not__found" v-if="!isLoading">您尚未收藏歌单，快去收藏吧！</div>
    </template>
  </div>
</template>

<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      sheetList: [],
      isLoading: true
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.isLoading = true
      let res = await api.getCollectSheet({ cid: this.$route.params.cid || this.$store.state.user.profile.cid })
      let { code, data } = res
      this.sheetList = data.sheets
      this.isLoading = false
    }
  }
}
</script>