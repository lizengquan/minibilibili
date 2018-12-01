<template>
  <transition name="fade">
    <div class="cover" v-if="show"></div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      }
    },
    created() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = false
        }, 3000)
      })
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .cover
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: url(../../assets/img/bilibili.png)
    background-size: cover
    z-index: 10000
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
