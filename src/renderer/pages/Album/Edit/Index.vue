<template>
  <el-container class="album-detail">
    <el-scrollbar>
      <div class="album-edit">
        <div class="row1">
          <div class="title">编辑专辑</div>
        </div>
        <div class="album-edit-box">
          <el-form ref="albumForm" :model="albumForm" label-width="100px" class="album-form">
            <el-form-item label="专辑名：">
              <el-input v-model="albumForm.name"></el-input>
            </el-form-item>

            <el-form-item label="专辑介绍：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 60}"
                v-model="albumForm.desc"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="saveLoading">添加歌曲</el-button>
          <el-button type="primary" @click="onSubmit" :loading="saveLoading">提交申请</el-button>
            </el-form-item>-->
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
                :src="albumForm.cover_url ? albumForm.cover_url:require('../../../assets/sheetcover.jpg')"
                class="cover"
              />
              <!-- <i class="el-icon-plus cover-uploader-icon"></i> -->
              <div slot="tip" class="el-upload__tip">
                请上传专辑封面
                <span class="upload-tip">{{uploadTip}}</span>
              </div>
            </el-upload>
          </div>
        </div>
        <div class="song-edit-box">
          <div class="song-edit-top">
            <div class="left">当前作品：</div>
            <div class="right">
              <icon type="add" style="cursor:pointer" @click.native="addSong" />
            </div>
          </div>
          <div class="song-edit-list">
            <el-collapse accordion>
              <!-- <el-collapse-item> -->
              <el-collapse-item v-for="(item,index) in songs" :key="index">
                <template slot="title">
                  <div class="song_box">
                    <div class="index">{{index+1}}</div>
                    <div class="song_ar">{{item.ar}}</div>
                    <div class="song_name">{{item.name}}</div>
                    <template>
                      <div class="state" v-if="item.state==0">未上传</div>
                      <div class="state" v-if="item.state==1">上传成功</div>
                      <div class="state" v-if="item.state==2">上传中</div>
                      <div class="state" v-if="item.state==3">上传失败</div>
                      <el-upload
                        class="upload-demo"
                        action="http://localhost:8090/music/upload/song"
                        :show-file-list="false"
                        :on-success="handleSuccessSong"
                        :before-upload="handleBeforeUploadSong"
                      >
                        <div
                          class="btn"
                          slot="trigger"
                          style="color:#44AAF8;"
                          @click="handleCurrentSong(index)"
                        >
                          <span v-if="item.state==0">上传</span>
                          <span v-if="item.state==1">修改</span>
                        </div>
                      </el-upload>
                    </template>
                    <template>
                      <div class="btn" style="color:#D15858;" @click.stop="handleDelete(index)">删除</div>
                    </template>
                  </div>
                </template>
                <el-form ref="songForm" :model="item" label-width="100px" class="song-form">
                  <el-form-item label="歌手：" class="song-form__ar">
                    <el-input v-model="item.ar"></el-input>
                  </el-form-item>
                  <el-form-item label="歌名：" class="song-form__name">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item :label="`${styles.cates_name}：`">
                    <el-select v-model="item.cate_id" placeholder="请选择">
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
                  <el-form-item label="歌词：">
                    <el-upload
                      class="upload-demo"
                      action="http://localhost:8090/music/upload/lyric"
                      :show-file-list="false"
                      :on-success="handleSuccessLyric"
                    >
                      <div
                        class="btn"
                        slot="trigger"
                        style="color:#44AAF8;"
                        @click="handleCurrentSong(index)"
                      >
                        <span v-if="item.lrc_state==0">上传歌词</span>
                        <span v-if="item.lrc_state==1">修改歌词</span>
                      </div>
                    </el-upload>
                  </el-form-item>
                  <!-- <el-form-item>
                    <el-upload
                      class="cover-uploader"
                      action="http://localhost:8090/music/upload/image"
                      :show-file-list="false"
                      :on-success="handleSuccess1"
                      :before-upload="handleBeforeUpload"
                    >
                      <img
                        v-if="item.cover_url!=''"
                        :src="item.cover_url"
                        class="cover"
                        @click="handleCurrentSong(index)"
                      />
                      <i
                        v-else
                        class="el-icon-plus cover-uploader-icon"
                        @click="handleCurrentSong(index)"
                      ></i>
                      <div slot="tip" class="el-upload__tip">
                        请上传歌曲封面
                      </div>
                    </el-upload>
                  </el-form-item>-->
                </el-form>
                <!-- <template slot="title">
              一致性 Consistency
              <i class="header-icon el-icon-info"></i>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
              </el-collapse-item>
            </el-collapse>
          </div>
          <el-button type="primary" @click="onSubmit" :loading="saveLoading" v-if="aid==0">提交</el-button>
          <el-button type="primary" @click="onSave" :loading="saveLoading" v-else>保存</el-button>
        </div>
      </div>
      <!-- <audio :src="audioSrc" controls="false" id="myAudio"></audio> -->
    </el-scrollbar>
  </el-container>
