<template>
  <div class="carousel">
    <el-carousel :interval="6000" type="card" :autoplay="true" height="200px">
      <el-carousel-item v-for="(item,index) in banner" :key="index">
        <div
          class="carousel-item-image"
          :style="{backgroundImage:'url('+item.cover_url+')'}"
          @click="itemClick(item.aid)"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import api from '@/utils/api'
export default {
  data () {
    return {
      banner: []
    }
  },
  mounted () {
    this.getBanner()
  },
  methods: {
    async getBanner () {
      const result = await api.getBanner()
      this.banner = result.data.bars
    },
    itemClick (aid) {
      this.$router.push({ name: 'album', query: { id: aid } })
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel {
  padding: 20px 0px;
  .el-carousel__item {
    .carousel-item-image {
      background-size: cover;
      // width: 445px;
      height: 200px;
      // background-position: 50% 50%;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
