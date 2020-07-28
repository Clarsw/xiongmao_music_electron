<template>
  <el-container class="user-detail">
    <el-scrollbar v-if="userInfo">
      <div class="user-detail-info">
        <div class="avatar-box">
          <el-image
            :src="userInfo.profile.avatar_url ? userInfo.profile.avatar_url : require('../../assets/user.jpg')"
            class="avatar-img"
            style="width:100%;height:100%;"
          ></el-image>
          <router-link
            :to="`/singer/${userInfo.profile.sid}`"
            v-if="userInfo.profile.sid!=0"
            tag="div"
            class="avatar-box-btn"
          >歌手主页</router-link>
        </div>
        <div class="intro-box">
          <div class="row1">
            <span class="nickname">{{userInfo.profile.name}}</span>
            <div class="extra">
              <div
                class="edit-btn"
                v-if="userInfo.profile.cid==user.profile.cid"
                @click="itemClick"
              >编辑个人信息</div>
            </div>
          </div>
          <div class="row3">个人介绍: {{ userInfo.profile.desc ? userInfo.profile.desc : "暂无介绍" }}</div>
        </div>
      </div>
      <div class="user-playlist">
        <el-tabs v-model="activeName">
          <template>
            <el-tab-pane label="我的歌单" name="sheet" v-if="userInfo.profile.cid==user.profile.cid"></el-tab-pane>
            <el-tab-pane label="他的歌单" name="sheet" v-else></el-tab-pane>
          </template>
          <el-tab-pane label="收藏的歌单" name="collectsheet"></el-tab-pane>
        </el-tabs>
        <user-sheet v-if="activeName == 'sheet'" />
        <collect-sheet v-if="activeName == 'collectsheet'" />
      </div>
    </el-scrollbar>
    <template v-else>
      <div class="not_found" v-if="!isLoading">该用户已被屏蔽</div>
    </template>
  </el-container>
</template>
<script>
import api from '@/utils/api'
import UserSheet from './UserSheet'
import CollectSheet from './CollectSheet'
export default {
  components: { UserSheet, CollectSheet },
  data () {
    return {
      userInfo: false,
      activeName: 'sheet',
      isLoading: true
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  activated () {
    this.getUserInfo()
  },
  methods: {
    itemClick () {
      this.$router.push({ name: 'UserEdit' })
    },
    async getUserInfo () {
      this.isLoading = true
      let id = this.$route.params.cid
      let res = await api.getUserInfo({ cid: id })
      let { code, data } = res
      if (code === 200) {
        this.userInfo = data.userinfo
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
.user-detail {
  margin-bottom: -17px;
}
/deep/ .el-scrollbar {
  width: 100%;
}
.user-playlist {
  margin: 20px 30px;
}
.user-detail-info {
  margin: 20px 30px;
  display: flex;
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
  .row3 {
    margin-top: 20px;
    font-size: 13px;
  }
}
</style>

