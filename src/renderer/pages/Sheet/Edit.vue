<template>
  <div class="user-edit">
    <div class="row1">
      <div class="title">编辑歌单信息</div>
    </div>
    <div class="user-edit-box">
      <el-form ref="sheetForm" :model="sheetForm" label-width="60px" class="user-form">
        <el-form-item label="名称：">
          <el-input v-model="sheetForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类别：">
          <el-popover trigger="click" placement="bottom-start">
            <div class="cate-bar">
              <el-scrollbar class="cate-bar-scroll">
                <template v-for="(item, key) in cates">
                  <div :key="key" class="cate-area" v-if="!item.is_delete">
                    <div class="cate-label">{{item.cates_name}}</div>
                    <div class="cates">
                      <template v-for="(item1,index) in item.cate">
                        <div
                          class="cate"
                          :key="index"
                          :class=" checkSlected(item1.cate_id)"
                          v-if="!item1.is_delete"
                          @click="handleSelete(item1.cate_id)"
                        >{{item1.cate_name}}</div>
                      </template>
                    </div>
                  </div>
                </template>
              </el-scrollbar>
            </div>
            <el-button slot="reference" size="mini">选择</el-button>
            <!-- <div class="selected-btn" slot="reference">{{key}}</div> -->
          </el-popover>
        </el-form-item>
        <el-form-item label="介绍：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 16}"
            v-model="sheetForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="saveLoading">保存</el-button>
          <el-button type="danger" @click="deleteSheet" :loading="deleteLoading">删除</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
      <div class="cover-box">
        <el-upload
          class="cover-uploader"
          action="http://localhost:8090/music/upload/image"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
        >
          <img
            :src="sheetForm.cover_url ? sheetForm.cover_url:require('../../assets/sheetcover.jpg')"
            class="cover"
          />
          <!-- <i v-else class="el-icon-plus cover-uploader-icon"></i> -->
          <div slot="tip" class="el-upload__tip">
            请上传歌单封面
            <!-- <span class="upload-tip">{{uploadTip}}</span> -->
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
      sheet: '',
      uploadLoading: false,
      saveLoading: false,
      deleteLoading: false,
      cates: [],
      // selected: [],
      sheetForm: {
        name: '',
        desc: '',
        selected: '',
        cover_url: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  activated () {
    this.getCates()
    this.getData()
  },

  methods: {
    async deleteSheet () {
      this.deleteLoading = true
      let res = await api.deleteSheet({ sheet_id: this.sheet.sheet_id })

      let { code, msg } = res
      if (code === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.$router.push({ name: 'index' })
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
      this.deleteLoading = false
    },
    async getData () {
      let res = await api.getSheetDetail({ sheet_id: this.$route.params.id })
      // this.sheet = result.data.sheet
      let { code, data } = res
      this.sheet = data.sheet
      this.sheetForm.name = data.sheet.name
      this.sheetForm.cover_url = data.sheet.cover_url
      this.sheetForm.desc = data.sheet.desc
      let cate_id = data.sheet.cate_id
      for (let i = 0; i < cate_id.length; i++) {
        cate_id[i] = parseInt(cate_id[i])
      }
      this.sheetForm.selected = cate_id
    },
    handleSelete (id) {
      let index = this.sheetForm.selected.indexOf(id)
      if (index !== -1) {
        this.sheetForm.selected.splice(index, 1)
      } else {
        if (this.sheetForm.selected.length < 3) {
          this.sheetForm.selected.push(id)
        } else {
          this.$message({
            type: 'warning',
            message: '只能选择三个标签'
          })
        }
      }
    },
    checkSlected (id) {
      if (this.sheetForm.selected.indexOf(id) !== -1) {
        return 'active'
      } else {
        return ''
      }
    },
    async getCates () {
      const result = await api.getSheetCates()
      console.log(result, 'cates')
      this.cates = result.data.cates
    },
    async handleSuccess (response, file, filelist) {
      // console.log(response, file, filelist)
      if (response.filename) {
        this.sheetForm.cover_url = response.filename
      }
    },
    handleBeforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG 格式!')
      } else {
        this.uploadLoading = true
      }
      return isJPG
    },
    async onSubmit () {
      this.saveLoading = true
      let param = { sheet_id: this.sheet.sheet_id, name: this.sheetForm.name, desc: this.sheetForm.desc, cover_url: this.sheetForm.cover_url, cate: this.sheetForm.selected }
      let res = await api.editSheet(param)
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
        this.getData()
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
  /deep/ .cover {
    width: 178px;
    height: 178px;
    display: block;
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

.cate-bar {
  width: 460px;
  height: 400px;
  &-scroll {
    margin: 10px 0px 40px;
  }
  &-all {
    width: 100%;
    text-align: center;
    padding: 6px 0;
    border: 1px solid #cecece;
  }
}
.cate-area {
  display: flex;
  margin-top: 20px;
  .cate-label {
    width: 80px;
    font-size: 18px;
  }
  .cates {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex: 1;
  }
  .cate {
    width: 85px;
    font-size: 14px;
    border: 1px solid #cecece;
    padding: 6px 10px;
    text-align: center;
    cursor: pointer;
  }
}
.cate-bar {
  /deep/ .el-scrollbar__view {
    margin: 0 20px;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
    height: 380px;
    margin-bottom: 0px !important;
  }
}
.cate.active {
  color: rgb(102, 183, 255);
  border: 1px solid rgb(102, 183, 255);
}
</style>