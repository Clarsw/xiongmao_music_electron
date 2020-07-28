<template>
  <div id="app">
    <!-- <Layout /> -->

    <!-- 5.8 -->
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <!-- 5.8 -->
  </div>
</template>

<script>
import Layout from '@/layouts/Main'
export default {
  components: { Layout },
  name: 'my-master'
}
</script>

<style lang="scss">
$css-prefix: "pan";
$color: red;
.#{$css-prefix}da {
  color: $color;
}
</style>
