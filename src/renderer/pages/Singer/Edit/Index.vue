<template>
  <div class="singer-edit">
    <div class="row1">
      <div class="title">入驻登记</div>
    </div>
    <div class="singer-edit-box">
      <el-form ref="singerForm" :model="singerForm" label-width="100px" class="singer-form">
        <el-form-item label="艺人名：">
          <el-input v-model="singerForm.name" @blur="checkName"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="singerForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
            <el-radio class="radio" :label="2">团体</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="`${langs.cates_name}：`">
          <el-select v-model="singerForm.area" placeholder="请选择">
            <el-option
              v-for="item in langs.cate"
              :key="item.cate_id"
              :label="item.cate_name"
              :value="item.cate_id"
            >
              <span style="float: left;margin-left: 10px;">{{ item.cate_name }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`${styles.cates_name}：`">
          <el-select v-model="singerForm.style" placeholder="请选择">
            <el-option
              v-for="item in styles.cate"
              :key="item.cate_id"
              :label="item.cate_name"
              :value="item.cate_id"
            >
              <span style="float: left;margin-left: 10px;">{{ item.cate_name }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人介绍：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 60}"
            v-model="singerForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="saveLoading" :disable="disable">提交申请</el-button>
        </el-form-item>
      </el-form>
      <div class="avatar-box">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8090/music/upload/image"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
        >
          <img v-if="singerForm.avatar_url!=''" :src="singerForm.avatar_url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">
            请上传艺人/团体头像
            <span class="upload-tip">{{uploadTip}}</span>
          </div>
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
      uploadTip: '',
      singerForm: {
        name: '',
        sex: -1,
        desc: '',
        area: '',
        style: '',
        avatar_url: ''
      },
      styles: {
        cates_name: '风格'
      },
      langs: {
        cates_name: '语种'
      }

    }
  },
  mounted () {
    this.getData()
  },

  methods: {
    checkName () {
      if (this.singerForm.name === '') {
        this.$message({
          message: '请填写艺名',
          type: 'warning'
        })
      }
    },
    async getData () {
      let res = await api.getAllCates()
      let { code, data } = res
      let cates = data.cates
      for (let i = 0; i < cates.length; i++) {
        if (cates[i].is_lang) {
          this.langs = cates[i]
        }
        if (cates[i].is_style) {
          this.styles = cates[i]
        }
      }
      console.log(this.langs, this.styles)
    },
    handleSuccess (response, file, filelist) {
      if (response.filename) {
        this.singerForm.avatar_url = response.filename
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
    beforeSubmit () {
      let obj = {
        code: 1,
        msg: ''
      }
      if (this.singerForm.name === '') {
        obj.code = 0
        obj.msg = '请输入艺名'
      } else if (this.singerForm.sex === -1) {
        obj.code = 0
        obj.msg = '请选择性别'
      } else if (this.singerForm.area === '') {
        obj.code = 0
        obj.msg = '请选择语种'
      } else if (this.singerForm.style === '') {
        obj.code = 0
        obj.msg = '请选择风格'
      }
      return obj
    },
    onSubmit () {
      let res = this.beforeSubmit()
      if (res.code) {
        this.$confirm('信息提交后不可修改，确认提交吗?', '警告', {
          // type: 'warning'
        }).then(() => {
          this.submit()
        }).catch(() => {

        })
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    async submit () {
      this.saveLoading = true
      let param = Object.assign(this.singerForm)
      let res = await api.singerApply(param)
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
        this.saveLoading = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.singer-edit {
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
  .singer-form {
    width: 460px;
    margin-right: 50px;
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
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/ .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>