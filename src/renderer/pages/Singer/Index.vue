<template>
  <el-container class="singer-detail">
    <el-scrollbar v-if="singerInfo">
      <div class="singer-detail-info">
        <div class="avatar-box">
          <el-image
            :src="singerInfo.profile.avatar_url ? singerInfo.profile.avatar_url : require('../../assets/user.jpg')"
            class="avatar-img"
            style="width:100%;height:100%;"
          ></el-image>
          <router-link :to="`/user/${singerInfo.profile.cid}`" tag="div" class="avatar-box-btn">个人主页</router-link>
        </div>
        <div class="intro-box">
          <div class="row1">
            <span class="nickname">{{singerInfo.profile.name}}</span>
            <div class="extra">
              <!-- <router-link to="/singer/edit" tag="div" class="edit-btn">编辑歌手信息</router-link> -->
            </div>
          </div>
          <div class="row4">单曲数: {{songs_total}}</div>
          <div class="row5">专辑数: {{albums_total}}</div>
          <!-- <div class="row3">个人介绍: {{ singerInfo.profile.desc ? singerInfo.profile.desc : "暂无介绍" }}</div> -->
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="专辑" name="list"></el-tab-pane>
        <el-tab-pane label="歌手详情" name="desc"></el-tab-pane>
      </el-tabs>
      <template v-if="activeName=='list'">
        <album-list />
      </template>
      <template v-if="activeName=='desc'">
        <div class="row3">{{ singerInfo.profile.desc ? singerInfo.profile.desc : "暂无介绍" }}</div>
      </template>
    </el-scrollbar>
    <template v-else>
      <div class="not_found" v-if="!isLoading">歌手暂未入驻该平台</div>
    </template>
  </el-container>
</template>
<script>
import api from '@/utils/api'
import AlbumList from './Albumlist'
export default {
  components: {
    AlbumList
  },
  data () {
    return {
      songs_total: 0,
      albums_total: 0,
      singerInfo: false,
      activeName: 'list',
      isLoading: true
    }
  },
  activated () {
    this.getsingerInfo()
  },

  methods: {
    async getsingerInfo () {
      this.isLoading = true
      let id = this.$route.params.id
      let res = await api.getSingerInfo({ sid: id })
      let { code, data } = res
      if (code === 200) {
        this.songs_total = res.songs_total
        this.albums_total = res.albums_total
        this.singerInfo = data.singerinfo
      }
      this.isLoading = false
    }
  }

}
</script>

<style scoped lang="scss">
.not_found {
  margin: 20px 30px;
}
.singer-detail {
  margin-bottom: -17px;
}
/deep/ .el-scrollbar {
  width: 100%;
}
.singer-detail-info {
  margin: 20px 30px;
  display: flex;
  // .avatar-box {
  //   border: 1px solid rgb(225, 225, 226);
  //   margin-right: 40px;
  //   .avatar-img {
  //     width: 200px;
  //     height: 200px;
  //   }
  // }
  .avatar-box {
    width: 200px;
    height: 200px;
    border: 1px solid rgb(225, 225, 226);
    margin-right: 40px;
    position: relative;
    &-btn {
      width: 130px;
      background: rgba(0, 0, 0, 0.1);
      margin: 0 auto;
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      text-align: center;
      border: 1px solid #cecece;
      border-radius: 10px;
      font-size: 12px;
      cursor: pointer;
    }
  }

  .intro-box {
    flex: 1;
    .nickname {
      font-size: 26px;
    }
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: $break;
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
  }

  .row4,
  .row5 {
    margin-top: 6px;
    font-size: 13px;
  }
  .row4 {
    margin-top: 20px;
  }
}
.singer-detail {
  /deep/ .el-tabs__nav-scroll {
    margin: 0 30px;
  }
  .row3 {
    font-size: 13px;
    color: #555;
    line-height: 20px;
    padding: 0 30px;
  }
}
</style>

