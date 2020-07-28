<template>
  <div class="container">
    <el-tabs v-model="activeName" style="text-align:center;">
      <!-- <el-tab-pane label="新歌速递" name="newsong"></el-tab-pane>
      <el-tab-pane label="新碟上架" name="newalbum"></el-tab-pane>-->
      <el-radio-group v-model="activeName">
        <el-radio-button label="newsong">新歌速递</el-radio-button>
        <el-radio-button label="newalbum">新碟上架</el-radio-button>
      </el-radio-group>
    </el-tabs>
    <el-scrollbar class="panda-online-box">
      <div class="panda-online-box__inner">
        <new-song v-if="activeName==='newsong'" />
        <new-album v-if="activeName==='newalbum'" />
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import NewAlbum from './NewAlbum'
import NewSong from './NewSong'
export default {
  components: {
    NewAlbum,
    NewSong
  },
  data () {
    return {
      activeName: 'newsong'
    }
  }

}
</script>
<style scoped lang="scss">
/deep/ .el-scrollbar {
  border: $break;
  margin: 20px 0;
}
</style>