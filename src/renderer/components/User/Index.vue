<template>
  <div class="c-user">
    <div class="c-user__con">
      <router-link :to="`/user/${user.profile.cid}`" class="row-item">
        <img
          :src="[user.profile.avatar_url ? user.profile.avatar_url : require('../../assets/user.jpg')]"
          class="c-user__avatar"
          alt="avatar"
        />
      </router-link>

      <span class="c-user__nick">
        <template v-if="user.isLogin">
          <el-dropdown placement="bottom" trigger="hover">
            <span class="user-item">{{ user.profile.name }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="itemClick">设置</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <span class="user-item" @click="login">立即登录</span>
        </template>
        <icon type="arrow-down1" />
      </span>
    </div>
  </div>
</template>
<script>
// import { mapState, mapActions } from 'vuex'
import api from '@/utils/api'

export default {
  data () {
    return {
      isShow: false,
      diariesData: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  // mounted () {
  //   this.$bus.$on('login', () => {
  //     console.log('12356')
  //   })
  // },
  methods: {
    itemClick () {
      this.$router.push({ name: 'UserEdit' })
    },
    login () {
      console.log('test')
      this.$bus.$emit('login')
    },
    async logout () {
      let res = await api.logout()
      let { code, data, msg } = res
      if (code !== 200) {
        this.$message({
          message: msg,
          type: 'error'
        })
      } else {
        // this.$bus.$emit('refresh')
        location.reload()
        // let res = api.loginSuccess()
        // this.$store.dispatch('loginSuccess')
        // if (res.code !== 200) {

        // }
      }
    }
    // ...mapActions(['setLoginState', 'setCounter']),
    // login () {
    //   user.login()
    // },
    // logout () {
    //   user.logout()
    // }
  }
}
</script>
<style lang="scss" scoped>
.c-user {
  &__con {
    margin-right: 20px;
    color: $colorHeaderBtn;
  }

  .panda-icon {
    color: $colorHeaderBtn;
    cursor: pointer;
  }

  .user-item {
    color: $colorHeaderBtn;
    &:hover {
      & + .panda-icon {
        color: #ffffff;
      }
      color: #ffffff;
      cursor: pointer;
    }
  }

  &__avatar {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    border-radius: $radius;
    margin-right: 0.5em;
  }

  &__nick {
    vertical-align: middle;
    margin-right: 0.2em;
    letter-spacing: 1px;
    font-size: 12px;
    .user-item {
      font-size: 14px;
    }
  }
}
</style>
<style>
.el-dropdown-menu {
  text-align: center;
  min-width: 90px;
}
</style>
