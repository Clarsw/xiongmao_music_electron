<template>
  <div class="container">
    <el-tabs v-model="activeName" style="text-align:center;">
      <!-- <el-tab-pane label="新歌速递" name="newsong"></el-tab-pane>
      <el-tab-pane label="新碟上架" name="newalbum"></el-tab-pane>-->
      <el-radio-group v-model="activeName">
        <el-radio-button label="hotest">热歌榜</el-radio-button>
        <el-radio-button label="speedest">新歌榜</el-radio-button>
      </el-radio-group>
    </el-tabs>
    <el-scrollbar class="panda-online-box">
      <div class="panda-online-box__inner">
        <Hotest v-if="activeName==='hotest'" />
        <Speedest v-if="activeName==='speedest'" />
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import Hotest from './RankView/Hotest'
import Speedest from './RankView/Speedest'
export default {
  components: {
    Hotest,
    Speedest
  },
  data () {
    return {
      activeName: 'hotest'
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