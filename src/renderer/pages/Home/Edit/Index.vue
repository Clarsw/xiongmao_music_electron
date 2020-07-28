<template>
  <div class="user-edit" v-if="userForm">
    <div class="row1">
      <div class="title">编辑个人信息</div>
      <template>
        <router-link to="/singer/edit" tag="div" class="edit-btn" v-if="user.profile.sid==0">入驻音乐人</router-link>
        <template v-else>
          <!-- <div>修改歌手信息</div> -->
          <div v-if="user.profile.singer.is_new" style="color:rgb(230,162,60);font-size:12px;">待审核</div>
          <template v-else>
            <div
              v-if="!user.profile.singer.is_delete"
              style="color:rgb(103,194,58);font-size:12px;"
            >已通过</div>
            <div v-else style="color:rgb(245,108,205);font-size:12px;">不通过</div>
          </template>
        </template>
      </template>
    </div>
    <!-- <el-divider></el-divider> -->
    <div class="user-edit-box">
      <el-form ref="userForm" :model="userForm" label-width="60px" class="user-form">
        <el-form-item label="昵称：">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="userForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="介绍：">
          <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 16}" v-model="userForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="saveLoading">保存</el-button>
          <el-button type="danger" @click="onSubmit" :loading="saveLoading">修改密码</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
      <div class="avatar-box">
        <img
          style="display:block;width: 180px; height: 180px;border-radius:6px; border:2px dashed #E1E1E2"
          :src="[user.profile.avatar_url ? user.profile.avatar_url : require('../../../assets/user.jpg')]"
        />

        <el-upload
          class="upload-demo"
          action="http://localhost:8090/music/upload/image"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
        >
          <el-button size="mini" type="primary" class="upload-btn" :loading="uploadLoading">修改头像</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      uploadLoading: false,
      saveLoading: false,
      userForm: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
    // userForm () {
    //   return this.$store.state.user.profile
    // }
  },
  activated () {
    this.getData()
  },

  methods: {
    async getData () {
      let res = await api.checkLogin()
      let { code, data } = res
      if (code === 200) {
        this.$store.commit('SET_LOGIN', data.account)
        this.$store.dispatch('getMySheet')
        this.userForm = data.account
      } else {
        this.$store.commit('SET_NULL')
      }
      console.log(this.userForm)
    },
    async handleSuccess (response, file, filelist) {
      // console.log(response, file, filelist)
      if (response.filename) {
        let res = await api.changeAvatar({ avatar_url: response.filename })
        let { code, msg } = res
        if (code !== 200) {
          this.$message({
            message: msg,
            type: 'error'
          })
        } else {
          this.$store.dispatch('loginSuccess')
          this.uploadLoading = false
        }
      }
    },
    handleBeforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      } else {
        this.uploadLoading = true
      }
      return isJPG
    },
    async onSubmit () {
      this.saveLoading = true
      let param = { name: this.userForm.name, desc: this.userForm.desc, sex: this.userForm.sex }
      let res = await api.editAccount(param)
      let { code, msg } = res
      if (code !== 200) {
        this.$message({
          message: msg,
          type: 'error'
        })
        this.saveLoading = false
      } else {
        this.$message({
          message: msg,
          type: 'success'
        })
        this.$store.dispatch('loginSuccess')
        this.saveLoading = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.user-edit {
  margin: 20px 30px;
  width: 100%;

  .title {
    flex: 1;
    // width: 100%;
    font-size: 18px;
    font-weight: 500;
  }
  &-box {
    display: flex;
    margin-top: 40px;
  }
  .user-form {
    width: 460px;
    margin-right: 50px;
  }
  /deep/ .upload-demo {
    text-align: center;
    margin-top: 20px;
  }
  .edit-btn {
    font-size: 12px;
    padding: 4px 8px;
    border: 1px solid #e1e1e2;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
    &:hover {
      background: rgb(245, 245, 247);
    }
  }
  .row1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: $break;
  }
}
</style>