</template>
<script>
import api from '@/utils/api'
var audio = document.createElement('audio')
export default {
  data () {
    return {
      // uploadLoading: false,
      saveLoading: false,
      audioSrc: '',
      currentUploadSong: 0,
      uploadTip: '',
      aid: 0,
      albumForm: {
        name: '',
        desc: '',
        cover_url: ''
      },

      songs: [{ ar: '', name: '', song_url: '', cate_id: '', dt: 0, state: 0, lrc_url: '', lrc_state: 0 }],
      // songs: [],
      styles: {
        cates_name: '风格'
      }

    }
  },
  activated () {
    this.getData()
    this.songs = []
    this.albumForm = {
      name: '',
      desc: '',
      cover_url: ''
    }
    this.songs = [{ ar: '', name: '', song_url: '', cate_id: '', dt: 0, state: 0, lrc_url: '', lrc_state: 0 }]
    let aid = this.$route.params.aid
    if (aid !== '0') {
      this.aid = aid
      this.getAlbumData()
    }
  },

  methods: {
    handleDelete (index) {
      if (this.songs.length > 1) {
        this.songs.splice(index, 1)
      } else {
        this.$message.error('专辑歌曲不能为空!')
      }
    },
    handleCurrentSong (index) {
      this.currentUploadSong = index
    },
    addSong () {
      this.songs.push({ ar: '', name: '', song_url: '', cate_id: '', dt: 0, state: 0, lrc_url: '', lrc_state: 0 })
    },
    async getData () {
      let res = await api.getAllCates()
      let { code, data } = res
      let cates = data.cates
      for (let i = 0; i < cates.length; i++) {
        if (cates[i].is_style) {
          this.styles = cates[i]
        }
      }
    },
    async getAlbumData (id) {
      let res = await api.getAlbumData({ aid: this.aid })
      let { code, data } = res
      this.albumForm = data.album[0]
      for (let i = 0; i < data.songs.length; i++) {
        if (data.songs[i].song_url) {
          data.songs[i].state = 1
        } else {
          data.songs[i].state = 0
        }
        if (data.songs[i].lrc_url) {
          data.songs[i].lrc_state = 1
        } else {
          data.songs[i].lrc_state = 0
        }
      }
      this.songs = data.songs
    },
    handleSuccess (response, file, filelist) {
      if (response.filename) {
        this.albumForm.cover_url = response.filename
      }
    },
    handleSuccess1 (response, file, filelist) {
      if (response.filename) {
        this.songs[this.currentUploadSong].cover_url = response.filename
      }
    },
    handleSuccessLyric (response, file, filelist) {
      if (response.filename) {
        this.songs[this.currentUploadSong].lrc_url = response.filename
      }
      this.songs[this.currentUploadSong].lrc_state = 1
      // console.log(this.songs)
    },
    handleBeforeUpload (file, index) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG /PNG 格式!')
      } else {
        // this.uploadLoading = true
      }
      return isJPG || isPNG
    },
    handleSuccessSong (response, file, filelist) {
      if (response.filename) {
        let _this = this
        this.songs[this.currentUploadSong].song_url = response.filename
        this.songs[this.currentUploadSong].state = 1
        audio.src = response.filename
        audio.load()
        audio.oncanplay = function () {
          // this.songs[this.currentUploadSong].dt = Math.floor(audio.duration)
          // console.log(Math.floor(audio.duration))
          _this.songs[_this.currentUploadSong].dt = Math.floor(audio.duration) * 1000
        }
      } else {
        this.songs[this.currentUploadSong].state = 3
      }
    },
    handleBeforeUploadSong (file) {
      // console.log(file.type + '234567')
      const isMP3 = file.type === 'audio/mp3'
      if (!isMP3) {
        this.$message.error('上传歌曲只能是 MP3 格式!')
      } else {
        // this.uploadLoading = true
        this.songs[this.currentUploadSong].state = 2
      }
      return isMP3
    },
    // handleBeforeUploadLyric (file) {
    //   console.log(file.type + '234567')
    //   const isMP3 = file.type === '/lrc'
    //   if (!isMP3) {
    //     this.$message.error('上传歌词只能是 LRC 格式!')
    //   } else {
    //     // this.uploadLoading = true
    //     this.songs[this.currentUploadSong].state = 2
    //   }
    //   return isMP3
    // },
    beforeSubmit () {
      // albumForm: {
      //   name: '',
      //   desc: '',
      //   cover_url: ''
      // },

      // songs: [{ ar: '', name: '', song_url: '', cate_id: '', dt: 0, state: 0, lrc_url: '', lrc_state: 0 }],
      // // songs: [],
      // styles: {
      //   cates_name: '风格'
      // }
      let obj = {
        code: 1,
        msg: ''
      }
      if (this.albumForm.name === '') {
        obj.code = 0
        obj.msg = '请输入专辑名'
      } else {
        for (let i = 0; i < this.songs.length; i++) {
          if (this.songs[i].name === '') {
            obj.code = 0
            obj.msg = '请输入歌曲名'
            break
          } else if (this.songs[i].ar === '') {
            obj.code = 0
            obj.msg = '请输入歌手'
            break
          } else if (this.songs[i].song_url === '') {
            obj.code = 0
            obj.msg = '请输先上传歌曲'
            break
          } else if (this.songs[i].cate_id === '') {
            obj.code = 0
            obj.msg = '请输选择歌曲类型'
            break
          }
        }
      }
      return obj
    },
    onSubmit () {
      let res = this.beforeSubmit()
      if (res.code) {
        this.$confirm('确认提交吗?', '警告', {
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
    onSave () {
      let res = this.beforeSubmit()
      if (res.code) {
        this.$confirm('确认修改吗?', '警告', {
          // type: 'warning'
        }).then(() => {
          this.save()
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
      let albumData = Object.assign(this.albumForm)
      let songsData = Object.assign(this.songs)
      let res = await api.albumApply({ album: albumData, songs: songsData })
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
    },
    async save () {
      this.saveLoading = true
      let albumData = Object.assign(this.albumForm)
      let songsData = Object.assign(this.songs)
      let res = await api.albumUpdate({ album: albumData, songs: songsData })
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
        this.getAlbumData()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.album-edit {
  margin: 20px 30px;
  // width: 100%;

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
  .album-form {
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
/deep/ .cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .cover-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/ .cover {
  width: 178px;
  height: 178px;
  display: block;
}

.song-edit {
  &-box {
    width: 74%;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // .left {
    //   width: max-content;
    // }
  }
  &-list {
    margin: 20px 0;
  }
}

.song_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // margin: 20px;
  padding: 0 10px;
  .btn {
    cursor: pointer;
  }
}

.song-form {
  &__name {
    width: 60%;
  }
  &__ar {
    width: 40%;
  }
}

.album-detail {
  margin-bottom: -17px;

  /deep/ .el-scrollbar {
    width: 100%;
  }
}
</style>