<template>
  <el-scrollbar class="menu-view scroll-page">
    <div class="menu-group">
      <div class="menu-title">在线音乐</div>
      <router-link to="/online" tag="div" class="menu-item">
        <div class="left">
          <icon type="music" />发现音乐
        </div>
      </router-link>
    </div>

    <div class="menu-group" v-if="user.isLogin">
      <div class="menu-title">我的音乐</div>
      <!-- <router-link to="/local" tag="div" class="menu-item">
        <div class="left">
          <icon type="local-music" />本地音乐
        </div>
      </router-link>-->
      <!-- <router-link to="/download" tag="div" class="menu-item">
        <div class="left">
          <icon type="download" />下载管理
        </div>
      </router-link>-->
      <router-link :to="{ name: 'UserCollect'}" tag="div" class="menu-item">
        <div class="left">
          <icon type="collect" />我的收藏
        </div>
      </router-link>
      <router-link
        :to="{ name: 'UserAlbum'}"
        tag="div"
        class="menu-item"
        v-if="user.isLogin&&user.profile.sid!=0&&!user.profile.singer.is_delete&&!user.profile.singer.is_new"
      >
        <div class="left">
          <icon type="album" />我的作品
        </div>
      </router-link>
    </div>

    <div class="menu-group" v-if="user.isLogin">
      <div class="menu-title">
        <div class="left">创建的歌单</div>
        <div class="right">
          <icon type="add" @click.native="handleClick" />
          <!-- <icon type="arrow-down" /> -->
        </div>
      </div>
      <div class="menu-box" v-for="(item,index) in sheets" :key="index">
        <router-link
          :to="`/sheet/${item.sheet_id}`"
          tag="div"
          class="left menu-item"
          v-if="item.is_favar==1"
        >
          <icon type="like" class="hot" style="margin-right:10px;" />我喜欢的音乐
        </router-link>

        <router-link :to="`/sheet/${item.sheet_id}`" tag="div" class="left menu-item" v-else>
          <icon type="sheet" style="margin-right:10px" />
          {{item.name}}
        </router-link>
      </div>
    </div>

    <!-- 添加 -->
    <el-dialog title="新增歌单" :close-on-click-modal="false" :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="歌单名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>

    <!-- <div class="menu-group">
      <div class="menu-title">
        <div class="left">我收藏的歌单</div>
        <div class="right">
          <i class="iconfont icon-xiangxia"></i>
        </div>
      </div>
      <div class="menu-item">
        <div class="left">
          <i class="iconfont icon-yinyue"></i>Convoy
        </div>
      </div>
    </div>-->
  </el-scrollbar>
</template>

<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      addFormVisible: false,
      addForm: {
        name: ''
      },
      // addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入歌单名', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    sheets () {
      return this.$store.state.user.sheets
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      this.addFormVisible = true
      this.addForm = {
        name: ''
      }
      console.log(this.addFormVisible)
    },
    async addSheet () {
      let param = Object.assign({}, this.addForm)
      let res = await api.addSheet(param)
      let { code, data, msg } = res
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
        this.addFormVisible = false
        // location.reload()
        this.$store.dispatch('getMySheet')
      }
    },
    // 新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            // NProgress.start();
            // let param = Object.assign({}, this.addForm)
            this.addSheet()
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            // addCates(param).then((res) => {
            //   this.addLoading = false
            //   let { msg, code } = res
            //   // NProgress.done();
            //   if (code != 200) {
            //     this.$message({
            //       message: msg,
            //       type: 'error'
            //     })
            //   } else {
            //     this.$message({
            //       message: msg,
            //       type: 'success'
            //     })
            //     this.$refs['addForm'].resetFields()
            //     this.addFormVisible = false
            //     this.getCates()
            //   }
            // })
          })
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-collapse-item__header {
  background: transparent;
  padding: 0 10px;
}
/deep/ .el-collapse-item__wrap {
  background: transparent;
  padding: 0 10px;
}
.scroll-page {
  margin-top: 10px;
  overflow: hidden;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.menu-view {
  flex: 1;
  overflow: hidden;

  .menu-group {
    margin-bottom: 25px;
    padding: 0 10px;
    .menu-title {
      margin-bottom: 10px;
      font-size: 12px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      color: #5c5c5c;
      .left {
        flex: 1;
      }
      .right {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .panda-icon {
          font-size: 16px;
          color: #5c5c5c;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    .menu-item {
      padding: 6px 10px;
      font-size: 13px;
      border-radius: 2px;
      margin-bottom: 5px;
      cursor: pointer;
      .left {
        color: #5c5c5c;
        .panda-icon {
          color: #5c5c5c;
          margin-right: 10px;
          font-size: 16px;
        }
        .panda-icon.hot {
          color: #ff4400;
        }
      }
    }
    .menu-item:hover {
      .left,
      .panda-icon {
        color: #000000;
      }
    }

    .menu-item.router-link-exact-active {
      & {
        background: #e6e7ea;
      }
      .left,
      .panda-icon {
        color: #000000;
      }
    }
  }
}
</style>
