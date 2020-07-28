<template>
  <div class="container">
    <el-row style="margin:10px 0;" v-if="albumList.length!=0">
      <el-col
        v-for="(item,index) in albumList"
        :key="index"
        style="padding:0 20px;width:20%;margin: 10px 0;"
      >
        <album-item :item="item" />
      </el-col>
    </el-row>
    <template v-else>
      <div class="not__found" v-if="!isLoading">您尚未收藏专辑，快去收藏吧！</div>
    </template>
  </div>
</template>

<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      albumList: [],
      isLoading: true
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.isLoading = true
      let res = await api.getCollectAlbum({ cid: this.$store.state.user.profile.cid })
      let { data, code } = res
      this.albumList = data.albums
      this.isLoading = false
    }
  }
}
</script>
<style scoped lang="scss">
</style>