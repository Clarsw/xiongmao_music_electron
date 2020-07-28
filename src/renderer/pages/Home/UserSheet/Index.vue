<template>
  <div class="container">
    <el-row :gutter="15" style="margin-top:7.5px;">
      <el-col
        :span="20"
        v-for="(item,index) in sheetList"
        :key="index"
        style="padding:0 20px;width:20%;margin: 10px 0;"
      >
        <sheet-item :item="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      sheetList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      let res = await api.getAccountSheet({ cid: this.$route.params.cid })
      let { code, data } = res
      this.sheetList = data.sheets
    }
  }
}
</script>