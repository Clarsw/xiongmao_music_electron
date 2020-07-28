<template>
  <i :class="className" />
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    className () {
      return `panda-icon panda-icon__${this.type}`
    }
  }
}
</script>
