<template>
  <div class="footer-view" :style="{height: height}">
    <Player />
  </div>
</template>

<script>
import Player from './Player'
export default {
  components: {
    Player
  },
  props: {
    height: {
      type: String,
      default: '70px'
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-view {
  position: relative;
  z-index: 200;
  border-top: $break;
  background: #f6f6f8;
}
</style>
