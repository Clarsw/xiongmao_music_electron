<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    width="340px"
    :close-on-click-modal="false"
    custom-class="login-dialog"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录" name="login"></el-tab-pane>
      <el-tab-pane label="注册" name="register"></el-tab-pane>
    </el-tabs>
    <template v-if="activeName=='login'">
      <div class="login-body">
        <i class="icon el-icon-service"></i>
        <div class="from">
          <div class="input-items">
            <div class="input-box">
              <div class="l-icon flex-c-c">
                <!-- <i class="iconfont icon-shoujihao"></i> -->
                <icon type="phone" />
              </div>
              <el-input v-model="loginForm.phone" @blur="checkPhone" clearable placeholder="请输入手机号"></el-input>
            </div>
            <div class="input-box border-t">
              <div class="l-icon flex-c-c">
                <!-- <i class="iconfont icon-mima"></i> -->
                <icon type="password" />
              </div>
              <el-input v-model="loginForm.password" type="password" clearable placeholder="请输入密码"></el-input>
            </div>
          </div>
          <div class="btns">
            <el-button
              type="danger"
              :disabled="!disabled"
              @click="loginClick"
              :loading="loading"
            >立即登录</el-button>
          </div>
        </div>
      </div>
    </template>
    <template v-if="activeName=='register'">
      <div class="login-body">
        <i class="icon el-icon-mobile-phone"></i>
        <div class="from">
          <div class="input-items">
            <div class="input-box">
              <div class="l-icon flex-c-c">
                <!-- <i class="iconfont icon-shoujihao"></i> -->
                <icon type="phone" />
              </div>
              <el-input
                v-model="registerForm.phone"
                clearable
                placeholder="请输入手机号"
                @blur="checkPhone"
              ></el-input>
            </div>
            <div class="input-box border-t">
              <div class="l-icon flex-c-c">
                <icon type="user" />
              </div>
              <el-input v-model="registerForm.name" clearable placeholder="请输入用户名"></el-input>
            </div>
            <div class="input-box border-t">
              <div class="l-icon flex-c-c">
                <!-- <i class="iconfont icon-mima"></i> -->
                <icon type="password" />
              </div>
              <el-input
                v-model="registerForm.password"
                type="password"
                clearable
                placeholder="请输入密码"
              ></el-input>
            </div>
          </div>
          <div class="btns">
            <el-button
              type="danger"
              :disabled="!disabled1"
              @click="registerClick"
              :loading="loading"
            >立即注册</el-button>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<script>
// import { login } from '../../api/index'
import api from '../../utils/api'
export default {
  data () {
    return {
      activeName: 'login',
      dialogVisible: false,
      // phone: '',
      // password: '',
      // pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
      loading: false,
      loginForm: {
        phone: '',
        password: ''
      },
      registerForm: {
        phone: '',
        name: '',
        password: ''
      }
    }
  },
  mounted () {
    this.$bus.$on('login', () => {
      this.dialogVisible = true
      this.loading = false
      this.resetForm()
    })
  },
  methods: {
    checkPhone () {
      // let pattern = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/
      // let res = this.loginForm.phone.exec(pattern)
      if (this.activeName === 'login') {
        if (!(/^1[3456789]\d{9}$/.test(this.loginForm.phone))) {
          this.$message({
            type: 'warning',
            message: '手机号格式错误'
          })
          return false
        }
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.registerForm.phone))) {
          this.$message({
            type: 'warning',
            message: '手机号格式错误'
          })
          return false
        }
      }
    },
    // 表单重置
    resetForm () {
      this.registerForm = {
        phone: '',
        name: '',
        password: ''
      }
      this.loginForm = {
        phone: '',
        password: ''
      }
    },
    async loginClick () {
      this.loading = true
      const param = Object.assign({}, this.loginForm)
      const res = await api.login(param)
      // console.log(res)
      let { code, msg, data } = res
      if (code !== 200) {
        this.$message({
          message: msg,
          type: 'error'
        })
        this.loading = false
      } else {
        this.$message({
          message: msg,
          type: 'success'
        })
        // this.$store.dispatch('loginSuccess')
        this.loading = false
        // this.dialogVisible = false
        location.reload()
      }
    },
    async registerClick () {
      this.loading = true
      const param = Object.assign({}, this.registerForm)
      const res = await api.register(param)
      // console.log(res)
      let { code, msg } = res
      if (code !== 200) {
        this.$message({
          message: msg,
          type: 'error'
        })
        this.loading = false
      } else {
        this.$message({
          message: msg,
          type: 'success'
        })
        this.loading = false
        this.activeName = 'login'
        this.resetForm()
      }
    }
  },
  computed: {
    disabled () {
      return this.loginForm.phone.length === 11 && this.loginForm.password.length > 1
    },
    disabled1 () {
      return this.registerForm.phone.length === 11 && this.registerForm.password.length > 1 && this.registerForm.name.length > 1
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 20px 20px 30px;
}
.login-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    color: #f56c6c;
    font-size: 80px;
  }

  /deep/ .from {
    width: 260px;
    margin-top: 50px;
    .input-items {
      background: white;
      border: 1px solid #f0f0f0;
      border-radius: 2px;
      overflow: hidden;
    }
    .input-box {
      display: flex;
      align-items: center;
      .l-icon {
        width: 40px;
        height: 40px;
        i {
          font-size: 20px;
          color: #999;
        }
        .panda-icon {
          line-height: 40px;
          margin-left: 4px;
        }
      }
      .el-input__inner {
        border: none;
        padding: 0;
      }
    }
    .border-t {
      border-top: 1px solid #f0f0f0;
    }
    .btns {
      margin-top: 30px;
      margin-bottom: 100px;
      button {
        width: 100%;
      }
    }
  }
}
</style>
