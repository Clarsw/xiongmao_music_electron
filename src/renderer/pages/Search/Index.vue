<template>
  <el-container style="position: relative;" class="panda-search">
    <el-scrollbar class="panda-search-box">
      <el-header height="40px" style="background:#FAFAFA;" class="panda-search-header">
        <div class="tip">
          搜索"
          <span>{{key}}</span>"，共条
          <span>{{total}}</span>结果
        </div>
      </el-header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单曲" name="song"></el-tab-pane>
        <el-tab-pane label="歌单" name="sheet"></el-tab-pane>
        <el-tab-pane label="专辑" name="album"></el-tab-pane>
        <el-tab-pane label="歌手" name="singer"></el-tab-pane>
      </el-tabs>
      <el-main class="main">
        <transition name="el-fade-in-linear">
          <div class="panda-search-box__inner">
            <result-song v-if="activeName==='song'" @childFn="parentFn" />
            <result-singer v-if="activeName==='singer'" @childFn="parentFn" />
            <result-album v-if="activeName==='album'" @childFn="parentFn" />
            <result-sheet v-if="activeName==='sheet'" @childFn="parentFn" />
          </div>
        </transition>
      </el-main>
    </el-scrollbar>
  </el-container>
</template>
<script>
import ResultSinger from './ResultView/ResultSinger'
import ResultSong from './ResultView/ResultSong'
import ResultAlbum from './ResultView/ResultAlbum'
import ResultSheet from './ResultView/ResultSheet'
export default {
  components: {
    ResultSong,
    ResultSinger,
    ResultAlbum,
    ResultSheet
  },
  data () {
    return {
      total: 0,
      activeName: 'song'
    }
  },
  computed: {
    key () {
      return this.$route.query.key
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {

    },
    parentFn (total) {
      this.total = total
    }
  }
}
</script>
<style lang="scss" scoped>
.panda-search {
  /deep/ .el-tabs__nav {
    margin-left: 34%;
  }
  color: black;
  &-box {
    width: 100%;
    margin: 0 auto -17px;
    &__inner {
      width: 100%;
    }
  }

  /deep/ .el-header {
    padding: 0;
    // margin: 0 25px;
  }
  &-header {
    /deep/ .el-tabs {
      height: 40px;
      background: #fafafa;
      border-bottom: $break;
      .el-tabs__header {
        padding: 0;
        margin: 0;
      }
      .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
        padding: 0;
      }
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__item {
        font-size: 14px;
      }
    }
  }
}

.main {
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
}

//-------------------
.tip {
  margin: 30px 30px 16px;
  font-size: 13px;
  span {
    color: rgb(80, 170, 250);
  }
}
</style>
