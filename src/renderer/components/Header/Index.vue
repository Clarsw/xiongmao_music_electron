<template>
  <div class="c-header" :style="{height: height}">
    <div class="c-header-left">
      <img class="header__logo" src="../../assets/logo.png" />
      <div class="header__name">熊猫云音乐</div>
    </div>

    <div class="c-header-middle">
      <!-- <el-button class="lyrc test" @click="showlyrc">lyrc</el-button> -->
      <div class="header-nav">
        <icon type="back" :class="{'active':this.$route.name!='index'}" @click.native="back" />
        <!-- <icon type="forword" @click.native="advance" /> -->
        <!-- <icon type="refresh" @click.native="refresh" class="active" /> -->
        <div class="header-search">
          <div class="search">
            <el-input
              size="mini"
              v-model="searchKey"
              placeholder="搜索音乐、歌单、专辑、歌手"
              @keyup.enter.native="search"
            ></el-input>
            <i class="el-icon-search search-icon" @click="search"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="c-header-right">
      <div class="header-user">
        <i class="el-icon-loading" v-if="downloading" style="font-size:16px;margin-right:10px;"></i>
        <user />
        <!-- <icon type="email" />
        <icon type="setting" />-->
      </div>
      <div class="header-window-btn">
        <icon type="minimize" @click.native="minimize" />
        <!-- <icon
          :type="isFullScreen ? 'reduce':'maximize'"
          @click.native="changeWindowSize(isFullScreen)"
        />-->
        <icon type="close" @click.native="close" />
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/components/User'
import api from '../../utils/api'
export default {
  components: { User },
  props: {
    height: {
      type: String,
      default: '50px'
    }

  },
  data () {
    return {
      searchKey: '',
      isFullScreen: false,
      isLyric: false
    }
  },
  computed: {
    downloading () {
      return this.$store.state.download.downloading
    }

  },
  mounted () {
  },
  methods: {

    search () {
      if (this.searchKey) {
        this.$router.push({ name: 'search', query: { 'key': this.searchKey } })
      } else {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      }
    },
    changeWindowSize (state) {
      if (state) {
        this.min()
      } else {
        this.max()
      }
      this.isFullScreen = !this.isFullScreen
    },
    close () {
      this.$confirm('此操作将退出熊猫云音乐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.$electron)
        this.$electron.ipcRenderer.send('close')
      }).catch(() => {

      })
    },
    minimize () {
      this.$electron.ipcRenderer.send('minimize')
    },
    min () {
      this.$electron.ipcRenderer.send('min')
    },
    max () {
      this.$electron.ipcRenderer.send('max')
    },
    back () {
      // console.log(this.$route)
      if (this.$route.name !== 'index') {
        this.$router.go(-1)
      }
    },
    advance () {
      this.$router.go(1)
    },
    refresh () {
      // this.$bus.$emit('page-refresh', this.$route.name)
      // console.log(this.$route)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-header {
  & {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    display: flex;
    align-items: center;
    background: $colorHeader;
    box-shadow: $shadow;
  }
  &-left {
    -webkit-app-region: no-drag;
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-middle {
    -webkit-app-region: no-drag;
  }
  &-right {
    -webkit-app-region: no-drag;
    margin-left: auto;
    margin-right: 18px;
    display: flex;
    align-items: center;
  }
}
.header {
  &__logo {
    width: 30px;
    height: 30px;
    margin: 0 10px 0 18px;
  }
  &__name {
    letter-spacing: 2px;
  }
  &-nav {
    & {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .panda-icon {
      cursor: pointer;
      padding: 1px 4px;
      color: $colorHeaderBtn;
      &:nth-child(1) {
        border: 1px solid $colorHeaderBorder;
        border-radius: 3px 0px 0px 3px;
      }
      &:nth-child(2) {
        border-width: 1px 1px 1px 0px;
        border-color: $colorHeaderBorder;
        border-style: solid;
        border-radius: 0px 3px 3px 0px;
      }
      &:nth-child(3) {
        margin: 0 20px 0 20px;
        font-size: 22px;
        &:hover {
          color: #ffffff;
        }
      }
    }
    .panda-icon.active {
      color: #ffffff;
    }
  }
  &-window-btn {
    & {
      border-left: 1px solid $colorHeaderBorder;
    }
    .panda-icon {
      padding: 1px 4px;
      cursor: pointer;
      color: $colorHeaderBtn;
      &:first-child {
        margin-left: 10px;
      }
      &:hover {
        color: #ffffff;
      }
    }
  }
  &-user {
    & {
      display: flex;
      align-items: center;
    }
    .panda-icon {
      padding: 1px 10px;
      cursor: pointer;
      color: $colorHeaderBtn;
      &:last-child {
        margin-right: 10px;
      }
      &:hover {
        color: #ffffff;
      }
    }
  }
}

.search {
  position: relative;
  width: 220px;
  margin-left: 30px;
  /deep/ .el-input__inner {
    height: 22px !important;
    line-height: 22px !important;
    font-size: 12px !important;
    border-radius: 50px !important;
  }
  .search-icon {
    position: absolute;
    right: 10px;
    top: 6px;
    cursor: pointer;
  }
}
</style>
