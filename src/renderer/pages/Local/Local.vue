<template>
  <el-button @click="test">下载</el-button>
</template>
<script>
import getLocalSongs from '@/utils/file'
export default {
  methods: {
    test () {
      getLocalSongs()
    }
  }
}
</script>