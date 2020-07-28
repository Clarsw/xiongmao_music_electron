<template>
  <div class="c-sheet">
    <el-popover trigger="click" placement="bottom-start">
      <div class="cate-bar">
        <el-scrollbar class="cate-bar-scroll">
          <div
            class="cate-bar-all cate"
            :class="key&&key!='' ? '' :'active'"
            style="border-radius: 0;"
            @click="handleKeyChangeAll"
          >全部歌单</div>
          <!-- <div v-for="(item, key) in cates" :key="key" class="cate-area">
            <div class="cate-label">{{item.name}}</div>
            <div class="cates">
              <div
                class="cate"
                :class="{'current' : item.name=='options.cat'}"
                v-for="(item, index) in item.cate"
                :key="index"
              >{{item}}</div>
            </div>
          </div>-->
          <template v-for="(item, key) in cates">
            <div :key="key" class="cate-area" v-if="!item.is_delete">
              <div class="cate-label">{{item.cates_name}}</div>
              <div class="cates">
                <template v-for="(item1,index) in item.cate">
                  <div
                    class="cate"
                    :key="index"
                    :class=" checkSlected(item1.cate_id,item1.cate_name)"
                    v-if="!item1.is_delete"
                    @click="handleKeyChange(item1.cate_id)"
                  >{{item1.cate_name}}</div>
                </template>
              </div>
            </div>
          </template>
        </el-scrollbar>
      </div>
      <el-button slot="reference" size="mini" style="margin-top:20px">
        {{cateName}}
        <icon type="arrow-down" />
      </el-button>
      <!-- <div class="selected-btn" slot="reference">{{key}}</div> -->
    </el-popover>
    <div class="container">
      <el-row style="margin:10px 0;" v-if="sheetList.length!=0">
        <el-col
          v-for="(item,index) in sheetList"
          :key="index"
          style="padding:0 20px;width:20%;margin: 10px 0;"
        >
          <sheet-item :item="item" />
        </el-col>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="text-align:center;">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="20"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
      <template v-else>
        <div class="not__found" v-if="!isLoading">该分类歌单目前为空</div>
      </template>
    </div>
  </div>
</template>
<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      cateName: '全部',
      cates: [],
      total: 0,
      sheetList: [],
      key: '',
      page: 1,
      isLoading: true
    }
  },
  mounted () {
    let key = this.$route.query.key
    console.log(key)
    if (key) {
      this.key = key
      // console.log(this.$route)
    }
    this.getCates()
    this.getData()
  },
  activated () {
    // let key = this.$route.query.key
    // console.log(key)
    // if (key !== '') {
    //   this.key = key
    //   // console.log(this.$route)
    // }
    this.getCates()
    this.getData()
  },
  methods: {
    checkSlected (id, name) {
      if (this.key === id) {
        this.cateName = name
        return 'active'
      } else {
        return ''
      }
    },
    handleKeyChange (id) {
      this.key = id
      this.getData()
    },
    handleKeyChangeAll () {
      this.key = ''
      this.cateName = '全部'
      this.getData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    },
    async getCates () {
      const result = await api.getSheetCates()
      console.log(result, 'cates')
      this.cates = result.data.cates
    },
    async getData () {
      this.isLoading = true
      let res = await api.allSheet({ page: this.page, key: this.key })
      let { data, code } = res
      this.total = res.total
      this.sheetList = data.sheets
      this.isLoading = false
    }
  }

}
</script>
<style scoped lang="scss">
.not__found {
  margin: 20px;
}
.cate-bar-all {
  cursor: pointer;
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