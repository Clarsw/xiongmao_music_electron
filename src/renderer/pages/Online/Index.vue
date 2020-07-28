<template>
  <el-container style="position: relative;" class="panda-online">
    <el-header height="40px" style="background:#FAFAFA;" class="panda-online-header">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个性推荐" name="recommend"></el-tab-pane>
        <el-tab-pane label="歌单" name="sheet"></el-tab-pane>
        <el-tab-pane label="排行榜" name="rank"></el-tab-pane>
        <!-- <el-tab-pane label="歌手" name="singer"></el-tab-pane> -->
        <el-tab-pane label="最新音乐" name="newest"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main class="main">
      <transition name="el-fade-in-linear">
        <el-scrollbar class="panda-online-box">
          <div class="panda-online-box__inner">
            <Recommend v-if="activeName==='recommend'" />
            <Sheet v-if="activeName==='sheet'" />
            <Rank v-if="activeName==='rank'" />
            <!-- <Singer v-if="activeName==='singer'" /> -->
            <Newest v-if="activeName==='newest'" />
          </div>
        </el-scrollbar>
      </transition>
    </el-main>
  </el-container>
</template>
<script>
import Recommend from './Recommend'
import Sheet from './Sheet'
import Rank from './Rank'
// import Singer from './Singer'
import Newest from './Newest'
export default {
  components: {
    Recommend,
    Sheet,
    Rank,
    // Singer,
    Newest
  },
  data () {
    return {
      activeName: 'recommend'
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {

    }
  }
}
</script>
<style lang="scss" scoped>
.panda-online {
  color: black;
  &-box {
    width: 100%;
    margin: 0 auto -17px;
    &__inner {
      width: 950px;
      margin: 0 auto;
    }
  }

  /deep/ .el-header {
    padding: 0;
    margin: 0 25px;
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
</style>
