<template>
  <el-container class="user-detail">
    <el-scrollbar>
      <div class="user-playlist">
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌单" name="collectsheet"></el-tab-pane>
          <el-tab-pane label="专辑" name="collectalbum"></el-tab-pane>
        </el-tabs>
        <collect-sheet v-if="activeName == 'collectsheet'" />
        <collect-album v-if="activeName == 'collectalbum'" />
      </div>
    </el-scrollbar>
  </el-container>
</template>
<script>
import api from '@/utils/api'
import CollectSheet from '../CollectSheet'
import CollectAlbum from '../CollectAlbum'
export default {
  components: { CollectSheet, CollectAlbum },
  data () {
    return {
      userInfo: false,
      activeName: 'collectsheet'
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  activated () {
  },
  methods: {
    itemClick () {
      this.$router.push({ name: 'UserEdit' })
    }
  }

}
</script>

<style scoped lang="scss">
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

