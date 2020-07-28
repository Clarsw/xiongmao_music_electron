<template>
  <div class="l-aside" :style="{width: width}">
    <Menu />
  </div>
</template>
<script>
import Menu from './Menu'
export default {
  props: {
    width: {
      type: String,
      default: '200px'
    }
  },
  components: {
    Menu
  }
}
</script>
<style lang="scss" scoped>
.l-aside {
  width: 200px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: $break;
}
</style>
