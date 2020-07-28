<template>
  <div>
    <el-container class="container" id="main">
      <el-container style="position: relative;">
        <el-header class="header" height="50px" style="-webkit-app-region: drag; padding:0">
          <header-view height="50px" />
        </el-header>
        <el-container>
          <el-aside width="200px" class="aside" style="background:#F5F5F7;">
            <aside-view />
          </el-aside>
          <el-main class="main" style="background:#FAFAFA;">
            <keep-alive>
              <router-view :key="$route.fullPath" v-if="isCenterView"></router-view>
            </keep-alive>
          </el-main>
        </el-container>
        <!--<playlist/>-->
      </el-container>
      <el-footer class="footer" height="70px">
        <footer-view height="70px" />
      </el-footer>
    </el-container>
    <login-view />
  </div>
</template>
<script>
import AsideView from '@/components/Aside/'
import HeaderView from '@/components/Header/'
import FooterView from '@/components/Footer/'
import LoginView from '@/components/Login/'
import SomeView from '@/components/Some/'
// import Playlist from '../components/Playlist/'

export default {
  components: {
    AsideView,
    HeaderView,
    FooterView,
    LoginView

    // Playlist
  },
  data () {
    return {
      isCenterView: true
    }
  },

  created () {
    this.$store.dispatch('loginSuccess')
  },
  mounted () {
    let _this = this
    this.$bus.$on('page-refresh', () => {
      _this.isCenterView = false
      setTimeout(() => { _this.isCenterView = true }, 2000)
    })
  }
}
</script>
<style lang="scss" scoped>
.aside {
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #efefef, #efefef);
}

.container {
  height: 100vh;
}

.header {
  background: #fafafa;
}

.main {
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
}

.footer {
  background: #f7f7f7;
  padding: 0;
}
</style>