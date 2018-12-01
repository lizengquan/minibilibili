<template>
  <transition name="slide">
    <div class="play">
      {{$route.path}}
    </div>
  </transition>
</template>

<script>
  export default {}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .play
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    transition: all 0.5s
    &.slide-enter, &.slide-leave-to
      transform: translateX(100%)
</style>
