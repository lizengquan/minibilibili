<template>
  <div class="loading">
    <mu-circular-progress class="circular-progress" color="secondary" :stroke-width="4" :size="48"></mu-circular-progress>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .loading
    display: flex
    width: 100%
    height: 100%
    justify-content: center
    algin-items: center
    .circular-progress
      align-self: center
</style>
