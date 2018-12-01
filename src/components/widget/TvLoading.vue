<template>
  <div class="load">
    <ul class="list">
      <li class="item" v-for="(item, index) in imgArr" :key="index" v-show="index === currentIndex">
        <img :src="item" width="100%">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$nextTick(() => {
        setInterval(() => {
          this.currentIndex++
          if (this.currentIndex >= this.imgArr.length) {
            this.currentIndex = 0
          }
        }, 150)
      })
    },
    data() {
      return {
        imgArr: [
          require('../../assets/img/dy/tv_loading_01.png'),
          require('../../assets/img/dy/tv_loading_02.png'),
          require('../../assets/img/dy/tv_loading_03.png'),
          require('../../assets/img/dy/tv_loading_04.png'),
          require('../../assets/img/dy/tv_loading_05.png'),
          require('../../assets/img/dy/tv_loading_06.png'),
          require('../../assets/img/dy/tv_loading_07.png'),
          require('../../assets/img/dy/tv_loading_08.png')
        ],
        currentIndex: 0
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .load
    width: 100%
    height: 100%
    overflow: hidden
    .list
      position: relative
      width: 100%
      height: 100%
      display: flex
      justify-content: center
      algin-items: center
      .item
        position: absolute
        top: 50%
        left: 0
        width: 100%
        margin-top: -25%
        align-self: center
</style>
